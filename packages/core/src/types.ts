// Core package types

export interface SessionManager {
  createSession(dashboardUrl: string): Promise<void>;
  getDashboardUrl(): Promise<string>;
}

export interface TaskProgress {
  total: number;
  completed: number;
  pending: number;
}

export interface TaskInfo {
  id: string;
  description: string;
  leverage?: string;
  requirements?: string;
  completed: boolean;
  details?: string[];
}

export interface PhaseStatus {
  exists: boolean;
  approved?: boolean;
  lastModified?: string;
  content?: string;
}

export interface PathUtils {
  getWorkflowRoot(projectPath: string): string;
  getSpecPath(projectPath: string, specName: string): string;
  getArchiveSpecsPath(projectPath: string): string;
  getArchiveSpecPath(projectPath: string, specName: string): string;
  getSteeringPath(projectPath: string): string;
}

export interface ToolContext {
  projectPath: string;
  dashboardUrl?: string;
  sessionManager?: SessionManager;
}
