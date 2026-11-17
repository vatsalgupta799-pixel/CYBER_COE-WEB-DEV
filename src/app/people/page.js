import Link from 'next/link';
import { membersData } from '../../data/mockData';
import styles from './People.module.css';
import DynamicHeroBackground from '../../components/DynamicHeroBackground';
import { ArrowRight, Users } from 'lucide-react';

export const metadata = {
  title: 'Our People & Faculty | Cybersecurity Centre of Excellence',
  description: 'Meet the faculty, research scholars, and students leading cybersecurity research and innovation at UPES.'
};

export default function PeoplePage() {
  const categories = [
    { key: 'faculty', title: 'Faculty & Leadership', subtitle: 'Academic leaders, professors, and centre coordinators directing research and operations.' },
    { key: 'student', title: 'Researchers & Students', subtitle: 'Postgraduate scholars and undergraduate researchers developing defensive and offensive tools.' }
  ];

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #070b14 0%, #0c182b 45%, #0e2a4a 75%, #0f3d6b 100%)',
        padding: '90px 0 70px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <DynamicHeroBackground />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '850px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(30, 101, 255, 0.15)',
            border: '1px solid rgba(30, 101, 255, 0.35)',
            color: '#60a5fa',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '18px'
          }}>
            <Users size={16} /> Cybersecurity Centre Team
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            Meet the Team & Faculty
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.7' }}>
            The dedicated researchers, professors, and engineering fellows shaping the future of digital defense, forensics, and cyber threat intelligence.
          </p>
        </div>
      </section>

      {/* Categories & Members */}
      <div className="container" style={{ padding: '60px 0 100px' }}>
        {categories.map(({ key, title, subtitle }) => {
          const members = membersData.filter(m => m.category === key);
          if (members.length === 0) return null;

          return (
            <section key={key} style={{ marginBottom: '64px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '32px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '16px'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--text)', margin: '0 0 6px 0' }}>
                    {title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                    {subtitle}
                  </p>
                </div>
                <Link 
                  href={`/people/category/${key}`} 
                  style={{
                    color: 'var(--primary-light)',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  View All ({members.length}) <ArrowRight size={15} />
                </Link>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: '32px'
              }}>
                {members.map(person => (
                  <Link 
                    href={`/people/${person.id}`} 
                    key={person.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: 'rgba(15, 21, 37, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '18px',
                      padding: '36px 24px 28px',
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      position: 'relative',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                      borderTop: '3px solid var(--primary)'
                    }}
                    className={styles.glassCard}
                  >
                    <div style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(30, 101, 255, 0.35), rgba(255, 30, 86, 0.25))',
                      border: '2px solid rgba(255, 255, 255, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      fontWeight: '800',
                      color: '#fff',
                      marginBottom: '20px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
                    }}>
                      {person.name.charAt(0)}
                    </div>

                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#ffffff',
                      margin: '0 0 10px 0',
                      lineHeight: '1.35',
                      letterSpacing: '-0.2px'
                    }}>
                      {person.name}
                    </h3>

                    <div style={{
                      fontSize: '0.92rem',
                      color: 'rgba(148, 163, 184, 0.9)',
                      lineHeight: '1.5',
                      fontWeight: '500',
                      marginBottom: '26px',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {person.role}
                    </div>

                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      background: 'rgba(30, 101, 255, 0.12)',
                      border: '1px solid rgba(30, 101, 255, 0.3)',
                      color: '#60a5fa',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      marginTop: 'auto',
                      transition: 'all 0.2s ease'
                    }}>
                      Know More <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
