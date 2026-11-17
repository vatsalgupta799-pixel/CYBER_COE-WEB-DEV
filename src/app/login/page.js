'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Key, Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import DataDustBackground from '../../components/DataDustBackground';

export default function Login() {
  const [email, setEmail] = useState('admin@cybercoe.edu');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        router.push(data.redirectTo || '/admin');
        router.refresh();
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoAdmin = () => {
    setEmail('admin@cybercoe.edu');
    setPassword('admin123');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#03050a', color: '#fff', position: 'relative', padding: '2rem' }}>
      <DataDustBackground />

      <div style={{
        maxWidth: '440px',
        width: '100%',
        background: 'rgba(10, 15, 25, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '2.5rem',
        borderRadius: '16px',
        border: '1px solid rgba(30, 101, 255, 0.3)',
        boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(30, 101, 255, 0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1E65FF 0%, #0052cc 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            boxShadow: '0 0 20px rgba(30, 101, 255, 0.6)'
          }}>
            <Shield size={30} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#fff' }}>
            CyberCoE Portal
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Sign in to access the Command Center & Admin Panel
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div style={{
          background: 'rgba(30, 101, 255, 0.1)',
          border: '1px solid rgba(30, 101, 255, 0.3)',
          borderRadius: '8px',
          padding: '0.75rem',
          marginBottom: '1.5rem',
          fontSize: '0.8rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>🔑 Default Admin Access:</span>
            <button
              onClick={setDemoAdmin}
              style={{
                background: '#1E65FF',
                border: 'none',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Fill Demo
            </button>
          </div>
          <div style={{ color: '#cbd5e1', fontFamily: 'monospace' }}>
            Email: <strong style={{ color: '#fff' }}>admin@cybercoe.edu</strong><br />
            Pass: <strong style={{ color: '#fff' }}>admin123</strong>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1.25rem',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>
              Email Address
            </label>
            <input 
              type="text" 
              placeholder="admin@cybercoe.edu" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: '#05080f',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: '#05080f',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              padding: '0.85rem',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #1E65FF 0%, #0052cc 100%)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 0 20px rgba(30, 101, 255, 0.5)',
              opacity: isLoading ? 0.6 : 1,
              marginTop: '0.5rem'
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In to Admin Panel'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: '#60a5fa', textDecoration: 'none' }}>
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
