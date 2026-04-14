import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names using clsx. A utility wrapper
 * for combining conditional and static class names.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Generate a short random ID for list items.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Deeply clone a plain object/array.
 * Uses structuredClone when available, falls back to JSON parse/stringify.
 */
export function deepClone<T>(obj: T): T {
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge AI-extracted data into the default job pack structure,
 * filling missing fields with defaults.
 */
export function mergeExtractedData(
  extracted: Record<string, unknown>,
  defaults: Record<string, unknown>
): Record<string, unknown> {
  const result = deepClone(defaults);

  for (const key of Object.keys(extracted)) {
    const val = extracted[key];
    if (val !== null && val !== undefined && val !== '') {
      if (typeof val === 'object' && !Array.isArray(val) && typeof result[key] === 'object' && !Array.isArray(result[key])) {
        result[key] = mergeExtractedData(val as Record<string, unknown>, result[key] as Record<string, unknown>);
      } else {
        result[key] = val;
      }
    }
  }

  return result;
}

/**
 * Format file size into human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 1 ? 2 : 0)} ${units[i]}`;
}
