'use client';

import React from 'react';
import styles from './Stepper.module.css';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
}

interface StepperProps {
  steps: readonly Step[];
  currentStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={cn(styles.stprow, className)}>
      {steps.map((step, i) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <React.Fragment key={step.id}>
            <div className={cn(
              styles.stp,
              isCompleted && styles.done,
              isActive && styles.cur
            )}>
              <div className={styles.snum}>
                {isCompleted ? <Check size={12} strokeWidth={3} /> : step.id}
              </div>
              <span className={styles.label}>{step.label}</span>
            </div>
            {i < steps.length - 1 && <div className={styles.sln} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
