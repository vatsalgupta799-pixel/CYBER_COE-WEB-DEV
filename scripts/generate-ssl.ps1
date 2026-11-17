$certDir = Join-Path $PSScriptRoot "..\certificates"
if (-not (Test-Path $certDir)) {
    New-Item -ItemType Directory -Path $certDir -Force | Out-Null
}

$certPath = Join-Path $certDir "localhost.pem"
$keyPath = Join-Path $certDir "localhost-key.pem"

Write-Output "Generating 2048-bit RSA keypair and certificate..."
$rsa = [System.Security.Cryptography.RSA]::Create(2048)

$san = New-Object System.Security.Cryptography.X509Certificates.SubjectAlternativeNameBuilder
$san.AddDnsName("localhost")
$san.AddDnsName("127.0.0.1")
$san.AddIpAddress([System.Net.IPAddress]::Parse("127.0.0.1"))

try {
    $san.AddIpAddress([System.Net.IPAddress]::Parse("192.168.245.1"))
    $san.AddDnsName("192.168.245.1")
} catch {}

# Add all active local IPv4 addresses to SAN
Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | Where-Object { $_.IPAddress -notmatch "^169\.254" } | ForEach-Object {
    try {
        $san.AddIpAddress([System.Net.IPAddress]::Parse($_.IPAddress))
    } catch {}
}

$dn = New-Object System.Security.Cryptography.X509Certificates.X500DistinguishedName("CN=localhost")
$req = New-Object System.Security.Cryptography.X509Certificates.CertificateRequest(
    $dn,
    $rsa,
    [System.Security.Cryptography.HashAlgorithmName]::SHA256,
    [System.Security.Cryptography.RSASignaturePadding]::Pkcs1
)

# Enhanced Key Usage: Server Authentication
$eku = New-Object System.Security.Cryptography.OidCollection
$eku.Add((New-Object System.Security.Cryptography.Oid("1.3.6.1.5.5.7.3.1"))) # Server Auth
$req.CertificateExtensions.Add((New-Object System.Security.Cryptography.X509Certificates.X509EnhancedKeyUsageExtension($eku, $false)))

# Key Usage: Digital Signature, Key Encipherment
$keyUsage = [System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]::DigitalSignature -bor [System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]::KeyEncipherment
$req.CertificateExtensions.Add((New-Object System.Security.Cryptography.X509Certificates.X509KeyUsageExtension($keyUsage, $true)))

# Subject Alternative Names
$req.CertificateExtensions.Add($san.Build())

# Self-sign valid for 2 years (from yesterday to avoid clock skew issues)
$notBefore = [System.DateTimeOffset]::UtcNow.AddDays(-1)
$notAfter = [System.DateTimeOffset]::UtcNow.AddYears(2)
$cert = $req.CreateSelfSigned($notBefore, $notAfter)

# Export Certificate to PEM
$certBytes = $cert.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert)
$certB64 = [System.Convert]::ToBase64String($certBytes, [System.Base64FormattingOptions]::InsertLineBreaks)
$certPem = "-----BEGIN CERTIFICATE-----`r`n" + $certB64 + "`r`n-----END CERTIFICATE-----`r`n"
[System.IO.File]::WriteAllText($certPath, $certPem)

# Export Private Key to PKCS#8 PEM
$keyBytes = $rsa.Key.Export([System.Security.Cryptography.CngKeyBlobFormat]::Pkcs8PrivateBlob)
$keyB64 = [System.Convert]::ToBase64String($keyBytes, [System.Base64FormattingOptions]::InsertLineBreaks)
$keyPem = "-----BEGIN PRIVATE KEY-----`r`n" + $keyB64 + "`r`n-----END PRIVATE KEY-----`r`n"
[System.IO.File]::WriteAllText($keyPath, $keyPem)

Write-Output "Certificate successfully generated at: $certPath"
Write-Output "Private key successfully generated at: $keyPath"
