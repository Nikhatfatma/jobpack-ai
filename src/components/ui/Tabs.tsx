'use client';

import React from 'react';
import styles from './Tabs.module.css';
import { clsx } from 'clsx';

interface TabsProps {
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <div className={styles.tabs}>{children}</div>;
};

interface TabsHeaderProps {
  children: React.ReactNode;
}

export const TabsHeader: React.FC<TabsHeaderProps> = ({ children }) => {
  return <div className={styles.header}>{children}</div>;
};

interface TabHeaderProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const TabHeader: React.FC<TabHeaderProps> = ({ active, onClick, children }) => {
  return (
    <button 
      className={clsx(styles.tabHeader, active && styles.active)} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

interface TabContentProps {
  active: boolean;
  children: React.ReactNode;
}

export const TabContent: React.FC<TabContentProps> = ({ active, children }) => {
  if (!active) return null;
  return <div className={styles.tabContent}>{children}</div>;
};
