import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { studentResources } from '../../../data/resourcesData';
import styles from '../Resources.module.css';
import DataDustBackground from '../../../components/DataDustBackground';

import DynamicHeroBackground from '../../../components/DynamicHeroBackground';

export default async function ResourceDetailsPage({ params }) {
  const resolvedParams = await params;
  if (resolvedParams.id === '1' || resolvedParams.id === 'getting-started') {
    redirect('/student-resources/getting-started');
  }
  if (resolvedParams.id === '2' || resolvedParams.id === 'security-tools') {
    redirect('/student-resources/security-tools');
  }
  if (resolvedParams.id === '3' || resolvedParams.id === 'vapt-documentation') {
    redirect('/student-resources/vapt-documentation');
  }

  const resource = studentResources.find((r) => r.id.toString() === resolvedParams.id);

  if (!resource) {
    notFound();
  }

  const IconComponent = resource.icon;

  return (
    <div className={styles.resourcesPage}>
      <DataDustBackground />
      
      {/* ===== HERO ===== */}
      <section className="dynamic-hero-section" style={{ height: '30vh', minHeight: '250px' }}>
        <DynamicHeroBackground />
        <div className="dynamic-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div style={{ padding: '12px', background: 'rgba(30, 101, 255, 0.2)', borderRadius: '12px', color: '#3e65ff' }}>
              <IconComponent size={32} />
            </div>
            <h1 className={styles.heroTitle} style={{ marginBottom: 0 }}>{resource.title}</h1>
          </div>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <Link href="/projects">Projects</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <Link href="/student-resources">Resources</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>{resource.title}</span>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className={styles.section} style={{ paddingTop: '40px' }}>
        <div style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          minHeight: '400px'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: '#fff' }}>{resource.title}</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem', marginBottom: '40px' }}>
            {resource.desc}
          </p>
          
          <div style={{
            padding: '30px',
            border: '2px dashed rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            textAlign: 'left',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}>
            {resource.content}
          </div>
        </div>
      </section>
    </div>
  );
}
