// Dashboard frontend types
import { PhaseStatus, TaskProgress } from '@specflow/spec-workflow-core/dist/types.js';

export interface ParsedSpec {
  name: string;
  displayName: string;
  createdAt: string;
  lastModified: string;
  phases: {
    requirements: PhaseStatus;
    design: PhaseStatus;
    tasks: PhaseStatus;
    implementation: PhaseStatus;
  };
  taskProgress?: TaskProgress;
}

export interface SteeringStatus {
  exists: boolean;
  documents: {
    product: boolean;
    tech: boolean;
    structure: boolean;
  };
  lastModified?: string;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  description: string;
  filePath?: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs-revision';
  createdAt: string;
  updatedAt?: string;
  response?: string;
  annotations?: string;
  comments?: any[];
}

export interface TaskItem {
  id: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  details?: string[];
  subtasks?: TaskItem[];
  parent?: string;
  level: number;
}

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
  progress: number;
}

export interface ProjectInfo {
  projectName: string;
  steering: SteeringStatus;
  dashboardUrl: string;
  version: string;
}