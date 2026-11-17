'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Publications', href: '/publications' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resources', href: '/student-resources' },
  { label: 'Research', href: '/research' },
  { label: 'Practice Labs', href: '/practice-labs' },
  { label: 'News & Articles', href: '/news' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let prevScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== prevScrolled) {
        prevScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        id="main-navbar"
      >
        <div className={styles.inner}>
          {/* Brand & Logo Area */}
          <Link href="/" className={styles.brand} aria-label="Centre for Cybersecurity Home">
            <div className={styles.logoContainer}>
              <Shield size={34} className={styles.shieldIcon} color="#1E65FF" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className={styles.brandText} style={{ lineHeight: '1.2' }}>
                Centre for
              </span>
              <span className={styles.brandAccent}>
                Cybersecurity
              </span>
            </div>
          </Link>

          {/* Centered Navigation Links */}
          <div className={styles.navCenter}>
            <ul className={styles.desktopLinks}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${
                      pathname === link.href ? styles.active : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className={styles.navRight}>

            {mounted && (
              <div className={styles.actionButtons}>

                <button
                  className={styles.menuToggle}
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Slide-In Menu */}
      <div
        className={`${styles.overlay} ${mobileOpen ? styles.overlayVisible : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        id="mobile-menu"
      >
        <ul className={styles.mobileLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
