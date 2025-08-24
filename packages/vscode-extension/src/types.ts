// VS Code extension types

export interface ExtensionConfig {
  enableNotifications: boolean;
  enableSounds: boolean;
  dashboardAutoOpen: boolean;
  dashboardPort?: number;
}

export interface SpecWorkflowState {
  isActive: boolean;
  projectPath?: string;
  dashboardUrl?: string;
  serverProcess?: any;
}