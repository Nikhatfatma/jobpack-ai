import type { JobPack } from '@/types';

export const PROCESSING_STEPS = [
  { label: 'Document ingested', sub: 'PDF parsed · 3 pages · 14 annotations found' },
  { label: 'Stick diagram analysed', sub: 'Identifying tools and assembly order' },
  { label: 'Parameters extracted', sub: 'Shear pressures, ODs, burst / collapse ratings' },
  { label: 'Procedures mapped', sub: 'ITC-007-036B matched to equipment sequence' },
  { label: 'Job pack populated', sub: 'Metadata, well data, task description built' },
  { label: 'Completeness check', sub: 'Validated against task writing standards' },
] as const;

export const NAV_STEPS = [
  { id: 1, label: 'Upload diagram', snum: '1' },
  { id: 2, label: 'AI extraction', snum: '2' },
  { id: 3, label: 'Edit job pack', snum: '3' },
  { id: 4, label: 'Export', snum: '4' },
] as const;

export const EDITOR_SECTIONS = [
  { id: 's1', label: 'Metadata', group: 'JOB INFO' },
  { id: 's2', label: 'Well & casing', group: 'JOB INFO' },
  { id: 's3', label: 'Business overview', group: 'JOB INFO' },
  { id: 's4', label: 'Equipment list', group: 'EQUIPMENT' },
  { id: 's5', label: 'Service & rentals', group: 'EQUIPMENT' },
  { id: 's6', label: 'Pre-job prep', group: 'PROCEDURES' },
  { id: 's7', label: 'Running procedures', group: 'PROCEDURES' },
  { id: 's8', label: 'Cementing & packer', group: 'PROCEDURES' },
  { id: 's9', label: 'Acceptance criteria', group: 'VERIFICATION' },
  { id: 's10', label: 'Edge cases', group: 'VERIFICATION' },
  { id: 's11', label: 'Pre-job checklist', group: 'VERIFICATION' },
] as const;

export const SECTION_GROUPS = ['JOB INFO', 'EQUIPMENT', 'PROCEDURES', 'VERIFICATION'] as const;

export const EXPORT_FORMATS = [
  {
    id: 'word',
    label: 'Word document (.docx)',
    sub: 'Formatted · editable · print-ready',
    iconLabel: 'W',
    color: 'var(--accent-blue)',
    bg: 'var(--accent-blue-soft)',
    badge: 'Recommended',
  },
  {
    id: 'pdf',
    label: 'PDF — Import Tool template',
    sub: 'Read-only · shareable with rig crew',
    iconLabel: 'PDF',
    color: '#FF6464',
    bg: 'rgba(255, 100, 100, 0.1)',
  },
  {
    id: 'zoho',
    label: 'Zoho CRM / Projects',
    sub: 'Push directly to your project board',
    iconLabel: 'Z',
    color: 'var(--accent-teal)',
    bg: 'var(--accent-teal-soft)',
  },
  {
    id: 'email',
    label: 'Email to customer',
    sub: 'Draft in Gmail — Brooklyn Hollett',
    iconLabel: '@',
    color: 'var(--accent-amber)',
    bg: 'var(--accent-amber-soft)',
  },
] as const;

/**
 * Default demo data used when viewing the sample pack
 * or when the API returns an incomplete response.
 */
export const DEFAULT_JOB_PACK: JobPack = {
  id: 'demo-d24-d35-h19',
  title: 'Run & Cement 168.3 mm Liner — D24 / D35 / H19',
  metadata: {
    taskId: 'IMP-LH-D24-001',
    priority: 'High',
    wellName: 'D24 / D35 / H19',
    rig: 'PD 204',
    customer: 'Brooklyn Hollett — (709) 763-7279',
    salesRep: 'Graham Maglio — (403) 988-5835',
    quoteNo: '7979 — Rev. 0 · Feb 23, 2026',
    dueDate: 'Feb 23, 2026 — confirm at planning',
    assignee: 'Import Tool Service Operator — assign at pre-job planning meeting',
  },
  wellData: {
    td: '1,799 m',
    tvd: '461 m',
    heelDepth: '651 m MD',
    linerTop: '604 m MD',
    linerLength: '1,195 m',
    overlap: '47 m',
    linerWeight: '34,875 daN',
    icpDepth: '651 m MD',
    holeSize: '216 mm',
  },
  casingStrings: [
    { id: 'cs-1', name: 'Int. casing', interval: '0 – 651 m', size: '244.5 mm', weight: '64.74 kg/m', grade: 'L-80', threads: 'Tenaris Blue', hole: '311 mm' },
    { id: 'cs-2', name: 'Prod. liner', interval: '604–1,799 m', size: '168.3 mm', weight: '29.76 kg/m', grade: 'L-80', threads: 'Tenaris XP', hole: '216 mm' },
  ],
  businessOverview: [
    { id: 'bo-1', content: 'Source: Quote 7979 Rev. 0, Feb 23, 2026. Import Tool Corp. to Brooklyn Hollett, PD 204 — Cold Lake D24/D35/H19. Reference: ITC-007-036B Rev. 0.' },
    { id: 'bo-2', content: 'What: Run, hang, cement, and set packer on 1,195 m production liner (168.3 mm, L-80 TXP) from 604 m to 1,799 m MD using ITC X-Grip Rotating Liner Hanger and GTC2 Tubing Conveyed Debris Seal Packer.' },
    { id: 'bo-3', content: 'Constraint: Import Tool does not buy rig time. Equipment lost-in-hole invoiced at replacement cost — no depreciation. Prices firm 7 days from quote date.' },
  ],
  equipmentList: [
    { id: 'eq-1', description: 'ITC HRD Setting Collar c/w 1.8 m PBR Tieback Extension', size: '177.8 mm', grade: 'L-80', threads: 'Tenaris XP', unitCost: '$20,455.00', status: 'Confirmed' },
    { id: 'eq-2', description: 'RS Packoff Bushing w/ 158.8 mm Sealbore ID', size: '177.8 mm', grade: 'L-80', threads: 'Tenaris XP', unitCost: '$4,680.50', status: 'Confirmed' },
    { id: 'eq-3', description: 'ITC GTC2 TCP c/w Aflas Infused 3D Element', size: '168.3 mm', grade: 'L-80', threads: 'Tenaris XP', unitCost: '$25,995.00', status: 'Review' },
    { id: 'eq-4', description: 'ITC X-Grip Rotating Liner Hanger', size: '168.3 mm', grade: 'L-80', threads: 'Tenaris XP', unitCost: '$36,995.00', status: 'Confirmed' },
  ],
  services: [
    { id: 'sv-1', description: 'ITC Top Drive Cement Head / Job', cost: '$3,702' },
    { id: 'sv-2', description: '244.5 mm Casing Scraper / Job', cost: '$2,985' },
    { id: 'sv-3', description: '177.8 mm HRD Hydraulic Running Tool / Job', cost: '$4,797' },
    { id: 'sv-4', description: 'Env, Carbon Levy, H&S Fee / Job', cost: '$400' },
  ],
  preJobPrep: [
    { id: 'pj-1', content: 'Verify all liner equipment against Quote 7979 LOM data sheets — confirm no transport damage before proceeding.' },
    { id: 'pj-2', content: 'Confirm shear pin values: hanger ~4,650 kPa · running tool ~7,930 kPa · landing collar ~12,450 kPa · TCP ~16,880 kPa (±15%).' },
    { id: 'pj-3', content: 'Record torque and drag on last clean-out trip per ITC-007-036B — email to bdaley@importtool.com before mobilisation.' },
  ],
  runningProcedures: [
    { id: 'rp-1', content: 'Run liner in order: Double Valve Set Shoe → Float Collar w/ Baffle (float check) → ITC Landing Collar with shear-out seat.' },
    { id: 'rp-2', content: 'Apply make-up torque: Min 11,661 N·m · Optimum 12,963 N·m · Max 14,265 N·m. Install 3,500 kPa pop-valve pin before breaking circulation.' },
  ],
  cementingProcedures: [
    { id: 'cp-1', content: 'Max allowable pumping pressure: 12,500 kPa. Bump plug at 3,500 kPa over circulating pressure. Hold 2 minutes then bleed back to check floats.' },
    { id: 'cp-2', content: 'Pressure up to 30,000 kPa to set packer — HOLD for 10 minutes. Packer cylinder shears at 16,161–17,009 kPa.' },
  ],
  acceptanceCriteria: [
    { id: 'ac-1', content: 'Liner hanger sets on first attempt: string weight drops by ~34,875 daN when slips engage in 244.5 mm casing at 604 m MD.', status: 'ok' },
    { id: 'ac-2', content: 'Hydraulic setting tool releases: drill string picks up freely with confirmed loss of liner weight within 2 m of movement.', status: 'ok' },
    { id: 'ac-3', content: 'Packer sets: 30,000 kPa held for 10 minutes without pressure drop exceeding acceptable bleed-off rate.', status: 'ok' },
    { id: 'ac-4', content: 'Backside test (if performed): holds 7,000 kPa for 5 minutes with max 100 L bleed-off. Confirm with Oil Co. Rep.', status: 'warning' },
  ],
  edgeCases: [
    { id: 'ec-1', test: 'Hanger does not hang on first pressure attempt.', expected: 'Increase in 500 kPa increments. If unable, raise position, set on bottom ensuring packer stays 2 m from float collar, or retrieve liner.' },
    { id: 'ec-2', test: 'Setting tool does not release hydraulically.', expected: 'Apply left-hand rotation at 6,305 N·m to shear 2 brass pins. Body turns 1/4 turn, drops 45 mm. Pick up 1 m to confirm release.' },
  ],
  checklist: [
    { id: 'ck-1', label: 'All 6 metadata fields filled — no blanks, no TBD, no ASAP.', checked: false },
    { id: 'ck-2', label: 'PO / AFE number confirmed with customer before mobilisation.', checked: false },
    { id: 'ck-3', label: 'LOM data sheets verified against physical equipment on location.', checked: false },
    { id: 'ck-4', label: 'Shear pin values confirmed for all 5 tool groups.', checked: false },
    { id: 'ck-5', label: 'Torque & Drag Worksheet completed and emailed to Import Tool office.', checked: false },
    { id: 'ck-6', label: 'Setting balls measured, loaded, witnessed by Oil Company Representative.', checked: false },
    { id: 'ck-7', label: 'Drill pipe drifted — 60 mm OD drift retrieved (confirmed on Checksheet).', checked: false },
    { id: 'ck-8', label: 'Max allowable surface torque calculated and communicated to rig crew.', checked: false },
    { id: 'ck-9', label: 'Cement blend working time confirmed sufficient for full sequence.', checked: false },
    { id: 'ck-10', label: 'Contingency plans reviewed — hanger, ball, packer, release scenarios.', checked: false },
  ],
  completeness: 91,
};

export const RECENT_JOBS = [
  { id: '1', well: 'D24/D35/H19', desc: '168.3mm Liner · PD 204 · Feb 23, 2026', footer: 'Quote 7979 · Import Tool Corp.', status: 'Complete' as const },
  { id: '2', well: 'D29-H07 ETHELLK', desc: '168.3mm Liner · PD 204 · Feb 19, 2026', footer: 'Quote 7981 · Import Tool Corp.', status: 'Draft' as const },
  { id: '3', well: 'OBE 102 HZ WILLGR', desc: 'Packer Setting Analysis · Jan 21, 2026', footer: 'Obsidian Energy · TADPRO', status: 'Complete' as const },
] as const;
