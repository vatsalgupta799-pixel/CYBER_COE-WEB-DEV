import Link from 'next/link';
import { Shield, Home, Terminal, Calendar, FileText, Users, LogOut, Activity } from 'lucide-react';

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#03050a', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Top Admin Navigation */}
      <header style={{
        background: 'rgba(10, 15, 25, 0.98)',
        borderBottom: '1px solid rgba(30, 101, 255, 0.3)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #1E65FF 0%, #0052cc 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(30, 101, 255, 0.6)'
          }}>
            <Shield size={20} color="#fff" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>CyberCoE Admin Panel</h2>
            <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              SuperAdmin Session Active
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link 
            href="/" 
            style={{ 
              color: '#94a3b8', 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '0.85rem',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <Home size={15} /> Main Website
          </Link>

          <Link 
            href="/practice-labs" 
            style={{ 
              color: '#60a5fa', 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '0.85rem',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              background: 'rgba(30, 101, 255, 0.15)',
              border: '1px solid rgba(30, 101, 255, 0.3)'
            }}
          >
            <Terminal size={15} /> Practice Labs
          </Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2.5rem', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
}
