import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VStack, HStack } from '@/components/ui/stack';
import { Label } from '@/components/ui/label';
import { Defect, DefectPriority, DefectSeverity, DefectType, CreateDefectRequest } from '../../types/defects';

interface DefectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDefectRequest) => void;
  title: string;
  initialData?: Defect;
}

// Custom label component since it might not exist in the ui components
const FormLabel: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

// Custom textarea component
const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    {...props}
  />
);

export function DefectModal({ isOpen, onClose, onSubmit, title, initialData }: DefectModalProps) {
  const { t } = useTranslation();
  const isEditing = !!initialData;

  const [formData, setFormData] = useState<CreateDefectRequest>({
    title: '',
    description: '',
    priority: 'medium',
    severity: 'medium',
    type: 'bug',
    assignee: '',
    spec: '',
    component: '',
    version: '',
    environment: '',
    stepsToReproduce: '',
    expectedResult: '',
    actualResult: '',
    tags: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens/closes or initial data changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title,
          description: initialData.description,
          priority: initialData.priority,
          severity: initialData.severity,
          type: initialData.type,
          assignee: initialData.assignee || '',
          spec: initialData.spec || '',
          component: initialData.component || '',
          version: initialData.version || '',
          environment: initialData.environment || '',
          stepsToReproduce: initialData.stepsToReproduce || '',
          expectedResult: initialData.expectedResult || '',
          actualResult: initialData.actualResult || '',
          tags: initialData.tags || []
        });
      } else {
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          severity: 'medium',
          type: 'bug',
          assignee: '',
          spec: '',
          component: '',
          version: '',
          environment: '',
          stepsToReproduce: '',
          expectedResult: '',
          actualResult: '',
          tags: []
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = t('defects.validation.titleRequired');
    }

    if (!formData.description.trim()) {
      newErrors.description = t('defects.validation.descriptionRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const handleFieldChange = (field: keyof CreateDefectRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const priorities: DefectPriority[] = ['low', 'medium', 'high', 'critical'];
  const severities: DefectSeverity[] = ['low', 'medium', 'high', 'critical'];
  const types: DefectType[] = ['bug', 'enhancement', 'feature', 'task'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? t('defects.modal.editDescription')
              : t('defects.modal.createDescription')
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <VStack gap={4}>
            <div>
              <FormLabel required>{t('defects.fields.title')}</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder={t('defects.placeholders.title')}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <FormLabel required>{t('defects.fields.description')}</FormLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder={t('defects.placeholders.description')}
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
            </div>

            <HStack gap={4} className="grid grid-cols-1 sm:grid-cols-3">
              <div>
                <FormLabel>{t('defects.fields.priority')}</FormLabel>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleFieldChange('priority', value as DefectPriority)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map(priority => (
                      <SelectItem key={priority} value={priority}>
                        {t(`defects.priority.${priority}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <FormLabel>{t('defects.fields.severity')}</FormLabel>
                <Select
                  value={formData.severity}
                  onValueChange={(value) => handleFieldChange('severity', value as DefectSeverity)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {severities.map(severity => (
                      <SelectItem key={severity} value={severity}>
                        {t(`defects.severity.${severity}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <FormLabel>{t('defects.fields.type')}</FormLabel>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleFieldChange('type', value as DefectType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>
                        {t(`defects.type.${type}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </HStack>

            <HStack gap={4} className="grid grid-cols-1 sm:grid-cols-2">
              <div>
                <FormLabel>{t('defects.fields.assignee')}</FormLabel>
                <Input
                  value={formData.assignee}
                  onChange={(e) => handleFieldChange('assignee', e.target.value)}
                  placeholder={t('defects.placeholders.assignee')}
                />
              </div>

              <div>
                <FormLabel>{t('defects.fields.spec')}</FormLabel>
                <Input
                  value={formData.spec}
                  onChange={(e) => handleFieldChange('spec', e.target.value)}
                  placeholder={t('defects.placeholders.spec')}
                />
              </div>
            </HStack>

            <HStack gap={4} className="grid grid-cols-1 sm:grid-cols-3">
              <div>
                <FormLabel>{t('defects.fields.component')}</FormLabel>
                <Input
                  value={formData.component}
                  onChange={(e) => handleFieldChange('component', e.target.value)}
                  placeholder={t('defects.placeholders.component')}
                />
              </div>

              <div>
                <FormLabel>{t('defects.fields.version')}</FormLabel>
                <Input
                  value={formData.version}
                  onChange={(e) => handleFieldChange('version', e.target.value)}
                  placeholder={t('defects.placeholders.version')}
                />
              </div>

              <div>
                <FormLabel>{t('defects.fields.environment')}</FormLabel>
                <Input
                  value={formData.environment}
                  onChange={(e) => handleFieldChange('environment', e.target.value)}
                  placeholder={t('defects.placeholders.environment')}
                />
              </div>
            </HStack>
          </VStack>

          {/* Detailed Information (mainly for bugs) */}
          {formData.type === 'bug' && (
            <VStack gap={4}>
              <h3 className="text-lg font-semibold">{t('defects.sections.bugDetails')}</h3>
              
              <div>
                <FormLabel>{t('defects.fields.stepsToReproduce')}</FormLabel>
                <Textarea
                  value={formData.stepsToReproduce}
                  onChange={(e) => handleFieldChange('stepsToReproduce', e.target.value)}
                  placeholder={t('defects.placeholders.stepsToReproduce')}
                  rows={4}
                />
              </div>

              <HStack gap={4} className="grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <FormLabel>{t('defects.fields.expectedResult')}</FormLabel>
                  <Textarea
                    value={formData.expectedResult}
                    onChange={(e) => handleFieldChange('expectedResult', e.target.value)}
                    placeholder={t('defects.placeholders.expectedResult')}
                    rows={3}
                  />
                </div>

                <div>
                  <FormLabel>{t('defects.fields.actualResult')}</FormLabel>
                  <Textarea
                    value={formData.actualResult}
                    onChange={(e) => handleFieldChange('actualResult', e.target.value)}
                    placeholder={t('defects.placeholders.actualResult')}
                    rows={3}
                  />
                </div>
              </HStack>
            </VStack>
          )}

          {/* Action Buttons */}
          <HStack justify="end" gap={3} className="pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('defects.actions.cancel')}
            </Button>
            <Button type="submit">
              {isEditing ? t('defects.actions.save') : t('defects.actions.create')}
            </Button>
          </HStack>
        </form>
      </DialogContent>
    </Dialog>
  );
}