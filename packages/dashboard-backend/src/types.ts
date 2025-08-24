// Dashboard backend types
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

export interface SpecData {
  name: string;
  description?: string;
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

export interface SpecChangeEvent {
  type: 'spec' | 'steering';
  action: 'created' | 'updated' | 'deleted';
  name: string;
  data?: ParsedSpec | any;
}

export interface DashboardOptions {
  projectPath: string;
  autoOpen?: boolean;
  port?: number;
}
