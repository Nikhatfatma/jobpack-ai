'use client';

import { useState, useCallback } from 'react';
import type { JobPack } from '@/types';
import { generateId, deepClone } from '@/lib/utils';

/**
 * Custom hook for managing JobPack state with
 * immutable updates and helper functions.
 */
export function useJobPack(initialData: JobPack) {
  const [data, setData] = useState<JobPack>(deepClone(initialData));

  /** Update a nested field via dot-path array */
  const updateField = useCallback((path: string[], value: unknown) => {
    setData(prev => {
      const next = deepClone(prev);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = next;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return next;
    });
  }, []);

  /** Add an item to a list field */
  const addItem = useCallback((listName: keyof JobPack, template: Record<string, unknown>) => {
    setData(prev => {
      const next = deepClone(prev);
      const list = next[listName];
      if (Array.isArray(list)) {
        list.push({ ...template, id: generateId() });
      }
      return next;
    });
  }, []);

  /** Remove an item from a list field by index */
  const removeItem = useCallback((listName: keyof JobPack, index: number) => {
    setData(prev => {
      const next = deepClone(prev);
      const list = next[listName];
      if (Array.isArray(list)) {
        list.splice(index, 1);
      }
      return next;
    });
  }, []);

  /** Update a specific field on a list item */
  const updateListItem = useCallback((listName: keyof JobPack, index: number, field: string, value: unknown) => {
    setData(prev => {
      const next = deepClone(prev);
      const list = next[listName];
      if (Array.isArray(list) && list[index]) {
        (list[index] as Record<string, unknown>)[field] = value;
      }
      return next;
    });
  }, []);

  /** Compute completeness score dynamically */
  const completeness = (() => {
    let filled = 0;
    let total = 0;

    // Check metadata fields
    const meta = data.metadata;
    const metaFields = ['taskId', 'priority', 'wellName', 'rig', 'customer', 'salesRep', 'quoteNo', 'dueDate'] as const;
    metaFields.forEach(f => { total++; if (meta[f]) filled++; });

    // Check well data
    const well = data.wellData;
    const wellFields = ['td', 'tvd', 'heelDepth', 'linerTop', 'linerLength', 'overlap', 'linerWeight', 'icpDepth', 'holeSize'] as const;
    wellFields.forEach(f => { total++; if (well[f]) filled++; });

    // Check lists have content
    const lists = ['businessOverview', 'equipmentList', 'services', 'preJobPrep', 'runningProcedures', 'cementingProcedures', 'acceptanceCriteria', 'edgeCases'] as const;
    lists.forEach(l => { total++; if (data[l] && data[l].length > 0) filled++; });

    return total > 0 ? Math.round((filled / total) * 100) : 0;
  })();

  /** Count fields that need review */
  const reviewCount = data.equipmentList.filter(e => e.status === 'Review').length +
    data.acceptanceCriteria.filter(a => a.status === 'warning').length;

  /** Count checked checklist items */
  const checkedCount = data.checklist.filter(c => c.checked).length;
  const totalChecklist = data.checklist.length;

  return {
    data,
    setData,
    updateField,
    addItem,
    removeItem,
    updateListItem,
    completeness,
    reviewCount,
    checkedCount,
    totalChecklist,
  };
}
