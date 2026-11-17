'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', background: '#112240', padding: '2rem', borderRadius: '10px', boxShadow: '0 10px 30px -10px rgba(2,12,27,0.7)' }}>
      <h1 style={{ textAlign: 'center', color: '#64ffda', marginBottom: '2rem' }}>Sign Up</h1>
      {error && <div style={{ background: '#ff4d4f', color: '#fff', padding: '0.5rem', borderRadius: '5px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#e6f1ff', color: '#0a192f' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#e6f1ff', color: '#0a192f' }}
        />
        <button type="submit" style={{ padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#64ffda', color: '#0a192f', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
          Sign Up
        </button>
      </form>
      <div style={{ marginTop: '1rem', textAlign: 'center', color: '#8892b0' }}>
        Already have an account? <Link href="/login" style={{ color: '#64ffda' }}>Login</Link>
      </div>
    </div>
  );
}
