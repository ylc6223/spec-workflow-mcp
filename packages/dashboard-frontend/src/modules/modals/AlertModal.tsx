import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  okText?: string;
  variant?: 'info' | 'warning' | 'error' | 'success';
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  okText = 'OK',
  variant = 'info'
}: AlertModalProps) {
  
  const getIcon = () => {
    const iconClass = "h-6 w-6";
    switch (variant) {
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-yellow-600 dark:text-yellow-400`} />;
      case 'error':
        return <AlertCircle className={`${iconClass} text-red-600 dark:text-red-400`} />;
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-600 dark:text-green-400`} />;
      default:
        return <Info className={`${iconClass} text-blue-600 dark:text-blue-400`} />;
    }
  };

  const getIconBackground = () => {
    switch (variant) {
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/20';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/20';
      case 'success':
        return 'bg-green-100 dark:bg-green-900/20';
      default:
        return 'bg-blue-100 dark:bg-blue-900/20';
    }
  };

  const getButtonVariant = () => {
    switch (variant) {
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader className="sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4">
          <div className={`mx-auto sm:mx-0 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${getIconBackground()}`}>
            {getIcon()}
          </div>
          <div className="text-center sm:text-left">
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription className="whitespace-pre-wrap">
              {message}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <div className="flex justify-end">
          <AlertDialogAction 
            onClick={onClose}
            variant={getButtonVariant()}
          >
            {okText}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}