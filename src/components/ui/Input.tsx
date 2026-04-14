'use client';

import React from 'react';
import styles from './Input.module.css';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isAiExtracted?: boolean;
}

interface TextareaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isAiExtracted?: boolean;
  multiline: true;
}

type CombinedInputProps = InputProps | TextareaInputProps;

function isTextareaProps(props: CombinedInputProps): props is TextareaInputProps {
  return 'multiline' in props && props.multiline === true;
}

export const Input: React.FC<CombinedInputProps> = (props) => {
  const { label, error, isAiExtracted, className, ...rest } = props;

  const inputClassName = cn(
    styles.input,
    error && styles.error,
    isAiExtracted && styles.ai,
    isTextareaProps(props) && styles.textarea,
  );

  return (
    <div className={cn(styles.wrapper, className)}>
      {label && (
        <label className={styles.label}>
          {label}
          {isAiExtracted && <span className={styles.aiBadge}>✦ AI</span>}
        </label>
      )}
      {isTextareaProps(props) ? (
        <textarea
          className={inputClassName}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={inputClassName}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className={styles.errorText}>{error}</span>}
      {isAiExtracted && !error && (
        <span className={styles.aiHint}>✦ Extracted from diagram</span>
      )}
    </div>
  );
};
