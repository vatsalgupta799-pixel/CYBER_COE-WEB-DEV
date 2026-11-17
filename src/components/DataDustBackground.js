'use client';
import { useEffect, useRef } from 'react';
import styles from './DataDustBackground.module.css';

export default function DataDustBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let mouse = { x: -1000, y: -1000 };
    let scrollY = window.scrollY;
    let targetScrollY = scrollY;
    let isVisible = true;
    
    // Performance-optimized particle density (capped for smooth 60fps)
    const maxParticles = Math.min(Math.floor((width * height) / 35000), 30);
    const particles = [];
    
    // Softer Cyber theme colors
    const colors = [
      'rgba(255, 30, 86, 0.5)',  // Red
      'rgba(30, 101, 255, 0.5)', // Blue
      'rgba(255, 255, 255, 0.4)' // White
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1; 
        
        this.speedX = (Math.random() - 0.5) * 0.4; 
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // 20% of particles are drawn as high-tech vector crosses instead of dots
        this.isCross = Math.random() > 0.8;
      }
      
      update(scrollVelocity) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Parallax scroll effect
        if (scrollVelocity !== 0) {
          this.y -= scrollVelocity * (this.size * 0.35);
        }
        
        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;
        
        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
      }
      
      draw() {
        ctx.beginPath();
        if (this.isCross) {
          const crossSize = this.size * 2.2;
          ctx.moveTo(this.x - crossSize, this.y);
          ctx.lineTo(this.x + crossSize, this.y);
          ctx.moveTo(this.x, this.y - crossSize);
          ctx.lineTo(this.x, this.y + crossSize);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
    }
    
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    let animationFrameId;
    
    const MOUSE_DIST_MAX = 130;
    const MOUSE_DIST_MAX_SQ = MOUSE_DIST_MAX * MOUSE_DIST_MAX;
    const NODE_DIST_MAX = 100;
    const NODE_DIST_MAX_SQ = NODE_DIST_MAX * NODE_DIST_MAX;
    
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      ctx.clearRect(0, 0, width, height);
      
      let scrollDelta = targetScrollY - scrollY;
      scrollY += scrollDelta * 0.1; 
      let scrollVelocity = Math.abs(scrollDelta) > 0.1 ? scrollDelta * 0.08 : 0; 
      
      // Update positions
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(scrollVelocity);
      }
      
      // Draw connecting vector lines (Batched for peak 60fps performance)
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < NODE_DIST_MAX_SQ) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Connect nodes to mouse with batched path
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distSqMouse = dxMouse * dxMouse + dyMouse * dyMouse;
        
        if (distSqMouse < MOUSE_DIST_MAX_SQ) {
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
        }
      }
      ctx.strokeStyle = 'rgba(30, 101, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw nodes on top of lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const targetCount = Math.min(Math.floor((width * height) / 35000), 30);
      if (particles.length < targetCount) {
        for (let i = particles.length; i < targetCount; i++) {
          particles.push(new Particle());
        }
      } else if (particles.length > targetCount) {
        particles.splice(targetCount);
      }
    };
    
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.dustCanvas}></canvas>;
}
