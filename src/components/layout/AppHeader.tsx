'use client';

import React from 'react';
import styles from './AppHeader.module.css';
import { Logo } from '@/components/ui/Logo';

interface AppHeaderProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onExport: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ activeScreen, onNavigate, onExport }) => {
  return (
    <header className={styles.container}>
      {/* ── TOPBAR ── */}
      <div className={styles.top}>
        <div className={styles.topL}>
          <span>Amazing Business Results</span>
          <div className={styles.topSep}></div>
          <span className={styles.topHl}>(561) 788-7073</span>
          <div className={styles.topSep}></div>
          <span className={styles.topHl}>(647) 694-3379</span>
        </div>
        <div className={styles.topR}>
          <span>Zoho Premium Partner</span>
          <div className={styles.topSep}></div>
          <span>★★★★★ 5 Star Reviews</span>
        </div>
      </div>

      {/* ── HEADER ── */}
      <div className={styles.hdr}>
        <div className={styles.logo} onClick={() => onNavigate('dash')}>
          <Logo width={160} height={40} />
        </div>

        <div className={styles.hdrBadge}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="5.5" fill="var(--org-lt)" stroke="var(--org)" strokeWidth="1.2"/>
            <path d="M4 6.5l2 2 3.5-3.5" stroke="var(--org)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          AI POWERED IMPORT TOOL
        </div>

        <div className={styles.hdrR}>
          <div className={styles.hdrDocWrap}>
            <div className={styles.hdrDoc}>LINER HANGER PROGRAM</div>
            <div className={styles.hdrDsub}>Cold Lake Operations · Graham Maglio</div>
          </div>
          <div className={styles.av}>GM</div>
          <button className="btn btn-org sm" onClick={() => onNavigate('upload')}>Get started now</button>
        </div>
      </div>

      {/* ── NAV ── */}
      <div className={styles.nav}>
        <button className={`${styles.nb} ${activeScreen === 'dash' ? styles.on : ''}`} onClick={() => onNavigate('dash')}>HOME</button>
        <button className={`${styles.nb} ${activeScreen === 'upload' ? styles.on : ''}`} onClick={() => onNavigate('upload')}>NEW JOB</button>
        <button className={`${styles.nb} ${activeScreen === 'pack' ? styles.on : ''}`} onClick={() => onNavigate('pack')}>EDIT PACK</button>
        <button className={`${styles.nb} ${activeScreen === 'export' ? styles.on : ''}`} onClick={() => onNavigate('export')}>EXPORT</button>
        <button className={styles.nb}>MY JOBS</button>
        <button className={styles.nb}>TEMPLATES</button>
        <button className={styles.nb}>ABOUT</button>
        <div className={styles.nsep}></div>
        <button className="btn btn-navy sm" onClick={onExport}>Export PDF →</button>
      </div>
    </header>
  );
};
