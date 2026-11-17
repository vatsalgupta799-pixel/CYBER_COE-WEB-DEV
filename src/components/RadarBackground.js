'use client';

import React from 'react';
import styles from './RadarBackground.module.css';
import { Shield, Lock, Target, Zap, Activity, ShieldCheck, Globe } from 'lucide-react';

export default function RadarBackground() {
  return (
    <div className={styles.radarContainer} aria-hidden="true">
      
      {/* Floating Glowing Particles */}
      <div className={`${styles.particle} ${styles.p1}`}></div>
      <div className={`${styles.particle} ${styles.p2}`}></div>
      <div className={`${styles.particle} ${styles.p3}`}></div>
      <div className={`${styles.particle} ${styles.p4}`}></div>
      <div className={`${styles.particle} ${styles.p5}`}></div>
      <div className={`${styles.particle} ${styles.p6}`}></div>
      <div className={`${styles.particle} ${styles.p7}`}></div>
      <div className={`${styles.particle} ${styles.p8}`}></div>
      <div className={`${styles.particle} ${styles.p9}`}></div>
      <div className={`${styles.particle} ${styles.p10}`}></div>

      {/* Central Node */}
      <div className={styles.centerNode}>
        <div className={styles.shieldIcon}>
          <Shield size={48} strokeWidth={2.5} />
        </div>
        
        {/* Concentric expanding rings */}
        <div className={`${styles.ring} ${styles.ring1}`}></div>
        <div className={`${styles.ring} ${styles.ring2}`}></div>
        <div className={`${styles.ring} ${styles.ring3}`}></div>
      </div>

      {/* Vertical subtle lines linking badges conceptually */}
      <div className={`${styles.line} ${styles.line1}`}></div>
      <div className={`${styles.line} ${styles.line2}`}></div>

      {/* Badges */}
      <div className={`${styles.badge} ${styles.badge1}`}>
        <Lock size={22} className={styles.badgeIcon} />
        <span className={styles.badgeText}>SECURE</span>
        <div className={`${styles.badgeDot} ${styles.dotSecure}`}></div>
      </div>

      <div className={`${styles.badge} ${styles.badge2}`}>
        <Target size={22} className={styles.badgeIcon} />
        <span className={styles.badgeText}>INNOVATE</span>
        <div className={`${styles.badgeDot} ${styles.dotInnovate}`}></div>
      </div>

      <div className={`${styles.badge} ${styles.badge3}`}>
        <Zap size={22} className={styles.badgeIcon} />
        <span className={styles.badgeText}>DEFEND</span>
        <div className={`${styles.badgeDot} ${styles.dotDefend}`}></div>
      </div>

      <div className={`${styles.badge} ${styles.badge4}`}>
        <Activity size={22} className={styles.badgeIcon} />
        <span className={styles.badgeText}>ANALYZE</span>
        <div className={`${styles.badgeDot} ${styles.dotAnalyze}`}></div>
      </div>

      <div className={`${styles.badge} ${styles.badge5}`}>
        <ShieldCheck size={22} className={styles.badgeIcon} />
        <span className={styles.badgeText}>PROTECT</span>
        <div className={`${styles.badgeDot} ${styles.dotProtect}`}></div>
      </div>

      <div className={`${styles.badge} ${styles.badge6}`}>
        <Globe size={22} className={styles.badgeIcon} />
        <span className={styles.badgeText}>CONNECT</span>
        <div className={`${styles.badgeDot} ${styles.dotConnect}`}></div>
      </div>

    </div>
  );
}
