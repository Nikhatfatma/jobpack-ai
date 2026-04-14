'use client';

import React, { useState, useCallback } from 'react';
import { UploadZone } from '@/components/ui/UploadZone';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Stepper } from '@/components/ui/Stepper';
import { JobPackEditor } from './JobPackEditor';
import { ExportScreen } from './ExportScreen';
import { Check, Brain, Info, Database, Globe, Shield } from 'lucide-react';
import { NAV_STEPS, PROCESSING_STEPS, DEFAULT_JOB_PACK, RECENT_JOBS } from '@/lib/constants';
import { deepClone, mergeExtractedData, cn } from '@/lib/utils';
import type { JobPack } from '@/types';
import styles from './ExtractionFlow.module.css';

export const ExtractionFlow: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [jobPackData, setJobPackData] = useState<JobPack | null>(null);
  const [procProgress, setProcProgress] = useState(0);
  const [activeProcStep, setActiveProcStep] = useState(0);
  const [doneProcSteps, setDoneProcSteps] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    setFile(null);
    setJobPackData(null);
    setCurrentStep(1);
    setProcProgress(0);
    setActiveProcStep(0);
    setDoneProcSteps([]);
    setError(null);
    setIsProcessing(false);
  }, []);

  const loadSamplePack = useCallback(() => {
    setJobPackData(deepClone(DEFAULT_JOB_PACK));
    setCurrentStep(3);
  }, []);

  const runProgressSimulation = useCallback(() => {
    const progPoints = [22, 40, 56, 72, 87, 100];
    const delays = [300, 1100, 2000, 2800, 3600, 4500];

    delays.forEach((d, i) => {
      setTimeout(() => {
        setProcProgress(progPoints[i]);
        setDoneProcSteps(prev => [...prev, i]);
        if (i < 5) setActiveProcStep(i + 1);
      }, d);
    });
  }, []);

  const startExtraction = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setCurrentStep(2);
    setError(null);
    setProcProgress(0);
    setActiveProcStep(0);
    setDoneProcSteps([]);

    runProgressSimulation();

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('AI extraction failed. Falling back to template data.');
      }

      const extracted = await response.json();
      const merged = mergeExtractedData(extracted, DEFAULT_JOB_PACK as unknown as Record<string, unknown>) as unknown as JobPack;

      setTimeout(() => {
        setJobPackData(merged);
        setCurrentStep(3);
        setIsProcessing(false);
      }, 5000);

    } catch (err: any) {
      setTimeout(() => {
        setError(err.message);
        setJobPackData(deepClone(DEFAULT_JOB_PACK));
        setCurrentStep(3);
        setIsProcessing(false);
      }, 5000);
    }
  }, [file, runProgressSimulation]);

  return (
    <div className={styles.container}>
      <Stepper steps={NAV_STEPS} currentStep={currentStep} />

      <main className={styles.main}>
        {/* Step 1: Landing / Upload */}
        {currentStep === 1 && (
          <div className={styles.heroLayout}>
            <div className={styles.heroText}>
              <div className={styles.badge}>
                <Globe size={10} /> 
                GLOBAL ENGINEERING STANDARDS
              </div>
              <h1 className={styles.heroTitle}>
                Expert Job Packs,<br />
                Generated in <span className={styles.highlight}>Seconds.</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Precision extraction for oilfield stick diagrams. Our AI interprets tool sequences, pressure limits, and operational procedures with 99% accuracy.
              </p>
              
              <div className={styles.trustLines}>
                <div className={styles.trustItem}><Shield size={14} /> SOC2 Compliant</div>
                <div className={styles.trustItem}><Database size={14} /> Private Cloud</div>
                <div className={styles.trustItem}><Info size={14} /> Verifiable AI</div>
              </div>

              <div className={styles.heroActions}>
                <Button variant="primary" size="lg" onClick={() => document.getElementById('fi')?.click()}>
                  Start Extraction →
                </Button>
                <Button variant="secondary" size="lg" onClick={loadSamplePack}>
                  Review Sample
                </Button>
              </div>
            </div>

            <div className={styles.sidebarPanel}>
              <div className={styles.panelLabel}>UPLOAD DIAGRAM</div>
              <UploadZone
                onFileSelect={handleFileSelect}
                selectedFile={file}
                onClear={handleClear}
              />

              <Button
                variant="primary"
                fullWidth
                disabled={!file}
                isLoading={isProcessing}
                onClick={startExtraction}
              >
                Analyse & Populated →
              </Button>

              <div className={styles.datasource}>
                <div className={styles.panelLabel}>ENTERPRISE SYNC</div>
                <div className={styles.grid4}>
                  {['SP', 'WD', 'GD', 'DB'].map(src => (
                    <div key={src} className={styles.sourceItem}>
                      <div className={styles.sourceIcon}>{src}</div>
                      {src === 'SP' ? 'SharePoint' : src === 'WD' ? 'WorkDrive' : src === 'GD' ? 'Google' : 'Dropbox'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Processing */}
        {currentStep === 2 && (
          <div className={styles.processingContainer}>
            <Card className={styles.procCard} noPadding>
              <div className={styles.procHeader}>
                <div className={styles.procIcon}>
                  <Brain size={24} color="var(--accent-blue)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div className={styles.procFileName}>{file?.name}</div>
                  <div className={styles.procMeta}>Analysing with Gemini 2.0 Flash High-Density Vision</div>
                </div>
                <div className={styles.procBadge}>{procProgress}%</div>
              </div>

              <div className={styles.progressBarWrapper}>
                <div className={styles.progressBar} style={{ width: `${procProgress}%` }} />
              </div>

              <div className={styles.procSteps}>
                {PROCESSING_STEPS.map((s, i) => (
                  <div
                    key={i}
                    className={cn(
                      styles.procStep,
                      doneProcSteps.includes(i) && styles.procStepDone,
                      activeProcStep === i && !doneProcSteps.includes(i) && styles.procStepRun
                    )}
                  >
                    <div className={styles.pi}>
                      {doneProcSteps.includes(i) ? <Check size={12} strokeWidth={3} /> : i + 1}
                    </div>
                    <div>
                      <div className={styles.pl}>{s.label}</div>
                      <div className={styles.pm}>{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Editor */}
        {currentStep === 3 && jobPackData && (
          <JobPackEditor
            data={jobPackData}
            onSave={(updated) => setJobPackData(updated)}
            onExport={() => setCurrentStep(4)}
          />
        )}

        {/* Step 4: Export */}
        {currentStep === 4 && jobPackData && (
          <ExportScreen
            data={jobPackData}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {error && (
          <div className={styles.errorToast}>
            <span>⚠ {error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}
      </main>

      {/* Footer / Recent Only on Home */}
      {currentStep === 1 && (
        <section className={styles.recentSection}>
          <div className={styles.panelLabel}>RECENTLY COMPLETED</div>
          <div className={styles.grid3}>
            {RECENT_JOBS.map(job => (
              <div key={job.id} className={styles.recentCard} onClick={job.id === '1' ? loadSamplePack : undefined}>
                <div className={styles.recentTop}>
                  <span className={styles.recentWell}>{job.well}</span>
                  <span className={job.status === 'Complete' ? styles.chipComplete : styles.chipDraft}>{job.status}</span>
                </div>
                <div className={styles.recentDesc}>{job.desc}</div>
                <div className={styles.recentFooter}>{job.footer}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
