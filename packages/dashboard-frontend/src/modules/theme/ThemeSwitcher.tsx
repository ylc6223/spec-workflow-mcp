import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ThemeToggleSwitch } from '@/components/ui/toggle-switch';
import { ControlToggleButton } from '@/components/ui/toggle-button';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ThemeSwitcher() {
  const { theme, setTheme, actualTheme, isTransitioning, shouldReduceMotion } = useTheme();
  const { t } = useTranslation();

  const themes = [
    {
      key: 'light' as const,
      label: t('common.light'),
      icon: Sun,
    },
    {
      key: 'dark' as const,
      label: t('common.dark'),
      icon: Moon,
    },
    {
      key: 'system' as const,
      label: t('common.system'),
      icon: Monitor,
    },
  ];

  const currentTheme = themes.find(t => t.key === theme) || themes[2];
  const CurrentIcon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ControlToggleButton
          icon={
            shouldReduceMotion || isTransitioning ? (
              <CurrentIcon className="h-4 w-4" />
            ) : (
              <motion.div
                key={currentTheme.key}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <CurrentIcon className="h-4 w-4" />
              </motion.div>
            )
          }
          aria-label={t('common.theme')}
          tooltip={t('common.theme')}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {themes.map((themeOption, index) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.key;
          
          return (
            shouldReduceMotion || isTransitioning ? (
              <DropdownMenuItem
                key={themeOption.key}
                onClick={() => setTheme(themeOption.key)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{themeOption.label}</span>
                {isActive && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
                {themeOption.key === 'system' && theme === 'system' && (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({actualTheme === 'dark' ? t('common.dark') : t('common.light')})
                  </span>
                )}
              </DropdownMenuItem>
            ) : (
              <motion.div
                key={themeOption.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <DropdownMenuItem
                  onClick={() => setTheme(themeOption.key)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>
                  <span className="flex-1">{themeOption.label}</span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    )}
                  </AnimatePresence>
                  {themeOption.key === 'system' && theme === 'system' && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-xs text-muted-foreground ml-2"
                    >
                      ({actualTheme === 'dark' ? t('common.dark') : t('common.light')})
                    </motion.span>
                  )}
                </DropdownMenuItem>
              </motion.div>
            )
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 现代化主题切换开关（用于移动端和设置页面）
export function ThemeToggle({ showLabel = true }: { showLabel?: boolean }) {
  const { theme, setTheme, actualTheme, isTransitioning, shouldReduceMotion } = useTheme();
  const { t } = useTranslation();

  const handleThemeToggle = (isDark: boolean) => {
    // If currently on system mode, switch to explicit light/dark
    if (theme === 'system') {
      setTheme(isDark ? 'dark' : 'light');
    } else {
      // Otherwise toggle between light and dark
      setTheme(isDark ? 'dark' : 'light');
    }
  };

  const isDarkMode = actualTheme === 'dark';

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        shouldReduceMotion || isTransitioning ? (
          <span className="text-sm font-medium text-muted-foreground">
            {t('common.theme')}
          </span>
        ) : (
          <motion.span 
            className="text-sm font-medium text-muted-foreground"
            initial={false}
            animate={{ opacity: isTransitioning ? 0.5 : 1 }}
          >
            {t('common.theme')}
          </motion.span>
        )
      )}
      <ThemeToggleSwitch
        checked={isDarkMode}
        onChange={handleThemeToggle}
        disabled={isTransitioning}
        showLabel={showLabel}
      />
      {theme === 'system' && (
        shouldReduceMotion || isTransitioning ? (
          <span className="text-xs text-muted-foreground">
            ({t('common.system')})
          </span>
        ) : (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground"
          >
            ({t('common.system')})
          </motion.span>
        )
      )}
    </div>
  );
}