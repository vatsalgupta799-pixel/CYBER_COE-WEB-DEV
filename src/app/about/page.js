'use client';

import { useState, useEffect } from 'react';
import styles from './About.module.css';
import Link from 'next/link';
import { Target, Lightbulb, Users, Globe } from 'lucide-react';
import DataDustBackground from '../../components/DataDustBackground';
import { partnersData, membersData } from '../../data/mockData';
import peopleStyles from '../people/People.module.css';
import DynamicHeroBackground from '../../components/DynamicHeroBackground';


export default function AboutPage() {

  return (
    <div className={styles.aboutPage}>
      <DataDustBackground />
      {/* ===== HERO SECTION ===== */}
      <section className="dynamic-hero-section">
        <DynamicHeroBackground />
        <div className="dynamic-hero-content">
          <h1 className={styles.heroTitle}>About Us</h1>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>About</span>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Mission &amp; Vision</h2>
        <p className={styles.sectionSubtitle}>
          Driving excellence in cybersecurity education, research, and innovation to build a safer future.
        </p>

        <div className={styles.missionVisionGrid}>
          {/* Mission */}
          <div className={styles.glassCard}>
            <span className={styles.glassCardIcon}><Target size={32} /></span>
            <h3 className={styles.glassCardHeading}>Our Mission</h3>
            <p className={styles.glassCardText}>
              Our mission is to establish a world-class cybersecurity research
              and training ecosystem that empowers students, faculty, and
              industry professionals to proactively defend critical digital
              infrastructure. We are committed to bridging the gap between
              academic theory and real-world cyber defense through hands-on
              experimentation, collaborative projects, and continuous engagement
              with the global security community.
            </p>
            <p className={styles.glassCardText}>
              By fostering interdisciplinary collaboration and investing in
              next-generation security technologies, we aim to cultivate a
              pipeline of skilled cybersecurity practitioners who can anticipate,
              detect, and neutralize sophisticated threats in an ever-evolving
              digital landscape.
            </p>
          </div>

          {/* Vision */}
          <div className={styles.glassCard}>
            <span className={styles.glassCardIcon}><Lightbulb size={32} /></span>
            <h3 className={styles.glassCardHeading}>Our Vision</h3>
            <p className={styles.glassCardText}>
              We envision becoming a nationally recognized Center of Excellence
              that leads transformative cybersecurity research, setting
              benchmarks in vulnerability assessment, threat intelligence, and
              secure software engineering. Our goal is to be the trusted partner
              for government agencies, defense organizations, and industry
              leaders seeking cutting-edge solutions to complex cyber challenges.
            </p>
            <p className={styles.glassCardText}>
              Through strategic partnerships and a relentless pursuit of
              innovation, we aspire to create an inclusive, knowledge-driven
              community that shapes cybersecurity policy, advances digital
              sovereignty, and inspires the next generation of ethical hackers,
              researchers, and security architects worldwide.
            </p>
          </div>
        </div>
      </section>


      {/* ===== MEMBERS (Meet the Team) ===== */}
      <section className={peopleStyles.section}>
        <h2 className={peopleStyles.sectionTitle} style={{textAlign: 'center', marginBottom: '1rem'}}>Meet the Team</h2>
        <p className={peopleStyles.sectionSubtitle} style={{textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)'}}>
          The brilliant minds driving research and innovation at our Centre for Cybersecurity.
        </p>

        {['faculty', 'student'].map(category => (
          <div key={category} className={peopleStyles.categorySection}>
            <div className={peopleStyles.categoryHeader}>
              <h3 className={peopleStyles.categoryTitle}>
                {category === 'faculty' ? 'Faculty' : 'Students & Researchers'}
              </h3>
              <Link href={`/people/category/${category}`} className={peopleStyles.viewAllLink}>
                View All →
              </Link>
            </div>
            <div className={peopleStyles.peopleGrid}>
              {membersData
                .filter(person => person.category === category)
                .map((person) => (
                <Link href={`/people/${person.id}`} key={person.id} className={peopleStyles.glassCard}>
                  <div className={peopleStyles.avatar}>
                    {person.name.charAt(0)}
                  </div>
                  <h3 className={peopleStyles.name}>{person.name}</h3>
                  <div className={peopleStyles.role}>{person.role}</div>
                  <span className={peopleStyles.viewProfile}>Know More →</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ===== PARTNERSHIPS ===== */}
      <section className={styles.partnershipsWrapper}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Partners</h2>
          <p className={styles.partnersIntro}>
            We collaborate with leading government bodies, research organizations,
            and global technology companies to advance cybersecurity research,
            share intelligence, and develop next-generation solutions that safeguard
            and enhance national and global infrastructure.
          </p>

          <div className={styles.partnersGrid}>
            {partnersData.map((partner, index) => (
              <div key={index} className={styles.partnerBox}>
                <a href={partner.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <img 
                    src={`/images/partners/${partner.filename}`} 
                    alt={partner.name} 
                    style={{ maxWidth: '100%', height: '50px', objectFit: 'contain', opacity: '0.8', transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)' }}
                    onMouseOut={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1)' }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
