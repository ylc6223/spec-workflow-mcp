import React, { useState } from 'react';
import { useNotifications } from './NotificationProvider';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ControlToggleButton } from '@/components/ui/toggle-button';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function VolumeControl() {
  const { soundEnabled, toggleSound, volume, setVolume } = useNotifications();
  
  // Convert volume (0.0-1.0) to percentage (0-100) for display
  const volumePercentage = Math.round(volume * 100);
  
  const handleVolumeChange = (values: number[]) => {
    const percentage = values[0];
    const volumeValue = percentage / 100;
    setVolume(volumeValue);
  };

  return (
    <ControlToggleButton
      icon={
        <AnimatePresence mode="wait">
          <motion.div
            key={soundEnabled ? 'enabled' : 'disabled'}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </motion.div>
        </AnimatePresence>
      }
      onClick={toggleSound}
      active={soundEnabled}
      aria-label={soundEnabled ? 'Mute notifications' : 'Enable notification sounds'}
      tooltip={soundEnabled ? `Volume: ${volumePercentage}%` : 'Sound disabled'}
    />
  );
}

// 详细的音量控制组件（用于移动端菜单）
export function VolumeControlDetailed() {
  const { soundEnabled, toggleSound, volume, setVolume } = useNotifications();
  
  // Convert volume (0.0-1.0) to percentage (0-100) for display
  const volumePercentage = Math.round(volume * 100);
  
  const handleVolumeChange = (values: number[]) => {
    const percentage = values[0];
    const volumeValue = percentage / 100;
    setVolume(volumeValue);
  };

  return (
    <div className="flex items-center gap-3 min-w-[140px]">
      {/* Mute/Unmute Button */}
      <div className="flex-shrink-0">
        <ControlToggleButton
          icon={
            <AnimatePresence mode="wait">
              <motion.div
                key={soundEnabled ? 'enabled' : 'disabled'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </motion.div>
            </AnimatePresence>
          }
          onClick={toggleSound}
          active={soundEnabled}
          aria-label={soundEnabled ? 'Mute notifications' : 'Enable notification sounds'}
          tooltip={soundEnabled ? `Volume: ${volumePercentage}%` : 'Sound disabled'}
        />
      </div>

      {/* Volume Slider Container - fixed width to prevent layout shift */}
      <div className="flex-1 min-w-[100px] flex items-center justify-end">
        <AnimatePresence mode="wait">
          {soundEnabled ? (
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Slider
                value={[volumePercentage]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-16"
                title={`Volume: ${volumePercentage}%`}
              />
              <motion.span 
                className="text-xs text-muted-foreground min-w-[2rem] text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {volumePercentage}%
              </motion.span>
            </motion.div>
          ) : (
            <motion.div 
              className="flex items-center justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs text-muted-foreground">
                Muted
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}