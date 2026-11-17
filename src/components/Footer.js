import Link from 'next/link';
import styles from './Footer.module.css';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Publications', href: '/publications' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.gradientBorder} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1 — About */}
          <div className={styles.col}>
            <h3 className={styles.colHeading}>
              <span className={styles.headingAccent}>Centre for Cybersecurity</span>
            </h3>
            <p className={styles.description}>
              The Centre for Cybersecurity drives cutting-edge
              research, fosters innovation, and builds the next generation of
              cyber defenders through interdisciplinary collaboration.
            </p>
            <p className={styles.university}>
              Department of Computer Science &amp; Engineering
              <br />
              <span className={styles.universityName}>UPES</span>
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className={styles.col}>
            <h3 className={styles.colHeading}>Quick Links</h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    <span className={styles.linkArrow} aria-hidden="true">
                      ›
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className={styles.col}>
            <h3 className={styles.colHeading}>Contact Us</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a href="mailto:pradeepsingh@ddn.upes.ac.in" className={`${styles.contactLink} ${styles.emailLink}`}>
                  pradeepsingh@ddn.upes.ac.in
                </a>
              </li>
              <li className={styles.contactItem}>
                <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a href="tel:+917060388523" className={styles.contactLink}>
                  +91-7060388523
                </a>
              </li>
              <li className={styles.contactItem}>
                <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>
                  IT Tower 1st floor, Centre for Cybersecurity Lab
                  <br />
                  UPES Bidholi Campus
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Centre for Cybersecurity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
