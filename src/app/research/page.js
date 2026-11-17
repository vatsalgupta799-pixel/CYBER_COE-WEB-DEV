'use client';

import Link from 'next/link';
import { Microscope, FileText, ExternalLink, ScrollText } from 'lucide-react';
import DataDustBackground from '../../components/DataDustBackground';
import DynamicHeroBackground from '../../components/DynamicHeroBackground';
import styles from './Research.module.css';

const sciManuscripts = [
  { title: "Fortifying Home IoT Security: A Framework for comprehensive examination of vulnerabilities and intrusion detection strategies for smart cities", journal: "Egyptian Informatics journal", date: "February 2024", points: ["Analyzes vulnerabilities inherent in smart city IoT deployments.", "Proposes an advanced intrusion detection strategy for home networks.", "Enhances data privacy and device authentication protocols."] },
  { title: "Diabetic Retinopathy detection using Deep Learning with Optimized Feature Selection", journal: "Traitement du Signal journal", date: "May 2024", points: ["Implements deep learning models for early-stage disease detection.", "Utilizes optimized feature selection to improve classification accuracy.", "Reduces computational overhead while maintaining high precision."] },
  { title: "Proactive Threat Intelligence to detect Persistent Behaviour-based Adversaries", journal: "Egyptian Informatics journal", date: "August 2024", points: ["Develops a behavioral analysis framework for advanced persistent threats (APTs).", "Integrates proactive threat hunting techniques with machine learning.", "Significantly reduces the mean time to detect (MTTD) stealthy adversaries."] },
  { title: "Unmasking Vulnerabilities by A Pioneering Approach to Securing Smart IoT Cameras through Threat Surface Analysis and Dynamic Metrics", journal: "Egyptian Informatics journal", date: "August 2024", points: ["Conducts comprehensive threat surface analysis on smart camera firmware.", "Introduces dynamic security metrics for real-time risk assessment.", "Mitigates unauthorized access and video feed interception risks."] },
  { title: "Fake Social Media News and Distorted Campaign Detection Framework Using Sentiment Analysis & Machine Learning", journal: "Science Direct Heliyon Journal", date: "August 2024", points: ["Employs natural language processing to identify coordinated disinformation.", "Combines sentiment analysis with behavioral ML models.", "Achieves high accuracy in flagging artificially amplified campaigns."] },
  { title: "Securing cyber-physical robotic systems for enhanced data security and real-time threat mitigation", journal: "EURASIP Journal on Information Security", date: "January 2025", points: ["Focuses on the intersection of robotics, OT, and cybersecurity.", "Implements real-time mitigation protocols for cyber-physical attacks.", "Ensures data integrity and operational safety in automated environments."] },
  { title: "Robust Machine Learning Intrusion Detection Systems Using Simple Statistical Techniques in Feature Selection", journal: "Springer Nature Scientific Reports", date: "February 2025", points: ["Simplifies feature engineering using robust statistical methods.", "Improves the training efficiency of intrusion detection systems.", "Demonstrates high resilience against adversarial evasion techniques."] },
  { title: "IAPN: Framework to secure IoT-based infrastructures using Private APN", journal: "Egyptian Informatics", date: "March 2025", points: ["Proposes a cellular-level security architecture using Private APNs.", "Isolates IoT traffic from the public internet to prevent exposure.", "Enhances end-to-end encryption and access control for remote sensors."] },
  { title: "Threat Hunting for Adversary Impact Inhibiting System Recovery", journal: "ScienceDirect Computers & Security", date: "March 2025", points: ["Analyzes adversary tactics aimed at disrupting backup and recovery systems.", "Develops threat hunting playbooks specifically for ransomware resilience.", "Ensures business continuity by protecting critical recovery infrastructure."] },
  { title: "Threat Hunting the Shadows: Detecting Adversary Lateral Movement with Elasticsearch", journal: "IEEE Access", date: "April 2025", points: ["Utilizes Elasticsearch for large-scale security telemetry analysis.", "Identifies anomalous authentication and lateral movement patterns.", "Enhances visibility into shadow IT and unmonitored network segments."] },
  { title: "Analyzing Human Trafficking Networks Using Graph-Based Visualization and ARIMA Time Series Forecasting", journal: "Journal of Cybersecurity", date: "June 2025", points: ["Applies graph theory to map and disrupt illicit trafficking networks.", "Uses ARIMA forecasting to predict illicit activity trends and hotspots.", "Aids law enforcement with actionable, data-driven intelligence."] },
  { title: "Elasticsearch-based Threat Hunting to detect Privilege Escalation using Registry Modification and Process Injection attacks", journal: "MDPI Future Internet Journal", date: "August 2025", points: ["Focuses on advanced endpoint telemetry and SIEM integration.", "Detects sophisticated process injection and registry persistence mechanisms.", "Automates the correlation of privilege escalation indicators."] }
];

const scopusManuscripts = [
  { title: "Unique Raspberry Pi-based Honeypot", journal: "International Conference on Recent Advances in Science and Engineering Technology (ICRASET)", date: "February 2024", points: ["Deploys cost-effective, low-interaction honeypots using Raspberry Pi.", "Gathers intelligence on automated scanning and brute-force attacks.", "Provides scalable deployment architectures for distributed networks."] },
  { title: "MICORD-IDS: A Hybrid Learning System for Intrusion Detection System for Internet of Vehicles", journal: "7th International Conference on Information and Computer Technologies (ICICT)", date: "June 2024", points: ["Addresses the unique security challenges of connected and autonomous vehicles.", "Combines hybrid learning models to detect vehicular network anomalies.", "Ensures low-latency processing suitable for moving vehicle clusters."] },
  { title: "Review of Security Threats and Attacks on IoT based new age Ecosystems", journal: "7th International Conference on Information and Computer Technologies (ICICT)", date: "June 2024", points: ["Systematically categorizes emerging attack vectors in IoT ecosystems.", "Evaluates the effectiveness of current cryptographic standards on edge devices.", "Highlights the need for standardized IoT security frameworks."] },
  { title: "Framework to analyse and Exploit the Smart Home IoT Firmware", journal: "Science Direct Measurement Sensors", date: "December 2024", points: ["Details methodologies for reverse-engineering embedded device firmware.", "Identifies hardcoded credentials, backdoors, and vulnerable libraries.", "Proposes automated patching and secure boot implementations."] },
  { title: "Unique Taxonomy and Review of New Age Smart Home IoT Forensics Tools", journal: "Recent Advances in Computer Science and Communications", date: "January 2025", points: ["Classifies digital forensic tools applicable to smart home environments.", "Discusses challenges in data extraction from proprietary IoT architectures.", "Provides a comprehensive taxonomy for forensic investigators."] },
  { title: "Residual Network-Based Deep Learning Framework for Diabetic Retinopathy Detection", journal: "Journal of Database Management", date: "February 2025", points: ["Leverages ResNet architectures for complex medical image analysis.", "Optimizes neural network depth for faster convergence and accuracy.", "Contributes to automated, AI-driven healthcare diagnostics."] },
  { title: "Enhancing Cloud Security: Analysis of Vulnerabilities and Resilient Framework Proposal", journal: "Grenze International Journal of Engineering and Technology", date: "March 2025", points: ["Assesses common misconfigurations in multi-tenant cloud environments.", "Proposes a resilient framework utilizing zero-trust architecture.", "Focuses on continuous compliance and automated remediation."] },
  { title: "AI-Driven Adaptive Access Control in Multi-Cloud Environments: A Cognitive Security Framework", journal: "Journal of Information Systems Engineering and Management", date: "March 2025", points: ["Replaces static access controls with dynamic, context-aware AI models.", "Adapts privileges based on user behavior and real-time risk scores.", "Simplifies identity and access management (IAM) across cloud boundaries."] },
  { title: "Unique Art of Hiding and Recovering Secret Information from Digital Files", journal: "8th International Conference on Information and Computer Technology", date: "July 2025", points: ["Explores advanced steganography and digital watermarking techniques.", "Analyzes methods for both embedding and recovering covert data.", "Discusses implications for digital rights management and secure communications."] }
];

export default function ResearchPage() {
  const allManuscripts = [...sciManuscripts, ...scopusManuscripts];

  return (
    <div className={styles.researchPage}>
      <DataDustBackground />
      {/* ===== HERO ===== */}
      <section className="dynamic-hero-section">
        <DynamicHeroBackground />
        <div className="dynamic-hero-content">
          <h1 className={styles.heroTitle}>Research Manuscripts</h1>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>Research</span>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className={styles.contentWrapper}>
        <div className={styles.section}>
          <div className={styles.interactiveContainer}>
            <div className={styles.paperGrid}>
              {allManuscripts.map((paper, idx) => (
                <div key={idx} className={styles.paperCard}>
                  <div className={styles.paperIndex}>{(idx + 1).toString().padStart(2, '0')}</div>
                  <div className={styles.paperBody}>
                    <h3 className={styles.paperTitle}>{paper.title}</h3>
                    <div className={styles.paperMeta}>
                      <span className={styles.paperJournal}>{paper.journal}</span>
                      <span className={styles.paperDate}>{paper.date}</span>
                    </div>
                    <ul className={styles.paperPoints}>
                      {paper.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
