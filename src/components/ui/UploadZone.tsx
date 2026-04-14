'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './UploadZone.module.css';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/utils';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, selectedFile, onClear }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.tiff'],
      'application/octet-stream': ['.dwg']
    },
    multiple: false
  });

  if (selectedFile) {
    return (
      <div className={styles.container}>
        <div className={styles.preview}>
          <div className={styles.fileIcon}>
            <FileText size={20} />
          </div>
          <div className={styles.fileInfo}>
            <p className={styles.fileName}>{selectedFile.name}</p>
            <p className={styles.fileSize}>
              {formatFileSize(selectedFile.size)} · Ready to process
            </p>
          </div>
          <button onClick={onClear} className={styles.clearBtn} aria-label="Remove file">
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        {...getRootProps()}
        className={cn(styles.dropzone, isDragActive && styles.active)}
      >
        <input {...getInputProps()} id="fi" />
        <div className={styles.iconCircle}>
          <Upload size={24} className={styles.uploadIcon} />
        </div>
        <h3 className={styles.title}>Drag and drop your stick diagram</h3>
        <p className={styles.subtitle}>PDF, PNG, JPG, DWG, TIFF — up to 50 MB</p>
        <div className={styles.chips}>
          {['PDF', 'PNG', 'JPG', 'DWG', 'TIFF'].map(type => (
            <span key={type} className={styles.chip}>{type}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
