'use client';

import Link from 'next/link';
import { Shield, ShieldAlert, ShieldCheck, Clock, Play, ExternalLink } from 'lucide-react';
import DataDustBackground from '../../components/DataDustBackground';
import DynamicHeroBackground from '../../components/DynamicHeroBackground';
import styles from './PracticeLabs.module.css';

const labLevels = [
  {
    id: 'beginner',
    title: 'Beginner Labs',
    description: 'Learn the fundamentals of cybersecurity, cryptography, and basic network defense. Perfect for those just starting out.',
    icon: Shield,
    color: '#10B981', // Emerald
    themeClass: styles.levelBeginner,
    typeClass: styles.typeBeginner,
    labs: [
      { id: 'intro-to-crypto', name: 'Intro to Cryptography', desc: 'Learn to use Caesar cipher and basic hashing techniques.', type: 'Crypto', duration: '1 Hour', mitreId: 'T1140', mitreUrl: 'https://attack.mitre.org/techniques/T1140/' },
      { id: 'basic-linux', name: 'Basic Linux Commands', desc: 'Navigate the terminal and manage file permissions.', type: 'OS', duration: '1 Hour', mitreId: 'T1059.004', mitreUrl: 'https://attack.mitre.org/techniques/T1059/004/' },
      { id: 'phishing-id', name: 'Phishing Identification', desc: 'Analyze emails and identify common phishing indicators.', type: 'Social Eng', duration: '1 Hour', mitreId: 'T1566.002', mitreUrl: 'https://attack.mitre.org/techniques/T1566/002/' },
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermediate Labs',
    description: 'Develop hands-on skills in web exploitation, penetration testing methodologies, and defensive setups.',
    icon: ShieldAlert,
    color: '#F59E0B', // Amber
    themeClass: styles.levelIntermediate,
    typeClass: styles.typeIntermediate,
    labs: [
      { id: 'sql-injection', name: 'SQL Injection Basics', desc: 'Exploit a vulnerable web application to bypass authentication.', type: 'Web App', duration: '1 Hour', mitreId: 'T1190', mitreUrl: 'https://attack.mitre.org/techniques/T1190/' },
      { id: 'network-sniffing', name: 'Network Sniffing', desc: 'Use Wireshark to intercept and analyze unencrypted traffic.', type: 'Network', duration: '1 Hour', mitreId: 'T1040', mitreUrl: 'https://attack.mitre.org/techniques/T1040/' },
      { id: 'privilege-escalation', name: 'Privilege Escalation', desc: 'Find and exploit misconfigurations to gain root access.', type: 'PenTest', duration: '1 Hour', mitreId: 'T1548.001', mitreUrl: 'https://attack.mitre.org/techniques/T1548/001/' },
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Labs (Hardest CTF / PWK Grade)',
    description: 'Tackle multi-stage enterprise attack and defense scenarios including x86 stack smashing with ROP gadgets, Volatility 3 memory threat hunting, and UPX anti-debugging bypass.',
    icon: ShieldCheck,
    color: '#EF4444', // Red
    themeClass: styles.levelAdvanced,
    typeClass: styles.typeAdvanced,
    labs: [
      { id: 'buffer-overflow', name: 'x86 Stack Smash & ROP Gadgets', desc: 'Fuzz binary services, calculate cyclic EIP offset in GDB, eliminate badchars, and craft JMP ESP shellcode.', type: 'Binary Pwn', duration: '2 Hours', mitreId: 'T1068', mitreUrl: 'https://attack.mitre.org/techniques/T1068/' },
      { id: 'apt-sim', name: 'Enterprise APT & Memory Forensics', desc: 'Analyze PCAP beaconing jitter, hunt hollowed svchost.exe in Volatility 3, carve injected PE, and author YARA rules.', type: 'Threat Hunting', duration: '2 Hours', mitreId: 'T1055.012', mitreUrl: 'https://attack.mitre.org/techniques/T1055/012/' },
      { id: 'malware-re', name: 'Malware RE & Anti-Debug Bypass', desc: 'Entropy analysis, manual UPX unpacking, patch ptrace anti-debugging in GDB, and reverse XOR decryption keys.', type: 'Reverse Eng', duration: '2 Hours', mitreId: 'T1027.002', mitreUrl: 'https://attack.mitre.org/techniques/T1027/002/' },
    ]
  }
];

export default function PracticeLabs() {
  return (
    <div className={styles.pageContainer}>
      <DataDustBackground />
      
      {/* 1. PAGE HERO */}
      <section className="dynamic-hero-section">
        <DynamicHeroBackground />
        <div className="dynamic-hero-content">
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'white', marginBottom: '1.5rem', textShadow: '0 4px 20px rgba(0,0,0,0.6)', letterSpacing: '-0.03em' }}>
            Practice Labs
          </h1>
          <div style={{ display: 'flex', gap: '8px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Home</Link>
            <span>›</span>
            <span style={{ color: 'white', fontWeight: '500' }}>Practice Labs</span>
          </div>
        </div>
      </section>

      {/* 2. LAB LEVELS CONTENT */}
      <div className={styles.contentSection}>
        <div className="container">
          <div className={styles.headerText}>
            <h2 className="section-title">Immersive Cybersecurity Training</h2>
            <p className="section-subtitle">
              Master real-world techniques in our sandboxed environments. Choose your difficulty level below and dive into interactive, hands-on challenges mapped directly to the official MITRE ATT&CK® framework.
            </p>
          </div>

          {labLevels.map((level, index) => {
            const Icon = level.icon;
            return (
              <section 
                key={level.id} 
                className={`${styles.levelSection} ${level.themeClass} cyber-reveal visible`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.levelHeader}>
                  <div className={styles.levelIconWrapper} style={{ color: level.color }}>
                    <Icon size={36} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className={styles.levelTitle} style={{ color: level.color }}>{level.title}</h3>
                    <p className={styles.levelDesc}>{level.description}</p>
                  </div>
                </div>

                <div className={styles.labGrid}>
                  {level.labs.map((lab, labIdx) => (
                    <div key={labIdx} className={styles.labCard}>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div className={styles.cardTop}>
                          <span className={`${styles.labType} ${level.typeClass}`}>{lab.type}</span>
                          <span className={styles.labDuration}>
                            <Clock size={14} /> {lab.duration}
                          </span>
                        </div>
                        <h4 className={styles.labTitle}>{lab.name}</h4>
                        <p className={styles.labDesc}>{lab.desc}</p>
                      </div>
                      
                      {/* Pinned Bottom Container: MITRE Badge & Launch Button */}
                      <div style={{ marginTop: 'auto' }}>
                        {/* MITRE ATT&CK Link Badge */}
                        <div style={{ marginBottom: '1.25rem' }}>
                          <a 
                            href={lab.mitreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              fontSize: '0.75rem',
                              color: '#60a5fa',
                              background: 'rgba(30, 101, 255, 0.15)',
                              border: '1px solid rgba(30, 101, 255, 0.4)',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontWeight: '600'
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>MITRE {lab.mitreId}</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>
                        
                        <Link href={`/practice-labs/${lab.id}`} className={styles.launchBtn} style={{ textDecoration: 'none' }}>
                          <Play size={16} className={styles.launchBtnIcon} /> Launch Lab
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

        </div>
      </div>
    </div>
  );
}
