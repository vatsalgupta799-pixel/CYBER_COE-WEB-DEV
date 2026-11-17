'use client';

import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import styles from './Resources.module.css';
import DataDustBackground from '../../components/DataDustBackground';
import { studentResources } from '../../data/resourcesData';


import DynamicHeroBackground from '../../components/DynamicHeroBackground';

export default function StudentResourcesPage() {
  return (
    <div className={styles.resourcesPage}>
      <DataDustBackground />
      
      {/* ===== HERO ===== */}
      <section className="dynamic-hero-section" style={{ height: '35vh', minHeight: '280px' }}>
        <DynamicHeroBackground />
        <div className="dynamic-hero-content">
          <h1 className={styles.heroTitle}>Student Resources</h1>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <Link href="/projects">Projects</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>Resources</span>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className={styles.section}>
        <div className={styles.headerBox}>
          <GraduationCap size={32} className={styles.headerIcon} />
          <div>
            <h2 className={styles.sectionTitle}>Lab Resources &amp; Guides</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to get started with your research, from tool demonstrations to publication guidelines.
            </p>
          </div>
        </div>


        <div className={styles.resourceGrid}>
          {studentResources.map((res) => {
            const IconComponent = res.icon;
            return (
              <Link href={res.link} key={res.id} className={styles.resourceCard}>
                <div className={styles.resourceIconWrapper}>
                  <IconComponent size={28} />
                </div>
                <div className={styles.resourceContent}>
                  <h3 className={styles.resourceTitle}>{res.title}</h3>
                  <p className={styles.resourceDesc}>{res.desc}</p>
                </div>
                <div className={styles.resourceArrow}>
                  <ArrowRight size={20} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
