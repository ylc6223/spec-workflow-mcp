import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { useWs } from '../ws/WebSocketProvider';
import { Defect, CreateDefectRequest, UpdateDefectRequest, MoveDefectRequest, DefectStatistics } from '../../types/defects';

export type SpecSummary = {
  name: string;
  displayName: string;
  status?: string;
  lastModified?: string;
  taskProgress?: { total: number; completed: number };
  phases?: any;
};

export type Approval = {
  id: string;
  title: string;
  status: string;
  type?: string;
  filePath?: string;
  content?: string;
  createdAt?: string;
};

export type ProjectInfo = {
  projectName: string;
  steering?: any;
  version?: string;
};

async function getJson<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      // If it's a 404 or other HTTP error, provide a clearer message
      const errorText = await res.text().catch(() => 'Unknown error');
      throw new Error(`GET ${url} failed (${res.status}): ${res.statusText}. ${errorText.slice(0, 100)}${errorText.length > 100 ? '...' : ''}`);
    }
    
    // Check if the response is actually JSON
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      // Check if this looks like an HTML error page
      if (text.trim().startsWith('<')) {
        throw new Error(`Backend server may not be running. Expected JSON from ${url} but received HTML error page.`);
      }
      throw new Error(`Expected JSON but got ${contentType} from ${url}: ${text.slice(0, 100)}${text.length > 100 ? '...' : ''}`);
    }
    
    return res.json();
  } catch (error) {
    // If it's a network error (CORS, connection refused, etc.)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Cannot connect to backend server at ${url}. Please ensure the server is running.`);
    }
    throw error;
  }
}

async function postJson(url: string, body: any) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return { ok: res.ok, status: res.status };
}

async function putJson(url: string, body: any) {
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return { ok: res.ok, status: res.status, data: res.ok ? await res.json() : null };
}

type ApiContextType = {
  specs: SpecSummary[];
  archivedSpecs: SpecSummary[];
  approvals: Approval[];
  defects: Defect[];
  info?: ProjectInfo;
  steeringDocuments?: any;
  reloadAll: () => Promise<void>;
  getAllSpecDocuments: (name: string) => Promise<Record<string, { content: string; lastModified: string } | null>>;
  getAllArchivedSpecDocuments: (name: string) => Promise<Record<string, { content: string; lastModified: string } | null>>;
  getSpecTasksProgress: (name: string) => Promise<any>;
  updateTaskStatus: (specName: string, taskId: string, status: 'pending' | 'in-progress' | 'completed') => Promise<{ ok: boolean; status: number; data?: any }>;
  approvalsAction: (id: string, action: 'approve' | 'reject' | 'needs-revision', payload: any) => Promise<{ ok: boolean; status: number }>;
  getApprovalContent: (id: string) => Promise<{ content: string; filePath?: string }>;
  saveSpecDocument: (name: string, document: string, content: string) => Promise<{ ok: boolean; status: number }>;
  saveArchivedSpecDocument: (name: string, document: string, content: string) => Promise<{ ok: boolean; status: number }>;
  archiveSpec: (name: string) => Promise<{ ok: boolean; status: number }>;
  unarchiveSpec: (name: string) => Promise<{ ok: boolean; status: number }>;
  getSteeringDocument: (name: string) => Promise<{ content: string; lastModified: string }>;
  saveSteeringDocument: (name: string, content: string) => Promise<{ ok: boolean; status: number }>;
  // Defect management methods
  getDefects: () => Promise<Defect[]>;
  getDefectStatistics: () => Promise<DefectStatistics>;
  createDefect: (data: CreateDefectRequest) => Promise<{ ok: boolean; status: number; data?: Defect }>;
  updateDefect: (data: UpdateDefectRequest) => Promise<{ ok: boolean; status: number; data?: Defect }>;
  deleteDefect: (id: string) => Promise<{ ok: boolean; status: number }>;
  moveDefect: (data: MoveDefectRequest) => Promise<{ ok: boolean; status: number; data?: Defect }>;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export function ApiProvider({ initial, children }: { initial?: { specs?: SpecSummary[]; archivedSpecs?: SpecSummary[]; approvals?: Approval[]; defects?: Defect[] }; children: React.ReactNode }) {
  const { subscribe, unsubscribe } = useWs();
  const [specs, setSpecs] = useState<SpecSummary[]>(initial?.specs || []);
  const [archivedSpecs, setArchivedSpecs] = useState<SpecSummary[]>(initial?.archivedSpecs || []);
  const [approvals, setApprovals] = useState<Approval[]>(initial?.approvals || []);
  const [defects, setDefects] = useState<Defect[]>(initial?.defects || []);
  const [info, setInfo] = useState<ProjectInfo | undefined>(undefined);
  const [steeringDocuments, setSteeringDocuments] = useState<any>(undefined);

  const reloadAll = useCallback(async () => {
    try {
      const [s, as, a, i] = await Promise.all([
        getJson<SpecSummary[]>('/api/specs').catch(() => []),
        getJson<SpecSummary[]>('/api/specs/archived').catch(() => []),
        getJson<Approval[]>('/api/approvals').catch(() => []),
        getJson<ProjectInfo>('/api/info').catch(() => ({ projectName: 'Project' } as ProjectInfo)),
      ]);
      setSpecs(s);
      setArchivedSpecs(as);
      setApprovals(a);
      // Use mock data for defects during development
      setDefects([]);
      setInfo(i);
      setSteeringDocuments(i.steering);
    } catch (error) {
      console.warn('Failed to load API data, using fallback values:', error);
      // Set fallback values when API is completely unavailable
      setSpecs([]);
      setArchivedSpecs([]);
      setApprovals([]);
      setDefects([]);
      setInfo({ projectName: 'Project (Offline)' });
      setSteeringDocuments(undefined);
    }
  }, []);

  // Load initial data including info on mount
  useEffect(() => {
    reloadAll();
  }, [reloadAll]);

  // Update state when initial websocket data arrives
  useEffect(() => {
    if (initial?.specs) setSpecs(initial.specs);
    if (initial?.archivedSpecs) setArchivedSpecs(initial.archivedSpecs);
    if (initial?.approvals) setApprovals(initial.approvals);
    if (initial?.defects) setDefects(initial.defects);
  }, [initial]);

  // Handle websocket updates for real-time data changes
  useEffect(() => {
    const handleSpecUpdate = (data: { specs?: SpecSummary[]; archivedSpecs?: SpecSummary[] }) => {
      if (data.specs) setSpecs(data.specs);
      if (data.archivedSpecs) setArchivedSpecs(data.archivedSpecs);
    };

    const handleApprovalUpdate = (data: Approval[]) => {
      setApprovals(data);
    };

    const handleSteeringUpdate = (data: any) => {
      setSteeringDocuments(data);
    };

    const handleDefectUpdate = (data: Defect[]) => {
      setDefects(data);
    };

    // Subscribe to websocket events that contain actual data
    // Only handle events that provide the updated data directly
    subscribe('spec-update', handleSpecUpdate);
    subscribe('approval-update', handleApprovalUpdate);
    subscribe('steering-update', handleSteeringUpdate);
    subscribe('defect-update', handleDefectUpdate);
    
    // Do NOT handle 'update' and 'task-update' events as they are just file change notifications
    // without updated data - let individual components handle their own updates via specific events

    return () => {
      unsubscribe('spec-update', handleSpecUpdate);
      unsubscribe('approval-update', handleApprovalUpdate);
      unsubscribe('steering-update', handleSteeringUpdate);
      unsubscribe('defect-update', handleDefectUpdate);
    };
  }, [subscribe, unsubscribe, reloadAll]);

  const value = useMemo<ApiContextType>(() => ({
    specs,
    archivedSpecs,
    approvals,
    defects,
    info,
    steeringDocuments,
    reloadAll,
    getAllSpecDocuments: (name: string) => getJson(`/api/specs/${encodeURIComponent(name)}/all`),
    getAllArchivedSpecDocuments: (name: string) => getJson(`/api/specs/${encodeURIComponent(name)}/all/archived`),
    getSpecTasksProgress: (name: string) => getJson(`/api/specs/${encodeURIComponent(name)}/tasks/progress`),
    updateTaskStatus: (specName: string, taskId: string, status: 'pending' | 'in-progress' | 'completed') => putJson(`/api/specs/${encodeURIComponent(specName)}/tasks/${encodeURIComponent(taskId)}/status`, { status }),
    approvalsAction: (id, action, body) => postJson(`/api/approvals/${encodeURIComponent(id)}/${action}`, body),
    getApprovalContent: (id: string) => getJson(`/api/approvals/${encodeURIComponent(id)}/content`),
    saveSpecDocument: (name: string, document: string, content: string) => putJson(`/api/specs/${encodeURIComponent(name)}/${encodeURIComponent(document)}`, { content }),
    saveArchivedSpecDocument: (name: string, document: string, content: string) => putJson(`/api/specs/${encodeURIComponent(name)}/${encodeURIComponent(document)}/archived`, { content }),
    archiveSpec: (name: string) => postJson(`/api/specs/${encodeURIComponent(name)}/archive`, {}),
    unarchiveSpec: (name: string) => postJson(`/api/specs/${encodeURIComponent(name)}/unarchive`, {}),
    getSteeringDocument: (name: string) => getJson(`/api/steering/${encodeURIComponent(name)}`),
    saveSteeringDocument: (name: string, content: string) => putJson(`/api/steering/${encodeURIComponent(name)}`, { content }),
    // Defect management methods - using mock data for development
    getDefects: () => Promise.resolve([]),
    getDefectStatistics: () => Promise.resolve({ total: 0, new: 0, inProgress: 0, testing: 0, resolved: 0, closed: 0 }),
    createDefect: (data: CreateDefectRequest) => Promise.resolve({ ok: true, status: 200, data: { 
      id: `def-${Date.now()}`, 
      ...data, 
      status: 'new' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }}),
    updateDefect: (data: UpdateDefectRequest) => Promise.resolve({ ok: true, status: 200, data: { 
      ...data, 
      updatedAt: new Date().toISOString() 
    } as Defect }),
    deleteDefect: (id: string) => Promise.resolve({ ok: true, status: 200 }),
    moveDefect: (data: MoveDefectRequest) => Promise.resolve({ ok: true, status: 200, data: {
      id: data.id,
      status: data.newStatus,
      updatedAt: new Date().toISOString()
    } as Defect }),
  }), [specs, archivedSpecs, approvals, defects, info, steeringDocuments, reloadAll]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi(): ApiContextType {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error('useApi must be used within ApiProvider');
  return ctx;
}


