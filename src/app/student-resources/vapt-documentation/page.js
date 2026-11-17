'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Download,
  Eye,
  Shield,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Code2,
  Activity,
  BarChart3,
  Scale,
  Sparkles,
  BookOpen,
  PieChart,
  ListOrdered,
  Lock,
  Printer
} from 'lucide-react';
import DataDustBackground from '../../../components/DataDustBackground';
import DynamicHeroBackground from '../../../components/DynamicHeroBackground';
import styles from './VAPTDocumentation.module.css';

export default function VAPTDocumentationPage() {
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' or 'pdf'

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.pageContainer}>
      <DataDustBackground />

      {/* ===== HERO SECTION ===== */}
      <section className="dynamic-hero-section" style={{ minHeight: '440px', paddingTop: '100px', paddingBottom: '50px' }}>
        <DynamicHeroBackground />
        <div className="dynamic-hero-content" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div className={styles.heroBadge}>
            <FileText size={16} /> Cybersecurity Department · VAPT Documentation
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
            Penetration Testing Report (VAPT)
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: '#ffffff',
            fontWeight: '500',
            maxWidth: '850px',
            marginBottom: '1.25rem',
            lineHeight: 1.5
          }}>
            Industry-standard Vulnerability Assessment &amp; Penetration Testing reporting template, methodology framework, and technical findings walkthrough.
          </p>

          <div style={{ display: 'flex', gap: '8px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/student-resources" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Student Resources</Link>
            <span>›</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>VAPT Documentation</span>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtonGroup}>
            <a
              href="/VAPT-Sample-Penetration-Testing-Report.pdf"
              download="VAPT-Sample-Penetration-Testing-Report.pdf"
              className={styles.downloadPdfBtn}
            >
              <Download size={18} /> Download Official PDF Report
            </a>

            <button
              onClick={() => setViewMode(viewMode === 'pdf' ? 'interactive' : 'pdf')}
              className={`${styles.toggleViewBtn} ${viewMode === 'pdf' ? styles.toggleActive : ''}`}
            >
              <Eye size={18} /> {viewMode === 'pdf' ? 'Switch to Interactive View' : 'View Embedded PDF'}
            </button>

            <button onClick={handlePrint} className={styles.toggleViewBtn}>
              <Printer size={18} /> Print Report
            </button>
          </div>

        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className={styles.contentSection}>

        {/* ===== EMBEDDED PDF VIEWER (When toggled) ===== */}
        {viewMode === 'pdf' && (
          <section className={styles.pdfViewerWrapper}>
            <div className={styles.pdfHeaderBar}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: '700' }}>
                <FileText size={20} color="#1e65ff" /> Embedded VAPT Document Viewer
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href="/VAPT-Sample-Penetration-Testing-Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.toggleViewBtn}
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Open in New Tab <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <iframe
              src="/VAPT-Sample-Penetration-Testing-Report.pdf"
              title="VAPT Penetration Testing Report PDF"
              className={styles.pdfFrame}
            />
          </section>
        )}

        {/* ================= 1. EXECUTIVE SUMMARY & SCOPE ================= */}
        <section className={styles.reportCard}>
          <h2 className={styles.sectionHeading}>
            <Shield size={26} color="#1e65ff" /> 1. Executive Summary &amp; Engagement Scope
          </h2>
          <p className={styles.sectionDesc}>
            The penetration test was conducted across public-facing infrastructure to identify security flaws, test security controls non-destructively, and validate compliance with bi-annual assessment requirements.
          </p>

          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Target Asset Type</th>
                <th>In-Scope Identifiers</th>
                <th>Testing Approach</th>
                <th>Assessment Window</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>IP Addresses</strong></td>
                <td><code>10.10.204.117</code>, <code>10.10.204.121</code>, <code>10.10.203.0/24</code></td>
                <td>Grey Box · Business Risk Based</td>
                <td>Oct 7th – Oct 30th</td>
              </tr>
              <tr>
                <td><strong>Web Application URLs</strong></td>
                <td><code>http://www.abcinc.com/</code> (Portals &amp; APIs)</td>
                <td>OWASP / WASC / OSSTMM / NIST</td>
                <td>Full Production Staging Audit</td>
              </tr>
            </tbody>
          </table>

          {/* 10-Stage Methodology */}
          <h3 style={{ fontSize: '1.15rem', color: '#93c5fd', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            1.2 Ten-Stage Assessment Lifecycle &amp; Approach
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Our standard penetration testing methodology follows a structured 10-stage execution pipeline:
          </p>

          <div className={styles.stepperGrid}>
            <div className={styles.stepNode}>
              <span className={styles.stepNumber}>STAGE 01</span>
              <span className={styles.stepTitle}>Understand Scope</span>
            </div>
            <div className={styles.stepNode}>
              <span className={styles.stepNumber}>STAGE 02</span>
              <span className={styles.stepTitle}>Broad Scans</span>
            </div>
            <div className={styles.stepNode}>
              <span className={styles.stepNumber}>STAGE 03</span>
              <span className={styles.stepTitle}>Targeted Scans &amp; Manual Inv.</span>
            </div>
            <div className={styles.stepNode}>
              <span className={styles.stepNumber}>STAGE 04</span>
              <span className={styles.stepTitle}>Business Test Cases</span>
            </div>
            <div className={styles.stepNode}>
              <span className={styles.stepNumber}>STAGE 05</span>
              <span className={styles.stepTitle}>Identify Attack Surface</span>
            </div>
            <div className={styles.stepNode}>
              <span className={styles.stepNumber}>STAGE 06</span>
              <span className={styles.stepTitle}>Vulnerability Assessment</span>
            </div>
            <div className={styles.stepNode}>
              <span className={styles.stepNumber}>STAGE 07</span>
              <span className={styles.stepTitle}>Exploit Vulnerabilities</span>
            </div>
            <div className={styles.stepNode}>
              <span className={styles.stepNumber}>STAGE 08</span>
              <span className={styles.stepTitle}>Identify Impact</span>
            </div>
            <div className={styles.stepNode}>
              <span className={styles.stepNumber}>STAGE 09</span>
              <span className={styles.stepTitle}>Detailed Recommendations</span>
            </div>
            <div className={styles.stepNode}>
              <span className={styles.stepNumber}>STAGE 10</span>
              <span className={styles.stepTitle}>Publish Report &amp; Debrief</span>
            </div>
          </div>
        </section>

        {/* ================= 2. SUMMARY OF FINDINGS & CVSS ================= */}
        <section className={styles.reportCard}>
          <h2 className={styles.sectionHeading}>
            <BarChart3 size={26} color="#1e65ff" /> 2. Summary of Findings &amp; CVSS Ratings
          </h2>
          <p className={styles.sectionDesc}>
            Findings are classified according to the Common Vulnerability Scoring System (CVSS v3.0) measuring Base, Temporal, and Environmental metrics.
          </p>

          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Vulnerability Title</th>
                <th>Severity</th>
                <th>CVSS Score</th>
                <th>Key Remediation Recommendation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><strong>SQL Injection</strong></td>
                <td><span className={styles.badgeCritical}>CRITICAL</span></td>
                <td><strong>9.2</strong></td>
                <td>Use parameterized queries (prepared statements), input whitelisting, least privilege.</td>
              </tr>
              <tr>
                <td>2</td>
                <td><strong>Insufficient Authorization (IDOR)</strong></td>
                <td><span className={styles.badgeHigh}>HIGH</span></td>
                <td><strong>8.5</strong></td>
                <td>Implement server-side Role-Based Access Control (RBAC) and validate session ownership.</td>
              </tr>
              <tr>
                <td>3</td>
                <td><strong>Default Installation of phpMyAdmin</strong></td>
                <td><span className={styles.badgeHigh}>HIGH</span></td>
                <td><strong>8.1</strong></td>
                <td>Change default admin credentials, restrict portal IP access, configure Apache chroot jail.</td>
              </tr>
              <tr>
                <td>4</td>
                <td><strong>CSV / Formula Injection</strong></td>
                <td><span className={styles.badgeMedium}>MEDIUM</span></td>
                <td><strong>6.0</strong></td>
                <td>Prepend single quote (<code>&apos;</code>) to formula triggers (<code>=</code>, <code>+</code>, <code>-</code>, <code>@</code>) before export.</td>
              </tr>
              <tr>
                <td>5</td>
                <td><strong>Directory Listing Enabled</strong></td>
                <td><span className={styles.badgeLow}>LOW</span></td>
                <td><strong>3.5</strong></td>
                <td>Disable automatic directory indexing in web server configuration (<code>Options -Indexes</code>).</td>
              </tr>
            </tbody>
          </table>

          {/* Visual Distribution Breakdown */}
          <div className={styles.chartsGrid}>
            <div className={styles.chartCard}>
              <div className={styles.chartCardTitle}>
                <PieChart size={18} color="#60a5fa" /> Findings by Severity Rating
              </div>
              <div className={styles.distBarRow}>
                <div className={styles.distBarHeader}>
                  <span>Critical (9.0 - 10.0)</span>
                  <span style={{ color: '#f87171', fontWeight: '700' }}>20% (1 Finding)</span>
                </div>
                <div className={styles.distBarTrack}>
                  <div className={styles.distBarFill} style={{ width: '20%', background: '#dc2626' }} />
                </div>
              </div>

              <div className={styles.distBarRow}>
                <div className={styles.distBarHeader}>
                  <span>High (7.0 - 8.9)</span>
                  <span style={{ color: '#fb923c', fontWeight: '700' }}>40% (2 Findings)</span>
                </div>
                <div className={styles.distBarTrack}>
                  <div className={styles.distBarFill} style={{ width: '40%', background: '#ea580c' }} />
                </div>
              </div>

              <div className={styles.distBarRow}>
                <div className={styles.distBarHeader}>
                  <span>Medium (4.0 - 6.9)</span>
                  <span style={{ color: '#fbbf24', fontWeight: '700' }}>20% (1 Finding)</span>
                </div>
                <div className={styles.distBarTrack}>
                  <div className={styles.distBarFill} style={{ width: '20%', background: '#d97706' }} />
                </div>
              </div>

              <div className={styles.distBarRow}>
                <div className={styles.distBarHeader}>
                  <span>Low (0.1 - 3.9)</span>
                  <span style={{ color: '#4ade80', fontWeight: '700' }}>20% (1 Finding)</span>
                </div>
                <div className={styles.distBarTrack}>
                  <div className={styles.distBarFill} style={{ width: '20%', background: '#16a34a' }} />
                </div>
              </div>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.chartCardTitle}>
                <Activity size={18} color="#34d399" /> Vulnerability Distribution by Focus Area
              </div>
              <div className={styles.distBarRow}>
                <div className={styles.distBarHeader}>
                  <span>Input Validation Flaws</span>
                  <span style={{ color: '#60a5fa', fontWeight: '700' }}>40%</span>
                </div>
                <div className={styles.distBarTrack}>
                  <div className={styles.distBarFill} style={{ width: '40%', background: '#3b82f6' }} />
                </div>
              </div>

              <div className={styles.distBarRow}>
                <div className={styles.distBarHeader}>
                  <span>Security Misconfigurations</span>
                  <span style={{ color: '#a855f7', fontWeight: '700' }}>40%</span>
                </div>
                <div className={styles.distBarTrack}>
                  <div className={styles.distBarFill} style={{ width: '40%', background: '#a855f7' }} />
                </div>
              </div>

              <div className={styles.distBarRow}>
                <div className={styles.distBarHeader}>
                  <span>Authentication &amp; Authorization</span>
                  <span style={{ color: '#ec4899', fontWeight: '700' }}>20%</span>
                </div>
                <div className={styles.distBarTrack}>
                  <div className={styles.distBarFill} style={{ width: '20%', background: '#ec4899' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. DETAILED TECHNICAL FINDINGS ================= */}
        <section className={styles.reportCard}>
          <h2 className={styles.sectionHeading}>
            <Code2 size={26} color="#1e65ff" /> 3. Detailed Technical Report &amp; Proof of Concept
          </h2>
          <p className={styles.sectionDesc}>
            In-depth analysis of identified vulnerabilities, malicious request proofs of concept, system impact, and exact code remediation examples.
          </p>

          {/* Finding 1: SQL Injection */}
          <div className={styles.findingCard}>
            <div className={styles.findingHeader}>
              <div>
                <span className={styles.badgeCritical}>CRITICAL · CVSS 9.2</span>
                <h3 className={styles.findingTitle} style={{ marginTop: '8px' }}>2.1.1 SQL Injection</h3>
              </div>
              <div className={styles.findingMetaRow}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Classification: <strong>CWE-89 / OWASP A1</strong></span>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
              <strong>Affected URLs:</strong> <code>http://www.abcinc.com/print</code>, <code>http://www.abcinc.com/forward</code><br/>
              <strong>Vulnerable Parameters:</strong> <code>pageID</code>, <code>nid</code> (GET) | <code>email</code>, <code>tomail</code> (POST)<br/>
              <strong>Malicious Request:</strong> <code>http://www.abcinc.com/print?pageID=37&apos;;&amp;nid=1</code><br/>
              <strong>Impact:</strong> Full database schema enumeration, retrieval of table structures, and dumping of confidential password hashes (<code>tbl_users</code>).
            </p>

            <h4 style={{ color: '#93c5fd', fontSize: '0.95rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '6px' }}>
              Recommended Remediation (Parameterized Prepared Statements):
            </h4>
            <div className={styles.codeSnippet}>
{`// Secure implementation using PHP PDO / MySQLi Prepared Statements:
$stmt = $mysqli->prepare("SELECT id, password FROM tbl_users WHERE name = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($id, $hashed_password);
$stmt->fetch();
$stmt->close();`}
            </div>
          </div>

          {/* Finding 2: Insufficient Authorization */}
          <div className={styles.findingCard}>
            <div className={styles.findingHeader}>
              <div>
                <span className={styles.badgeHigh}>HIGH · CVSS 8.5</span>
                <h3 className={styles.findingTitle} style={{ marginTop: '8px' }}>2.1.2 Insufficient Authorization (IDOR)</h3>
              </div>
              <div className={styles.findingMetaRow}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Classification: <strong>CWE-639 / Insecure Direct Object Reference</strong></span>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
              <strong>Affected Module &amp; URL:</strong> <code>https://abcinc.com/statements</code> (Parameter: <code>Investment ID</code>)<br/>
              <strong>Description:</strong> Application lacked server-side access control validation. Authenticated users could intercept statement download requests, alter the account identifier, and view financial statements belonging to other users.<br/>
              <strong>Remediation:</strong> Implement server-side Role-Based Access Control (RBAC) and ensure all object lookups query: <code>WHERE account_id = ? AND user_id = CURRENT_SESSION_USER_ID</code>.
            </p>
          </div>

          {/* Finding 3: Default phpMyAdmin */}
          <div className={styles.findingCard}>
            <div className={styles.findingHeader}>
              <div>
                <span className={styles.badgeHigh}>HIGH · CVSS 8.1</span>
                <h3 className={styles.findingTitle} style={{ marginTop: '8px' }}>2.1.3 Default Installation of phpMyAdmin Found</h3>
              </div>
              <div className={styles.findingMetaRow}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Classification: <strong>Server Misconfiguration / Default Credentials</strong></span>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
              <strong>Affected URL:</strong> <code>http://www.abcinc.com/phpMyAdmin/</code><br/>
              <strong>Analysis:</strong> Unprotected web database manager accessible with default credentials (<code>root:&lt;blank&gt;</code>). Testers utilized MySQL file-read functions (<code>SELECT load_file(0x2F6574632F706173737764);</code>) to extract the host operating system&apos;s <code>/etc/passwd</code> file.<br/>
              <strong>Remediation:</strong> Enforce strong administrative passwords, disable public access via IP whitelisting, and isolate the web server process in an Apache chroot jail.
            </p>
          </div>

          {/* Finding 4: CSV Injection */}
          <div className={styles.findingCard}>
            <div className={styles.findingHeader}>
              <div>
                <span className={styles.badgeMedium}>MEDIUM · CVSS 6.0</span>
                <h3 className={styles.findingTitle} style={{ marginTop: '8px' }}>2.1.4 CSV / Formula Injection</h3>
              </div>
              <div className={styles.findingMetaRow}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Classification: <strong>Improper Input Validation / Formula Execution</strong></span>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
              <strong>Affected Functionality:</strong> Export to CSV feature<br/>
              <strong>Payload:</strong> <code>-2+3=cmd|&apos; /C calc&apos;!A0</code><br/>
              <strong>Impact:</strong> Formulas embedded in exported spreadsheets execute arbitrary shell commands when opened by spreadsheet software (MS Excel, LibreOffice).<br/>
              <strong>Remediation:</strong> Sanitize exports by prefixing all fields starting with <code>=</code>, <code>+</code>, <code>-</code>, or <code>@</code> with a single quote (<code>&apos;</code>).
            </p>
          </div>

          {/* Finding 5: Directory Listing */}
          <div className={styles.findingCard}>
            <div className={styles.findingHeader}>
              <div>
                <span className={styles.badgeLow}>LOW · CVSS 3.5</span>
                <h3 className={styles.findingTitle} style={{ marginTop: '8px' }}>2.1.5 Directory Listing Enabled</h3>
              </div>
              <div className={styles.findingMetaRow}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Classification: <strong>Information Disclosure / Indexing</strong></span>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
              <strong>Affected Path:</strong> <code>http://www.abcinc.com/icons/</code>, <code>/icons/small/</code><br/>
              <strong>Description:</strong> Automated index generation allows unauthenticated users to browse the directory structure.<br/>
              <strong>Remediation:</strong> Disable indexing globally in Apache configuration via <code>Options -Indexes</code>.
            </p>
          </div>
        </section>

        {/* ================= 4. CONCLUSION & ROADMAP ================= */}
        <section className={styles.reportCard}>
          <h2 className={styles.sectionHeading}>
            <CheckCircle2 size={26} color="#10b981" /> 4. Conclusion &amp; Strategic Hardening Recommendations
          </h2>
          <p className={styles.sectionDesc}>
            Prioritized remediation actions required to eliminate identified attack vectors before production deployment:
          </p>

          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: '#cbd5e1', fontSize: '0.95rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>1.</span>
              <span><strong>PHPMyAdmin Protection:</strong> Immediately password-protect or decommission unnecessary administrative portals.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>2.</span>
              <span><strong>Web Server Sandboxing:</strong> Implement Apache chroot environment and enforce least privilege to prevent local file reads.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>3.</span>
              <span><strong>SQL Parameterization:</strong> Mandate parameterized queries and prepared statements across all data-access layers.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>4.</span>
              <span><strong>CIS Benchmarks Hardening:</strong> Apply Center for Internet Security (CIS) benchmarks to OS, database, and web server layers.</span>
            </li>
          </ul>
        </section>

        {/* ================= 5. APPENDICES ================= */}
        <section className={styles.reportCard}>
          <h2 className={styles.sectionHeading}>
            <BookOpen size={26} color="#1e65ff" /> 5. Reference Appendices
          </h2>

          <h3 style={{ fontSize: '1.2rem', color: '#93c5fd', fontWeight: '700', marginBottom: '1rem' }}>
            Appendix B: 14 Penetration Testing Assessment Types
          </h3>

          <div className={styles.appendixGrid}>
            <div className={styles.appendixItem}>
              <div className={styles.appendixItemTitle}>Red Team Assessments</div>
              <div className={styles.appendixItemText}>Full-scope adversary simulation testing physical, technical, and human defenses.</div>
            </div>
            <div className={styles.appendixItem}>
              <div className={styles.appendixItemTitle}>Bug Bounties</div>
              <div className={styles.appendixItemText}>Crowdsourced vulnerability discovery rewarding verified security findings.</div>
            </div>
            <div className={styles.appendixItem}>
              <div className={styles.appendixItemTitle}>Black Box Testing</div>
              <div className={styles.appendixItemText}>Zero prior knowledge assessment simulating external attacker perspective.</div>
            </div>
            <div className={styles.appendixItem}>
              <div className={styles.appendixItemTitle}>Gray Box Testing</div>
              <div className={styles.appendixItemText}>Authenticated assessment with standard user credentials to test privilege escalation.</div>
            </div>
            <div className={styles.appendixItem}>
              <div className={styles.appendixItemTitle}>Source Code Review</div>
              <div className={styles.appendixItemText}>White-box static analysis identifying logic bugs and injection vulnerabilities in SDLC.</div>
            </div>
            <div className={styles.appendixItem}>
              <div className={styles.appendixItemTitle}>Internal Penetration Testing</div>
              <div className={styles.appendixItemText}>Auditing internal network security, Active Directory, and lateral movement risks.</div>
            </div>
            <div className={styles.appendixItem}>
              <div className={styles.appendixItemTitle}>Wireless &amp; War Driving</div>
              <div className={styles.appendixItemText}>Auditing 802.11 signal reach, rogue access points, and WPA encryption strength.</div>
            </div>
            <div className={styles.appendixItem}>
              <div className={styles.appendixItemTitle}>Social Engineering</div>
              <div className={styles.appendixItemText}>Simulated phishing and pretexting evaluating employee awareness and resilience.</div>
            </div>
            <div className={styles.appendixItem}>
              <div className={styles.appendixItemTitle}>Business Risk Approach</div>
              <div className={styles.appendixItemText}>Aligning penetration test cases directly with business impact and threat models.</div>
            </div>
            <div className={styles.appendixItem}>
              <div className={styles.appendixItemTitle}>Stress &amp; DoS Testing</div>
              <div className={styles.appendixItemText}>Gauging load tolerance and denial-of-service resilience under extreme traffic.</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
