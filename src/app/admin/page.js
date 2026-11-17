'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Terminal, Calendar, FileText, Users, LogOut, Shield, 
  Activity, ArrowRight, CheckCircle2, Zap, Server, Cpu
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const adminCards = [
    {
      title: 'Practice Labs Sandbox',
      desc: 'Monitor all 9 live Kali Linux training environments, MITRE ATT&CK mappings, and interactive challenge flags.',
      icon: Terminal,
      color: '#1E65FF',
      link: '/practice-labs',
      btnText: 'View 9 Active Labs',
      badge: '9 Live Labs'
    },
    {
      title: 'AI Lab Mentor Engine',
      desc: 'Real-time telemetry sync, student error diagnostics, and automated Socratic pedagogical guidance.',
      icon: Cpu,
      color: '#10B981',
      link: '/practice-labs/sql-injection',
      btnText: 'Open Mentor Console',
      badge: 'Telemetry Active'
    },
    {
      title: 'Research & Publications',
      desc: 'Manage SCI/Scopus cybersecurity papers, threat intelligence research, and university publications.',
      icon: FileText,
      color: '#EC4899',
      link: '/research',
      btnText: 'Manage Research',
      badge: 'Peer-Reviewed'
    }
  ];

  return (
    <div>
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(30, 101, 255, 0.15) 0%, rgba(10, 15, 25, 0.8) 100%)',
        border: '1px solid rgba(30, 101, 255, 0.3)',
        borderRadius: '16px',
        padding: '1.75rem 2rem',
        marginBottom: '2.5rem',
        boxShadow: '0 0 30px rgba(0,0,0,0.5)'
      }}>
        <div>
          <div style={{ color: '#60a5fa', fontSize: '0.82rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
            CyberCoE Command & Control
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#fff' }}>
            Admin Dashboard Overview
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Welcome back, SuperAdmin! Manage training sandboxes, research, and infrastructure.
          </p>
        </div>

        <button 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#ef4444',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '0.88rem',
            cursor: 'pointer'
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Quick Status Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'rgba(10, 15, 25, 0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>SYSTEM STATUS</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981', marginTop: '0.2rem' }}>All Systems Normal</div>
        </div>

        <div style={{ background: 'rgba(10, 15, 25, 0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>PRACTICE LABS</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#60a5fa', marginTop: '0.2rem' }}>9 Scenarios Active</div>
        </div>

        <div style={{ background: 'rgba(10, 15, 25, 0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>MITRE COVERAGE</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f59e0b', marginTop: '0.2rem' }}>100% Mapped</div>
        </div>

        <div style={{ background: 'rgba(10, 15, 25, 0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>AI LAB MENTOR</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#a855f7', marginTop: '0.2rem' }}>Online & Monitoring</div>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.25rem' }}>
        Administrative Modules
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {adminCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx}
              style={{
                background: 'rgba(10, 15, 25, 0.85)',
                border: '1px solid rgba(30, 101, 255, 0.25)',
                borderRadius: '12px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: `${card.color}20`,
                    border: `1px solid ${card.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color
                  }}>
                    <Icon size={22} />
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    background: `${card.color}15`,
                    border: `1px solid ${card.color}35`,
                    color: card.color,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>
                    {card.badge}
                  </span>
                </div>

                <h3 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
                  {card.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', margin: '0 0 1.5rem 0' }}>
                  {card.desc}
                </p>
              </div>

              <Link
                href={card.link}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'linear-gradient(135deg, #1E65FF 0%, #0052cc 100%)',
                  color: '#fff',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  width: 'fit-content',
                  boxShadow: '0 0 15px rgba(30, 101, 255, 0.4)'
                }}
              >
                <span>{card.btnText}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
