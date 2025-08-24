import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { ApiProvider, useApi } from '../api/api';
import { useWs } from '../ws/WebSocketProvider';
import { Markdown } from '../markdown/Markdown';
import { MarkdownEditor } from '../editor/MarkdownEditor';
import { ConfirmationModal } from '../modals/ConfirmationModal';
import { useTranslation } from 'react-i18next';

function formatDate(dateStr?: string, t?: (key: string) => string) {
  if (!dateStr) return t?.('common.never') || 'Never';
  return new Date(dateStr).toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

type SteeringDocument = {
  name: string;
  displayName: string;
  exists: boolean;
  lastModified?: string;
  content?: string;
};

function SteeringModal({ document, isOpen, onClose }: { document: SteeringDocument | null; isOpen: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const { getSteeringDocument, saveSteeringDocument } = useApi();
  const [viewMode, setViewMode] = useState<'rendered' | 'source' | 'editor'>('rendered');
  const [content, setContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>('');
  const [confirmCloseModalOpen, setConfirmCloseModalOpen] = useState<boolean>(false);

  // Load document when modal opens
  useEffect(() => {
    if (!isOpen || !document) {
      setContent('');
      setEditContent('');
      return;
    }

    let active = true;
    setLoading(true);
    
    getSteeringDocument(document.name)
      .then((data) => {
        if (active) {
          const documentContent = data.content || '';
          setContent(documentContent);
          setEditContent(documentContent);
        }
      })
      .catch(() => {
        if (active) {
          setContent('');
          setEditContent('');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => { active = false; };
  }, [isOpen, document, getSteeringDocument]);

  // Reset editor state when switching documents
  useEffect(() => {
    setSaved(false);
    setSaveError('');
  }, [document]);

  // Save function for editor
  const handleSave = useCallback(async () => {
    if (!document || !editContent) return;
    
    setSaving(true);
    setSaveError('');
    
    try {
      const result = await saveSteeringDocument(document.name, editContent);
      if (result.ok) {
        setSaved(true);
        setContent(editContent);
        // Clear saved status after a delay
        setTimeout(() => setSaved(false), 3000);
      } else {
        setSaveError('Failed to save document');
      }
    } catch (error: any) {
      setSaveError(error.message || 'Failed to save document');
    } finally {
      setSaving(false);
    }
  }, [document, editContent, saveSteeringDocument]);

  // Check for unsaved changes before closing
  const handleClose = useCallback(() => {
    const hasUnsaved = editContent !== content && viewMode === 'editor';
    
    if (hasUnsaved) {
      setConfirmCloseModalOpen(true);
      return;
    }
    
    onClose();
  }, [editContent, content, viewMode, onClose]);

  const handleConfirmClose = () => {
    onClose();
  };

  if (!isOpen || !document) return null;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <svg className="animate-spin h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2 text-muted-foreground">{t('steering.loadingContent')}</span>
        </div>
      );
    }

    if (!content) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-lg mb-4">
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-muted-foreground">{t('steering.noContentAvailable')}</p>
        </div>
      );
    }

    if (viewMode === 'rendered') {
      return (
        <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert prose-img:max-w-full prose-img:h-auto prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-pre:bg-muted prose-blockquote:text-muted-foreground prose-li:text-foreground overflow-y-visible">
          <Markdown content={content} />
        </div>
      );
    } else if (viewMode === 'source') {
      return (
        <div className="bg-muted p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-auto border border-border">
          <pre className="whitespace-pre-wrap text-foreground leading-relaxed overflow-x-auto font-mono">
            {content}
          </pre>
        </div>
      );
    } else {
      // Editor mode
      return (
        <div className="h-full">
          <MarkdownEditor
            content={content}
            editContent={editContent}
            onChange={setEditContent}
            onSave={handleSave}
            saving={saving}
            saved={saved}
            error={saveError}
          />
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-background backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className={`bg-background-deep text-card-foreground rounded-lg shadow-2xl border border-border ${
        viewMode === 'editor' 
          ? 'flex flex-col h-[95vh] max-h-[95vh] w-full max-w-7xl overflow-hidden' 
          : 'flex flex-col h-[95vh] max-h-[95vh] w-full max-w-7xl overflow-hidden'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-muted/50">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground truncate">
              {document.displayName} {t('steering.steeringDocument')}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
              {t('steering.lastModified')} {formatDate(document.lastModified, t)}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200 p-2 -m-2 ml-4"
            aria-label="Close steering document"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-muted/30 gap-3 sm:gap-4">
          {/* Document Type */}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm font-medium text-foreground">{t('steering.document')}:</span>
            <span className="px-2 py-1 text-sm bg-primary/10 text-primary rounded-md border border-primary/20">
              {document.displayName}
            </span>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-background rounded-lg border border-border shadow-sm self-center sm:self-auto">
            <button
              onClick={() => setViewMode('rendered')}
              className={`px-2 sm:px-3 py-1.5 text-sm rounded-l-lg transition-all duration-200 flex items-center gap-1 ${
                viewMode === 'rendered'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="hidden sm:inline">{t('steering.rendered')}</span>
            </button>
            <button
              onClick={() => setViewMode('source')}
              className={`px-2 sm:px-3 py-1.5 text-sm transition-all duration-200 flex items-center gap-1 ${
                viewMode === 'source'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="hidden sm:inline">{t('steering.source')}</span>
            </button>
            <button
              onClick={() => setViewMode('editor')}
              className={`px-2 sm:px-3 py-1.5 text-sm rounded-r-lg transition-all duration-200 flex items-center gap-1 ${
                viewMode === 'editor'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="hidden sm:inline">{t('steering.editor')}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`${viewMode === 'editor' ? 'flex-1 overflow-hidden bg-card' : 'flex-1 p-3 sm:p-6 overflow-auto min-h-0 bg-card'}`}>
          {renderContent()}
        </div>
      </div>

      {/* Confirmation Modal for closing with unsaved changes */}
      <ConfirmationModal
        isOpen={confirmCloseModalOpen}
        onClose={() => setConfirmCloseModalOpen(false)}
        onConfirm={handleConfirmClose}
        title={t('steering.unsavedChanges')}
        message={t('steering.unsavedMessage')}
        confirmText={t('common.close')}
        cancelText={t('steering.keepEditing')}
        variant="danger"
      />
    </div>
  );
}

function SteeringDocumentRow({ document, onOpenModal }: { document: SteeringDocument; onOpenModal: (document: SteeringDocument) => void }) {
  const { t } = useTranslation();
  return (
    <tr 
      className="hover:bg-accent cursor-pointer transition-colors"
      onClick={() => onOpenModal(document)}
    >
      <td className="px-4 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-card-foreground">
              {document.displayName}
            </div>
            <div className="text-sm text-muted-foreground">
              {document.name}.md
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          document.exists 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            : 'bg-muted text-muted-foreground'
        }`}>
          {document.exists ? t('steering.available') : t('steering.notCreated')}
        </span>
      </td>
      <td className="px-4 py-4 text-sm text-muted-foreground">
        {formatDate(document.lastModified, t)}
      </td>
      <td className="px-4 py-4">
        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </td>
    </tr>
  );
}

function Content() {
  const { t } = useTranslation();
  const { steeringDocuments, reloadAll } = useApi();
  const [selectedDocument, setSelectedDocument] = useState<SteeringDocument | null>(null);

  useEffect(() => { reloadAll(); }, [reloadAll]);

  const documents: SteeringDocument[] = [
    {
      name: 'product',
      displayName: 'Product',
      exists: steeringDocuments?.documents?.product || false,
      lastModified: steeringDocuments?.lastModified
    },
    {
      name: 'tech', 
      displayName: 'Technical',
      exists: steeringDocuments?.documents?.tech || false,
      lastModified: steeringDocuments?.lastModified
    },
    {
      name: 'structure',
      displayName: 'Structure',
      exists: steeringDocuments?.documents?.structure || false,
      lastModified: steeringDocuments?.lastModified
    }
  ];

  return (
    <div className="grid gap-4">
      <div className="bg-card shadow rounded-lg p-4 sm:p-6 border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-card-foreground">{t('steering.steeringDocuments')}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t('steering.description')}
            </p>
          </div>
        </div>
        
        {/* Documents Table - Desktop */}
        <div className="overflow-x-auto hidden lg:block">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('steering.document')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('steering.status')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('steering.lastModified')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('steering.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {documents.map((doc) => (
                <SteeringDocumentRow 
                  key={doc.name} 
                  document={doc} 
                  onOpenModal={setSelectedDocument}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Documents Cards - Mobile/Tablet */}
        <div className="lg:hidden space-y-3 md:space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.name}
              onClick={() => setSelectedDocument(doc)}
              className="bg-card rounded-lg border border-border p-4 md:p-6 cursor-pointer hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3 md:mr-4">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base md:text-lg font-medium text-card-foreground truncate">
                        {doc.displayName}
                      </h3>
                      <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        doc.exists 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {doc.exists ? t('steering.available') : t('steering.notCreated')}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <p className="text-sm text-muted-foreground">
                        {doc.name}.md
                      </p>
                      <span className="mx-2 text-muted-foreground/50">•</span>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(doc.lastModified, t)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!documents.some(doc => doc.exists) && (
          <div className="text-center py-12 mt-8 border-t border-border">
            <svg className="mx-auto h-12 w-12 text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium text-foreground mb-2">{t('steering.noSteeringDocuments')}</p>
            <p className="text-sm text-muted-foreground">
              {t('steering.emptyStateMessage')}
            </p>
          </div>
        )}
      </div>

      <SteeringModal 
        document={selectedDocument} 
        isOpen={!!selectedDocument} 
        onClose={() => setSelectedDocument(null)} 
      />
    </div>
  );
}

export function SteeringPage() {
  const { initial } = useWs();
  return (
    <ApiProvider initial={initial}>
      <Content />
    </ApiProvider>
  );
}