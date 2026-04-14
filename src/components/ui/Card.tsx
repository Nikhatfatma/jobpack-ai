'use client';

import React from 'react';
import styles from './Card.module.css';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  id?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass';
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  id,
  title,
  subtitle,
  icon,
  action,
  className,
  variant = 'default',
  noPadding = false,
}) => {
  return (
    <div
      id={id}
      className={cn(styles.card, styles[variant], noPadding && styles.noPadding, className)}
    >
      {(title || icon || action) && (
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.text}>
              {title && <h3 className={styles.title}>{title}</h3>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
