'use client';

import React from 'react';
import styles from './Navigation.module.css';
import { LayoutDashboard, FolderKanban, FileStack, BarChart3, Settings, PlusCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Topbar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <div className={styles.lmark}>
            <PlusCircle size={20} color="white" fill="var(--accent-blue)" />
          </div>
          <span className={styles.ltext}>Job<span>Pack</span> AI</span>
        </div>

        <div className={styles.search}>
          <Search size={14} className={styles.searchIcon} />
          <input type="text" placeholder="Search jobs, quotes..." className={styles.searchInput} />
        </div>
      </div>

      <nav className={styles.nav}>
        <button className={cn(styles.tnb, styles.active)}>
          <FileStack size={16} />
          New job
        </button>
        <button className={styles.tnb}>
          <FolderKanban size={16} />
          My jobs
        </button>
        <button className={styles.tnb}>
          <LayoutDashboard size={16} />
          Templates
        </button>
        <button className={styles.tnb}>
          <BarChart3 size={16} />
          Analytics
        </button>
      </nav>

      <div className={styles.user}>
        <div className={styles.settings}>
          <Settings size={18} />
        </div>
        <div className={styles.divider} />
        <div className={styles.userInfo}>
          <span className={styles.userName}>Graham Maglio</span>
          <span className={styles.userRole}>Service Lead</span>
        </div>
        <div className={styles.uav}>GM</div>
      </div>
    </div>
  );
};
