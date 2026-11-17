'use client';

import { useState, useEffect } from 'react';
import styles from './Projects.module.css';
import Link from 'next/link';
import { CheckCircle2, Cloud, ShieldAlert, Search, Cpu, Crosshair, Network, Lock, Briefcase, Radio } from 'lucide-react';
import DataDustBackground from '../../components/DataDustBackground';
import DynamicHeroBackground from '../../components/DynamicHeroBackground';

import { projectsData } from '../../data/mockData';

const completedProjects = projectsData.filter(p => p.type === 'completed');

const focusAreas = [
  { 
    id: 1, 
    title: 'VAPT & Ethical Hacking', 
    desc: 'Full-spectrum vulnerability scanning, ethical hacking, and exploit analysis across web and mobile APIs.',
    points: [
      {
        title: 'OWASP Top 10 Web & Mobile App Assessment',
        details: 'Identifying and exploiting vulnerabilities including SQL Injection, Cross-Site Scripting (XSS), Server-Side Request Forgery (SSRF), Broken Access Control, and IDOR across web and mobile endpoints.'
      },
      {
        title: 'Automated Vulnerability Scanning & Risk Scoring',
        details: 'Continuous asset discovery and automated scanning with prioritized CVSS v3.1 scoring, eliminating false positives through manual verification.'
      },
      {
        title: 'REST & GraphQL API Security Audits',
        details: 'Deep analysis of API endpoints for authorization bypasses, rate limiting evasion, broken object-level authorization (BOLA), and business logic flaws.'
      },
      {
        title: 'Actionable Remediation & Proof of Concept (PoC)',
        details: 'Delivering detailed technical walkthroughs, reproducible exploit proofs, and customized remediation code patches to accelerate vulnerability fixing.'
      }
    ],
    icon: <Crosshair size={32} /> 
  },
  { 
    id: 2, 
    title: 'Network Security', 
    desc: 'Architecture defense, perimeter monitoring, firewall enforcement, and secure communication protocols.',
    points: [
      {
        title: 'Next-Gen Firewall (NGFW) & IDS/IPS Configuration',
        details: 'Authoring and fine-tuning deep packet inspection rules, traffic filtering, and signature-based intrusion detection/prevention systems.'
      },
      {
        title: 'Zero-Trust Network Architecture (ZTNA) & Segmentation',
        details: 'Enforcing micro-segmentation, software-defined perimeters, and continuous identity validation to prevent adversary lateral movement.'
      },
      {
        title: 'Network Traffic Telemetry & PCAP Forensics',
        details: 'Real-time packet inspection for protocol anomalies, covert data exfiltration channels, C2 beaconing jitter, and unauthorized listening services.'
      },
      {
        title: 'Secure VPN & Cryptographic Infrastructure',
        details: 'Deploying quantum-resistant IPsec/WireGuard encrypted tunnels, TLS 1.3 enforcement, and Public Key Infrastructure (PKI) certificate lifecycles.'
      }
    ],
    icon: <Network size={32} /> 
  },
  { 
    id: 3, 
    title: 'Physical Security', 
    desc: 'Facility access controls, hardware tamper resistance, surveillance auditing, and social engineering tests.',
    points: [
      {
        title: 'Biometric & RFID Access Control Audits',
        details: 'Testing badge cloning vulnerabilities, RFID/NFC replay exploits, and multi-factor biometric authentication controls safeguarding critical data centers.'
      },
      {
        title: 'CCTV Surveillance & Intrusion Detection Systems',
        details: 'Auditing camera blind spots, optical tamper detection, infrared motion sensors, and security operations center (SOC) physical dispatch alarms.'
      },
      {
        title: 'Physical Red Teaming & Social Engineering',
        details: 'Controlled on-site penetration tests assessing facility barriers, tailgating resistance, lock bypassing, and employee security policy adherence.'
      },
      {
        title: 'Hardware Tamper Resistance & Data Center Security',
        details: 'Hardening physical server chassis, protecting against rogue USB appliances (BadUSB), hardware keyloggers, and cold-boot physical RAM attacks.'
      }
    ],
    icon: <Lock size={32} /> 
  },
  { 
    id: 4, 
    title: 'Security Consulting', 
    desc: 'Strategic cybersecurity governance, compliance frameworks, risk management, and incident preparedness.',
    points: [
      {
        title: 'Compliance & Framework Alignment (ISO 27001, NIST, SOC 2)',
        details: 'Conducting comprehensive gap analyses against international security frameworks, authoring Information Security Management System (ISMS) policies, and ensuring regulatory compliance.'
      },
      {
        title: 'Cyber Risk Quantification & Threat Modeling',
        details: 'Utilizing STRIDE and FAIR methodologies to model threat actors, calculate business impact, and optimize security investment priorities.'
      },
      {
        title: 'Incident Response Playbooks & Tabletop Simulations',
        details: 'Authoring executive incident response runbooks and running live ransomware crisis tabletop simulations with C-suite stakeholders.'
      },
      {
        title: 'Third-Party Vendor Risk & Architecture Reviews',
        details: 'Evaluating enterprise IT architectures, performing third-party supply chain audits, and establishing continuous vendor security governance.'
      }
    ],
    icon: <Briefcase size={32} /> 
  },
  { 
    id: 5, 
    title: 'Cloud Security', 
    desc: 'Securing cloud infrastructure, multi-cloud AWS/Azure deployments, and containerized microservices.',
    points: [
      {
        title: 'AWS/Azure IAM & VPC Configuration Audits',
        details: 'Comprehensive assessment of Identity and Access Management policies, role privileges, and Virtual Private Cloud network segregation to prevent unauthorized access.'
      },
      {
        title: 'Container & Kubernetes Security (DevSecOps)',
        details: 'Scanning container images for vulnerabilities, securing Kubernetes clusters with role-based access control (RBAC), and implementing runtime threat detection.'
      },
      {
        title: 'Cloud Misconfiguration Detection',
        details: 'Automated auditing of storage buckets, security groups, and cloud databases to identify exposed data and enforce least privilege principles.'
      },
      {
        title: 'Data Encryption & Privacy Compliance',
        details: 'Ensuring data at rest and in transit is secured using KMS (Key Management Service) and TLS, aligning with GDPR, HIPAA, and industry compliance standards.'
      }
    ],
    icon: <Cloud size={32} /> 
  },
  { 
    id: 6, 
    title: 'Threat Intelligence', 
    desc: 'Dark web analysis, incident response, memory forensics, and proactive adversary threat hunting.',
    points: [
      {
        title: 'Dark Web OSINT & Data Breach Monitoring',
        details: 'Tracking underground forums, ransomware leak sites, and illicit marketplaces to identify stolen credentials and intellectual property.'
      },
      {
        title: 'Malware Analysis & Reverse Engineering',
        details: 'Static and dynamic analysis of malicious payloads in isolated sandboxes to extract Indicators of Compromise (IoCs) and adversary tactics.'
      },
      {
        title: 'Incident Response & Memory Forensics',
        details: 'Rapid containment of active breaches, memory dump analysis (Volatility), timeline reconstruction, and root-cause identification.'
      },
      {
        title: 'Proactive Threat Hunting Frameworks',
        details: 'Utilizing MITRE ATT&CK methodologies to actively search for hidden threats within enterprise networks before alarms trigger.'
      }
    ],
    icon: <Search size={32} /> 
  },
  { 
    id: 7, 
    title: 'AI & App Security', 
    desc: 'Securing artificial intelligence models, smart computing, SSDLC, and modern application ecosystems.',
    points: [
      {
        title: 'Adversarial Machine Learning Defenses',
        details: 'Protecting AI models against evasion attacks, prompt injection, and adversarial perturbations that attempt to manipulate model outputs.'
      },
      {
        title: 'AI Model Privacy & Data Poisoning Prevention',
        details: 'Safeguarding training datasets from malicious poisoning and ensuring model inversion attacks cannot extract sensitive data.'
      },
      {
        title: 'Smart Contract & Blockchain Security',
        details: 'Auditing Web3 applications for reentrancy attacks, integer overflows, and logic vulnerabilities within decentralized finance ecosystems.'
      },
      {
        title: 'Secure Software Development Lifecycle (SSDLC)',
        details: 'Integrating security into CI/CD pipelines via SAST, DAST, and SCA tools to ensure applications are built securely from the ground up.'
      }
    ],
    icon: <Cpu size={32} /> 
  },
  { 
    id: 8, 
    title: 'IoT & OT Security', 
    desc: 'Hardening smart connected devices, embedded firmware, and critical infrastructure SCADA systems.',
    points: [
      {
        title: 'Firmware Reverse Engineering & Binary Analysis',
        details: 'Extracting flash memory chips, decompiling RTOS/Linux firmware images, and identifying hardcoded cryptographic keys and backdoors.'
      },
      {
        title: 'ICS / SCADA & Critical Infrastructure Defense',
        details: 'Securing Modbus, DNP3, and PROFINET industrial automation protocols from physical disruption and malicious PLC logic injection.'
      },
      {
        title: 'Hardware Interface Security (JTAG, UART, SPI, I2C)',
        details: 'Interfacing directly with microcontrollers via hardware debug ports to assess secure bootloader integrity and memory protections.'
      },
      {
        title: 'Smart Connected Ecosystems & Edge Device Hardening',
        details: 'Implementing hardware-based Root of Trust (TPM/Secure Element), encrypted sensor telemetry, and secure OTA firmware signing.'
      }
    ],
    icon: <Radio size={32} /> 
  }
];

export default function ProjectsPage() {
  const [expandedPoint, setExpandedPoint] = useState(null);

  const togglePoint = (id) => {
    setExpandedPoint(expandedPoint === id ? null : id);
  };

  return (
    <div className={styles.projectsPage}>
      <DataDustBackground />
      {/* ===== HERO ===== */}
      <section className="dynamic-hero-section">
        <DynamicHeroBackground />
        <div className="dynamic-hero-content">
          <h1 className={styles.heroTitle}>Projects</h1>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>Projects</span>
          </div>
        </div>
      </section>



      {/* ===== FOCUS AREAS ===== */}
      <section className={styles.focusWrapper}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Key Focus Areas</h2>
          <p className={styles.sectionSubtitle}>
            Our core research domains driving innovation in cybersecurity.
          </p>

          <div className={styles.focusGrid}>
            {focusAreas.map(area => (
              <div key={area.id} className={styles.focusCard}>
                <div className={styles.focusIcon}>{area.icon}</div>
                <h3 className={styles.focusTitle}>{area.title}</h3>
                <p className={styles.focusDesc}>{area.desc}</p>
                <ul className={styles.focusPoints}>
                  {area.points.map((point, i) => {
                    const pointId = `${area.id}-${i}`;
                    const isExpanded = expandedPoint === pointId;
                    return (
                      <li key={i} className={styles.focusPointItem}>
                        <div 
                          className={styles.focusPointTitle} 
                          onClick={() => togglePoint(pointId)}
                        >
                          <span>{point.title}</span>
                          <span className={styles.focusPointToggle}>{isExpanded ? '−' : '+'}</span>
                        </div>
                        {isExpanded && (
                          <div className={styles.focusPointDetails}>
                            {point.details}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPLETED PROJECTS ===== */}
      <section className={styles.completedWrapper}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Completed Projects</h2>
          <p className={styles.sectionSubtitle}>
            Past research that has contributed to publications, patents, and
            real-world cybersecurity advancements.
          </p>

          <div className={styles.completedGrid}>
            {completedProjects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} className={styles.completedCard} style={{ display: 'block', textDecoration: 'none' }}>
                <div className={styles.completedHeader}>
                  <div className={styles.completedCheckmark}><CheckCircle2 size={24} /></div>
                  <span className={styles.completedYear}>Completed</span>
                </div>
                <h3 className={styles.completedTitle}>{project.title}</h3>
                <div className={styles.completedFooter}>

                  <span className={styles.viewDetailsLink}>View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
