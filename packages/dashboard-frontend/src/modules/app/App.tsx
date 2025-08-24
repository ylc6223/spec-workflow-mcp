import React, { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "../theme/ThemeProvider";
import { WebSocketProvider, useWs } from "../ws/WebSocketProvider";
import { ApiProvider, useApi } from "../api/api";
import { HighlightStyles } from "../theme/HighlightStyles";
import { ColorTest } from "../theme/ColorTest";
import { DashboardStatistics } from "../pages/DashboardStatistics";
import { SpecsPage } from "../pages/SpecsPage";
import { SteeringPage } from "../pages/SteeringPage";
import { TasksPage } from "../pages/TasksPage";
import { ApprovalsPage } from "../pages/ApprovalsPage";
import { DefectsPage } from "../pages/DefectsPage";
import { SpecViewerPage } from "../pages/SpecViewerPage";
import { NotificationProvider } from "../notifications/NotificationProvider";
import {
  VolumeControl,
  VolumeControlDetailed,
} from "../notifications/VolumeControl";
import { useTranslation } from "react-i18next";
import LanguageSwitcher, {
  LanguageSwitcherMobile,
} from "../i18n/LanguageSwitcher";
import { ThemeSwitcher, ThemeToggle } from "../theme/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { HStack, VStack } from "@/components/ui/stack";
import { MotionWrapper, FadeIn } from "@/components/ui/motion-wrapper";
import { ToggleButtonGroup } from "@/components/ui/toggle-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  BarChart,
  Navigation,
  FileText,
  CheckSquare,
  Settings,
  Bug,
  Coffee,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { interactionAnimations } from "@/lib/animations";

// Enhanced navigation button component with design system integration
function AnimatedNavButton({
  to,
  icon: Icon,
  label,
  end = false,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  end?: boolean;
}) {
  const { shouldReduceMotion } = useTheme();

  return (
    <NavLink to={to} end={end}>
      {({ isActive: active }) => (
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={Icon}
            className={`gap-2 transition-all duration-normal ease-standard relative ${
              active
                ? "text-primary bg-transparent hover:bg-accent/50"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/80"
            }`}
            animation={!shouldReduceMotion}
          >
            <span
              className={`font-medium transition-colors duration-200 ${
                active ? "text-primary" : ""
              }`}
            >
              {label}
            </span>
          </Button>
          <AnimatePresence mode="wait">
            {active && !shouldReduceMotion && (
              <motion.div
                layoutId={`nav-indicator-${to}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.25,
                }}
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full origin-center"
              />
            )}
            {active && shouldReduceMotion && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
            )}
          </AnimatePresence>
        </div>
      )}
    </NavLink>
  );
}

function Header() {
  const { connected } = useWs();
  const { info } = useApi();
  const { shouldReduceMotion } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/80 border-b border-border transition-all duration-normal ease-standard supports-[backdrop-filter]:bg-background/60">
        <Container size="full" className="h-16">
          <HStack
            className="h-full min-w-0 max-w-6xl mx-auto"
            justify="between"
            align="center"
            gap={4}
          >
            {/* Logo and Navigation Section */}
            <HStack className="min-w-0 flex-1" gap={6} align="center">
              {/* Logo Section */}
              <HStack className="min-w-0" gap={2} align="center">
                <h1 className="text-base lg:text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis min-w-0 max-w-[160px] sm:max-w-[200px] lg:max-w-[300px]">
                  {t("dashboard.title")}
                </h1>
                {info?.version && (
                  <Badge
                    variant="secondary"
                    className="hidden xl:inline flex-shrink-0 text-xs"
                  >
                    {t("dashboard.version", { version: info.version })}
                  </Badge>
                )}
              </HStack>

              {/* Desktop Navigation */}
              <nav className="hidden lg:block">
                <HStack gap={1} align="center">
                  <AnimatedNavButton
                    to="/"
                    icon={BarChart}
                    label={t("common.statistics")}
                    end={true}
                  />
                  <AnimatedNavButton
                    to="/steering"
                    icon={Navigation}
                    label={t("common.steering")}
                  />
                  <AnimatedNavButton
                    to="/specs"
                    icon={FileText}
                    label={t("common.specs")}
                  />
                  <AnimatedNavButton
                    to="/tasks"
                    icon={CheckSquare}
                    label={t("common.tasks")}
                  />
                  <AnimatedNavButton
                    to="/defects"
                    icon={Bug}
                    label={t("common.defects")}
                  />
                  <AnimatedNavButton
                    to="/approvals"
                    icon={Settings}
                    label={t("common.approvals")}
                  />
                </HStack>
              </nav>
            </HStack>

            {/* Status and Controls Section */}
            <HStack className="flex-shrink-0" gap={3} align="center">
              {/* Connection Status Indicator */}
              <MotionWrapper
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-normal ease-standard ${
                  connected
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400"
                }`}
                title={
                  connected ? t("common.connected") : t("common.disconnected")
                }
                animation="fade-in"
                disabled={shouldReduceMotion}
              >
                <motion.span
                  className={`inline-block w-2 h-2 rounded-full ${
                    connected ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                  animate={
                    !shouldReduceMotion
                      ? {
                          scale: connected ? [1, 1.2, 1] : [1, 1.1, 1],
                          opacity: connected ? [0.7, 1, 0.7] : [0.5, 0.9, 0.5],
                        }
                      : undefined
                  }
                  transition={{
                    duration: connected ? 1.8 : 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-xs font-medium hidden md:inline">
                  {connected ? t("common.connected") : t("common.disconnected")}
                </span>
              </MotionWrapper>

              {/* Desktop Controls */}
              <div className="hidden lg:block">
                <HStack gap={1} align="center">
                  <ToggleButtonGroup spacing="tight">
                    <LanguageSwitcher />
                    <VolumeControl />
                    <ThemeSwitcher />
                  </ToggleButtonGroup>

                  <Button
                    asChild
                    size="sm"
                    leftIcon={Coffee}
                    className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 ml-2 shadow-card hover:shadow-card-hover transition-all duration-normal ease-standard"
                    title="Support the project"
                    animation={!shouldReduceMotion}
                  >
                    <a
                      href="https://buymeacoffee.com/pimzino"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="whitespace-nowrap text-sm font-medium">
                        {t("common.supportMe")}
                      </span>
                    </a>
                  </Button>
                </HStack>
              </div>

              {/* Mobile/Tablet Hamburger Menu Button */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    title={t("common.menu")}
                    animation={!shouldReduceMotion}
                  >
                    <motion.div
                      animate={
                        !shouldReduceMotion
                          ? mobileMenuOpen
                            ? { rotate: 90 }
                            : { rotate: 0 }
                          : undefined
                      }
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader className="pb-2">
                    <SheetTitle className="text-base font-semibold">
                      {t("common.menu")}
                    </SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>

                  <VStack className="flex-1 min-h-0" gap={0}>
                    {/* Navigation Links */}
                    <nav className="flex-1 w-full mobile-sheet-scroll">
                      <VStack gap={0.5} className="w-full px-0 py-1">
                        {[
                          {
                            to: "/",
                            icon: BarChart,
                            label: t("common.statistics"),
                            end: true,
                          },
                          {
                            to: "/steering",
                            icon: Navigation,
                            label: t("common.steering"),
                          },
                          {
                            to: "/specs",
                            icon: FileText,
                            label: t("common.specs"),
                          },
                          {
                            to: "/tasks",
                            icon: CheckSquare,
                            label: t("common.tasks"),
                          },
                          {
                            to: "/defects",
                            icon: Bug,
                            label: t("common.defects"),
                          },
                          {
                            to: "/approvals",
                            icon: Settings,
                            label: t("common.approvals"),
                          },
                        ].map((item, index) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={closeMobileMenu}
                            className="block w-full"
                          >
                            {({ isActive }) => (
                              <div className="relative w-full px-2">
                                <Button
                                  variant="ghost"
                                  leftIcon={item.icon}
                                  className={`w-full justify-start gap-3 h-11 px-2 text-left transition-all duration-normal ease-standard mobile-nav-item ${
                                    isActive
                                      ? "text-primary bg-primary/8 hover:bg-primary/12 border border-primary/20"
                                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                                  }`}
                                  animation={!shouldReduceMotion}
                                >
                                  <span
                                    className={`font-medium text-sm transition-colors duration-200 ${
                                      isActive ? "text-primary" : ""
                                    }`}
                                  >
                                    {item.label}
                                  </span>
                                </Button>
                                <AnimatePresence>
                                  {isActive && !shouldReduceMotion && (
                                    <motion.div
                                      initial={{ scaleY: 0, opacity: 0 }}
                                      animate={{ scaleY: 1, opacity: 1 }}
                                      exit={{ scaleY: 0, opacity: 0 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        duration: 0.25,
                                      }}
                                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary rounded-full origin-center"
                                    />
                                  )}
                                  {isActive && shouldReduceMotion && (
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary rounded-full" />
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </NavLink>
                        ))}

                        <div className="w-full px-2 py-2">
                          <div className="px-2">
                            <h3 className="text-sm font-semibold text-foreground mb-2">
                              {t("common.settings")}
                            </h3>
                          </div>

                          {/* Mobile Controls */}
                          <VStack gap={2}>
                            <HStack
                              justify="between"
                              align="center"
                              className="min-h-9 w-full px-2"
                            >
                              <span className="text-sm font-medium text-muted-foreground">
                                {t("common.notificationVolume")}
                              </span>
                              <VolumeControlDetailed />
                            </HStack>

                            <HStack
                              justify="between"
                              align="center"
                              className="min-h-9 w-full px-2"
                            >
                              <span className="text-sm font-medium text-muted-foreground">
                                {t("common.theme")}
                              </span>
                              <ThemeToggle showLabel={false} />
                            </HStack>

                            <HStack
                              justify="between"
                              align="center"
                              className="min-h-9 w-full px-2"
                            >
                              <span className="text-sm font-medium text-muted-foreground">
                                {t("language.title")}
                              </span>
                              <LanguageSwitcherMobile />
                            </HStack>
                          </VStack>
                        </div>

                        <Separator className="mx-2 my-2" />

                        {/* Support Button */}
                        <div className="w-full px-4 py-2 flex items-center">
                          <Button
                            asChild
                            leftIcon={Coffee}
                            className="w-full h-10 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 shadow-card hover:shadow-card-hover transition-all duration-normal ease-standard font-medium flex items-center justify-center gap-3 whitespace-nowrap text-sm"
                            title="Support the project"
                            animation={!shouldReduceMotion}
                          >
                            <a
                              href="https://buymeacoffee.com/pimzino"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pl-2 flex items-center gap-3 whitespace-nowrap overflow-hidden"
                            >
                              <span className="truncate text-sm">
                                {t("common.supportMe")}
                              </span>
                            </a>
                          </Button>

                          {/* Version */}
                          {/* Settings Section */}
                          {info?.version && (
                            <>
                              <Separator className="my-2" />
                              <div className="text-center">
                                <Badge
                                  variant="outline"
                                  className="text-xs px-2 py-0.5"
                                >
                                  {t("dashboard.title")}{" "}
                                  {t("dashboard.version", {
                                    version: info.version,
                                  })}
                                </Badge>
                              </div>
                            </>
                          )}
                        </div>
                      </VStack>
                    </nav>

                    {/* Settings Section */}
                    <VStack
                      className="w-full border-border bg-muted/30 flex-shrink-0"
                      gap={0}
                    ></VStack>
                  </VStack>
                </SheetContent>
              </Sheet>
            </HStack>
          </HStack>
        </Container>
      </header>
    </>
  );
}

function AppInner() {
  const { initial } = useWs();
  const { shouldReduceMotion } = useTheme();

  return (
    <ApiProvider initial={initial}>
      <NotificationProvider>
        <MotionWrapper
          key={window.location.pathname}
          animation="fade-in"
          duration={shouldReduceMotion ? 0.01 : 0.3}
          disabled={shouldReduceMotion}
        >
          <div className="min-h-screen bg-background text-foreground relative">
            <Header />
            <HighlightStyles />
            {/* Hidden ColorTest component to ensure all theme colors are generated */}
            <ColorTest />

            {/* Main Content Area */}
            <main className="relative">
              <Container size="2xl" className="py-6">
                <Routes>
                  <Route path="/" element={<DashboardStatistics />} />
                  <Route path="/steering" element={<SteeringPage />} />
                  <Route path="/specs" element={<SpecsPage />} />
                  <Route path="/specs/view" element={<SpecViewerPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/defects" element={<DefectsPage />} />
                  <Route path="/approvals" element={<ApprovalsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Container>
            </main>
          </div>
        </MotionWrapper>
      </NotificationProvider>
    </ApiProvider>
  );
}

export default function App() {
  return (
    <WebSocketProvider>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </WebSocketProvider>
  );
}
