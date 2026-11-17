'use client';
import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Link from 'next/link';
import { Users, GraduationCap, Microscope, BookOpen } from 'lucide-react';
import RadarBackground from '../components/RadarBackground';
import StatCounter from '../components/StatCounter';
import DataDustBackground from '../components/DataDustBackground';
import { partnersData } from '../data/mockData';

export default function Home() {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '150px 0px 50px 0px', threshold: 0 });

    document.querySelectorAll('.cyber-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <DataDustBackground />
      {/* 1. HERO SECTION (DYNAMIC IMAGE CAROUSEL) */}
      <section className={styles.heroSection}>
        <RadarBackground />
        
        {/* Dark overlay to ensure text readability */}
        <div className={styles.heroOverlay}></div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroTextContainer}>
            <h1 className={`${styles.heroTitleMain} ${styles.glitchTextWhite}`}>
              <span data-text="CENTRE FOR" className={styles.glitchSpan}>CENTRE FOR</span>
              <span data-text="CYBERSECURITY" className={styles.glitchSpan}>CYBERSECURITY</span>
            </h1>
            <div className={styles.typingSubtitleContainer}>
              <p className={styles.typingSubtitle}>
                The AI era requires a new security model. Join the Centre for Cybersecurity for a look at what&apos;s next.
              </p>
            </div>
            <div className={styles.heroButtonsMain}>
              <Link href="/projects" className={`btn-primary ${styles.btnSolid} ${styles.cyberBtn}`}>
                Explore Projects &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 PARTNER COMPANIES MARQUEE */}
      <section className={`${styles.partnersSection} cyber-reveal`}>
        <h2 className={styles.partnersTitle}>Our Industry Partners</h2>
        <div className={styles.partnersMarqueeContainer}>
          <div className={styles.partnersMarquee}>
            {/* We duplicate the list to make the infinite scroll smooth */}
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: '5rem', alignItems: 'center' }}>
                {partnersData.map((partner, index) => (
                  <div key={index} className={styles.partnerLogoWrapper}>
                    <a href={partner.url} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={`/images/partners/${partner.filename}`} 
                        alt={partner.name} 
                        className={styles.partnerLogo} 
                        loading="lazy"
                        decoding="async"
                        style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. AT A GLANCE (Stats) */}
      <section className={`section bg-secondary cyber-reveal ${styles.statsSection}`}>
        <div className="container">
          <h2 className="section-title">Department at a Glance</h2>
          <div className={styles.statsGrid}>
            <div className={`glass-card ${styles.statCard}`}>
              <div className={styles.statIcon}><Users size={32} /></div>
              <div className={styles.statNumber}><StatCounter end={3} suffix="+" /></div>
              <div className={styles.statLabel}>Faculty Members</div>
            </div>
            <div className={`glass-card ${styles.statCard}`}>
              <div className={styles.statIcon}><GraduationCap size={32} /></div>
              <div className={styles.statNumber}><StatCounter end={30} suffix="+" /></div>
              <div className={styles.statLabel}>Students</div>
            </div>
            <div className={`glass-card ${styles.statCard}`}>
              <div className={styles.statIcon}><Microscope size={32} /></div>
              <div className={styles.statNumber}><StatCounter end={10} suffix="+" /></div>
              <div className={styles.statLabel}>Research Projects</div>
            </div>
            <div className={`glass-card ${styles.statCard}`}>
              <div className={styles.statIcon}><BookOpen size={32} /></div>
              <div className={styles.statNumber}><StatCounter end={11} suffix="+" /></div>
              <div className={styles.statLabel}>Publications</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FROM THE HOD'S DESK */}
      <section className="section bg-primary cyber-reveal">
        <div className="container">
          <div className={`glass-card ${styles.hodCard}`}>
            <div className={styles.hodLeft}>
              <img src="/images/hod-3.jpg" alt="Dr. Akashdeep Bhardwaj" loading="lazy" decoding="async" className={styles.hodImagePlaceholder} style={{objectFit: 'cover', width: '200px', height: '200px'}} />
            </div>
            <div className={styles.hodRight}>
              <h2 className={styles.hodTitle}>From the Director&apos;s Desk</h2>
              <h3 className={styles.hodName}>Dr. Akashdeep Bhardwaj</h3>
              <p className={styles.hodText}>
                Welcome to the Centre for Cybersecurity. Our department is dedicated to fostering a world-class environment for research, innovation, and practical education in the rapidly evolving field of digital security. We strive to empower the next generation of security professionals.
              </p>
              <p className={styles.hodText}>
                Through strategic industry partnerships and state-of-the-art laboratory facilities, we ensure our students and faculty are at the forefront of tackling modern cyber threats. Join us in our mission to build a safer, more resilient digital infrastructure for tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
