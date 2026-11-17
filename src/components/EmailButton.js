'use client';

import { useState, useRef, useEffect } from 'react';
import { Mail, Copy, Check, ExternalLink, X, Send } from 'lucide-react';
import styles from './EmailButton.module.css';

export default function EmailButton({ email, className, label = 'Email' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);

  // Close on outside click or Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = (e) => {
    e?.stopPropagation();
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openGmail = (e) => {
    e?.stopPropagation();
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`, '_blank', 'noopener,noreferrer');
  };

  const openOutlook = (e) => {
    e?.stopPropagation();
    window.open(`https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(email)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className={`${styles.contactBtn} ${className || ''}`}
        title={`Contact via email: ${email}`}
      >
        <Mail size={15} />
        <span>{label}</span>
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBackdrop} onClick={() => setIsOpen(false)} />
          <div className={styles.modalCard} ref={modalRef} role="dialog" aria-modal="true">
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.headerTitleGroup}>
                <div className={styles.iconCircle}>
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className={styles.modalTitle}>Contact via Email</h3>
                  <p className={styles.modalSubtitle}>Choose your preferred way to send an email</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className={styles.closeBtn}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Email Display & Copy Box */}
            <div className={styles.emailBox}>
              <div className={styles.emailTextContainer}>
                <span className={styles.emailFieldLabel}>Email Address</span>
                <span className={styles.emailString}>{email}</span>
              </div>
              <button 
                type="button" 
                onClick={handleCopy} 
                className={`${styles.copyBtn} ${copied ? styles.copySuccess : ''}`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Quick Action Options */}
            <div className={styles.actionSection}>
              <span className={styles.actionSectionTitle}>Quick Send Options</span>

              <button 
                type="button" 
                onClick={openGmail} 
                className={styles.actionCard}
              >
                <div className={`${styles.actionIconBadge} ${styles.gmailBadge}`}>
                  <Send size={16} />
                </div>
                <div className={styles.actionDetails}>
                  <strong>Open in Gmail (Web)</strong>
                  <small>Opens compose tab directly in Google Mail</small>
                </div>
                <ExternalLink size={15} className={styles.arrowIcon} />
              </button>

              <button 
                type="button" 
                onClick={openOutlook} 
                className={styles.actionCard}
              >
                <div className={`${styles.actionIconBadge} ${styles.outlookBadge}`}>
                  <Send size={16} />
                </div>
                <div className={styles.actionDetails}>
                  <strong>Open in Outlook Web</strong>
                  <small>Compose in Office 365 / Outlook.com</small>
                </div>
                <ExternalLink size={15} className={styles.arrowIcon} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
