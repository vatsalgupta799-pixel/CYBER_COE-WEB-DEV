import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { membersData } from '../../../../data/mockData';
import styles from '../../People.module.css';

import DynamicHeroBackground from '../../../../components/DynamicHeroBackground';

export default async function CategoryPage({ params }) {
  const { categoryId } = await params;
  
  if (!['faculty', 'student'].includes(categoryId)) {
    notFound();
  }

  const filteredMembers = membersData.filter(m => m.category === categoryId);
  const title = categoryId === 'faculty' ? 'Faculty & Teachers' : 'Students & Researchers';

  return (
    <main className={styles.peoplePage}>
      <section className="dynamic-hero-section" style={{ minHeight: '40vh' }}>
        <DynamicHeroBackground />
        <div className="dynamic-hero-content">
          <h1 className={styles.heroTitle}>All {title}</h1>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <Link href="/people">People</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span style={{ textTransform: 'capitalize' }}>{categoryId}</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Link href="/people" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '2rem', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to Categories
          </Link>

          {/* We use a standard wrapping grid for "View All" instead of the scrolling flex row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
            {filteredMembers.map((person) => (
              <Link href={`/people/${person.id}`} key={person.id} className={styles.glassCard} style={{ scrollSnapAlign: 'none' }}>
                <div className={styles.avatar}>
                  {person.name.charAt(0)}
                </div>
                <h3 className={styles.name}>{person.name}</h3>
                <div className={styles.role}>{person.role}</div>
                <span className={styles.viewProfile}>Know More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
