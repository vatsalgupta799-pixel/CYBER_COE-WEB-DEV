'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Shield,
  Search,
  Terminal,
  Activity,
  Zap,
  Globe,
  KeyRound,
  Wifi,
  Database,
  Radio,
  Share2,
  Lock,
  Eye,
  FileSearch,
  Cpu,
  Fingerprint,
  Scale,
  Sparkles,
  AlertTriangle,
  Copy,
  Check,
  Compass,
  Layers,
  ExternalLink
} from 'lucide-react';
import DataDustBackground from '../../../components/DataDustBackground';
import DynamicHeroBackground from '../../../components/DynamicHeroBackground';
import styles from './SecurityTools.module.css';

// Complete database of the Top 25 Kali Linux Tools from the Cyber CoE Reference Guide
const securityToolsData = [
  {
    id: 'nmap',
    number: '01',
    name: 'Nmap',
    category: 'Information Gathering',
    catKey: 'infogathering',
    tagline: "The first tool you run on any target — maps out what's alive and listening.",
    whatItDoes: "Nmap (Network Mapper) scans hosts and networks to discover which devices are online, which ports are open, what services are running on those ports, and often the operating system behind them. It's the tool almost every assessment starts with, because you can't test what you don't know exists.",
    whyItMatters: "Before you can attack or defend anything, you need a map. Nmap turns an unknown IP range into a list of live hosts, open doors, and the software behind each door — the foundation every later step builds on.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Just open a terminal and type nmap.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt update && sudo apt install nmap' },
      { platform: 'macOS', command: 'brew install nmap' },
      { platform: 'Windows', command: 'Download installer from nmap.org, or use WSL with Debian/Ubuntu.' }
    ],
    steps: [
      { title: 'Basic host scan', cmd: 'nmap 192.168.1.1', desc: 'Scans the most common 1,000 ports on a single target and reports which are open.' },
      { title: 'Scan a whole subnet', cmd: 'nmap 192.168.1.0/24', desc: 'Sweeps every address in that range to find live hosts.' },
      { title: 'Detect service versions + OS', cmd: 'nmap -sV -A 192.168.1.1', desc: 'Adds version detection (-sV) and aggressive scanning (-A) for OS guesses, traceroute, and script results.' },
      { title: 'Scan all 65535 ports', cmd: 'nmap -p- 192.168.1.1', desc: 'Slower but thorough — checks every possible port, not just the common ones.' }
    ],
    output: `$ nmap -sV -A 192.168.1.1
Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.1.1
Host is up (0.0021s latency).
PORT    STATE SERVICE VERSION
22/tcp  open  ssh     OpenSSH 8.9p1
80/tcp  open  http    Apache httpd 2.4.52
443/tcp open  https   Apache httpd 2.4.52
Nmap done: 1 IP address (1 host up) scanned in 6.42 seconds`,
    proTip: "Run a plain nmap <target> first before adding flags — get comfortable reading basic output before layering on -sV, -A, -p-, etc.",
    commonMistake: "Beginners often forget that a full port scan (-p-) can take several minutes per host. Start small, then go wider."
  },
  {
    id: 'wireshark',
    number: '02',
    name: 'Wireshark',
    category: 'Traffic Analysis',
    catKey: 'trafficanalysis',
    tagline: "Watch network traffic happen, packet by packet, in a friendly graphical window.",
    whatItDoes: "Wireshark captures and displays every packet moving across a network interface, letting you inspect protocols, follow conversations between two machines, and spot anything suspicious — plaintext passwords, odd DNS lookups, malformed packets, and more.",
    whyItMatters: "A huge amount of security work comes down to understanding what's actually happening on the wire. Wireshark makes an invisible process visible, which is exactly why it's used both offensively (spotting leaked data) and defensively (detecting attacks).",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Launch it by typing wireshark.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install wireshark' },
      { platform: 'macOS', command: 'brew install --cask wireshark' },
      { platform: 'Windows', command: 'Download installer from wireshark.org.' }
    ],
    steps: [
      { title: 'Open the app', cmd: 'wireshark', desc: "Launches the GUI. You'll see a list of available network interfaces (Wi-Fi, Ethernet, etc.)." },
      { title: 'Start capturing', cmd: 'Double-click your active interface', desc: 'Wireshark immediately starts listing every packet in real time.' },
      { title: 'Filter to just web traffic', cmd: 'http', desc: 'Type this into the filter bar at the top to hide everything except HTTP requests.' },
      { title: 'Follow one conversation', cmd: 'Right-click a packet → Follow → TCP Stream', desc: 'Reconstructs the full back-and-forth between two machines as readable text.' }
    ],
    output: `No.  Time   Source        Destination    Protocol  Info
142  3.281  192.168.1.20  93.184.216.34  HTTP      GET /index.html
143  3.298  93.184.216.34 192.168.1.20   HTTP      200 OK (text/html)
144  3.310  192.168.1.20  8.8.8.8        DNS       Standard query A example.com`,
    proTip: "Start by capturing your own browsing for 30 seconds, then filter by http — seeing your own traffic decoded is the best way to learn the interface.",
    commonMistake: "Capturing on a busy network without a filter floods you with thousands of packets in seconds. Set a filter first, or capture for a short, controlled window."
  },
  {
    id: 'metasploit',
    number: '03',
    name: 'Metasploit Framework',
    category: 'Exploitation',
    catKey: 'exploitation',
    tagline: "A library of known vulnerabilities plus the engine to actually test them.",
    whatItDoes: "Metasploit is a modular framework containing thousands of exploit modules for known vulnerabilities (CVEs), along with payloads, auxiliary scanners, and post-exploitation tools. It's how a tester moves from 'this system has a known flaw' to 'I can prove it's actually exploitable.'",
    whyItMatters: "Finding a vulnerability is only half the job — proving it's real (and showing the impact) is what makes a penetration test report meaningful. Metasploit is the standard way students and professionals practice that full chain safely, in a lab.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Start it with msfconsole.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install metasploit-framework' },
      { platform: 'macOS', command: 'brew install metasploit (or use Linux VM for smoother experience)' },
      { platform: 'Windows', command: 'Not natively supported — use WSL with Kali, or a Kali VM.' }
    ],
    steps: [
      { title: 'Launch the console', cmd: 'msfconsole', desc: "Opens Metasploit's interactive shell — this is where everything below happens." },
      { title: 'Search for a known exploit', cmd: 'search eternalblue', desc: 'Looks through Metasploit database for anything matching that keyword.' },
      { title: 'Select a module', cmd: 'use exploit/windows/smb/ms17_010_eternalblue', desc: 'Loads that specific exploit so you can configure target parameters.' },
      { title: 'Set the target and run', cmd: 'set RHOSTS 192.168.1.50\nrun', desc: 'Points the exploit at your lab target and launches it.' }
    ],
    output: `msf6 > search eternalblue
Matching Modules
================
# Name                                             Rank   Description
0 exploit/windows/smb/ms17_010_eternalblue        great  MS17-010 EternalBlue SMB RCE

msf6 > use 0
msf6 exploit(ms17_010_eternalblue) > set RHOSTS 192.168.1.50
RHOSTS => 192.168.1.50
msf6 exploit(ms17_010_eternalblue) > run`,
    proTip: "Practice exclusively against a Metasploitable VM or similar deliberately-vulnerable lab machine — it's built specifically for this and won't get you into trouble.",
    commonMistake: "Running exploit modules against anything outside your own lab, without written authorization, is illegal — regardless of intent."
  },
  {
    id: 'burpsuite',
    number: '04',
    name: 'Burp Suite',
    category: 'Web App Testing',
    catKey: 'webapp',
    tagline: "Sits between your browser and a website so you can see — and edit — every request.",
    whatItDoes: "Burp Suite is an intercepting proxy for testing web applications. It captures HTTP/S requests before they leave your browser, letting you inspect, modify, and resend them — which is how testers find broken authentication, injection points, and logic flaws in web apps.",
    whyItMatters: "Modern attacks and defenses live largely in the web layer. Burp is the industry-standard way to actually see what a web app is doing under the hood, rather than just what the front-end shows you.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed (Community Edition). Type burpsuite.' },
      { platform: 'Debian / Ubuntu', command: 'Download the .sh installer from portswigger.net and run it.' },
      { platform: 'macOS / Windows', command: 'Download the installer from portswigger.net.' }
    ],
    steps: [
      { title: 'Open Burp and start proxy', cmd: 'Proxy tab → Intercept is on', desc: 'Burp listens on 127.0.0.1:8080 by default.' },
      { title: 'Point your browser at the proxy', cmd: 'Set HTTP proxy to 127.0.0.1:8080', desc: "Or use Burp's built-in Chromium browser, which is pre-configured." },
      { title: 'Browse a test site', cmd: 'Visit any page on your lab target', desc: "The request pauses in Burp before it's sent — you can view or edit it." },
      { title: 'Send it to Repeater', cmd: 'Right-click → Send to Repeater', desc: 'Lets you resend the same request over and over with small tweaks, to test app behavior.' }
    ],
    output: `GET /login?user=admin&pass=test123 HTTP/1.1
Host: testsite.local
User-Agent: Mozilla/5.0
Cookie: session=8f3a91...

[ Forward ]  [ Drop ]  [ Send to Repeater ]`,
    proTip: "Use Burp's own built-in Chromium browser at first — it saves you the hassle of configuring proxy settings and certificates manually.",
    commonMistake: "Forgetting to install Burp's CA certificate in your browser means HTTPS sites will throw certificate errors non-stop."
  },
  {
    id: 'john',
    number: '05',
    name: 'John the Ripper',
    category: 'Password Attacks',
    catKey: 'passwords',
    tagline: "Feed it a password hash, and it tries to figure out the original password.",
    whatItDoes: "John the Ripper takes a captured password hash and attempts to recover the original plaintext password, either by trying every word in a wordlist or by brute-forcing character combinations. It supports a huge range of hash formats out of the box.",
    whyItMatters: "It's one thing to be told 'use strong passwords' — it's another to watch a weak one get cracked in seconds. John is often the tool that makes password security click for students.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run john.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install john' },
      { platform: 'macOS', command: 'brew install john' },
      { platform: 'Windows', command: 'Download Windows binaries from openwall.com/john.' }
    ],
    steps: [
      { title: 'Prepare a hash file', cmd: 'Save hash as hash.txt', desc: 'One hash per line, in a format John recognizes (MD5, SHA, NTLM, etc.).' },
      { title: 'Run a dictionary attack', cmd: 'john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt', desc: 'Tries every password in the rockyou.txt wordlist against the hash.' },
      { title: 'View recovered passwords', cmd: 'john --show hash.txt', desc: 'Displays any passwords John has successfully cracked so far.' }
    ],
    output: `$ john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
Loaded 1 password hash (Raw-MD5 [MD5 128/128 AVX 4x3])
Press 'q' or Ctrl-C to abort, almost any other key for status
password123      (user1)
1g 0:00:00:02 DONE (2026-09-09 10:14) 0.4237g/s 1024Kp/s`,
    proTip: "rockyou.txt (already on Kali under /usr/share/wordlists/) is a great first wordlist — it's a real leaked password list, so it teaches you exactly what people actually pick.",
    commonMistake: "rockyou.txt.gz needs to be unzipped first on some Kali installs: gunzip /usr/share/wordlists/rockyou.txt.gz"
  },
  {
    id: 'hydra',
    number: '06',
    name: 'Hydra',
    category: 'Password Attacks',
    catKey: 'passwords',
    tagline: "Automates trying many username/password combinations against a live login.",
    whatItDoes: "Hydra is a fast, parallelized login-cracking tool that supports dozens of protocols — SSH, FTP, HTTP forms, RDP, databases, and more. Instead of cracking an offline hash like John does, Hydra actively tries logins against a live service.",
    whyItMatters: "It demonstrates, very concretely, why account lockout policies and rate limiting exist — without them, a weak password on a live login can be broken in minutes.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run hydra.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install hydra' },
      { platform: 'macOS', command: 'brew install hydra' },
      { platform: 'Windows', command: 'Not natively supported — use WSL with Kali/Ubuntu.' }
    ],
    steps: [
      { title: 'Attack SSH with one username', cmd: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.10', desc: "Tries every password in the list against the 'admin' account over SSH." },
      { title: 'Attack an HTTP login form', cmd: 'hydra -l admin -P rockyou.txt 192.168.1.10 http-post-form "/login:user=^USER^&pass=^PASS^:F=incorrect"', desc: 'You tell Hydra the form field names and what failure text looks like.' }
    ],
    output: `$ hydra -l admin -P rockyou.txt ssh://192.168.1.10
Hydra v9.4 starting
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries
[22][ssh] host: 192.168.1.10   login: admin   password: letmein123
1 of 1 target successfully completed, 1 valid password found`,
    proTip: "Always add a small delay between attempts (-t 4 limits concurrent tasks) on real lab targets — full-speed brute forcing can crash a fragile lab VM.",
    commonMistake: "Pointing Hydra at any live login you don't own or have permission to test is illegal, even in a 'just curious' context."
  },
  {
    id: 'aircrack',
    number: '07',
    name: 'Aircrack-ng',
    category: 'Wireless',
    catKey: 'wireless',
    tagline: "Tests whether a Wi-Fi network's password can be cracked.",
    whatItDoes: "Aircrack-ng is a suite of tools for auditing wireless networks — capturing the 4-way handshake when a device connects to Wi-Fi, then attempting to crack the WPA/WPA2 password from that captured handshake using a wordlist.",
    whyItMatters: "Wi-Fi security is something every student interacts with daily, which makes this a very tangible way to understand why long, unique Wi-Fi passwords actually matter.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run airmon-ng, airodump-ng, aircrack-ng.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install aircrack-ng' },
      { platform: 'macOS', command: 'brew install aircrack-ng (limited driver support)' },
      { platform: 'Windows', command: 'Not supported — use Kali VM/live USB with compatible external Wi-Fi adapter.' }
    ],
    steps: [
      { title: 'Put your adapter into monitor mode', cmd: 'airmon-ng start wlan0', desc: 'This lets the adapter see all nearby Wi-Fi traffic, not just traffic addressed to you.' },
      { title: 'Watch nearby networks', cmd: 'airodump-ng wlan0mon', desc: 'Lists nearby access points and connected devices.' },
      { title: 'Capture a handshake', cmd: 'airodump-ng -c <channel> --bssid <AP-MAC> -w capture wlan0mon', desc: 'Saves traffic for a specific network to a file while waiting for a handshake.' },
      { title: 'Crack the captured handshake', cmd: 'aircrack-ng -w wordlist.txt capture.cap', desc: 'Tries every password in the wordlist against the captured handshake.' }
    ],
    output: `$ aircrack-ng -w wordlist.txt capture.cap
Reading packets, please wait...
Opening capture.cap
KEY FOUND! [ mynetworkpass1 ]
Master Key : CD 69 0D 96 ...`,
    proTip: "Check whether your Wi-Fi adapter supports monitor mode before you start (search exact model + 'monitor mode kali') — this trips up more beginners than anything else.",
    commonMistake: "Only test networks you own — capturing handshakes from your neighbor's Wi-Fi without permission is illegal, even if you never crack the password."
  },
  {
    id: 'sqlmap',
    number: '08',
    name: 'SQLmap',
    category: 'Web App Testing',
    catKey: 'webapp',
    tagline: "Automatically finds and exploits SQL injection vulnerabilities.",
    whatItDoes: "SQLmap detects whether a web application's input (like a search box or URL parameter) is vulnerable to SQL injection, and if so, can automatically enumerate databases, tables, and even extract data — all from one command.",
    whyItMatters: "SQL injection has been on the OWASP Top 10 for over a decade. Seeing SQLmap pull a full list of database names out of a vulnerable parameter is one of the clearest 'why input validation matters' demonstrations in security.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run sqlmap.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install sqlmap' },
      { platform: 'macOS', command: 'brew install sqlmap' },
      { platform: 'Windows', command: 'Requires Python — download from sqlmap.org and run python sqlmap.py' }
    ],
    steps: [
      { title: 'Test a URL parameter', cmd: 'sqlmap -u "http://target.local/page?id=1"', desc: 'Checks whether the id parameter is injectable.' },
      { title: 'List available databases', cmd: 'sqlmap -u "http://target.local/page?id=1" --dbs', desc: 'If vulnerable, enumerates every database the app can see.' },
      { title: 'Dump a specific table', cmd: 'sqlmap -u "http://target.local/page?id=1" -D shopdb -T users --dump', desc: 'Extracts the actual contents of the users table.' }
    ],
    output: `$ sqlmap -u "http://target.local/page?id=1" --dbs
[INFO] testing connection to the target URL
[INFO] the back-end DBMS is MySQL
available databases [3]:
[*] information_schema
[*] shopdb
[*] mysql`,
    proTip: "DVWA (Damn Vulnerable Web App) has a dedicated SQL injection module built for exactly this kind of practice — install it in a local VM before trying SQLmap live.",
    commonMistake: "SQLmap can be surprisingly aggressive by default — on a fragile lab app, use --level=1 --risk=1 first to keep requests gentle."
  },
  {
    id: 'nikto',
    number: '09',
    name: 'Nikto',
    category: 'Web App Testing',
    catKey: 'webapp',
    tagline: "A fast first pass that flags outdated software and risky files on a web server.",
    whatItDoes: "Nikto scans a web server against a large database of known issues — outdated software versions, default files that shouldn't be public, dangerous configurations — and prints a report in seconds to minutes.",
    whyItMatters: "It's the 'quick health check' step before deeper manual testing, and a great way to understand just how much low-hanging fruit a misconfigured server can expose.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run nikto.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install nikto' },
      { platform: 'macOS', command: 'brew install nikto' },
      { platform: 'Windows', command: 'Requires Perl — clone from GitHub (sullo/nikto) and run with perl nikto.pl' }
    ],
    steps: [
      { title: 'Scan a target', cmd: 'nikto -h http://target.local', desc: 'Runs the full battery of checks against that host.' },
      { title: 'Scan over HTTPS with a specific port', cmd: 'nikto -h https://target.local -p 443', desc: 'Points Nikto at a secure site on a custom port.' },
      { title: 'Save the output to a file', cmd: 'nikto -h http://target.local -o report.html -Format html', desc: 'Generates a shareable HTML report — handy for write-ups.' }
    ],
    output: `$ nikto -h http://target.local
- Nikto v2.5.0
+ Target IP: 192.168.1.10
+ Server: Apache/2.4.41
+ /admin/: Directory indexing found.
+ /phpinfo.php: Output from the phpinfo() function was found.
+ 7 host(s) tested`,
    proTip: "Run Nikto before Gobuster or manual browsing — its findings often point you exactly where to dig deeper.",
    commonMistake: "Nikto is noisy and unencrypted by default, which makes it easy for defenders to spot in logs — good to know if your lab includes detection monitoring."
  },
  {
    id: 'gobuster',
    number: '10',
    name: 'Gobuster',
    category: 'Information Gathering',
    catKey: 'infogathering',
    tagline: "Rapidly guesses hidden folder and file names on a web server.",
    whatItDoes: "Gobuster brute-forces URLs by trying thousands of common file and directory names against a target website, revealing pages that aren't linked anywhere but are still publicly accessible — admin panels, backup files, forgotten test pages.",
    whyItMatters: "A huge number of real breaches start with someone simply finding a page they weren't supposed to find. Gobuster shows how easy that is to automate.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run gobuster.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install gobuster' },
      { platform: 'macOS', command: 'brew install gobuster' },
      { platform: 'Windows', command: 'Download Go binary from GitHub releases page (OJ/gobuster).' }
    ],
    steps: [
      { title: 'Brute-force directories', cmd: 'gobuster dir -u http://target.local -w /usr/share/wordlists/dirb/common.txt', desc: 'Tries every name in wordlist as a URL path and reports existing codes.' },
      { title: 'Brute-force subdomains', cmd: 'gobuster dns -d target.local -w subdomains.txt', desc: 'Applies directory brute-forcing logic to DNS subdomains instead of paths.' },
      { title: 'Filter by file extension', cmd: 'gobuster dir -u http://target.local -w common.txt -x php,txt,bak', desc: 'Checks for those exact files with specified extensions.' }
    ],
    output: `$ gobuster dir -u http://target.local -w common.txt
===============================================================
/admin       (Status: 301)
/backup      (Status: 200)
/login.php   (Status: 200)
/uploads     (Status: 301)
Progress: 4614 / 4615 (99.98%)`,
    proTip: "Start with the common.txt wordlist before moving to bigger ones like directory-list-2.3-medium.txt — it's much faster and catches most obvious findings.",
    commonMistake: "Very large wordlists against a slow lab server can take a long time and generate a huge amount of traffic — start small."
  },
  {
    id: 'netcat',
    number: '11',
    name: 'Netcat',
    category: 'Networking',
    catKey: 'networking',
    tagline: "The 'Swiss Army knife' for sending and receiving data over a network.",
    whatItDoes: "Netcat is a simple, flexible tool for reading and writing raw data across TCP/UDP connections. It's used for everything from quick connectivity tests, to banner grabbing, to setting up basic reverse shells during authorized penetration tests.",
    whyItMatters: "Learning Netcat demystifies networking — you see, directly, what it means for two machines to open a connection and pass data back and forth, without higher-level abstractions.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run nc.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install netcat-traditional' },
      { platform: 'macOS', command: 'Pre-installed as nc.' },
      { platform: 'Windows', command: 'Download ncat (bundled with Nmap) or use WSL.' }
    ],
    steps: [
      { title: 'Start a listener', cmd: 'nc -lvnp 4444', desc: 'Opens port 4444 and waits for incoming connection (-l listen, -v verbose, -n no DNS, -p port).' },
      { title: 'Connect from another machine', cmd: 'nc <listener-ip> 4444', desc: 'Anything typed in either window now appears in the other.' },
      { title: 'Grab a service banner', cmd: 'nc target.local 80\nGET / HTTP/1.1', desc: 'A raw way to see exactly what a web server sends back with no browser in the way.' }
    ],
    output: `Terminal 1: $ nc -lvnp 4444
listening on [any] 4444 ...
connect to [192.168.1.5] from target.local [192.168.1.10] 51322

Terminal 2: $ nc 192.168.1.5 4444
hello from the other terminal!`,
    proTip: "Run the listener and connector in two terminal windows side by side — watching text appear live in the other window is the 'click' moment for most students.",
    commonMistake: "On some systems 'nc' is a symlink to 'ncat' or 'netcat-openbsd' with slightly different flags — if a flag doesn't work, check nc -h."
  },
  {
    id: 'maltego',
    number: '12',
    name: 'Maltego',
    category: 'OSINT',
    catKey: 'osint',
    tagline: "Draws an interactive graph connecting domains, emails, and people.",
    whatItDoes: "Maltego is a graphical OSINT tool. Instead of command-line output, it builds a visual graph — you start with one piece of information (a domain, email, or name) and run 'transforms' that pull in related public data, expanding the graph.",
    whyItMatters: "Not every investigation is best done with text output. Maltego is ideal for students who think visually, mirroring how real threat-intel and OSINT investigators map relationships.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Launch from application menu or type maltego.' },
      { platform: 'Debian / Ubuntu / macOS / Windows', command: 'Download Community Edition installer from maltego.com and register free account.' }
    ],
    steps: [
      { title: 'Create a new graph', cmd: 'File → New Graph', desc: 'Opens a blank canvas.' },
      { title: 'Add a starting entity', cmd: "Drag a 'Domain' entity onto canvas", desc: "Type in a domain name you're investigating." },
      { title: 'Run a transform', cmd: 'Right-click the entity → Run Transform', desc: 'Pulls related data (subdomains, IPs, emails) and adds them as new connected nodes.' },
      { title: 'Explore the graph', cmd: 'Click through the new nodes', desc: 'Keep expanding outward to map the full infrastructure picture.' }
    ],
    output: `[ Domain: target.com ]
  |-- Transform: To DNS Name -> Subdomains
  |     |-- mail.target.com
  |     |-- dev.target.com
  |-- Transform: To Email addresses
        |-- admin@target.com`,
    proTip: "Start with the free Community Edition and a public domain you're curious about — just exploring the interface teaches a lot before running a real investigation.",
    commonMistake: "The Community Edition limits how many results each transform returns — don't be surprised if a graph looks smaller than expected."
  },
  {
    id: 'theharvester',
    number: '13',
    name: 'theHarvester',
    category: 'OSINT',
    catKey: 'osint',
    tagline: "Automatically gathers public emails, subdomains, and names for a target.",
    whatItDoes: "theHarvester pulls information about a domain or company from public sources — search engines, certificate transparency logs, PGP key servers — and compiles it into a quick list of emails, subdomains, and employee names.",
    whyItMatters: "It's usually the very first command run in real-world reconnaissance because it's fast, passive (doesn't touch the target directly), and reveals exposed public footprints.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run theHarvester.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install theharvester' },
      { platform: 'macOS / Windows', command: 'pip install theHarvester (requires Python 3) or clone GitHub repo.' }
    ],
    steps: [
      { title: 'Search by domain', cmd: 'theHarvester -d target.com -b google', desc: 'Searches Google for anything publicly linked to that domain.' },
      { title: 'Use multiple sources', cmd: 'theHarvester -d target.com -b google,bing,crtsh', desc: 'Combines results from several sources at once for wider coverage.' },
      { title: 'Save results to a file', cmd: 'theHarvester -d target.com -b all -f report', desc: 'Exports findings to report.html and report.xml.' }
    ],
    output: `$ theHarvester -d target.com -b google
[*] Target: target.com
[*] Emails found: 4
info@target.com
support@target.com
[*] Hosts found: 6
mail.target.com:203.0.113.5`,
    proTip: "Pick a company you're curious about (for practice reading OSINT output) and see how much theHarvester turns up in seconds.",
    commonMistake: "Some sources (like certain search engines) rate-limit or require API keys for heavy use — don't panic if one source returns nothing."
  },
  {
    id: 'hashcat',
    number: '14',
    name: 'Hashcat',
    category: 'Password Attacks',
    catKey: 'passwords',
    tagline: "GPU-accelerated password cracking — the fast version of John the Ripper.",
    whatItDoes: "Hashcat works like John the Ripper (trying wordlists or brute-force combinations against a hash) but is built to use your graphics card's processing power, making it dramatically faster for large hash sets or complex attacks.",
    whyItMatters: "Once students understand password cracking conceptually, Hashcat shows the real-world speed difference GPUs make — a good bridge into understanding why some hash algorithms (like bcrypt) are deliberately slow.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run hashcat.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install hashcat' },
      { platform: 'macOS', command: 'brew install hashcat (GPU acceleration is limited on Mac).' },
      { platform: 'Windows', command: 'Download binary from hashcat.net.' }
    ],
    steps: [
      { title: 'Identify the hash mode', cmd: 'hashcat --help | grep -i md5', desc: 'Hashcat needs to know the hash type (-m flag) — e.g. 0 for raw MD5, 1000 for NTLM.' },
      { title: 'Run a dictionary attack', cmd: 'hashcat -m 0 -a 0 hash.txt rockyou.txt', desc: "-a 0 means 'dictionary attack', -m 0 means 'MD5 hash'." },
      { title: 'Check cracked results', cmd: 'hashcat -m 0 hash.txt --show', desc: 'Displays any passwords already recovered.' }
    ],
    output: `$ hashcat -m 0 -a 0 hash.txt rockyou.txt
hashcat (v6.2.6) starting
5f4dcc3b5aa765d61d8327deb882cf99:password
Session..........: hashcat
Status...........: Cracked
Speed.#1.........: 1245.3 MH/s`,
    proTip: "If you don't have a dedicated GPU, that's fine — Hashcat still runs on CPU, just slower. It's great for learning syntax and hash-mode concepts.",
    commonMistake: "Picking the wrong -m hash mode is the most common beginner error — Hashcat will run but never crack anything if mode doesn't match hash format."
  },
  {
    id: 'ettercap',
    number: '15',
    name: 'Ettercap',
    category: 'Sniffing & Spoofing',
    catKey: 'sniffing',
    tagline: "Demonstrates man-in-the-middle attacks by sitting between two devices.",
    whatItDoes: "Ettercap can position itself between a target device and its router (via ARP spoofing) so that traffic passes through your machine before reaching its destination — letting you observe or modify it. It's a powerful lesson in why HTTPS encryption matters.",
    whyItMatters: "Nothing makes 'always check for HTTPS' click faster than watching plaintext HTTP traffic appear on your own screen during an authorized lab exercise.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run ettercap -G for graphical version.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install ettercap-graphical' },
      { platform: 'macOS', command: 'brew install ettercap (command-line only)' },
      { platform: 'Windows', command: 'Not well supported — use Kali VM.' }
    ],
    steps: [
      { title: 'Launch graphical version', cmd: 'sudo ettercap -G', desc: "Opens Ettercap's GUI for easier target selection." },
      { title: 'Or run from command line', cmd: 'ettercap -T -M arp:remote /192.168.1.1// /192.168.1.10//', desc: 'Starts ARP-spoofing MiTM attack between router (.1) and target (.10).' },
      { title: 'Watch intercepted traffic', cmd: 'Traffic now routes through your machine', desc: "Pair it with Wireshark on same interface to inspect captured packets." }
    ],
    output: `$ ettercap -T -M arp:remote /192.168.1.1// /192.168.1.10//
ettercap 0.8.3.1 copyright 2001-2023
Listening on: eth0
ARP poisoning victims:
GROUP 1: 192.168.1.1
GROUP 2: 192.168.1.10
Starting Unified sniffing...`,
    proTip: "This is a great 'save it for later' tool — get comfortable with basic networking (IP addresses, ARP, routers) before attempting this in an isolated lab.",
    commonMistake: "ARP spoofing on a shared network (like a school or office Wi-Fi) can disrupt other connections and is illegal without authorization."
  },
  {
    id: 'owaspzap',
    number: '16',
    name: 'OWASP ZAP',
    category: 'Web App Testing',
    catKey: 'webapp',
    tagline: "A free, beginner-friendly alternative to Burp Suite.",
    whatItDoes: "OWASP ZAP (Zed Attack Proxy) is an open-source web application scanner and intercepting proxy, similar to Burp Suite, but with a more guided, wizard-style interface — a comfortable place to start before moving to more advanced tools.",
    whyItMatters: "ZAP's 'Quick Start' automated scan can produce a real, useful vulnerability report from just a URL, which makes it one of the fastest ways for a first-time student to see concrete results.",
    install: [
      { platform: 'Kali Linux / Debian / Ubuntu', command: 'sudo apt install zaproxy' },
      { platform: 'macOS', command: 'brew install --cask owasp-zap' },
      { platform: 'Windows', command: 'Download installer from zaproxy.org.' }
    ],
    steps: [
      { title: 'Open ZAP', cmd: 'zaproxy', desc: 'Launches desktop GUI application.' },
      { title: 'Run an automated scan', cmd: 'Quick Start tab → paste a URL → Attack', desc: 'ZAP crawls the site and actively tests it, all in one click.' },
      { title: 'Review the alerts', cmd: 'Alerts tab', desc: 'Lists findings by severity (High/Medium/Low/Info), each with explanation.' }
    ],
    output: `[ Quick Start ]
URL to attack: http://target.local
[ Attack ]
Spidering... 100%
Active Scan... 100%
Alerts: 2 High, 5 Medium, 11 Low`,
    proTip: "This is genuinely one of the friendliest tools on this list for a first web-security win — try it before Burp if proxy setup feels overwhelming.",
    commonMistake: "Only run Active Scan against your own lab apps — it sends real attack payloads, which can break fragile or production applications."
  },
  {
    id: 'reconng',
    number: '17',
    name: 'Recon-ng',
    category: 'OSINT',
    catKey: 'osint',
    tagline: "A Metasploit-style framework, but for automating information gathering.",
    whatItDoes: "Recon-ng is a modular reconnaissance framework with a menu-driven interface that will feel familiar if you've used Metasploit. Instead of exploits, its modules pull OSINT data — hosts, contacts, leaked credentials, and more — from various sources.",
    whyItMatters: "It's a natural 'next tool' once you've learned one Metasploit-style interface, and shows how recon work can be automated and organized into repeatable workspaces.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run recon-ng.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install recon-ng' },
      { platform: 'macOS / Windows', command: 'Clone from GitHub (lanmaster53/recon-ng) and install Python requirements.' }
    ],
    steps: [
      { title: 'Launch the framework', cmd: 'recon-ng', desc: 'Opens interactive console shell.' },
      { title: 'Install modules', cmd: 'marketplace install all', desc: 'Downloads all available community recon modules.' },
      { title: 'Create a workspace', cmd: 'workspaces create demo', desc: "Keeps this investigation's data cleanly separated." },
      { title: 'Load and run a module', cmd: 'modules load recon/domains-hosts/hackertarget\nrun', desc: 'Pulls host data for whatever domain you set as target.' }
    ],
    output: `[recon-ng][demo] > modules load recon/domains-hosts/hackertarget
[recon-ng][demo][hackertarget] > run
[*] Country: -
[*] Host: mail.target.com
[*] Host: dev.target.com
[*] 2 hosts found`,
    proTip: "Run 'help' at any prompt — Recon-ng's menu system is very self-documenting once you know that command exists.",
    commonMistake: "marketplace install all can take a while and some modules need free API keys to work fully — don't worry if a few return nothing without keys."
  },
  {
    id: 'set',
    number: '18',
    name: 'Social Engineering Toolkit (SET)',
    category: 'Social Engineering',
    catKey: 'socialeng',
    tagline: "Simulates phishing and other human-focused attacks for awareness training.",
    whatItDoes: "SET is a menu-driven framework for simulating social engineering attacks — cloned login pages, phishing email templates, and more — designed for authorized security-awareness testing and training exercises.",
    whyItMatters: "Security isn't only technical. SET is a reminder that the easiest way into a system is often a convincing email, not a clever exploit — and that awareness training is a real, valuable part of the field.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run setoolkit.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install set' },
      { platform: 'macOS / Windows', command: 'Not officially supported — use a Kali VM.' }
    ],
    steps: [
      { title: 'Launch the toolkit', cmd: 'setoolkit', desc: 'Opens numbered menu system — no commands to memorize.' },
      { title: 'Choose attack category', cmd: '1) Social-Engineering Attacks', desc: 'Follow the numbered prompts from here.' },
      { title: 'Pick a specific vector', cmd: '2) Website Attack Vectors → 3) Credential Harvester', desc: 'Walks you through cloning a login page for a training exercise.' }
    ],
    output: `Select from the menu:
1) Social-Engineering Attacks
2) Penetration Testing (Fast-Track)
3) Third Party Modules
99) Exit the Social-Engineer Toolkit
set> 1`,
    proTip: "Because it's entirely menu-driven, SET is a good tool to just explore the options in — you'll learn what's possible just by reading menu text.",
    commonMistake: "Only ever use SET's credential harvester or phishing templates in an authorized, consenting training context — targeting real people without consent is illegal."
  },
  {
    id: 'autopsy',
    number: '19',
    name: 'Autopsy',
    category: 'Digital Forensics',
    catKey: 'forensics',
    tagline: "Point-and-click digital forensics for examining disk images.",
    whatItDoes: "Autopsy is a graphical forensics platform built on The Sleuth Kit. You load a disk image (a full copy of a hard drive or storage device) as a case, and Autopsy lets you browse the file system, recover deleted files, and search for evidence — much like a specialized file explorer.",
    whyItMatters: "Forensics is a huge and often-overlooked branch of cybersecurity. Autopsy is the friendliest way to get a first taste of how investigators actually work with evidence after an incident.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run autopsy, then open URL it prints in a browser.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install autopsy' },
      { platform: 'macOS / Windows', command: 'Download installer from sleuthkit.org/autopsy.' }
    ],
    steps: [
      { title: 'Start Autopsy', cmd: 'autopsy', desc: 'Starts local web server and prints a URL (e.g. http://localhost:9999/autopsy).' },
      { title: 'Create a new case', cmd: 'New Case → name it → add investigator details', desc: 'Sets up workspace for investigation.' },
      { title: 'Add a data source', cmd: 'Add Data Source → select a disk image file', desc: 'Loads a sample forensic disk image (.dd, .raw, .e01).' },
      { title: 'Browse the evidence', cmd: 'Explore Data Sources and Results trees', desc: 'View files, deleted items, web history, and metadata.' }
    ],
    output: `$ autopsy
Autopsy Forensic Browser
Version 4.21.0
Open an Internet browser on the forensic workstation
and paste this URL in it: http://localhost:9999/autopsy`,
    proTip: "Look for free, legal 'practice' forensic disk images (widely used in digital forensics CTFs) rather than trying to create your own image.",
    commonMistake: "Loading and analyzing a very large disk image can take a while and use significant disk space — start with a small sample image."
  },
  {
    id: 'bettercap',
    number: '20',
    name: 'Bettercap',
    category: 'Sniffing & Spoofing',
    catKey: 'sniffing',
    tagline: "A modern, all-in-one toolkit combining Ettercap and Aircrack-ng style capabilities.",
    whatItDoes: "Bettercap is a fast, actively-maintained framework for network attacks and reconnaissance — ARP spoofing, Wi-Fi and Bluetooth scanning, credential sniffing, and more, all through one interactive console.",
    whyItMatters: "It's a good 'graduation' tool once you understand the concepts behind Ettercap and Aircrack-ng individually — Bettercap brings functionality together in a faster, more modern package.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run sudo bettercap -iface eth0.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install bettercap' },
      { platform: 'macOS', command: 'brew install bettercap' },
      { platform: 'Windows', command: 'Not supported natively — use WSL or Kali VM.' }
    ],
    steps: [
      { title: 'Launch on your interface', cmd: 'sudo bettercap -iface eth0', desc: 'Opens interactive console scoped to network interface.' },
      { title: 'List nearby hosts', cmd: 'net.probe on\nnet.show', desc: 'Actively discovers connected devices on local subnet.' },
      { title: 'Run a module', cmd: 'net.sniff on', desc: 'Starts passively sniffing network traffic.' }
    ],
    output: `$ sudo bettercap -iface eth0
bttlkt» net.probe on
bttlkt» net.show
192.168.1.10   aa:bb:cc:11:22:33   desktop-pc
192.168.1.15   aa:bb:cc:44:55:66   iphone`,
    proTip: 'Bettercap\'s built-in web UI (bettercap -iface eth0 -eval "ui.update; http.server") gives you a browser-based dashboard if console feels overwhelming.',
    commonMistake: "Like Ettercap, this must only run on networks you own or are explicitly authorized to test — active network manipulation without consent is illegal."
  },
  {
    id: 'wpscan',
    number: '21',
    name: 'WPScan',
    category: 'Web App Testing',
    catKey: 'webapp',
    tagline: "Checks a WordPress site for outdated plugins, themes, and weak passwords.",
    whatItDoes: "WPScan is a black-box scanner built specifically for WordPress — the platform behind a large share of websites worldwide. It checks the installed WordPress version, plugins, and themes against a database of known vulnerabilities, and can test for weak user passwords.",
    whyItMatters: "Because WordPress powers so much of the web, this tool teaches a very practical, real-world skill — most students will encounter a WordPress site to (legally) test at some point.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run wpscan.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install wpscan' },
      { platform: 'macOS', command: 'brew install wpscan' },
      { platform: 'Windows', command: 'Requires Ruby — install via gem install wpscan, or use WSL.' }
    ],
    steps: [
      { title: 'Basic scan', cmd: 'wpscan --url http://target.local', desc: 'Identifies WordPress version and does light vulnerability check.' },
      { title: 'Enumerate vulnerable plugins', cmd: 'wpscan --url http://target.local --enumerate vp', desc: 'Lists installed plugins and flags any with known vulnerabilities.' },
      { title: 'Test for weak passwords', cmd: 'wpscan --url http://target.local --usernames admin --passwords rockyou.txt', desc: 'Attempts login brute-force against known username.' }
    ],
    output: `$ wpscan --url http://target.local --enumerate vp
[+] WordPress version 6.2 identified
[+] WordPress theme in use: twentytwentythree
[i] Plugin(s) Identified:
[+] contact-form-7
 | [!] The version is outdated, the latest version is 5.8`,
    proTip: "A free WPScan API token (from wpscan.com) unlocks the full vulnerability database — worth signing up for before running serious scans.",
    commonMistake: "Without an API token, WPScan still runs but with a limited, outdated vulnerability database — findings may be incomplete."
  },
  {
    id: 'fierce',
    number: '22',
    name: 'Fierce',
    category: 'Information Gathering',
    catKey: 'infogathering',
    tagline: "A lightweight tool focused purely on DNS reconnaissance.",
    whatItDoes: "Fierce maps out a domain's DNS records and nearby IP ranges — finding subdomains and related infrastructure that might not be obvious from the main website alone.",
    whyItMatters: "It's simple and fast, making it a great 'second tool to learn' right after Nmap, and it reinforces how much structure and information DNS records reveal about an organization.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run fierce.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install fierce' },
      { platform: 'macOS', command: 'gem install fierce, or use Kali VM.' },
      { platform: 'Windows', command: 'Use WSL with Debian/Ubuntu command.' }
    ],
    steps: [
      { title: 'Run a basic scan', cmd: 'fierce --domain target.com', desc: 'Attempts a zone transfer, then brute-forces common subdomain names if that fails.' },
      { title: 'Limit to a wordlist', cmd: 'fierce --domain target.com --subdomain-file subdomains.txt', desc: 'Uses your own custom list of subdomain names instead of default.' }
    ],
    output: `$ fierce --domain target.com
NS: ns1.target.com, ns2.target.com
SOA: ns1.target.com
Zone: failure
Wildcard: not detected
Found: mail.target.com (203.0.113.5)
Found: dev.target.com (203.0.113.9)`,
    proTip: "Try Fierce right after Nmap on the same lab target — comparing what each tool reveals is a great way to understand what information gathering covers.",
    commonMistake: "A misconfigured DNS zone transfer (Fierce's first attempt) is rare on well-configured servers — don't be surprised if it falls back to brute-forcing."
  },
  {
    id: 'responder',
    number: '23',
    name: 'Responder',
    category: 'Post-Exploitation',
    catKey: 'postexploit',
    tagline: "Shows how credential theft works on Windows networks via name resolution.",
    whatItDoes: "Responder listens for certain broadcast-based name resolution requests (LLMNR, NBT-NS, mDNS) that Windows machines send out, and answers them itself — tricking devices into sending their login credentials (as hashes) to the attacker's machine.",
    whyItMatters: "It's a very concrete demonstration of a real, still-common attack technique on internal Windows networks, and a good motivator for learning why these legacy protocols are often disabled by defenders.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed. Run sudo responder -I eth0.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install responder, or clone from GitHub (lgandx/Responder).' },
      { platform: 'macOS / Windows', command: 'Not natively supported for core functions — use a Kali VM.' }
    ],
    steps: [
      { title: 'Start listening', cmd: 'sudo responder -I eth0', desc: 'Begins answering LLMNR/NBT-NS broadcast requests on that interface.' },
      { title: 'Trigger a lookup (in your lab)', cmd: 'From a Windows lab VM, mistype a network share name', desc: 'Simulates the everyday typo that triggers this broadcast behavior.' },
      { title: 'Review captured hashes', cmd: 'Check log output or Responder log files', desc: 'Shows NTLM hashes captured, ready for offline cracking with Hashcat.' }
    ],
    output: `$ sudo responder -I eth0
[+] Listening for events...
[LLMNR] Poisoned answer sent to 192.168.1.20 for name FILESRVER
[HTTP] NTLMv2-SSP Hash captured:
user::WORKGROUP:...:...:...`,
    proTip: "This is an intermediate/advanced tool — get comfortable with basic Windows networking concepts (SMB, name resolution) before this one clicks fully.",
    commonMistake: "This only works within a network you control end-to-end (broadcasting on same subnet segment) — it won't do anything over open internet."
  },
  {
    id: 'volatility',
    number: '24',
    name: 'Volatility',
    category: 'Digital Forensics',
    catKey: 'forensics',
    tagline: "Investigates a memory (RAM) snapshot to find hidden processes and malware.",
    whatItDoes: "Volatility analyzes a memory dump — a full copy of a computer's RAM at the moment it was captured — to reconstruct what was running: processes, network connections, injected code, even passwords still sitting in memory. It's a cornerstone tool in real incident response.",
    whyItMatters: "Malware and attackers often try hard to avoid leaving traces on disk, but RAM tells a different story. Volatility shows students the 'memory forensics' side of the field, distinct from disk-based tools like Autopsy.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed (Volatility 3). Run vol.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install volatility3' },
      { platform: 'macOS / Windows', command: 'pip install volatility3 (requires Python 3).' }
    ],
    steps: [
      { title: 'Identify the OS profile', cmd: 'vol -f memory.dump windows.info', desc: 'Confirms details about the captured system before deeper analysis.' },
      { title: 'List running processes', cmd: 'vol -f memory.dump windows.pslist', desc: 'Shows every process that was active when memory was captured.' },
      { title: 'Look for network connections', cmd: 'vol -f memory.dump windows.netscan', desc: 'Reveals connections that existed at capture time — useful for spotting malware phoning home.' }
    ],
    output: `$ vol -f memory.dump windows.pslist
PID   PPID  ImageFileName   Offset(V)
620   512   explorer.exe    0xffffb00123456
2104  620   suspicious.exe  0xffffb00789abc
2108  2104  cmd.exe         0xffffb00abcdef`,
    proTip: "Free, legal sample memory dumps built specifically for forensics training exist widely online (e.g. Memory CTFs) — grab one rather than capturing your own at first.",
    commonMistake: "Memory dump files are often several gigabytes — make sure you have disk space and patience before starting your analysis."
  },
  {
    id: 'tshark',
    number: '25',
    name: 'Tshark',
    category: 'Traffic Analysis',
    catKey: 'trafficanalysis',
    tagline: "Wireshark's full power, from the command line.",
    whatItDoes: "Tshark is Wireshark's command-line counterpart — same packet-capturing engine and filtering language, but scriptable and usable over SSH or in automated workflows where a graphical window isn't practical.",
    whyItMatters: "Once the Wireshark GUI feels comfortable, Tshark is the natural next step toward automating traffic analysis — a skill that matters a lot in real security operations and scripting.",
    install: [
      { platform: 'Kali Linux', command: 'Already installed (bundled with Wireshark). Run tshark.' },
      { platform: 'Debian / Ubuntu', command: 'sudo apt install tshark' },
      { platform: 'macOS', command: 'brew install wireshark (includes tshark).' },
      { platform: 'Windows', command: 'Included with Wireshark installer from wireshark.org.' }
    ],
    steps: [
      { title: 'Capture on an interface', cmd: 'tshark -i eth0', desc: "Starts printing packets to terminal live, just like Wireshark's packet list." },
      { title: 'Apply a filter', cmd: 'tshark -i eth0 -f "port 80"', desc: 'Only captures traffic on port 80 (standard web traffic).' },
      { title: 'Save to a file for later analysis', cmd: 'tshark -i eth0 -w capture.pcap', desc: "Writes raw capture data to a file you can open later in Wireshark's GUI." }
    ],
    output: `$ tshark -i eth0 -f "port 80"
Capturing on 'eth0'
1   0.000  192.168.1.20 -> 93.184.216.34  HTTP  GET /index.html
2   0.018  93.184.216.34 -> 192.168.1.20  HTTP  200 OK`,
    proTip: "Capture with Tshark, then open the same .pcap file in Wireshark's GUI — a good way to connect command-line and graphical workflows.",
    commonMistake: "Tshark needs the same capture permissions as Wireshark — on Linux you may need sudo or to be in the 'wireshark' group."
  }
];

const categoryFilters = [
  { key: 'all', label: 'All Tools (25)' },
  { key: 'infogathering', label: 'Information Gathering' },
  { key: 'trafficanalysis', label: 'Traffic Analysis' },
  { key: 'exploitation', label: 'Exploitation' },
  { key: 'webapp', label: 'Web App Testing' },
  { key: 'passwords', label: 'Password Attacks' },
  { key: 'wireless', label: 'Wireless' },
  { key: 'networking', label: 'Networking' },
  { key: 'osint', label: 'OSINT' },
  { key: 'sniffing', label: 'Sniffing & Spoofing' },
  { key: 'socialeng', label: 'Social Engineering' },
  { key: 'forensics', label: 'Digital Forensics' },
  { key: 'postexploit', label: 'Post-Exploitation' }
];

export default function SecurityToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCmd, setCopiedCmd] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const filteredTools = useMemo(() => {
    return securityToolsData.filter((tool) => {
      const matchesCat = selectedCategory === 'all' || tool.catKey === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.tagline.toLowerCase().includes(query) ||
        tool.whatItDoes.toLowerCase().includes(query) ||
        tool.steps.some((s) => s.cmd.toLowerCase().includes(query) || s.title.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryClass = (catKey) => {
    switch (catKey) {
      case 'infogathering': return styles.catInfoGathering;
      case 'trafficanalysis': return styles.catTrafficAnalysis;
      case 'exploitation': return styles.catExploitation;
      case 'webapp': return styles.catWebApp;
      case 'passwords': return styles.catPasswords;
      case 'wireless': return styles.catWireless;
      case 'osint': return styles.catOSINT;
      case 'sniffing': return styles.catSniffing;
      case 'socialeng': return styles.catSocialEng;
      case 'forensics': return styles.catForensics;
      case 'postexploit': return styles.catPostExploit;
      default: return styles.catInfoGathering;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <DataDustBackground />

      {/* ===== HERO SECTION ===== */}
      <section className="dynamic-hero-section" style={{ minHeight: '440px', paddingTop: '100px', paddingBottom: '50px' }}>
        <DynamicHeroBackground />
        <div className="dynamic-hero-content" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div className={styles.heroBadge}>
            <Terminal size={16} /> Cybersecurity Department · Student Resources
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: '900',
            color: 'white',
            marginBottom: '1rem',
            textShadow: '0 4px 25px rgba(0,0,0,0.7)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15
          }}>
            Top 25 Kali Linux Tools
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: '#ffffff',
            fontWeight: '500',
            maxWidth: '850px',
            marginBottom: '1.25rem',
            lineHeight: 1.5
          }}>
            A complete, beginner-friendly reference — what each tool does, how to install it, how to use it, and real command examples in action.
          </p>

          <div style={{ display: 'flex', gap: '8px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/student-resources" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Student Resources</Link>
            <span>›</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>Security Tools</span>
          </div>

          {/* Stat Pills */}
          <div className={styles.heroStatsRow}>
            <span className={styles.statPill}>⚡ 25 Essential Tools</span>
            <span className={styles.statPill}>📦 Multi-Platform Install Guides</span>
            <span className={styles.statPill}>💻 Step-by-Step Commands</span>
            <span className={styles.statPill}>🎯 Beginner Friendly &amp; Pro Tips</span>
          </div>

        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className={styles.contentSection}>

        {/* ===== CONTROLS & SEARCH BAR ===== */}
        <section className={styles.controlsSection}>
          <div className={styles.searchBarWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search tools by name, category, flags, or command syntax (e.g. nmap, wireshark, rockyou, sqlmap, -sV)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categoryPills}>
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`${styles.filterBtn} ${selectedCategory === cat.key ? styles.filterBtnActive : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
          <span>Showing <strong>{filteredTools.length}</strong> of {securityToolsData.length} tools</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* ===== TOOLS LIST ===== */}
        <div className={styles.toolsList}>
          {filteredTools.map((tool) => (
            <div key={tool.id} id={tool.id} className={styles.toolDetailCard}>
              
              {/* Header */}
              <div className={styles.toolHeader}>
                <div className={styles.toolTitleBlock}>
                  <div>
                    <span className={styles.toolIndexBadge}>TOOL {tool.number} / 25</span>
                    <h2 className={styles.toolName}>{tool.name}</h2>
                    <p className={styles.toolOneLiner}>{tool.tagline}</p>
                  </div>
                </div>

                <div>
                  <span className={`${styles.categoryTag} ${getCategoryClass(tool.catKey)}`}>
                    {tool.category}
                  </span>
                </div>
              </div>

              {/* What It Does & Why It Matters */}
              <div className={styles.overviewBlock}>
                <div className={styles.blockHeading}>
                  <Compass size={15} /> What It Does
                </div>
                <p className={styles.blockText}>{tool.whatItDoes}</p>

                <div className={styles.whyItMattersBox}>
                  <strong>Why it matters: </strong>
                  {tool.whyItMatters}
                </div>
              </div>

              {/* How to Install It */}
              <div className={styles.installSection}>
                <div className={styles.blockHeading}>
                  <Terminal size={15} /> How to Install It
                </div>
                <table className={styles.installTable}>
                  <thead>
                    <tr>
                      <th>Platform</th>
                      <th>How to Install</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tool.install.map((item, idx) => (
                      <tr key={idx}>
                        <td className={styles.platformCell}>{item.platform}</td>
                        <td>
                          {item.command.startsWith('sudo') || item.command.startsWith('brew') || item.command.startsWith('pip') || item.command.startsWith('gem') ? (
                            <span className={styles.codeInline}>{item.command}</span>
                          ) : (
                            item.command
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* How to Use It — Step by Step */}
              <div className={styles.stepsSection}>
                <div className={styles.blockHeading}>
                  <Layers size={15} /> How to Use It — Step by Step
                </div>
                {tool.steps.map((step, idx) => (
                  <div key={idx} className={styles.stepCard}>
                    <div className={styles.stepTitle}>{step.title}</div>
                    <div className={styles.stepCmdBox}>
                      <code>{step.cmd}</code>
                      <button
                        onClick={() => handleCopy(step.cmd, `${tool.id}-step-${idx}`)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: copiedCmd === `${tool.id}-step-${idx}` ? '#10b981' : '#64748b',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem'
                        }}
                        title="Copy command"
                      >
                        {copiedCmd === `${tool.id}-step-${idx}` ? (
                          <>
                            <Check size={14} /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Example in Action (Terminal Preview) */}
              <div>
                <div className={styles.blockHeading}>
                  <Activity size={15} /> Example in Action
                </div>
                <div className={styles.terminalBox}>
                  <div className={styles.terminalHeader}>
                    <span className={`${styles.terminalDot} ${styles.terminalDotRed}`} />
                    <span className={`${styles.terminalDot} ${styles.terminalDotYellow}`} />
                    <span className={`${styles.terminalDot} ${styles.terminalDotGreen}`} />
                    <span className={styles.terminalTitle}>{tool.name.toLowerCase()} — example output</span>
                  </div>
                  <pre className={styles.terminalContent}>
                    <code>{tool.output}</code>
                  </pre>
                </div>
              </div>

              {/* Pro Tip & Common Mistake */}
              <div className={styles.tipsGrid}>
                <div className={styles.proTipCard}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', marginBottom: '6px', color: '#10b981' }}>
                    <Sparkles size={16} /> PRO TIP
                  </div>
                  <div>{tool.proTip}</div>
                </div>

                <div className={styles.commonMistakeCard}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', marginBottom: '6px', color: '#f59e0b' }}>
                    <AlertTriangle size={16} /> COMMON MISTAKE
                  </div>
                  <div>{tool.commonMistake}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ===== BEFORE YOU GO PRACTICE & ETHICS NOTICE ===== */}
        <section className={styles.ethicsBanner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem' }}>
            <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '12px', color: '#f59e0b' }}>
              <Scale size={32} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                Before You Go Practice 🚀
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '4px 0 0' }}>
                You don&apos;t need to master all 25 tools this week. Pick two or three, set up a safe lab environment, and get hands-on.
              </p>
            </div>
          </div>

          <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: '1.6' }}>
            Come back to this guide whenever you need a refresher on install steps or basic syntax.
          </p>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '14px', padding: '1.25rem 1.5rem', marginTop: '1.25rem' }}>
            <h4 style={{ color: '#f59e0b', fontSize: '0.95rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              ⚠️ Only ever use these tools on:
            </h4>
            <ul className={styles.ethicsList}>
              <li className={styles.ethicsItem}>
                <span style={{ color: '#10b981' }}>✔</span> Machines and networks you personally own
              </li>
              <li className={styles.ethicsItem}>
                <span style={{ color: '#10b981' }}>✔</span> Environments built for practice — Metasploitable, DVWA, TryHackMe, HackTheBox, CTF platforms
              </li>
              <li className={styles.ethicsItem}>
                <span style={{ color: '#10b981' }}>✔</span> Real targets where you have explicit, written authorization
              </li>
            </ul>
            <p style={{ color: '#f87171', fontSize: '0.88rem', fontWeight: '600', margin: '8px 0 0' }}>
              Testing anything else without permission is illegal, even if no damage is caused.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
