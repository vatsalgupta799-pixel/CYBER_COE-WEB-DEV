'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage('Password updated successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', background: '#112240', padding: '2rem', borderRadius: '10px', boxShadow: '0 10px 30px -10px rgba(2,12,27,0.7)' }}>
      <h1 style={{ textAlign: 'center', color: '#64ffda', marginBottom: '2rem' }}>Reset Password</h1>
      
      {error && <div style={{ background: '#ff4d4f', color: '#fff', padding: '0.5rem', borderRadius: '5px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      {message && <div style={{ background: '#52c41a', color: '#fff', padding: '0.5rem', borderRadius: '5px', marginBottom: '1rem', textAlign: 'center' }}>{message}</div>}
      
      {!token ? (
        <div style={{ textAlign: 'center', color: '#8892b0' }}>
          Invalid or missing reset token. Please request a new link.
        </div>
      ) : (
        <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="password" 
            placeholder="New Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            minLength={6}
            style={{ padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#e6f1ff', color: '#0a192f' }}
          />
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            minLength={6}
            style={{ padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#e6f1ff', color: '#0a192f' }}
          />
          <button type="submit" style={{ padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#64ffda', color: '#0a192f', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
            Update Password
          </button>
        </form>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center', color: '#8892b0' }}>
        Back to <Link href="/login" style={{ color: '#64ffda' }}>Login</Link>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '100px', color: '#64ffda' }}>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
