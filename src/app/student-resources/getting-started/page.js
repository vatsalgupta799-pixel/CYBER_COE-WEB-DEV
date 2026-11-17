'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Terminal,
  Network,
  Code2,
  Boxes,
  Cpu,
  ShieldCheck,
  Award,
  Swords,
  Flag,
  ArrowRight,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Flame,
  BrainCircuit,
  Eye,
  Scale,
  Compass,
  Info,
  Layers,
  GraduationCap
} from 'lucide-react';
import DataDustBackground from '../../../components/DataDustBackground';
import DynamicHeroBackground from '../../../components/DynamicHeroBackground';
import styles from './GettingStarted.module.css';

// Roadmap Stages
const roadmapStages = [
  { id: 'os', step: '01', title: 'Operating Systems', icon: Terminal, color: '#3b82f6' },
  { id: 'networking', step: '02', title: 'Networking', icon: Network, color: '#60a5fa' },
  { id: 'programming', step: '03', title: 'Programming', icon: Code2, color: '#a855f7' },
  { id: 'virtualization', step: '04', title: 'Virtualization', icon: Boxes, color: '#ec4899' },
  { id: 'ai-basics', step: '05', title: 'AI Basics', icon: Cpu, color: '#06b6d4' },
  { id: 'security-fundamentals', step: '06', title: 'Cyber Fundamentals', icon: ShieldCheck, color: '#10b981' },
  { id: 'soft-skills', step: '07', title: 'Soft Skills', icon: BrainCircuit, color: '#f59e0b' },
  { id: 'certifications', step: '08', title: 'Certifications', icon: Award, color: '#ef4444' },
  { id: 'practice-roadmap', step: '09', title: 'Hands-on Practice', icon: Swords, color: '#8b5cf6' },
];

// Interactive Checklist Categories & Items
const initialChecklist = [
  {
    category: 'Operating System Basics',
    items: [
      { id: 'os-func', label: 'Understand system architecture & device functions' },
      { id: 'os-trouble', label: 'Basic hardware & software troubleshooting' },
      { id: 'os-linux', label: 'Linux OS file system & core navigation' },
      { id: 'os-cmd', label: 'Linux permissions, pipes, grep & bash commands' },
      { id: 'os-win', label: 'Windows Server administration & Active Directory basics' }
    ]
  },
  {
    category: 'Networking Fundamentals',
    items: [
      { id: 'net-model', label: 'TCP/IP and OSI 7-Layer reference models' },
      { id: 'net-sub', label: 'Subnetting, IPv4 and IPv6 addressing' },
      { id: 'net-route', label: 'Routing, Switching & LAN/WAN infrastructure' },
      { id: 'net-proto', label: 'Application protocols (HTTP/S, DNS, DHCP, SSH, FTP, SMTP)' },
      { id: 'net-sec', label: 'Security controls (Firewalls, Honeypots, IDS/IPS, NAT, VPN)' }
    ]
  },
  {
    category: 'Programming & Scripting',
    items: [
      { id: 'prog-cpp', label: 'C / C++ memory allocation & compiled code concepts' },
      { id: 'prog-py', label: 'Python scripting for cybersecurity automation' },
      { id: 'prog-bash', label: 'Bash & PowerShell administrative scripting' },
      { id: 'prog-sql', label: 'SQL queries, Relational databases & MongoDB basics' },
      { id: 'prog-web', label: 'Web foundation: HTML, CSS & JavaScript execution' }
    ]
  },
  {
    category: 'Virtualization & Containers',
    items: [
      { id: 'virt-basics', label: 'Virtualization principles & Hypervisor types' },
      { id: 'virt-vm', label: 'VMware Workstation & VirtualBox isolated lab setups' },
      { id: 'virt-docker', label: 'Docker containers, images & containerized services' }
    ]
  },
  {
    category: 'AI & Security Fundamentals',
    items: [
      { id: 'ai-funda', label: 'AI fundamentals & modern cybersecurity impact' },
      { id: 'sec-cia', label: 'CIA Triad (Confidentiality, Integrity, Availability)' },
      { id: 'sec-crypto', label: 'Cryptography: Hashing vs Symmetric/Asymmetric Encryption' },
      { id: 'sec-threats', label: 'Threat vectors: Malware, Phishing, Social Engineering & DoS' },
      { id: 'sec-tls', label: 'SSL/TLS handshake & secure communication' }
    ]
  },
  {
    category: 'Soft Skills & Ethics',
    items: [
      { id: 'soft-prob', label: 'Diagnostic problem-solving methodology' },
      { id: 'soft-learn', label: 'Continuous self-learning & research mindset' },
      { id: 'soft-detail', label: 'Attention to detail, log auditing & documentation' },
      { id: 'soft-ethics', label: 'Ethical mindset & legal authorization boundaries' }
    ]
  }
];

export default function GettingStartedPage() {
  const [checkedItems, setCheckedItems] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  // Total items calculation
  const totalItemsCount = initialChecklist.reduce((acc, cat) => acc + cat.items.length, 0);

  // Initialize and load persisted progress
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('cybercoe_getting_started_progress');
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
  }, []);

  // Save progress changes
  const toggleCheck = (itemId) => {
    const updated = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId]
    };
    setCheckedItems(updated);
    try {
      localStorage.setItem('cybercoe_getting_started_progress', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset your checklist progress?')) {
      setCheckedItems({});
      try {
        localStorage.removeItem('cybercoe_getting_started_progress');
      } catch (e) {
        console.error('Failed to clear progress', e);
      }
    }
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = Math.round((checkedCount / totalItemsCount) * 100) || 0;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <DataDustBackground />

      {/* ===== 1. HERO SECTION ===== */}
      <section className="dynamic-hero-section" style={{ minHeight: '480px', paddingTop: '100px', paddingBottom: '60px' }}>
        <DynamicHeroBackground />
        <div className="dynamic-hero-content" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div className={styles.heroBadge}>
            <Compass size={16} /> Prerequisite Roadmap for Students
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: '900',
            color: 'white',
            marginBottom: '1rem',
            textShadow: '0 4px 25px rgba(0,0,0,0.7)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15
          }}>
            Getting Started with Cybersecurity
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: '#ffffff',
            fontWeight: '500',
            maxWidth: '850px',
            marginBottom: '1.25rem',
            lineHeight: 1.5
          }}>
            A beginner-friendly roadmap to build the technical, practical, and professional skills required for Penetration Testing &amp; Ethical Hacking.
          </p>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.75)',
            maxWidth: '800px',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            Before starting advanced cybersecurity labs, students should build a strong foundation in operating systems, networking, programming, virtualization, AI, and core cybersecurity concepts.
          </p>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '8px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/student-resources" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Student Resources</Link>
            <span>›</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>Getting Started</span>
          </div>

          {/* Action Buttons */}
          <div className={styles.heroBtnGroup}>
            <button onClick={() => scrollToSection('roadmap')} className={styles.primaryBtn}>
              <Sparkles size={18} /> Start Learning
            </button>
            <Link href="/practice-labs" className={styles.secondaryBtn}>
              <Swords size={18} /> View Practice Labs
            </Link>
          </div>

        </div>
      </section>

      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className={styles.contentSection}>

        {/* ===== 2. LEARNING ROADMAP ===== */}
        <section id="roadmap" className={styles.roadmapSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.heroBadge} style={{ marginBottom: '0.75rem' }}>
              Step-by-Step Learning Path
            </div>
            <h2 className={styles.sectionTitle}>Cybersecurity Prerequisite Roadmap</h2>
            <p className={styles.sectionSubtitle}>
              Follow the recommended progression to build deep conceptual clarity before tackling vulnerable targets and penetration testing environments.
            </p>
          </div>

          <div className={styles.roadmapGrid}>
            {roadmapStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.id}
                  onClick={() => scrollToSection(stage.id)}
                  className={styles.roadmapCard}
                  style={{ '--card-accent': stage.color }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection(stage.id); }}
                >
                  <span className={styles.roadmapStepNum}>{stage.step}</span>
                  <div className={styles.roadmapIconWrapper} style={{ color: stage.color }}>
                    <Icon size={22} />
                  </div>
                  <span className={styles.roadmapCardTitle}>{stage.title}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== 3. STUDENT PROGRESS TRACKER ===== */}
        <section className={styles.trackerBox}>
          <div className={styles.trackerTop}>
            <div className={styles.trackerTitleGroup}>
              <CheckCircle2 size={28} className={styles.trackerIcon} />
              <div>
                <h3 className={styles.trackerHeading}>Prerequisites Readiness Tracker</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Track your mastery across foundational topics. Progress saves automatically in your browser.
                </p>
              </div>
            </div>

            <div className={styles.trackerControls}>
              <span className={styles.trackerPercentBadge}>
                {isMounted ? `${progressPercentage}% Completed` : '0% Completed'}
              </span>
              {isMounted && checkedCount > 0 && (
                <button onClick={handleResetProgress} className={styles.resetBtn} title="Reset progress">
                  <RotateCcw size={13} style={{ display: 'inline', marginRight: '4px' }} /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${isMounted ? progressPercentage : 0}%` }}
            />
          </div>

          {/* Checklist by Category */}
          <div className={styles.checklistGrid}>
            {initialChecklist.map((cat, idx) => (
              <div key={idx} className={styles.checkCategory}>
                <div className={styles.checkCategoryHeader}>
                  <Layers size={16} /> {cat.category}
                </div>
                <div className={styles.checkItemList}>
                  {cat.items.map((item) => {
                    const isChecked = Boolean(checkedItems[item.id]);
                    return (
                      <label key={item.id} className={styles.checkItem}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheck(item.id)}
                          className={styles.checkboxInput}
                        />
                        <span className={isChecked ? styles.checkItemCompleted : ''}>
                          {item.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 4. TECHNICAL SKILLS SECTION ===== */}
        <div id="technical-skills" style={{ marginBottom: '3.5rem' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.heroBadge} style={{ marginBottom: '0.75rem' }}>
              Foundational Knowledge
            </div>
            <h2 className={styles.sectionTitle}>Technical Skills</h2>
            <p className={styles.sectionSubtitle}>
              Penetration testers and security engineers must master underlying computing systems to understand how they break, defend, and communicate.
            </p>
          </div>
        </div>

        {/* 01 — Operating Systems */}
        <section id="os" className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryCardTop}>
              <div className={styles.categoryIconWrapper} style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                <Terminal size={32} />
              </div>
              <div>
                <span className={styles.categoryBadgeNum} style={{ color: '#60a5fa' }}>STAGE 01</span>
                <h3 className={styles.categoryTitle}>Operating Systems</h3>
                <p className={styles.categoryDesc}>
                  Learn how operating systems interact with hardware, manage memory, handle users and processes, and enforce security permissions.
                </p>
              </div>
            </div>

            {/* Topics */}
            <div className={styles.topicsContainer}>
              <div className={styles.topicsLabel}>
                <BookOpen size={15} /> Core Topics Covered
              </div>
              <div className={styles.topicsGrid}>
                <span className={styles.topicPill}>Understanding how systems &amp; devices function</span>
                <span className={styles.topicPill}>Basic troubleshooting</span>
                <span className={styles.topicPill}>Linux operating system</span>
                <span className={styles.topicPill}>Linux commands &amp; Bash</span>
                <span className={styles.topicPill}>Windows Server administration</span>
              </div>
            </div>

            {/* Resource Cards */}
            <div className={styles.resourcesSubheader}>
              <GraduationCap size={20} style={{ color: '#3b82f6' }} /> Recommended Learning Resources
            </div>
            <div className={styles.resourceCardGrid}>
              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Practical Help Desk</h4>
                  <p className={styles.resCardDesc}>
                    Learn fundamental IT troubleshooting, operating systems architecture, and core enterprise support concepts with TCM Security Academy.
                  </p>
                </div>
                <a
                  href="https://tcm-sec.com/academy/practical-help-desk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Linux 100 Fundamentals</h4>
                  <p className={styles.resCardDesc}>
                    Master command line navigation, user privilege hierarchies, process management, and core utilities essential for security testing.
                  </p>
                </div>
                <a
                  href="https://tcm-sec.com/academy/linux-100-fundamentals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeIntermediate}`}>Intermediate</span>
                    <span className={styles.badgeType}>Course / Directory</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Windows Server Administration</h4>
                  <p className={styles.resCardDesc}>
                    Understand Active Directory, Group Policies (GPOs), domain structures, and Windows security management on Alison.
                  </p>
                </div>
                <a
                  href="https://alison.com/courses?query=windows%20server%20admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Networking */}
        <section id="networking" className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryCardTop}>
              <div className={styles.categoryIconWrapper} style={{ color: '#60a5fa', background: 'rgba(96, 165, 250, 0.1)', borderColor: 'rgba(96, 165, 250, 0.3)' }}>
                <Network size={32} />
              </div>
              <div>
                <span className={styles.categoryBadgeNum} style={{ color: '#93c5fd' }}>STAGE 02</span>
                <h3 className={styles.categoryTitle}>Networking</h3>
                <p className={styles.categoryDesc}>
                  Networking is the backbone of cybersecurity. To attack or defend digital assets, you must understand packet flows, OSI layers, and network defenses.
                </p>
              </div>
            </div>

            {/* Topics */}
            <div className={styles.topicsContainer}>
              <div className={styles.topicsLabel}>
                <BookOpen size={15} /> Core Networking Concepts &amp; Protocols
              </div>
              <div className={styles.topicsGrid}>
                <span className={styles.topicPill}>Wireless networking</span>
                <span className={styles.topicPill}>LAN cables &amp; Physical media</span>
                <span className={styles.topicPill}>TCP/IP Protocol Suite</span>
                <span className={styles.topicPill}>OSI Model (7 Layers)</span>
                <span className={styles.topicPill}>Subnetting (CIDR)</span>
                <span className={styles.topicPill}>IPv4 &amp; IPv6</span>
                <span className={styles.topicPill}>Routing &amp; Switching</span>
                <span className={styles.topicPill}>HTTP &amp; HTTPS</span>
                <span className={styles.topicPill}>FTP</span>
                <span className={styles.topicPill}>SSH</span>
                <span className={styles.topicPill}>DNS</span>
                <span className={styles.topicPill}>DHCP</span>
                <span className={styles.topicPill}>SMTP</span>
                <span className={styles.topicPill}>POP3</span>
              </div>

              <div className={styles.securityTechLabel}>
                🛡️ Key Security Technologies to Understand
              </div>
              <div className={styles.topicsGrid}>
                <span className={styles.topicPill} style={{ borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.1)' }}>Firewalls (Stateful &amp; Packet Filtering)</span>
                <span className={styles.topicPill} style={{ borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.1)' }}>Honeypots &amp; Deception Tech</span>
                <span className={styles.topicPill} style={{ borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.1)' }}>IDS / IPS (Snort, Suricata)</span>
                <span className={styles.topicPill} style={{ borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.1)' }}>NAT (Network Address Translation)</span>
                <span className={styles.topicPill} style={{ borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.1)' }}>VPN (IPsec, WireGuard, OpenVPN)</span>
              </div>
            </div>

            {/* Resource Cards */}
            <div className={styles.resourcesSubheader}>
              <GraduationCap size={20} style={{ color: '#60a5fa' }} /> Recommended Learning Resources
            </div>
            <div className={styles.resourceCardGrid}>
              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeFoundational}`}>Foundational</span>
                    <span className={styles.badgeType}>Portal</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Cisco Networking Academy</h4>
                  <p className={styles.resCardDesc}>
                    Comprehensive world-standard curriculum for enterprise network routing, switching, and security infrastructure.
                  </p>
                </div>
                <a
                  href="https://www.netacad.com/networking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Cisco Networking Basics</h4>
                  <p className={styles.resCardDesc}>
                    Hands-on introductory course covering how networks operate, addressing models, and device interconnection.
                  </p>
                </div>
                <a
                  href="https://www.netacad.com/courses/networking-basics?courseLang=en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Tutorial</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Firewall Fundamentals</h4>
                  <p className={styles.resCardDesc}>
                    Free instructional training on Great Learning exploring firewall architectures, rule design, and network perimeter protection.
                  </p>
                </div>
                <a
                  href="https://www.mygreatlearning.com/academy/learn-for-free/courses/firewall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeIntermediate}`}>Intermediate</span>
                    <span className={styles.badgeType}>Tutorial</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Honeypot Security Fundamentals</h4>
                  <p className={styles.resCardDesc}>
                    Understand decoy systems, telemetry collection, and how honeypots lure threat actors on Udemy.
                  </p>
                </div>
                <a
                  href="https://www.udemy.com/tutorial/microsoft-security-fundamentals/honeypots/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeIntermediate}`}>Intermediate</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Intrusion Detection Systems (IDS)</h4>
                  <p className={styles.resCardDesc}>
                    Deep dive into signature and anomaly-based intrusion detection systems with Coursera &amp; Class Central.
                  </p>
                </div>
                <a
                  href="https://www.classcentral.com/course/coursera-introduction-to-intrusion-detection-systems-ids-380825"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Programming & Scripting */}
        <section id="programming" className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryCardTop}>
              <div className={styles.categoryIconWrapper} style={{ color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                <Code2 size={32} />
              </div>
              <div>
                <span className={styles.categoryBadgeNum} style={{ color: '#c084fc' }}>STAGE 03</span>
                <h3 className={styles.categoryTitle}>Programming &amp; Scripting</h3>
                <p className={styles.categoryDesc}>
                  Master code to analyze vulnerabilities, build automated exploits, inspect malicious scripts, and query data stores.
                </p>
              </div>
            </div>

            {/* Explanatory Callout */}
            <div className={styles.calloutNote}>
              <Info size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Why Programming Matters:</strong> Programming and scripting help cybersecurity students automate tasks, understand how applications work, interact with systems, analyze data, and eventually understand vulnerabilities at a deeper level.
              </div>
            </div>

            {/* Topics */}
            <div className={styles.topicsContainer}>
              <div className={styles.topicsLabel}>
                <BookOpen size={15} /> Key Languages, Runtimes &amp; Databases
              </div>
              <div className={styles.topicsGrid}>
                <span className={styles.topicPill}>C &amp; C++</span>
                <span className={styles.topicPill}>Data Structures</span>
                <span className={styles.topicPill}>Python (Automation &amp; Sockets)</span>
                <span className={styles.topicPill}>Bash Scripting</span>
                <span className={styles.topicPill}>PowerShell</span>
                <span className={styles.topicPill}>SQL &amp; SQL Server</span>
                <span className={styles.topicPill}>MongoDB</span>
                <span className={styles.topicPill}>HTML</span>
                <span className={styles.topicPill}>CSS</span>
                <span className={styles.topicPill}>JavaScript</span>
              </div>
            </div>

            {/* Resource Cards */}
            <div className={styles.resourcesSubheader}>
              <GraduationCap size={20} style={{ color: '#a855f7' }} /> Recommended Learning Resources
            </div>
            <div className={styles.resourceCardGrid}>
              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Programming 100 Fundamentals</h4>
                  <p className={styles.resCardDesc}>
                    Core logic, flow control, variables, functions, and cybersecurity scripting basics with TCM Security Academy.
                  </p>
                </div>
                <a
                  href="https://tcm-sec.com/academy/programming-100-fundamentals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Linux Shell Scripting</h4>
                  <p className={styles.resCardDesc}>
                    Free Udemy course teaching how to write bash scripts, automate repetitive administrative tasks, and process outputs.
                  </p>
                </div>
                <a
                  href="https://www.udemy.com/course/linux-shell-scripting-free/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Tutorials</span>
                  </div>
                  <h4 className={styles.resCardTitle}>SQL Fundamentals</h4>
                  <p className={styles.resCardDesc}>
                    Learn SQL relational database syntax, queries, tables, and clauses essential for understanding SQL Injection vulnerabilities.
                  </p>
                </div>
                <a
                  href="https://www.udemy.com/topic/sql/free/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — Virtualization & Containers */}
        <section id="virtualization" className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryCardTop}>
              <div className={styles.categoryIconWrapper} style={{ color: '#ec4899', background: 'rgba(236, 72, 153, 0.1)', borderColor: 'rgba(236, 72, 153, 0.3)' }}>
                <Boxes size={32} />
              </div>
              <div>
                <span className={styles.categoryBadgeNum} style={{ color: '#f472b6' }}>STAGE 04</span>
                <h3 className={styles.categoryTitle}>Virtualization &amp; Containers</h3>
                <p className={styles.categoryDesc}>
                  Create safe, isolated sandboxes where you can detonate malware, run vulnerable servers, and launch penetration testing machines.
                </p>
              </div>
            </div>

            {/* Callout Note */}
            <div className={styles.calloutNote}>
              <Info size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Key Cybersecurity Context:</strong> Virtualization is especially important for cybersecurity students because security labs often require isolated virtual machines and controlled environments.
              </div>
            </div>

            {/* Topics */}
            <div className={styles.topicsContainer}>
              <div className={styles.topicsLabel}>
                <BookOpen size={15} /> Core Topics Covered
              </div>
              <div className={styles.topicsGrid}>
                <span className={styles.topicPill}>Virtualization basics</span>
                <span className={styles.topicPill}>Virtual machines (VMs)</span>
                <span className={styles.topicPill}>VMware Workstation</span>
                <span className={styles.topicPill}>Docker architecture</span>
                <span className={styles.topicPill}>Containers &amp; Microservices</span>
              </div>
            </div>

            {/* Resource Cards */}
            <div className={styles.resourcesSubheader}>
              <GraduationCap size={20} style={{ color: '#ec4899' }} /> Recommended Learning Resources
            </div>
            <div className={styles.resourceCardGrid}>
              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Virtualization One-Hour Crash Course</h4>
                  <p className={styles.resCardDesc}>
                    Learn how hypervisors emulate hardware, create virtual adapters, and segment computing resources on Udemy.
                  </p>
                </div>
                <a
                  href="https://www.udemy.com/course/virtualization-one-hour-crash-course/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>VMware Workstation Crash Course</h4>
                  <p className={styles.resCardDesc}>
                    Step-by-step setup for Kali Linux, vulnerable VMs, snapshot management, and custom Host-Only/NAT virtual networks.
                  </p>
                </div>
                <a
                  href="https://www.udemy.com/course/vmware-workstation-17-crash-course-2023/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Docker from Scratch</h4>
                  <p className={styles.resCardDesc}>
                    Learn how Docker images, Dockerfiles, and runtime containers function without overhead on Udemy.
                  </p>
                </div>
                <a
                  href="https://www.udemy.com/course/docker-from-scratch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Containers 101</h4>
                  <p className={styles.resCardDesc}>
                    Understand container isolation namespaces, cgroups, and containerized deployment workflows.
                  </p>
                </div>
                <a
                  href="https://www.udemy.com/course/containers-101/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — AI Basics */}
        <section id="ai-basics" className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryCardTop}>
              <div className={styles.categoryIconWrapper} style={{ color: '#06b6d4', background: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
                <Cpu size={32} />
              </div>
              <div>
                <span className={styles.categoryBadgeNum} style={{ color: '#67e8f9' }}>STAGE 05</span>
                <h3 className={styles.categoryTitle}>AI Basics</h3>
                <p className={styles.categoryDesc}>
                  Understand the fundamentals of Artificial Intelligence and become familiar with how AI is becoming part of modern technology and cybersecurity.
                </p>
              </div>
            </div>

            <div className={styles.resourcesSubheader}>
              <GraduationCap size={20} style={{ color: '#06b6d4' }} /> Recommended Learning Resource
            </div>
            <div className={styles.resourceCardGrid}>
              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>AI 100 Fundamentals</h4>
                  <p className={styles.resCardDesc}>
                    Understand core Artificial Intelligence concepts, machine learning fundamentals, and how AI technologies integrate into modern IT and cyber defense.
                  </p>
                </div>
                <a
                  href="https://tcm-sec.com/academy/ai-100-fundamentals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — Cybersecurity Fundamentals */}
        <section id="security-fundamentals" className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryCardTop}>
              <div className={styles.categoryIconWrapper} style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                <ShieldCheck size={32} />
              </div>
              <div>
                <span className={styles.categoryBadgeNum} style={{ color: '#34d399' }}>STAGE 06</span>
                <h3 className={styles.categoryTitle}>Cybersecurity Fundamentals</h3>
                <p className={styles.categoryDesc}>
                  Learn core security principles, attack categories, cryptography foundations, and defensive controls that safeguard data.
                </p>
              </div>
            </div>

            {/* Highlighted Warning Callout */}
            <div className={styles.calloutWarning}>
              <AlertTriangle size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#f59e0b' }} />
              <div>
                <strong>Essential Foundation:</strong> Students should understand these concepts before moving into advanced penetration-testing topics.
              </div>
            </div>

            {/* Topics */}
            <div className={styles.topicsContainer}>
              <div className={styles.topicsLabel}>
                <BookOpen size={15} /> Fundamental Security Topics
              </div>
              <div className={styles.topicsGrid}>
                <span className={styles.topicPill}>Phishing</span>
                <span className={styles.topicPill}>Malware</span>
                <span className={styles.topicPill}>Social Engineering</span>
                <span className={styles.topicPill}>Denial of Service (DoS)</span>
                <span className={styles.topicPill}>Security Controls</span>
                <span className={styles.topicPill}>CIA Triad</span>
                <span className={styles.topicPill}>Encryption</span>
                <span className={styles.topicPill}>Hashing</span>
                <span className={styles.topicPill}>Cleartext vs Ciphertext</span>
                <span className={styles.topicPill}>SSL</span>
                <span className={styles.topicPill}>TLS</span>
              </div>
            </div>

            {/* Resource Card */}
            <div className={styles.resourcesSubheader}>
              <GraduationCap size={20} style={{ color: '#10b981' }} /> Recommended Learning Resource
            </div>
            <div className={styles.resourceCardGrid}>
              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Practical Security Fundamentals</h4>
                  <p className={styles.resCardDesc}>
                    Comprehensive walkthrough of core threats, defensive postures, encryption mechanics, and security controls on TCM Security Academy.
                  </p>
                </div>
                <a
                  href="https://tcm-sec.com/academy/practical-security-fundamentals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 5. SOFT SKILLS SECTION ===== */}
        <section id="soft-skills" className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryCardTop}>
              <div className={styles.categoryIconWrapper} style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                <BrainCircuit size={32} />
              </div>
              <div>
                <span className={styles.categoryBadgeNum} style={{ color: '#fbbf24' }}>STAGE 07</span>
                <h3 className={styles.categoryTitle}>Soft Skills Every Cybersecurity Student Needs</h3>
                <p className={styles.categoryDesc}>
                  Technical prowess alone is not enough. Successful cybersecurity practitioners possess strong analytical discipline, ethics, and adaptability.
                </p>
              </div>
            </div>

            {/* 4 Soft Skills Cards */}
            <div className={styles.softSkillsGrid}>
              <div className={styles.softSkillCard}>
                <div className={styles.softSkillIconWrapper}>
                  <Sparkles size={24} />
                </div>
                <h4 className={styles.softSkillTitle}>Problem Solving</h4>
                <p className={styles.softSkillDesc}>
                  Ability to diagnose complex technical problems, hypothesize root causes, and find practical, creative solutions.
                </p>
              </div>

              <div className={styles.softSkillCard}>
                <div className={styles.softSkillIconWrapper}>
                  <Flame size={24} />
                </div>
                <h4 className={styles.softSkillTitle}>Willingness to Learn</h4>
                <p className={styles.softSkillDesc}>
                  Cybersecurity changes rapidly. Students should continuously explore new technologies, tools, and emerging attack techniques.
                </p>
              </div>

              <div className={styles.softSkillCard}>
                <div className={styles.softSkillIconWrapper}>
                  <Eye size={24} />
                </div>
                <h4 className={styles.softSkillTitle}>Attention to Detail</h4>
                <p className={styles.softSkillDesc}>
                  Crucial when configuring systems, analyzing intricate log traces, identifying subtle vulnerabilities, and documenting findings.
                </p>
              </div>

              <div className={styles.softSkillCard}>
                <div className={styles.softSkillIconWrapper}>
                  <Scale size={24} />
                </div>
                <h4 className={styles.softSkillTitle}>Ethical Mindset</h4>
                <p className={styles.softSkillDesc}>
                  Understand the legal and ethical responsibilities involved in penetration testing and ethical hacking at all times.
                </p>
              </div>
            </div>

            {/* Soft Skills Resource */}
            <div className={styles.resourcesSubheader}>
              <GraduationCap size={20} style={{ color: '#f59e0b' }} /> Recommended Soft Skills Resource
            </div>
            <div className={styles.resourceCardGrid}>
              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeFoundational}`}>Foundational</span>
                    <span className={styles.badgeType}>Course</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Skills for the IT Industry &amp; Job Market</h4>
                  <p className={styles.resCardDesc}>
                    Develop effective communication, professional reporting, interview readiness, and workplace collaboration skills with TCM Security.
                  </p>
                </div>
                <a
                  href="https://tcm-sec.com/academy/soft-skills-for-the-job-market/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Learn Resource <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 6. CERTIFICATIONS SECTION ===== */}
        <section id="certifications" className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryCardTop}>
              <div className={styles.categoryIconWrapper} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                <Award size={32} />
              </div>
              <div>
                <span className={styles.categoryBadgeNum} style={{ color: '#f87171' }}>STAGE 08</span>
                <h3 className={styles.categoryTitle}>Certifications</h3>
                <p className={styles.categoryDesc}>
                  Certifications can help validate cybersecurity knowledge and demonstrate skills to potential employers.
                </p>
              </div>
            </div>

            {/* Subsection 1: Paid Security Certifications */}
            <h4 className={styles.certsSubheader}>
              <Award size={20} style={{ color: '#f87171' }} /> Paid Security Certifications
            </h4>
            <div className={styles.paidCertsGrid}>
              <div className={styles.paidCertCard}>
                <span className={styles.paidBadge}>Industry Standard / Curriculum</span>
                <h5 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '6px', fontWeight: '700' }}>CompTIA Security+</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  A globally recognized baseline security credential covering core risk management, network architecture, and threat mitigation. Often paired with university and course curricula.
                </p>
              </div>

              <div className={styles.paidCertCard}>
                <span className={styles.paidBadge}>Offensive / PenTest</span>
                <h5 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '6px', fontWeight: '700' }}>CompTIA PenTest+</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  Validates hands-on ability to plan, scope, and conduct penetration tests, scan for vulnerabilities, and compile remediation reports.
                </p>
              </div>

              <div className={styles.paidCertCard}>
                <span className={styles.paidBadge}>Ethical Hacking</span>
                <h5 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '6px', fontWeight: '700' }}>Certified Ethical Hacker (CEH)</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  Validates knowledge of standard commercial hacking tools, reconnaissance, vulnerability scanning, and social engineering vectors.
                </p>
              </div>
            </div>

            {/* Subsection 2: Free Security Certifications & Learning */}
            <h4 className={styles.certsSubheader}>
              <Sparkles size={20} style={{ color: '#34d399' }} /> Free Security Certifications &amp; Learning
            </h4>
            <div className={styles.resourceCardGrid}>
              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Free Pathway</span>
                    <span className={styles.badgeType}>Certification</span>
                  </div>
                  <h4 className={styles.resCardTitle}>ISC2 Certified in Cybersecurity (CC)</h4>
                  <p className={styles.resCardDesc}>
                    ISC2&apos;s &ldquo;One Million Certified in Cybersecurity&rdquo; initiative offering free foundational security training and official CC exam voucher.
                  </p>
                </div>
                <a
                  href="https://www.isc2.org/landing/1mcc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Open Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Free Access</span>
                    <span className={styles.badgeType}>Courses &amp; Badges</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Fortinet Training Institute</h4>
                  <p className={styles.resCardDesc}>
                    Free cybersecurity professional certifications covering network security, threat landscape, and next-gen firewalls.
                  </p>
                </div>
                <a
                  href="https://www.fortinet.com/training/cybersecurity-professionals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Open Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeFoundational}`}>Free Badges</span>
                    <span className={styles.badgeType}>Cloud Security</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Google Cloud Skills Boost (Security)</h4>
                  <p className={styles.resCardDesc}>
                    Interactive cloud security learning tracks, defense architecture labs, and skill badges hosted by Google Cloud.
                  </p>
                </div>
                <a
                  href="https://www.cloudskillsboost.google/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Open Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Free Courses</span>
                    <span className={styles.badgeType}>Academy</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Palo Alto Networks Cyberpedia</h4>
                  <p className={styles.resCardDesc}>
                    Free cybersecurity education courses, zero-trust architectures, and network defense certifications by Palo Alto.
                  </p>
                </div>
                <a
                  href="https://www.paloaltonetworks.com/cyberpedia/free-cybersecurity-education-courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Open Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Free Portal</span>
                    <span className={styles.badgeType}>eLearning</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Check Point eLearning</h4>
                  <p className={styles.resCardDesc}>
                    Free cybersecurity learning modules, threat prevention methodologies, and firewall administration tracks by Check Point.
                  </p>
                </div>
                <a
                  href="https://www.checkpoint.com/elearning/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Open Resource <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeFoundational}`}>Guide Reference</span>
                    <span className={styles.badgeType}>PDF Guide</span>
                  </div>
                  <h4 className={styles.resCardTitle}>CompTIA A+ Guide Preview</h4>
                  <p className={styles.resCardDesc}>
                    Official preview of hardware, networking, operating system troubleshooting, and IT support concepts.
                  </p>
                </div>
                <a
                  href="https://api.pageplace.de/preview/DT0400.9780137637676_A44161087/preview-9780137637676_A44161087.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openResourceBtn}
                >
                  Open Resource <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 7. AFTER THE COURSE — PRACTICE ROADMAP ===== */}
        <section id="practice-roadmap" className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryCardTop}>
              <div className={styles.categoryIconWrapper} style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                <Swords size={32} />
              </div>
              <div>
                <span className={styles.categoryBadgeNum} style={{ color: '#a78bfa' }}>STAGE 09</span>
                <h3 className={styles.categoryTitle}>What Should I Do After Learning the Basics?</h3>
                <p className={styles.categoryDesc}>
                  Once you have developed the required fundamentals, start practicing in legal and controlled cybersecurity environments.
                </p>
              </div>
            </div>

            {/* Beginner Level Practice */}
            <div className={styles.levelContainer}>
              <div className={styles.levelHeading}>
                <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Level 1</span>
                Beginner Practice Platforms
              </div>
              <div className={styles.resourceCardGrid}>
                <div className={styles.unifiedResourceCard}>
                  <div>
                    <div className={styles.cardMetaRow}>
                      <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                      <span className={styles.badgeType}>Interactive Labs</span>
                    </div>
                    <h4 className={styles.resCardTitle}>TryHackMe</h4>
                    <p className={styles.resCardDesc}>
                      Guided walkthroughs, bite-sized tasks, and beginner-friendly rooms covering security fundamentals and tools.
                    </p>
                  </div>
                  <a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                    Open Platform <ExternalLink size={14} />
                  </a>
                </div>

                <div className={styles.unifiedResourceCard}>
                  <div>
                    <div className={styles.cardMetaRow}>
                      <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                      <span className={styles.badgeType}>CTF Practice</span>
                    </div>
                    <h4 className={styles.resCardTitle}>PicoCTF</h4>
                    <p className={styles.resCardDesc}>
                      Free educational cybersecurity games with challenges tailored for high school and university students by CMU.
                    </p>
                  </div>
                  <a href="https://picoctf.com/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                    Open Platform <ExternalLink size={14} />
                  </a>
                </div>

                <div className={styles.unifiedResourceCard}>
                  <div>
                    <div className={styles.cardMetaRow}>
                      <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner / Int</span>
                      <span className={styles.badgeType}>Target Machines</span>
                    </div>
                    <h4 className={styles.resCardTitle}>Hack The Box</h4>
                    <p className={styles.resCardDesc}>
                      Practice using vulnerable machines, academy modules, and live security labs across multiple operating systems.
                    </p>
                  </div>
                  <a href="https://www.hackthebox.com/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                    Open Platform <ExternalLink size={14} />
                  </a>
                </div>

                <div className={styles.unifiedResourceCard}>
                  <div>
                    <div className={styles.cardMetaRow}>
                      <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                      <span className={styles.badgeType}>WarGames</span>
                    </div>
                    <h4 className={styles.resCardTitle}>OverTheWire</h4>
                    <p className={styles.resCardDesc}>
                      Learn security concepts and SSH/Linux command-line mastery through progressive wargames like Bandit.
                    </p>
                  </div>
                  <a href="http://overthewire.org/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                    Open Platform <ExternalLink size={14} />
                  </a>
                </div>

                <div className={styles.unifiedResourceCard}>
                  <div>
                    <div className={styles.cardMetaRow}>
                      <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner</span>
                      <span className={styles.badgeType}>Terminal Challenge</span>
                    </div>
                    <h4 className={styles.resCardTitle}>CMD Challenge</h4>
                    <p className={styles.resCardDesc}>
                      Quick, browser-based command line puzzle challenges to hone your shell navigation and piping skills.
                    </p>
                  </div>
                  <a href="https://cmdchallenge.com/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                    Open Platform <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Intermediate Level Practice */}
            <div className={styles.levelContainer} style={{ marginTop: '2rem' }}>
              <div className={styles.levelHeading}>
                <span className={`${styles.badgeLevel} ${styles.badgeIntermediate}`}>Level 2</span>
                Intermediate Practice Platforms
              </div>
              <div className={styles.resourceCardGrid}>
                <div className={styles.unifiedResourceCard}>
                  <div>
                    <div className={styles.cardMetaRow}>
                      <span className={`${styles.badgeLevel} ${styles.badgeIntermediate}`}>Intermediate</span>
                      <span className={styles.badgeType}>Cloud Labs</span>
                    </div>
                    <h4 className={styles.resCardTitle}>Attack-Defense</h4>
                    <p className={styles.resCardDesc}>
                      On-demand browser-based cybersecurity exercises with hundreds of live network and web target scenarios.
                    </p>
                  </div>
                  <a href="https://attackdefense.com/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                    Open Platform <ExternalLink size={14} />
                  </a>
                </div>

                <div className={styles.unifiedResourceCard}>
                  <div>
                    <div className={styles.cardMetaRow}>
                      <span className={`${styles.badgeLevel} ${styles.badgeIntermediate}`}>Intermediate</span>
                      <span className={styles.badgeType}>Downloadable VMs</span>
                    </div>
                    <h4 className={styles.resCardTitle}>VulnHub</h4>
                    <p className={styles.resCardDesc}>
                      Downloadable deliberately vulnerable virtual machines for offline penetration-testing and root-hunting practice.
                    </p>
                  </div>
                  <a href="https://www.vulnhub.com/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                    Open Platform <ExternalLink size={14} />
                  </a>
                </div>

                <div className={styles.unifiedResourceCard}>
                  <div>
                    <div className={styles.cardMetaRow}>
                      <span className={`${styles.badgeLevel} ${styles.badgeIntermediate}`}>Intermediate</span>
                      <span className={styles.badgeType}>Web App Security</span>
                    </div>
                    <h4 className={styles.resCardTitle}>Hacksplaining</h4>
                    <p className={styles.resCardDesc}>
                      Interactive visual lessons showing how SQLi, XSS, CSRF, and authentication vulnerabilities happen in code.
                    </p>
                  </div>
                  <a href="https://hacksplaining.com/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                    Open Platform <ExternalLink size={14} />
                  </a>
                </div>

                <div className={styles.unifiedResourceCard}>
                  <div>
                    <div className={styles.cardMetaRow}>
                      <span className={`${styles.badgeLevel} ${styles.badgeIntermediate}`}>Intermediate</span>
                      <span className={styles.badgeType}>Binary &amp; Pwn</span>
                    </div>
                    <h4 className={styles.resCardTitle}>Exploit Education</h4>
                    <p className={styles.resCardDesc}>
                      Hands-on binary analysis, stack smashing, memory corruption, and reverse engineering challenges (Protostar, Phoenix).
                    </p>
                  </div>
                  <a href="https://exploit.education/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                    Open Platform <ExternalLink size={14} />
                  </a>
                </div>

                <div className={styles.unifiedResourceCard}>
                  <div>
                    <div className={styles.cardMetaRow}>
                      <span className={`${styles.badgeLevel} ${styles.badgeIntermediate}`}>Intermediate</span>
                      <span className={styles.badgeType}>Multi-Domain</span>
                    </div>
                    <h4 className={styles.resCardTitle}>Root-Me</h4>
                    <p className={styles.resCardDesc}>
                      Over 400 hacking challenges spanning web, network, forensics, cryptography, and real-world virtual environments.
                    </p>
                  </div>
                  <a href="https://www.root-me.org/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                    Open Platform <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ===== 8. CTF SECTION ===== */}
        <section id="ctf" className={styles.categorySection}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryCardTop}>
              <div className={styles.categoryIconWrapper} style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                <Flag size={32} />
              </div>
              <div>
                <span className={styles.categoryBadgeNum} style={{ color: '#7dd3fc' }}>COMPETITIONS</span>
                <h3 className={styles.categoryTitle}>Start Playing CTFs</h3>
                <p className={styles.categoryDesc}>
                  Capture The Flag (CTF) competitions provide hands-on practice in areas such as web security, cryptography, exploitation, networking, and reverse engineering.
                </p>
              </div>
            </div>

            <div className={styles.resourceCardGrid}>
              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeFoundational}`}>Global CTF</span>
                    <span className={styles.badgeType}>Competition</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Google CTF</h4>
                  <p className={styles.resCardDesc}>
                    Annual world-class Capture The Flag competition designed by Google security engineers featuring beginner and expert tracks.
                  </p>
                </div>
                <a href="https://lnkd.in/gJ4vq6FS" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                  Play Google CTF <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeBeginner}`}>Beginner Friendly</span>
                    <span className={styles.badgeType}>Web CTF</span>
                  </div>
                  <h4 className={styles.resCardTitle}>Hacker101 CTF</h4>
                  <p className={styles.resCardDesc}>
                    Free CTF challenges created by HackerOne focusing on practical web application exploitation and bug hunting.
                  </p>
                </div>
                <a href="https://ctf.hacker101.com/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                  Play Hacker101 <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeIntermediate}`}>Intermediate</span>
                    <span className={styles.badgeType}>Cryptography</span>
                  </div>
                  <h4 className={styles.resCardTitle}>CryptoHack</h4>
                  <p className={styles.resCardDesc}>
                    Interactive gamified platform dedicated to learning modern cryptography, RSA math, AES blocks, and ECC ciphers.
                  </p>
                </div>
                <a href="https://cryptohack.org/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                  Play CryptoHack <ExternalLink size={14} />
                </a>
              </div>

              <div className={styles.unifiedResourceCard}>
                <div>
                  <div className={styles.cardMetaRow}>
                    <span className={`${styles.badgeLevel} ${styles.badgeFoundational}`}>Community</span>
                    <span className={styles.badgeType}>Challenge Hub</span>
                  </div>
                  <h4 className={styles.resCardTitle}>WeChall</h4>
                  <p className={styles.resCardDesc}>
                    Global challenge aggregator connecting profiles across different CTF and wargame sites to track worldwide rankings.
                  </p>
                </div>
                <a href="http://www.wechall.net/" target="_blank" rel="noopener noreferrer" className={styles.openResourceBtn}>
                  Visit WeChall <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* ===== 9. SAFETY & ETHICS NOTICE ===== */}
            <div className={styles.ethicsCard}>
              <div className={styles.ethicsIconWrapper}>
                <Scale size={32} />
              </div>
              <div>
                <h4 className={styles.ethicsTitle}>Practice Responsibly</h4>
                <p className={styles.ethicsText}>
                  Only perform penetration testing, exploitation, scanning, or security testing on systems you own or have explicit, written permission to test. Use dedicated cybersecurity labs, local virtual machines, and sanctioned CTF platforms for hands-on practice.
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
