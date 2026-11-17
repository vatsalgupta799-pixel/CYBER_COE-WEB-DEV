'use client';

export default function DynamicHeroBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* High-tech Cyber Grid & Gradient Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 20%, rgba(30, 101, 255, 0.18) 0%, rgba(7, 9, 18, 0.95) 75%), linear-gradient(180deg, #070912 0%, #0c101a 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.6,
        }}
      />
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(7, 9, 18, 0.2) 0%, rgba(7, 9, 18, 0.9) 100%)',
        }}
      />
    </div>
  );
}
