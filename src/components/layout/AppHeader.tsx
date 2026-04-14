'use client';

import React from 'react';
import styles from './AppHeader.module.css';

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
          <div className={styles.logoIcon}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <rect width="44" height="44" rx="8" fill="#E6F2FA"/>
              <path d="M11 30 L21 12" stroke="#1469A8" strokeWidth="2.4" strokeLinecap="round"/>
              <path d="M21 12 L24 19" stroke="#1469A8" strokeWidth="2.4" strokeLinecap="round"/>
              <path d="M24 19 L34 30" stroke="#1469A8" strokeWidth="2.4" strokeLinecap="round"/>
              <path d="M31 24 L34 30 L28 30" stroke="#1469A8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 25 L11 30 L17 30" stroke="#1469A8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.logoTxt}>
            <div className={styles.logoAmazing}>Amazing</div>
            <div className={styles.logoBr}>BUSINESS RESULTS</div>
            <div className={styles.logoTag}>Master the plan, Execute perfection</div>
          </div>
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
