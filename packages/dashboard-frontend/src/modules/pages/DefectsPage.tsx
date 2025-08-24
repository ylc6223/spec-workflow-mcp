import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ApiProvider, useApi } from '../api/api';
import { useWs } from '../ws/WebSocketProvider';
import { useNotifications } from '../notifications/NotificationProvider';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MotionWrapper } from '@/components/ui/motion-wrapper';
import { HStack, VStack } from '@/components/ui/stack';
import { Container } from '@/components/ui/container';
import { Plus, Bug, Search, Filter, AlertCircle, Clock, CheckCircle, X } from 'lucide-react';
import { 
  Defect, 
  DefectColumn, 
  DefectPriority, 
  DefectType,
  DefectStatistics,
  getPriorityColor, 
  getTypeColor, 
  getColumnClassName,
  formatDefectDate 
} from '../../types/defects';
import { DefectModal } from '../modals/DefectModal';
import { ConfirmationModal } from '../modals/ConfirmationModal';

// Mock data for development - will be replaced with API calls
const mockDefects: Defect[] = [
  {
    id: '1',
    title: 'Login button not responding on mobile',
    description: 'When users tap the login button on mobile devices, nothing happens. The button appears to be clickable but does not trigger the login process.',
    priority: 'high',
    severity: 'high',
    type: 'bug',
    status: 'new',
    column: 'new',
    reporter: 'John Doe',
    dateCreated: new Date(Date.now() - 86400000 * 2).toISOString(),
    dateModified: new Date(Date.now() - 86400000 * 1).toISOString(),
    spec: 'authentication-spec',
    component: 'Login Form',
    environment: 'Mobile Safari iOS 15',
    stepsToReproduce: '1. Open app on mobile device\n2. Navigate to login page\n3. Tap login button\n4. Observe no response',
    expectedResult: 'Login form should submit and user should be authenticated',
    actualResult: 'Nothing happens when button is tapped'
  },
  {
    id: '2', 
    title: 'Dashboard loading performance is slow',
    description: 'The dashboard takes more than 5 seconds to load on first visit, causing poor user experience.',
    priority: 'medium',
    severity: 'medium',
    type: 'enhancement',
    status: 'inProgress',
    column: 'inProgress',
    assignee: 'Jane Smith',
    reporter: 'Mike Johnson',
    dateCreated: new Date(Date.now() - 86400000 * 5).toISOString(),
    dateModified: new Date(Date.now() - 86400000 * 1).toISOString(),
    spec: 'dashboard-spec',
    component: 'Dashboard',
    environment: 'Chrome 96'
  },
  {
    id: '3',
    title: 'Add dark mode support',
    description: 'Users have requested dark mode support across the application for better user experience during low-light conditions.',
    priority: 'low',
    severity: 'low',
    type: 'feature',
    status: 'testing',
    column: 'testing',
    assignee: 'Alice Wilson',
    reporter: 'Bob Davis',
    dateCreated: new Date(Date.now() - 86400000 * 10).toISOString(),
    dateModified: new Date(Date.now() - 86400000 * 2).toISOString(),
    spec: 'ui-spec'
  },
  {
    id: '4',
    title: 'Memory leak in data processing',
    description: 'Application memory usage continuously increases during bulk data processing operations, leading to crashes after processing large datasets.',
    priority: 'critical',
    severity: 'critical', 
    type: 'bug',
    status: 'resolved',
    column: 'resolved',
    assignee: 'Chris Lee',
    reporter: 'Sarah Martinez',
    dateCreated: new Date(Date.now() - 86400000 * 15).toISOString(),
    dateModified: new Date(Date.now() - 86400000 * 3).toISOString(),
    dateResolved: new Date(Date.now() - 86400000 * 3).toISOString(),
    spec: 'data-processing-spec',
    component: 'Data Processor'
  }
];

interface DefectCardProps {
  defect: Defect;
  onEdit: (defect: Defect) => void;
  onDelete: (defect: Defect) => void;
  draggable?: boolean;
}

function DefectCard({ defect, onEdit, onDelete, draggable = false }: DefectCardProps) {
  const { t } = useTranslation();
  
  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', defect.id);
    e.dataTransfer.effectAllowed = 'move';
  }, [defect.id]);

  return (
    <Card 
      className="defect-card cursor-grab active:cursor-grabbing"
      draggable={draggable}
      onDragStart={handleDragStart}
      hoverable
      role="button"
      tabIndex={0}
      aria-label={`Defect: ${defect.title}. Priority: ${t(`defects.priority.${defect.priority}`)}. Status: ${t(`defects.status.${defect.status}`)}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onEdit(defect);
        }
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-semibold line-clamp-2 flex-1">
            {defect.title}
          </CardTitle>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(defect);
              }}
              className="p-1 hover:bg-accent rounded"
              title={t('defects.editDefect')}
              aria-label={`Edit defect: ${defect.title}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(defect);
              }}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 rounded"
              title={t('defects.deleteDefect')}
              aria-label={`Delete defect: ${defect.title}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
        <CardDescription className="text-xs line-clamp-3">
          {defect.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {/* Priority and Type badges */}
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className={`text-xs px-2 py-0.5 border ${getPriorityColor(defect.priority)}`}>
            {t(`defects.priority.${defect.priority}`)}
          </Badge>
          <Badge variant="outline" className={`text-xs px-2 py-0.5 border ${getTypeColor(defect.type)}`}>
            {t(`defects.type.${defect.type}`)}
          </Badge>
        </div>

        {/* Metadata */}
        <div className="space-y-1 text-xs text-muted-foreground">
          {defect.assignee && (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="truncate">{defect.assignee}</span>
            </div>
          )}
          {defect.spec && (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="truncate">{defect.spec}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatDefectDate(defect.dateCreated)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface KanbanColumnProps {
  title: string;
  column: DefectColumn;
  defects: Defect[];
  onEdit: (defect: Defect) => void;
  onDelete: (defect: Defect) => void;
  onDrop: (defectId: string, toColumn: DefectColumn) => void;
}

function KanbanColumn({ title, column, defects, onEdit, onDelete, onDrop }: KanbanColumnProps) {
  const { t } = useTranslation();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const defectId = e.dataTransfer.getData('text/plain');
    if (defectId) {
      onDrop(defectId, column);
    }
  }, [column, onDrop]);

  const getColumnIcon = () => {
    switch (column) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'inProgress': return <Clock className="w-4 h-4" />;
      case 'testing': return <Bug className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <Bug className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 min-w-[250px] sm:min-w-[280px] max-w-full">
      <div 
        className={`bg-card rounded-lg border transition-all duration-200 h-full ${getColumnClassName(column)} ${
          isDragOver ? 'kanban-drag-over' : 'border-border'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label={`${title} column with ${defects.length} defects`}
        aria-describedby={`column-${column}-description`}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getColumnIcon()}
              <h3 className="font-semibold" id={`column-${column}-title`}>{title}</h3>
            </div>
            <Badge variant="secondary" className="text-xs" aria-label={`${defects.length} defects`}>
              {defects.length}
            </Badge>
          </div>
          <div id={`column-${column}-description`} className="sr-only">
            {t('defects.kanban.dragHint')}
          </div>
        </div>
        
        <div className="p-4 space-y-3 min-h-[200px]">
          {defects.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <div className="mb-2 opacity-50">
                {getColumnIcon()}
              </div>
              <p className="text-sm">{t('defects.kanban.emptyColumn')}</p>
            </div>
          ) : (
            defects.map((defect) => (
              <DefectCard
                key={defect.id}
                defect={defect}
                onEdit={onEdit}
                onDelete={onDelete}
                draggable={true}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface DefectStatsProps {
  statistics: DefectStatistics;
}

function DefectStats({ statistics }: DefectStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Defects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t('defects.statistics.total')}
          </CardTitle>
          <Bug className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.total}</div>
        </CardContent>
      </Card>

      {/* Open Defects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t('defects.statistics.open')}
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{statistics.open}</div>
        </CardContent>
      </Card>

      {/* Resolved Defects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t('defects.statistics.resolved')}
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{statistics.resolved}</div>
        </CardContent>
      </Card>

      {/* Critical Defects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t('defects.statistics.critical')}
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{statistics.byPriority.critical}</div>
        </CardContent>
      </Card>
    </div>
  );
}

function Content() {
  const { t } = useTranslation();
  const { defects: apiDefects, createDefect: apiCreateDefect, updateDefect: apiUpdateDefect, deleteDefect: apiDeleteDefect, moveDefect: apiMoveDefect, reloadAll } = useApi();
  const [defects, setDefects] = useState<Defect[]>(mockDefects); // Start with mock data, will be replaced by API data
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingDefect, setEditingDefect] = useState<Defect | null>(null);
  const [deletingDefect, setDeletingDefect] = useState<Defect | null>(null);
  const [announceMessage, setAnnounceMessage] = useState('');

  // Use API data when available, fall back to mock data
  useEffect(() => {
    if (apiDefects && apiDefects.length > 0) {
      setDefects(apiDefects);
    }
  }, [apiDefects]);

  // Calculate statistics
  const statistics = useMemo((): DefectStatistics => {
    const total = defects.length;
    const open = defects.filter(d => !['resolved', 'closed'].includes(d.status)).length;
    const resolved = defects.filter(d => d.status === 'resolved').length;
    const critical = defects.filter(d => d.priority === 'critical').length;

    const byPriority = {
      low: defects.filter(d => d.priority === 'low').length,
      medium: defects.filter(d => d.priority === 'medium').length,
      high: defects.filter(d => d.priority === 'high').length,
      critical: defects.filter(d => d.priority === 'critical').length,
    };

    const byStatus = {
      new: defects.filter(d => d.status === 'new').length,
      assigned: defects.filter(d => d.status === 'assigned').length,
      inProgress: defects.filter(d => d.status === 'inProgress').length,
      testing: defects.filter(d => d.status === 'testing').length,
      resolved: defects.filter(d => d.status === 'resolved').length,
      closed: defects.filter(d => d.status === 'closed').length,
      reopened: defects.filter(d => d.status === 'reopened').length,
    };

    const byType = {
      bug: defects.filter(d => d.type === 'bug').length,
      enhancement: defects.filter(d => d.type === 'enhancement').length,
      feature: defects.filter(d => d.type === 'feature').length,
      task: defects.filter(d => d.type === 'task').length,
    };

    return { total, open, resolved, critical, byPriority, byStatus, byType };
  }, [defects]);

  // Filter defects by search query
  const filteredDefects = useMemo(() => {
    if (!searchQuery.trim()) return defects;
    
    const query = searchQuery.toLowerCase().trim();
    return defects.filter(defect =>
      defect.title.toLowerCase().includes(query) ||
      defect.description.toLowerCase().includes(query) ||
      defect.assignee?.toLowerCase().includes(query) ||
      defect.reporter?.toLowerCase().includes(query) ||
      defect.spec?.toLowerCase().includes(query) ||
      defect.component?.toLowerCase().includes(query)
    );
  }, [defects, searchQuery]);

  // Group defects by column
  const columnDefects = useMemo(() => {
    const grouped: Record<DefectColumn, Defect[]> = {
      new: [],
      inProgress: [],
      testing: [],
      resolved: [],
      closed: []
    };

    filteredDefects.forEach(defect => {
      if (grouped[defect.column]) {
        grouped[defect.column].push(defect);
      }
    });

    return grouped;
  }, [filteredDefects]);

  const handleCreateDefect = useCallback(async (defectData: any) => {
    try {
      const result = await apiCreateDefect(defectData);
      if (result.ok && result.data) {
        setDefects(prev => [...prev, result.data!]);
      } else {
        // Fallback to local state update for development
        const newDefect: Defect = {
          id: Date.now().toString(),
          ...defectData,
          status: 'new' as const,
          column: 'new' as const,
          reporter: 'Current User',
          dateCreated: new Date().toISOString(),
          dateModified: new Date().toISOString(),
        };
        setDefects(prev => [...prev, newDefect]);
      }
    } catch (error) {
      console.error('Failed to create defect:', error);
      // Fallback to local state update
      const newDefect: Defect = {
        id: Date.now().toString(),
        ...defectData,
        status: 'new' as const,
        column: 'new' as const,
        reporter: 'Current User',
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
      };
      setDefects(prev => [...prev, newDefect]);
    }
    setIsCreateModalOpen(false);
  }, [apiCreateDefect]);

  const handleEditDefect = useCallback(async (defectData: any) => {
    if (!editingDefect) return;
    
    try {
      const result = await apiUpdateDefect({ id: editingDefect.id, ...defectData });
      if (result.ok && result.data) {
        setDefects(prev => 
          prev.map(defect => 
            defect.id === editingDefect.id ? result.data! : defect
          )
        );
      } else {
        // Fallback to local state update
        setDefects(prev => 
          prev.map(defect => 
            defect.id === editingDefect.id 
              ? { ...defect, ...defectData, dateModified: new Date().toISOString() }
              : defect
          )
        );
      }
    } catch (error) {
      console.error('Failed to update defect:', error);
      // Fallback to local state update
      setDefects(prev => 
        prev.map(defect => 
          defect.id === editingDefect.id 
            ? { ...defect, ...defectData, dateModified: new Date().toISOString() }
            : defect
        )
      );
    }
    setEditingDefect(null);
  }, [editingDefect, apiUpdateDefect]);

  const handleDeleteDefect = useCallback(async () => {
    if (!deletingDefect) return;
    
    try {
      const result = await apiDeleteDefect(deletingDefect.id);
      if (result.ok) {
        setDefects(prev => prev.filter(d => d.id !== deletingDefect.id));
      } else {
        // Fallback to local state update
        setDefects(prev => prev.filter(d => d.id !== deletingDefect.id));
      }
    } catch (error) {
      console.error('Failed to delete defect:', error);
      // Fallback to local state update
      setDefects(prev => prev.filter(d => d.id !== deletingDefect.id));
    }
    setDeletingDefect(null);
  }, [deletingDefect, apiDeleteDefect]);

  const handleMoveDefect = useCallback(async (defectId: string, toColumn: DefectColumn) => {
    const sourceDefect = defects.find(d => d.id === defectId);
    if (!sourceDefect) return;
    
    try {
      const result = await apiMoveDefect({
        id: defectId,
        fromColumn: sourceDefect.column,
        toColumn: toColumn
      });
      
      if (result.ok && result.data) {
        setDefects(prev => 
          prev.map(defect => 
            defect.id === defectId ? result.data! : defect
          )
        );
        setAnnounceMessage(`Defect moved to ${t(`defects.columns.${toColumn}`)}`);
      } else {
        // Fallback to local state update
        setDefects(prev => 
          prev.map(defect => 
            defect.id === defectId 
              ? { 
                  ...defect, 
                  column: toColumn,
                  status: toColumn === 'new' ? 'new' : 
                         toColumn === 'inProgress' ? 'inProgress' :
                         toColumn === 'testing' ? 'testing' :
                         toColumn === 'resolved' ? 'resolved' : 'closed',
                  dateModified: new Date().toISOString(),
                  ...(toColumn === 'resolved' && { dateResolved: new Date().toISOString() })
                }
              : defect
          )
        );
        setAnnounceMessage(`Defect moved to ${t(`defects.columns.${toColumn}`)}`);
      }
    } catch (error) {
      console.error('Failed to move defect:', error);
      // Fallback to local state update
      setDefects(prev => 
        prev.map(defect => 
          defect.id === defectId 
            ? { 
                ...defect, 
                column: toColumn,
                status: toColumn === 'new' ? 'new' : 
                       toColumn === 'inProgress' ? 'inProgress' :
                       toColumn === 'testing' ? 'testing' :
                       toColumn === 'resolved' ? 'resolved' : 'closed',
                dateModified: new Date().toISOString(),
                ...(toColumn === 'resolved' && { dateResolved: new Date().toISOString() })
              }
            : defect
        )
      );
      setAnnounceMessage(`Defect moved to ${t(`defects.columns.${toColumn}`)}`);
    }
  }, [defects, apiMoveDefect]);

  return (
    <div className="space-y-6">
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announceMessage}
      </div>
      
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                {t('defects.title')}
              </CardTitle>
              <CardDescription>
                {t('defects.description')}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:flex-none sm:w-64 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  placeholder={t('defects.placeholders.searchDefects')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  aria-label="Search defects by title, description, assignee, or component"
                />
              </div>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full sm:w-auto flex-shrink-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="whitespace-nowrap">{t('defects.createDefect')}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <DefectStats statistics={statistics} />

      {/* Kanban Board */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('defects.kanban.title')}
          </CardTitle>
          <CardDescription>
            {t('defects.kanban.dragHint')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile: Stack columns vertically, Desktop: Horizontal scroll */}
          <div className="block lg:hidden">
            <div className="space-y-6">
              <KanbanColumn
                title={t('defects.columns.new')}
                column="new"
                defects={columnDefects.new}
                onEdit={setEditingDefect}
                onDelete={setDeletingDefect}
                onDrop={handleMoveDefect}
              />
              <KanbanColumn
                title={t('defects.columns.inProgress')}
                column="inProgress"
                defects={columnDefects.inProgress}
                onEdit={setEditingDefect}
                onDelete={setDeletingDefect}
                onDrop={handleMoveDefect}
              />
              <KanbanColumn
                title={t('defects.columns.testing')}
                column="testing"
                defects={columnDefects.testing}
                onEdit={setEditingDefect}
                onDelete={setDeletingDefect}
                onDrop={handleMoveDefect}
              />
              <KanbanColumn
                title={t('defects.columns.resolved')}
                column="resolved"
                defects={columnDefects.resolved}
                onEdit={setEditingDefect}
                onDelete={setDeletingDefect}
                onDrop={handleMoveDefect}
              />
              <KanbanColumn
                title={t('defects.columns.closed')}
                column="closed"
                defects={columnDefects.closed}
                onEdit={setEditingDefect}
                onDelete={setDeletingDefect}
                onDrop={handleMoveDefect}
              />
            </div>
          </div>
          
          {/* Desktop: Horizontal kanban board */}
          <div 
            className="hidden lg:flex gap-4 overflow-x-auto pb-4"
            role="application" 
            aria-label="Defect kanban board"
            onKeyDown={(e) => {
              // Add keyboard navigation for the kanban board
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                // Focus management would go here in a full implementation
              }
            }}
          >
            <KanbanColumn
              title={t('defects.columns.new')}
              column="new"
              defects={columnDefects.new}
              onEdit={setEditingDefect}
              onDelete={setDeletingDefect}
              onDrop={handleMoveDefect}
            />
            <KanbanColumn
              title={t('defects.columns.inProgress')}
              column="inProgress"
              defects={columnDefects.inProgress}
              onEdit={setEditingDefect}
              onDelete={setDeletingDefect}
              onDrop={handleMoveDefect}
            />
            <KanbanColumn
              title={t('defects.columns.testing')}
              column="testing"
              defects={columnDefects.testing}
              onEdit={setEditingDefect}
              onDelete={setDeletingDefect}
              onDrop={handleMoveDefect}
            />
            <KanbanColumn
              title={t('defects.columns.resolved')}
              column="resolved"
              defects={columnDefects.resolved}
              onEdit={setEditingDefect}
              onDelete={setDeletingDefect}
              onDrop={handleMoveDefect}
            />
            <KanbanColumn
              title={t('defects.columns.closed')}
              column="closed"
              defects={columnDefects.closed}
              onEdit={setEditingDefect}
              onDelete={setDeletingDefect}
              onDrop={handleMoveDefect}
            />
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <DefectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateDefect}
        title={t('defects.createDefect')}
      />

      <DefectModal
        isOpen={!!editingDefect}
        onClose={() => setEditingDefect(null)}
        onSubmit={handleEditDefect}
        title={t('defects.editDefect')}
        initialData={editingDefect || undefined}
      />

      <ConfirmationModal
        isOpen={!!deletingDefect}
        onClose={() => setDeletingDefect(null)}
        onConfirm={handleDeleteDefect}
        title={t('defects.deleteDefect')}
        message={t('defects.messages.deleteConfirm')}
        description={t('defects.messages.deleteConfirmMessage')}
        variant="destructive"
      />
    </div>
  );
}

export function DefectsPage() {
  const { initial } = useWs();
  
  return (
    <ApiProvider initial={initial}>
      <Content />
    </ApiProvider>
  );
}