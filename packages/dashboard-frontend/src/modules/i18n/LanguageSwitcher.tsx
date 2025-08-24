import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ControlToggleButton } from '@/components/ui/toggle-button';
import { Globe, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

// 语言选项接口
interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  // 支持的语言列表
  const languages: LanguageOption[] = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: '🇺🇸', 
      region: 'United States' 
    },
    { 
      code: 'zh', 
      name: 'Chinese', 
      nativeName: '简体中文',
      flag: '🇨🇳', 
      region: 'China' 
    }
  ];

  // 获取当前选中的语言
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Select value={i18n.language} onValueChange={changeLanguage}>
          <SelectTrigger className="h-9 w-9 p-0 border border-transparent bg-transparent rounded-lg hover:bg-accent hover:text-accent-foreground hover:border-border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&>svg]:hidden">
            <SelectValue asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center justify-center w-full h-full"
              >
                <motion.span
                  key={currentLanguage.code}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeOut",
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  }}
                  className="text-lg language-flag"
                >
                  {currentLanguage.flag}
                </motion.span>
              </motion.div>
            </SelectValue>
          </SelectTrigger>
      <SelectContent 
        className="min-w-[180px]"
        sideOffset={5}
      >
        <div className="px-2 py-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Globe className="h-3 w-3" />
            <span>选择语言 / Select Language</span>
          </div>
        </div>
        {languages.map((lang, index) => (
          <motion.div
            key={lang.code}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            <SelectItem 
              value={lang.code}
              className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <motion.span 
                    className="text-lg language-flag"
                    whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {lang.flag}
                  </motion.span>
                  <span className="font-medium">{lang.nativeName}</span>
                </div>
                {i18n.language === lang.code && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-2 h-2 bg-primary rounded-full ml-2"
                  />
                )}
              </div>
            </SelectItem>
          </motion.div>
        ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

// 移动端用的简化版本 - 简单的切换按钮
export function LanguageSwitcherMobile() {
  const { i18n } = useTranslation();

  const languages: LanguageOption[] = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: '🇺🇸', 
      region: 'United States' 
    },
    { 
      code: 'zh', 
      name: 'Chinese', 
      nativeName: '简体中文',
      flag: '🇨🇳', 
      region: 'China' 
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  const nextLanguage = languages.find(lang => lang.code !== i18n.language) || languages[1];

  const toggleLanguage = () => {
    i18n.changeLanguage(nextLanguage.code);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleLanguage();
    }
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      onKeyDown={handleKeyDown}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-muted hover:bg-accent text-muted-foreground hover:text-foreground border border-border rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background mobile-language-toggle"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label={`Current language: ${currentLanguage.nativeName}. Click to switch to ${nextLanguage.nativeName}`}
      title={`切换到 ${nextLanguage.nativeName} / Switch to ${nextLanguage.nativeName}`}
      role="button"
      tabIndex={0}
    >
      <motion.span
        key={currentLanguage.code}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut",
          type: "spring", 
          stiffness: 400, 
          damping: 17 
        }}
        className="text-sm language-flag"
      >
        {currentLanguage.flag}
      </motion.span>
      <span className="text-sm font-medium">{currentLanguage.nativeName}</span>
      <motion.span 
        className="text-xs text-muted-foreground"
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
      >
        ⇄
      </motion.span>
    </motion.button>
  );
}

export default LanguageSwitcher;
