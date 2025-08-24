export type DefectPriority = 'low' | 'medium' | 'high' | 'critical';
export type DefectSeverity = 'low' | 'medium' | 'high' | 'critical';
export type DefectType = 'bug' | 'enhancement' | 'feature' | 'task';
export type DefectStatus = 'new' | 'assigned' | 'inProgress' | 'testing' | 'resolved' | 'closed' | 'reopened';

// Kanban column mapping
export type DefectColumn = 'new' | 'inProgress' | 'testing' | 'resolved' | 'closed';

export interface Defect {
  id: string;
  title: string;
  description: string;
  priority: DefectPriority;
  severity: DefectSeverity;
  type: DefectType;
  status: DefectStatus;
  column: DefectColumn; // For kanban board positioning
  assignee?: string;
  reporter?: string;
  dateCreated: string;
  dateModified: string;
  dateResolved?: string;
  spec?: string; // Related specification
  component?: string;
  version?: string;
  environment?: string;
  stepsToReproduce?: string;
  expectedResult?: string;
  actualResult?: string;
  tags?: string[];
  comments?: DefectComment[];
  attachments?: DefectAttachment[];
}

export interface DefectComment {
  id: string;
  author: string;
  content: string;
  dateCreated: string;
  dateModified?: string;
}

export interface DefectAttachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  dateUploaded: string;
}

export interface DefectStatistics {
  total: number;
  open: number;
  resolved: number;
  critical: number;
  byPriority: Record<DefectPriority, number>;
  byStatus: Record<DefectStatus, number>;
  byType: Record<DefectType, number>;
}

export interface CreateDefectRequest {
  title: string;
  description: string;
  priority: DefectPriority;
  severity: DefectSeverity;
  type: DefectType;
  assignee?: string;
  spec?: string;
  component?: string;
  version?: string;
  environment?: string;
  stepsToReproduce?: string;
  expectedResult?: string;
  actualResult?: string;
  tags?: string[];
}

export interface UpdateDefectRequest {
  id: string;
  title?: string;
  description?: string;
  priority?: DefectPriority;
  severity?: DefectSeverity;
  type?: DefectType;
  status?: DefectStatus;
  assignee?: string;
  spec?: string;
  component?: string;
  version?: string;
  environment?: string;
  stepsToReproduce?: string;
  expectedResult?: string;
  actualResult?: string;
  tags?: string[];
}

export interface MoveDefectRequest {
  id: string;
  fromColumn: DefectColumn;
  toColumn: DefectColumn;
  position?: number;
}

// Utility functions for defect data
export const getDefectColumnFromStatus = (status: DefectStatus): DefectColumn => {
  const statusToColumnMap: Record<DefectStatus, DefectColumn> = {
    'new': 'new',
    'assigned': 'new',
    'inProgress': 'inProgress',
    'testing': 'testing',
    'resolved': 'resolved',
    'closed': 'closed',
    'reopened': 'inProgress'
  };
  return statusToColumnMap[status];
};

export const getStatusFromColumn = (column: DefectColumn): DefectStatus => {
  const columnToStatusMap: Record<DefectColumn, DefectStatus> = {
    'new': 'new',
    'inProgress': 'inProgress', 
    'testing': 'testing',
    'resolved': 'resolved',
    'closed': 'closed'
  };
  return columnToStatusMap[column];
};

export const getPriorityColor = (priority: DefectPriority): string => {
  const colors: Record<DefectPriority, string> = {
    'low': 'defect-priority-low',
    'medium': 'defect-priority-medium',
    'high': 'defect-priority-high',
    'critical': 'defect-priority-critical'
  };
  return colors[priority];
};

export const getTypeColor = (type: DefectType): string => {
  const colors: Record<DefectType, string> = {
    'bug': 'defect-type-bug',
    'enhancement': 'defect-type-enhancement',
    'feature': 'defect-type-feature',
    'task': 'defect-type-task'
  };
  return colors[type];
};

export const getColumnClassName = (column: DefectColumn): string => {
  const classes: Record<DefectColumn, string> = {
    'new': 'kanban-column-new',
    'inProgress': 'kanban-column-inprogress',
    'testing': 'kanban-column-testing',
    'resolved': 'kanban-column-resolved',
    'closed': 'kanban-column-closed'
  };
  return classes[column];
};

export const formatDefectDate = (dateStr: string): string => {
  try {
    return new Date(dateStr).toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  } catch {
    return dateStr;
  }
};