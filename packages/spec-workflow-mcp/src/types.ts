// Common types for the spec workflow MCP server

import { PhaseStatus, SessionManager, SteeringStatus, TaskInfo, TaskProgress, ToolContext } from '@specflow/spec-workflow-core/dist/types.js';

export { PhaseStatus, SessionManager, SteeringStatus, TaskInfo, TaskProgress, ToolContext };

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

export interface ToolResponse {
  success: boolean;
  message: string;
  data?: any;
  nextSteps?: string[]; // Optional for backwards compatibility
  projectContext?: {
    projectPath: string;
    workflowRoot: string;
    specName?: string;
    currentPhase?: string;
    dashboardUrl?: string; // Optional for backwards compatibility
  };
}

// MCP-compliant response format (matches CallToolResult from MCP SDK)
export interface MCPToolResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
  _meta?: Record<string, any>;
}

// Helper function to convert ToolResponse to MCP format
export function toMCPResponse(response: ToolResponse, isError: boolean = false): MCPToolResponse {
  return {
    content: [{
      type: "text",
      text: JSON.stringify(response, null, 2)
    }],
    isError
  };
}