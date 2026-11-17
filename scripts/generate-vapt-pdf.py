import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Suppress headers/footers on title page
        
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header
        self.drawString(54, 750, "Sample Penetration Testing Report — VAPT Documentation")
        self.drawRightString(558, 750, "CONFIDENTIAL · CLIENT SAMPLE")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 742, 558, 742)
        
        # Footer
        self.line(54, 45, 558, 45)
        self.drawString(54, 32, "Centre for Cybersecurity · UPES Student Reference Guide")
        self.drawRightString(558, 32, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def create_vapt_report_pdf(output_filename):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=colors.HexColor('#0f172a'),
        alignment=0
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#1e65ff'),
        alignment=0
    )
    
    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=14,
        spaceAfter=6
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#1e65ff'),
        spaceBefore=10,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        spaceAfter=6
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#0f172a'),
        backColor=colors.HexColor('#f1f5f9'),
        borderColor=colors.HexColor('#cbd5e1'),
        borderWidth=0.5,
        borderPadding=6,
        spaceAfter=8
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    table_body_style = ParagraphStyle(
        'TableBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#1e293b')
    )

    story = []

    # ================= COVER PAGE =================
    story.append(Spacer(1, 100))
    story.append(Paragraph("PENETRATION TESTING REPORT", title_style))
    story.append(Spacer(1, 10))
    story.append(Paragraph("Vulnerability Assessment &amp; Penetration Testing (VAPT)", subtitle_style))
    story.append(Spacer(1, 40))
    
    story.append(HRFlowable(width="100%", thickness=3, color=colors.HexColor('#1e65ff'), spaceAfter=30))
    
    meta_text = """
    <b>Prepared For:</b> Enterprise Client / Academic Reference<br/>
    <b>Classification:</b> Confidential · Educational Reference Document<br/>
    <b>Standard:</b> OWASP, OSSTMM, NIST SP 800-115, WASC<br/>
    <b>Scoring Framework:</b> Common Vulnerability Scoring System (CVSS v3.0)<br/>
    <b>Methodology:</b> Grey Box Penetration Testing &amp; Business Risk Approach<br/>
    <b>Published By:</b> Centre for Cybersecurity, UPES Lab Reference Series
    """
    story.append(Paragraph(meta_text, body_style))
    story.append(Spacer(1, 120))
    
    story.append(Paragraph("<b>NOTICE:</b> This document represents an industry-standard penetration testing report template and methodology walkthrough for cybersecurity students and practitioners.", ParagraphStyle('Note', parent=body_style, textColor=colors.HexColor('#64748b'), fontSize=8)))
    story.append(PageBreak())

    # ================= TABLE OF CONTENTS & DETAILS =================
    story.append(Paragraph("Table of Contents &amp; Executive Summary", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#e2e8f0'), spaceAfter=10))
    
    toc_data = [
        [Paragraph("<b>Section</b>", table_header_style), Paragraph("<b>Description &amp; Key Focus Areas</b>", table_header_style)],
        [Paragraph("1. Executive Summary", table_body_style), Paragraph("Scope of Work, Testing Objectives, Methodology &amp; CVSS Ratings", table_body_style)],
        [Paragraph("2. Summary of Findings", table_body_style), Paragraph("Vulnerability breakdown table by severity and domain impact", table_body_style)],
        [Paragraph("3. Detailed Technical Findings", table_body_style), Paragraph("In-depth analysis, PoC, and remediation for SQLi, Auth, Misconfigurations, CSV Injection", table_body_style)],
        [Paragraph("4. Strategic Conclusion", table_body_style), Paragraph("Priority action items, hardening guidelines, CIS benchmarks", table_body_style)],
        [Paragraph("5. Appendix A: OWASP Top 10", table_body_style), Paragraph("Comprehensive definitions of standard web security risk categories", table_body_style)],
        [Paragraph("6. Appendix B: Assessment Types", table_body_style), Paragraph("14 penetration testing approaches (Red Team, Bug Bounty, Code Review, etc.)", table_body_style)],
        [Paragraph("7. Appendix C: CVSS v3 Metrics", table_body_style), Paragraph("Quantitative scale, trait definitions, and real-world CVE benchmark controls", table_body_style)]
    ]
    
    t_toc = Table(toc_data, colWidths=[150, 354])
    t_toc.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e65ff')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_toc)
    story.append(Spacer(1, 15))

    # ================= SECTION 1: EXECUTIVE SUMMARY =================
    story.append(Paragraph("1. Executive Summary &amp; Engagement Scope", h1_style))
    story.append(Paragraph("The objective of this engagement was to conduct a comprehensive Vulnerability Assessment and Penetration Testing (VAPT) exercise across target public-facing web infrastructure. Testing followed a <b>Grey Box, Business Risk-Based Approach</b> to identify vulnerabilities, demonstrate real-world impact safely without service disruption, and formulate concrete remediation steps.", body_style))
    
    scope_data = [
        [Paragraph("<b>Target Type</b>", table_header_style), Paragraph("<b>In-Scope Identifiers / Assets</b>", table_header_style), Paragraph("<b>Environment</b>", table_header_style)],
        [Paragraph("Network IP Addresses", table_body_style), Paragraph("10.10.204.117, 10.10.204.121, 10.10.203.0/24", table_body_style), Paragraph("Production Staging Subnet", table_body_style)],
        [Paragraph("Web Applications / URLs", table_body_style), Paragraph("http://www.abcinc.com/ (Portals, APIs, Forms)", table_body_style), Paragraph("Public Web Service", table_body_style)]
    ]
    t_scope = Table(scope_data, colWidths=[130, 240, 134])
    t_scope.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f172a')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_scope)
    story.append(Spacer(1, 15))

    # 10-Stage Methodology Lifecycle
    story.append(Paragraph("1.2 Ten-Stage Assessment Lifecycle &amp; Approach", h2_style))
    story.append(Paragraph("The penetration test followed a structured 10-step lifecycle: <b>1. Understand Scope → 2. Broad Scans → 3. Targeted Scans &amp; Manual Analysis → 4. Business Test Cases → 5. Identify Attack Surface → 6. Vulnerability Assessment → 7. Exploit Vulnerabilities → 8. Identify Impact → 9. Provide Detailed Recommendations → 10. Publish Report &amp; Conduct Debrief.</b>", body_style))
    
    story.append(Paragraph("1.3 Standards and Frameworks Followed", h2_style))
    story.append(Paragraph("• <b>OWASP</b> — Open Web Application Security Project Testing Guide<br/>• <b>OSSTMM</b> — Open Source Security Testing Methodology Manual<br/>• <b>NIST SP 800-115</b> — Technical Guide to Information Security Testing &amp; Assessment<br/>• <b>WASC</b> — Web Application Security Consortium Threat Classification", body_style))
    story.append(PageBreak())

    # ================= SECTION 2: SUMMARY OF FINDINGS =================
    story.append(Paragraph("2. Summary of Findings &amp; CVSS Severity Ratings", h1_style))
    story.append(Paragraph("Vulnerabilities are evaluated using the Common Vulnerability Scoring System (CVSS v3.0). Below is the consolidated summary of discovered findings during the assessment:", body_style))
    story.append(Spacer(1, 6))

    findings_data = [
        [Paragraph("<b>#</b>", table_header_style), Paragraph("<b>Vulnerability Title</b>", table_header_style), Paragraph("<b>Severity</b>", table_header_style), Paragraph("<b>CVSS</b>", table_header_style), Paragraph("<b>Key Remediation Summary</b>", table_header_style)],
        [Paragraph("1", table_body_style), Paragraph("SQL Injection", table_body_style), Paragraph("<font color='#dc2626'><b>CRITICAL</b></font>", table_body_style), Paragraph("9.2", table_body_style), Paragraph("Implement parameterized queries (prepared statements), input whitelisting, least privilege.", table_body_style)],
        [Paragraph("2", table_body_style), Paragraph("Insufficient Authorization (IDOR)", table_body_style), Paragraph("<font color='#ea580c'><b>HIGH</b></font>", table_body_style), Paragraph("8.5", table_body_style), Paragraph("Enforce server-side Role-Based Access Control (RBAC) and prevent client-side statement ID tampering.", table_body_style)],
        [Paragraph("3", table_body_style), Paragraph("Default Installation of phpMyAdmin", table_body_style), Paragraph("<font color='#ea580c'><b>HIGH</b></font>", table_body_style), Paragraph("8.1", table_body_style), Paragraph("Change default credentials, restrict portal IP access, and configure Apache chroot jail.", table_body_style)],
        [Paragraph("4", table_body_style), Paragraph("CSV / Formula Injection", table_body_style), Paragraph("<font color='#d97706'><b>MEDIUM</b></font>", table_body_style), Paragraph("6.0", table_body_style), Paragraph("Prepend single quote (') to formula trigger characters (=, +, -, @) upon export.", table_body_style)],
        [Paragraph("5", table_body_style), Paragraph("Directory Listing Enabled", table_body_style), Paragraph("<font color='#16a34a'><b>LOW</b></font>", table_body_style), Paragraph("3.5", table_body_style), Paragraph("Disable Options Indexes in Apache web server configuration.", table_body_style)]
    ]
    t_findings = Table(findings_data, colWidths=[20, 130, 64, 40, 250])
    t_findings.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e65ff')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_findings)
    story.append(Spacer(1, 15))

    # ================= SECTION 3: DETAILED TECHNICAL FINDINGS =================
    story.append(Paragraph("3. Detailed Technical Findings &amp; Proof of Concept", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#e2e8f0'), spaceAfter=10))

    # 3.1 SQL Injection
    story.append(Paragraph("3.1 SQL Injection — <font color='#dc2626'>CRITICAL (CVSS 9.2)</font>", h2_style))
    story.append(Paragraph("<b>Affected URLs:</b> http://www.abcinc.com/print?pageID=37'&amp;nid=1 | /forward<br/><b>Vulnerable Parameters:</b> pageID, nid (GET), email, tomail (POST)<br/><b>Description:</b> Input supplied via URL parameters was concatenated directly into database SQL queries without parameterized binding or sanitization.<br/><b>Impact:</b> Full database schema enumeration and unauthorized extraction of user password hashes (`tbl_users`).", body_style))
    story.append(Paragraph("<b>Remediation Code (PHP PDO / MySQLi Prepared Statement):</b>", body_style))
    sql_code = """// Secure Parameterized Query Pattern:
$stmt = $mysqli->prepare("SELECT id, password FROM tbl_users WHERE name = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($id, $hashed_password);
$stmt->fetch();
$stmt->close();"""
    story.append(Paragraph(sql_code, code_style))

    # 3.2 Insufficient Authorization
    story.append(Paragraph("3.2 Insufficient Authorization / IDOR — <font color='#ea580c'>HIGH (CVSS 8.5)</font>", h2_style))
    story.append(Paragraph("<b>Affected Module:</b> Investment ID &amp; Account Statement Portal<br/><b>Description:</b> Insecure Direct Object Reference (IDOR) allowed any authenticated user to tamper with the `Investment ID` parameter and download account statements of arbitrary third-party accounts.<br/><b>Remediation:</b> Enforce explicit server-side session checks verifying the requested account belongs strictly to the authenticated user ID before retrieving records.", body_style))

    # 3.3 Default phpMyAdmin
    story.append(Paragraph("3.3 Default Installation of phpMyAdmin — <font color='#ea580c'>HIGH (CVSS 8.1)</font>", h2_style))
    story.append(Paragraph("<b>Affected URL:</b> http://www.abcinc.com/phpMyAdmin/<br/><b>Description:</b> Default root user access with empty password allowed full remote database administration and arbitrary file disclosure (`SELECT load_file(0x2F6574632F706173737764)`) revealing `/etc/passwd`.<br/><b>Remediation:</b> Enforce strong password complexity, disable or restrict phpMyAdmin access to VPN/whitelisted IPs, and isolate web server processes using an Apache chroot jail.", body_style))

    # 3.4 CSV Injection
    story.append(Paragraph("3.4 CSV / Formula Injection — <font color='#d97706'>MEDIUM (CVSS 6.0)</font>", h2_style))
    story.append(Paragraph("<b>Affected Functionality:</b> Form Export to CSV (`-2+3=cmd|'/C calc'!A0`)<br/><b>Description:</b> Unescaped spreadsheet formula triggers (`=`, `+`, `-`, `@`) executed arbitrary shell commands upon opening exported reports in Excel.<br/><b>Remediation:</b> Prepend a single quote (`'`) to all export fields containing leading formula trigger symbols.", body_style))

    # 3.5 Directory Listing
    story.append(Paragraph("3.5 Directory Listing Enabled — <font color='#16a34a'>LOW (CVSS 3.5)</font>", h2_style))
    story.append(Paragraph("<b>Affected Path:</b> /icons/, /icons/small/<br/><b>Description:</b> Automatic web server directory indexing exposed directory trees.<br/><b>Remediation:</b> Disable indexing in Apache via `Options -Indexes` in `httpd.conf` / `.htaccess`.", body_style))
    story.append(PageBreak())

    # ================= SECTION 4: STRATEGIC CONCLUSION =================
    story.append(Paragraph("4. Strategic Conclusion &amp; Remediation Roadmap", h1_style))
    story.append(Paragraph("Based on the penetration testing results, the following priority actions are required:", body_style))
    remed_items = """
    <b>1. Immediate Access Restriction:</b> Password-protect and restrict phpMyAdmin to internal bastion hosts.<br/>
    <b>2. Input Sanitization &amp; Parameterization:</b> Refactor all SQL queries to use parameterized prepared statements.<br/>
    <b>3. Server Hardening:</b> Enforce least-privilege service accounts and apply <b>CIS Security Benchmarks</b> across OS, Apache, and MySQL.<br/>
    <b>4. Authorization Audits:</b> Implement server-side Role-Based Access Control (RBAC) across all state-changing endpoints.
    """
    story.append(Paragraph(remed_items, body_style))
    story.append(Spacer(1, 15))

    # ================= SECTION 5: APPENDICES =================
    story.append(Paragraph("5. Appendices: Reference Standards &amp; Assessment Types", h1_style))
    story.append(Paragraph("<b>Appendix A: OWASP Top 10 Web Application Vulnerabilities</b><br/>"
                           "• <b>A1-Injection:</b> SQL, OS, LDAP untrusted command interpretation.<br/>"
                           "• <b>A2-Broken Auth:</b> Improper session token/password management.<br/>"
                           "• <b>A3-XSS:</b> Untrusted browser script execution (Stored, Reflected, DOM).<br/>"
                           "• <b>A4-IDOR:</b> Direct exposed internal object keys without authorization checks.<br/>"
                           "• <b>A5-Misconfiguration:</b> Insecure default settings, open directories, unnecessary services.<br/>"
                           "• <b>A6-Sensitive Data:</b> Unencrypted data in transit/at rest.<br/>"
                           "• <b>A7-Missing Function Level Access:</b> Unauthorized URL endpoint access.<br/>"
                           "• <b>A8-CSRF:</b> Forged browser requests utilizing victim session state.<br/>"
                           "• <b>A9-Vulnerable Components:</b> Outdated third-party libraries and frameworks.<br/>"
                           "• <b>A10-Unvalidated Redirects:</b> Arbitrary phishing and malware forwarders.", body_style))
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>Appendix B: 14 Penetration Testing Assessment Types</b><br/>"
                           "<b>1. Red Team Assessment:</b> Adversary simulation across full organizational scope.<br/>"
                           "<b>2. Bug Bounty:</b> Result-driven crowdsourced vulnerability discovery.<br/>"
                           "<b>3. Black Box:</b> Zero prior knowledge assessment from external perspective.<br/>"
                           "<b>4. Gray Box:</b> Authenticated testing with low-privilege credentials.<br/>"
                           "<b>5. Source Code Review:</b> White-box static analysis across SDLC.<br/>"
                           "<b>6. Internal Penetration Testing:</b> Lateral movement and internal perimeter audit.<br/>"
                           "<b>7. Wireless Hacking &amp; War Driving:</b> 802.11 signal reach and encryption audit.<br/>"
                           "<b>8. Social Engineering:</b> Phishing, pretexting, and credential harvester simulations.<br/>"
                           "<b>9. Vulnerability Assessment:</b> Automated and manual flaw identification &amp; scoring.<br/>"
                           "<b>10. Stress &amp; DoS Testing:</b> Application load and Denial of Service resilience.", body_style))

    # Build the document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated at: {output_filename}")

if __name__ == "__main__":
    out_dir = os.path.join(os.getcwd(), "public")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "VAPT-Sample-Penetration-Testing-Report.pdf")
    create_vapt_report_pdf(out_file)
