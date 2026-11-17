'use client';

import { useState } from 'react';
import styles from './Publications.module.css';
import Link from 'next/link';
import { BookOpen, Award, FileBadge } from 'lucide-react';
import DataDustBackground from '../../components/DataDustBackground';
import DynamicHeroBackground from '../../components/DynamicHeroBackground';

const publications = [
  {
    title: "Beyond the Invisible Nexus: Dark Web, Dark AI, and Offensive Security",
    journal: "CRC Press (Taylor & Francis)",
    year: "2026",
    authors: "Dr. Akashdeep Bhardwaj, Saksham Garg",
    link: "/Beyond-the-Invisible-Nexus.pdf"
  },
  {
    title: "Mastering Cybersecurity: A Practical Guide to Cyber Tools and Techniques (Volume 2)",
    journal: "CRC Press (Taylor & Francis)",
    year: "2024",
    authors: "Dr. Akashdeep Bhardwaj",
    link: "/Mastering-Cybersecurity-Vol2.pdf"
  },
  {
    title: "Practical Digital Forensics",
    journal: "BPB Publications",
    year: "2023",
    authors: "Dr. Akashdeep Bhardwaj, Keshav Kaushik",
    link: "/Practical-Digital-Forensics.pdf"
  },
  {
    title: "A Practical Approach to Open Source Intelligence (OSINT)",
    journal: "CRC Press (Taylor & Francis)",
    year: "2025",
    authors: "Dr. Akashdeep Bhardwaj",
    link: "/A-Practical-Approach-to-OSINT.pdf"
  },
  {
    title: "A Practical Approach to Open Source Intelligence (OSINT) Volume 1",
    journal: "CRC Press (Taylor & Francis)",
    year: "2025",
    authors: "Dr. Akashdeep Bhardwaj",
    link: "/A-Practical-Approach-to-OSINT-Vol1.pdf"
  },
  {
    title: "Advanced Smart Computing Technologies in Cybersecurity and Forensics",
    journal: "CRC Press (Taylor & Francis)",
    year: "2021",
    authors: "Keshav Kaushik, Shubham Tayal, Dr. Akashdeep Bhardwaj, Manoj Kumar",
    link: "/Advanced-Smart-Computing.pdf"
  },
  {
    title: "Insecure Digital Frontiers: Navigating the Global Cybersecurity Landscape",
    journal: "CRC Press (Taylor & Francis)",
    year: "2024",
    authors: "Dr. Akashdeep Bhardwaj",
    link: "/Insecure-Digital-Frontiers.pdf"
  }
];

const patents = [
  {
    title: "A System and Method for creating Voice enabled Cloud based Smart Textbooks",
    status: "Published",
    year: "2024",
    authors: "Centre for Cybersecurity",
    link: "#"
  },
  {
    title: "System and Method for monitoring and Classifying Physical exercise and detecting burnout",
    status: "Published",
    year: "2024",
    authors: "Centre for Cybersecurity",
    link: "#"
  },
  {
    title: "Hardware-based Security System for protecting devices against threat from HIDs",
    status: "Published",
    year: "2024",
    authors: "Centre for Cybersecurity",
    link: "#"
  },
  {
    title: "Wearable Health Device with Pneumatic Plugs for Automated Pranayam and Breathing Exercises",
    status: "Filed",
    year: "2024",
    authors: "Centre for Cybersecurity",
    link: "#"
  },
  {
    title: "Passive Smart Doorframe Intrusion Detector",
    status: "Filed",
    year: "2024",
    authors: "Centre for Cybersecurity",
    link: "#"
  }
];

const copyrights = [
  // Image 1
  { title: "Detect Hidden Process-based Cyberattacks on Industrial Control Systems (SW-19155/2024)", status: "Registered", year: "2024", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Forensic Security Framework for analyzing Firmware of IoT-based smart cameras (L-150699/2024)", status: "Registered", year: "2024", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Algorithms for Security Assessment of Smart Home IoT Device Bootloaders (SW-19773/2024)", status: "Registered", year: "2024", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Threat Hunting for External IP Address Discovery Techniques (5875/2025-CO/SW)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Threat Hunting for Windows Internal Discovery and Enumeration (5876/2025-CO/SW)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Threat Hunting for detecting Apps in Autorun Startup folder to achieve Persistence", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Threat Hunting for detecting WhisperGate Wiper Malware (5796/2025-CO/SW)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Cognitive DNA (CDNA) for Cyber Threat Modeling (SW-25540/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "SENSELOCK AI Driven IoT Embedded MultiProtocol Security for smart homes", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "ScentSense Login: IoT driven AI based Scent Authentication for Passwordless Access", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Contextual Meme EncoderDecoder (SW-27934/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  // Image 2
  { title: "Security Evaluation of Smart Home IoT Devices through Side Channel attack methodologies", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "FIDS - A Forensic Investigation methodology for detecting Data Exfiltration in Smart Refrigerators", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Meme StegoChat (SW-28068/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Convert meme: Meme based language for covert secure communication (LD-25833/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "USB Canary: A hardware Based Early Detection Ransomware System (SW-28219/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Classify Human Activities into Exercises and workouts (LD-27676/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Classroom Proximity Device Fingerprint Verification (LD-36210/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Meme Speak: Visual Lexicon for digital expression through reaction memes (LD-25836/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "USB Dyna Trace Dynamic USB Log Correction Engine for Ransomware Threat (SW-28212/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Human Interface Activity Validation Using Raspberry Pi Tap (LD-28700/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "On-Demand Peer Device Snapshot Isolation (LD-36705/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "HyperWiser - Interoperable Virtual Machine Imaging (SW-2025021945)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Ransomware Net USB: Embedded Intrusion Sensor for Offline Threat Detection (LD-20250178895)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  // Image 3
  { title: "Peer-Mediated VPN Tunnelling via Classroom Mesh (LD-20250178895)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Self-Healing Firmware Update with Distributed Hash Trees (DHT) for IoT Devices (LD-42579/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Cryptographic Fingerprinting of Dynamic Firmware to enforce security in Smart Embedded Systems (SW-38021/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Side Channel Resistant Licensing Enforcement for Edge Compute Modules (SW-38022/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "STRAND: Synthetic Cybersecurity DNA (LD-20260180763-CO)", status: "Registered", year: "2026", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Sound-based Malware Detection (SW-2026022268-CO)", status: "Registered", year: "2026", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Cyber Attack Raagas: Musical Cycle of Cyber Kill Chain (LD-20260181066-CO)", status: "Registered", year: "2026", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Physical Layer watermarking protocol for network cable Authentication (LD-20260181260-CO)", status: "Registered", year: "2026", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Disaster Victim Detection Wearables (LD-20260181655-CO)", status: "Registered", year: "2026", authors: "Centre for Cybersecurity", link: "#" },
  { title: "DHDCS: Dynamic Household Device Cloaking System (LD-20260181806-CO)", status: "Registered", year: "2026", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Smart AI-based Chulha Guardian: Gas Leak Detection, Fire Sensing & Intrusion Monitor (LD-52096/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "IFIC: IoT-based Firmware Integrity Capsule (LD-51926/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "NeuroShield: Behaviour based web browser defender (SW-2026022346-CO)", status: "Registered", year: "2026", authors: "Centre for Cybersecurity", link: "#" },
  // Image 4
  { title: "WildGuard: Machine Learning-based Smart Decoy to detect Predator Presence (LD-42577/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Hybrid Authentication for IoT devices using Environmental Biometrics (LD-425912025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "NBAA Neuro Behavioral Ambient Authentication for Windows 10 OS (LD-20260184409-CO)", status: "Registered", year: "2026", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Disease Modeling-Inspired Cybersecurity Framework for Attack and Defense modeling (LD-42595/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Chain Messenger (Decentralized peer-to-peer encrypted messaging system (SW-42603/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Software-Defined Secure Encrypted Audio Channel Communication without Networks (SW-42578/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Zero-Knowledge Policy (ZKP) enforcement for IoT Ecosystems (SW-42571/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Study-Focused Adaptive Zone Firewall (LD-37116/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Cooperative Community Alerting Guardian Mesh Network (LD-52453/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Dynamic Honeypot mesh Framework to Deceive Intruders (SW-47359/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "Hydro-ReGen: Battery-less Fluid Motion Energy Recovery System for Domestic Washing Machine (LD-52481/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" },
  { title: "SHPI: Smart Home Protocol Inspector (LD-52725/2025-CO)", status: "Registered", year: "2025", authors: "Centre for Cybersecurity", link: "#" }
];

export default function PublicationsPage() {
  const [activeTab, setActiveTab] = useState('books');

  return (
    <div className={styles.publicationsPage}>
      <DataDustBackground />
      {/* ===== HERO ===== */}
      <section className="dynamic-hero-section">
        <DynamicHeroBackground />
        <div className="dynamic-hero-content">
          <h1 className={styles.heroTitle}>Publications</h1>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>Publications</span>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className={styles.contentWrapper}>
        <div className={styles.section}>
          <div className={styles.headerArea}>
            <BookOpen size={40} className={styles.icon} />
            <div>
              <h2 className={styles.sectionTitle}>Recent Books &amp; Papers</h2>
              <p className={styles.sectionSubtitle}>
                Explore the latest published research, books, and insights from the faculty and researchers at the Centre for Cybersecurity.
              </p>
            </div>
          </div>

          <div className={styles.interactiveContainer}>
            {/* Tab Navigation */}
            <div className={styles.tabNav}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'books' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('books')}
              >
                <BookOpen size={18} />
                Books &amp; Papers
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'patents' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('patents')}
              >
                <Award size={18} />
                Patents
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'copyrights' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('copyrights')}
              >
                <FileBadge size={18} />
                Copyrights Registered
              </button>
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
              
              {/* Books & Papers */}
              <div className={`${styles.pubGrid} ${activeTab === 'books' ? styles.fadeIn : styles.hidden}`}>
                {publications.map((pub, idx) => (
                  <div key={idx} className={styles.pubCard}>
                    <h3 className={styles.pubTitle}>{pub.title}</h3>
                    <div className={styles.pubMeta}>
                      <span className={styles.pubJournal}>{pub.journal}</span>
                      <span className={styles.pubYear}>{pub.year}</span>
                    </div>
                    <div className={styles.pubAuthors} style={{marginBottom: 0}}>{pub.authors}</div>
                  </div>
                ))}
              </div>

              {/* Patents */}
              <div className={`${styles.pubGrid} ${activeTab === 'patents' ? styles.fadeIn : styles.hidden}`}>
                {patents.map((item, idx) => (
                  <div key={idx} className={styles.pubCard}>
                    <h3 className={styles.pubTitle}>{item.title}</h3>
                    <div className={styles.pubMeta}>
                      <span className={styles.pubJournal}>Status: {item.status}</span>
                      <span className={styles.pubYear}>{item.year}</span>
                    </div>
                    <div className={styles.pubAuthors} style={{marginBottom: 0}}>{item.authors}</div>
                  </div>
                ))}
              </div>

              {/* Copyrights */}
              <div className={`${styles.pubGrid} ${activeTab === 'copyrights' ? styles.fadeIn : styles.hidden}`}>
                {copyrights.map((item, idx) => (
                  <div key={idx} className={styles.pubCard}>
                    <h3 className={styles.pubTitle}>{item.title}</h3>
                    <div className={styles.pubMeta}>
                      <span className={styles.pubJournal}>Status: {item.status}</span>
                      <span className={styles.pubYear}>{item.year}</span>
                    </div>
                    <div className={styles.pubAuthors} style={{marginBottom: 0}}>{item.authors}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
