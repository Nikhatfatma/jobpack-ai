export interface JobMetadata {
  taskId: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  wellName: string;
  rig: string;
  customer: string;
  salesRep: string;
  quoteNo: string;
  dueDate: string;
  assignee: string;
}

export interface WellData {
  td: string;
  tvd: string;
  heelDepth: string;
  linerTop: string;
  linerLength: string;
  overlap: string;
  linerWeight: string;
  icpDepth: string;
  holeSize: string;
}

export interface CasingString {
  id: string;
  name: string;
  interval: string;
  size: string;
  weight: string;
  grade: string;
  threads: string;
  hole: string;
}

export interface EquipmentItem {
  id: string;
  description: string;
  size: string;
  grade: string;
  threads: string;
  unitCost: string;
  status: 'Confirmed' | 'Review' | 'New';
}

export interface ServiceItem {
  id: string;
  description: string;
  cost: string;
}

export interface StepItem {
  id: string;
  content: string;
}

export interface CriterionItem {
  id: string;
  content: string;
  status: 'ok' | 'warning';
}

export interface EdgeCaseItem {
  id: string;
  test: string;
  expected: string;
}

export interface JobPack {
  id: string;
  title: string;
  metadata: JobMetadata;
  wellData: WellData;
  casingStrings: CasingString[];
  businessOverview: StepItem[];
  equipmentList: EquipmentItem[];
  services: ServiceItem[];
  preJobPrep: StepItem[];
  runningProcedures: StepItem[];
  cementingProcedures: StepItem[];
  acceptanceCriteria: CriterionItem[];
  edgeCases: EdgeCaseItem[];
  checklist: { id: string; label: string; checked: boolean }[];
  completeness: number;
}
