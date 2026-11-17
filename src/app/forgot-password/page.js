'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [mockLink, setMockLink] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setMockLink('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage(data.message);
        if (data.mockLink) {
          setMockLink(data.mockLink);
        }
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', background: '#112240', padding: '2rem', borderRadius: '10px', boxShadow: '0 10px 30px -10px rgba(2,12,27,0.7)' }}>
      <h1 style={{ textAlign: 'center', color: '#64ffda', marginBottom: '1rem' }}>Forgot Password</h1>
      <p style={{ color: '#8892b0', textAlign: 'center', marginBottom: '2rem' }}>
        Enter your email to receive a password reset link.
      </p>
      
      {error && <div style={{ background: '#ff4d4f', color: '#fff', padding: '0.5rem', borderRadius: '5px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      {message && <div style={{ background: '#52c41a', color: '#fff', padding: '0.5rem', borderRadius: '5px', marginBottom: '1rem', textAlign: 'center' }}>{message}</div>}
      
      <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#e6f1ff', color: '#0a192f' }}
        />
        <button type="submit" style={{ padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#64ffda', color: '#0a192f', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
          Send Reset Link
        </button>
      </form>

      {mockLink && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#e6f1ff', borderRadius: '5px', wordBreak: 'break-all' }}>
          <p style={{ color: '#0a192f', fontWeight: 'bold', marginBottom: '0.5rem' }}>Development Only:</p>
          <a href={mockLink} style={{ color: '#0052cc', textDecoration: 'underline' }}>{mockLink}</a>
        </div>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center', color: '#8892b0' }}>
        Remember your password? <Link href="/login" style={{ color: '#64ffda' }}>Login</Link>
      </div>
    </div>
  );
}
