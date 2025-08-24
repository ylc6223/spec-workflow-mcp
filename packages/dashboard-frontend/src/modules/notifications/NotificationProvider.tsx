import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useApi } from '../api/api';

type NotificationContextType = {
  showNotification: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  notifications: Array<{ id: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; timestamp: number }>;
  removeNotification: (id: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  volume: number;
  setVolume: (volume: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { approvals, specs, getSpecTasksProgress } = useApi();
  const prevApprovalsRef = useRef<typeof approvals>([]);
  const prevTaskDataRef = useRef<Map<string, any>>(new Map());
  const isInitialLoadRef = useRef(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; timestamp: number }>>([]);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    // Load sound preference from sessionStorage (since ports are ephemeral)
    const saved = sessionStorage.getItem('notification-sound-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [volume, setVolumeState] = useState(() => {
    // Load volume preference from sessionStorage, default to max volume (100%)
    const saved = sessionStorage.getItem('notification-volume');
    return saved !== null ? parseFloat(saved) : 1.0;
  });

  // Toggle sound setting
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newValue = !prev;
      sessionStorage.setItem('notification-sound-enabled', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  // Set volume (0.0 to 1.0)
  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    sessionStorage.setItem('notification-volume', clampedVolume.toString());
  }, []);

  // Play notification sound
  const playNotificationSound = useCallback(async () => {
    // Check if sound is enabled
    if (!soundEnabled) {
      return;
    }
    
    try {
      // Create or resume AudioContext only when we actually need to play a sound
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Resume if suspended (this is where user interaction is required)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Only proceed if we have a running context
      if (audioContextRef.current.state !== 'running') {
        console.warn('AudioContext not ready for playing sound - user interaction may be required');
        return;
      }
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContextRef.current.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + 0.5);
    } catch (error) {
      console.error('Could not play notification sound:', error);
    }
  }, [soundEnabled, volume]);


  // Show toast notification
  const showNotification = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const notification = { id, message, type, timestamp: Date.now() };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  // Remove notification manually
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Function to handle task updates
  const handleTaskUpdate = useCallback(async (specName: string, specDisplayName: string) => {
    try {
      console.log('[NotificationProvider] Handling task update for:', specName);
      
      // Fetch detailed task progress
      const currentTaskData = await getSpecTasksProgress(specName);
      const prevTaskData = prevTaskDataRef.current.get(specName);
      
      console.log('[NotificationProvider] Current task data:', currentTaskData);
      console.log('[NotificationProvider] Previous task data:', prevTaskData);
      
      if (prevTaskData && currentTaskData) {
        // Check for completion changes
        if (currentTaskData.completed > prevTaskData.completed) {
          const newlyCompleted = currentTaskData.completed - prevTaskData.completed;
          const message = newlyCompleted === 1 
            ? `Task completed in ${specDisplayName} (${currentTaskData.completed}/${currentTaskData.total})`
            : `${newlyCompleted} tasks completed in ${specDisplayName} (${currentTaskData.completed}/${currentTaskData.total})`;
          
          console.log('[NotificationProvider] Task completion detected:', message);
          showNotification(message, 'success');
          playNotificationSound();
        }
        
        // Check for in-progress changes
        if (currentTaskData.inProgress !== prevTaskData.inProgress) {
          if (currentTaskData.inProgress && !prevTaskData.inProgress) {
            // Task moved to in-progress
            const taskId = currentTaskData.inProgress;
            const task = currentTaskData.taskList?.find((t: any) => t.id === taskId || t.number === taskId);
            const taskTitle = task?.title || task?.description || `Task ${taskId}`;
            
            const message = `Task started: ${taskTitle} in ${specDisplayName}`;
            console.log('[NotificationProvider] Task in-progress detected:', message);
            showNotification(message, 'info');
            playNotificationSound();
          }
        }
        
        // Check if all tasks are now completed (project finished)
        if (currentTaskData.completed === currentTaskData.total && 
            prevTaskData.completed < currentTaskData.total && 
            currentTaskData.total > 0) {
          const message = `🎉 All tasks completed in ${specDisplayName}!`;
          console.log('[NotificationProvider] Project completion detected:', message);
          showNotification(message, 'success');
        }
      }
      
      // Store current data for next comparison
      prevTaskDataRef.current.set(specName, currentTaskData);
      
    } catch (error) {
      console.error('[NotificationProvider] Failed to handle task update:', error);
    }
  }, [getSpecTasksProgress]);

  // Detect new approvals
  useEffect(() => {
    if (isInitialLoadRef.current) {
      // Skip notification on initial load
      prevApprovalsRef.current = approvals;
      isInitialLoadRef.current = false;
      return;
    }

    // Find new approvals by comparing IDs (not just array length)
    const prevIds = new Set(prevApprovalsRef.current.map(a => a.id));
    const newApprovals = approvals.filter(a => !prevIds.has(a.id));
    
    if (newApprovals.length > 0) {
      // Play sound
      playNotificationSound();
      
      // Show notifications for each new approval
      newApprovals.forEach(approval => {
        const message = `New approval request: ${approval.title}`;
        showNotification(message, 'info');
      });
    }

    prevApprovalsRef.current = approvals;
  }, [approvals, playNotificationSound, showNotification]);

  // Listen for WebSocket task updates and trigger detailed fetch
  useEffect(() => {
    if (isInitialLoadRef.current) {
      // Initialize task data for all specs on first load
      specs.forEach(spec => {
        handleTaskUpdate(spec.name, spec.displayName);
      });
      return;
    }
    
    // Since we can't directly listen to WebSocket messages from here,
    // we'll use the specs array changes as a trigger
    // But optimize by only checking when there are actual changes
    specs.forEach(spec => {
      handleTaskUpdate(spec.name, spec.displayName);
    });
  }, [specs, handleTaskUpdate]);

  const value = {
    showNotification,
    notifications,
    removeNotification,
    soundEnabled,
    toggleSound,
    volume,
    setVolume
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationToasts />
    </NotificationContext.Provider>
  );
}

// Toast notifications component
function NotificationToasts() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`rounded-lg p-4 shadow-lg border transition-all duration-300 ease-in-out ${
            notification.type === 'error' 
              ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
              : notification.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200'  
              : notification.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
              : 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              <svg 
                className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  notification.type === 'error' ? 'text-red-500' :
                  notification.type === 'warning' ? 'text-yellow-500' :
                  notification.type === 'success' ? 'text-green-500' :
                  'text-blue-500'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {notification.type === 'error' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : notification.type === 'warning' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                ) : notification.type === 'success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              <p className="text-sm font-medium break-words">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function useNotifications(): NotificationContextType {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}