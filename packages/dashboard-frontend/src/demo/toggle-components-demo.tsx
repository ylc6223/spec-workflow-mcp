import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleSwitch, ThemeToggleSwitch } from '@/components/ui/toggle-switch';
import { ToggleButton, ControlToggleButton, ToggleButtonGroup } from '@/components/ui/toggle-button';
import { ThemeSwitcher, ThemeToggle } from '@/modules/theme/ThemeSwitcher';
import LanguageSwitcher from '@/modules/i18n/LanguageSwitcher';
import { VolumeControl } from '@/modules/notifications/VolumeControl';
import { Separator } from '@/components/ui/separator';
import { Container } from '@/components/ui/container';
import { VStack, HStack } from '@/components/ui/stack';
import { Sun, Moon, Bell, BellOff, Wifi, WifiOff, Play, Pause } from 'lucide-react';

/**
 * Demo page showcasing the unified toggle components
 */
export function ToggleComponentsDemo() {
  const [notifications, setNotifications] = useState(true);
  const [wifi, setWifi] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [customToggle, setCustomToggle] = useState(false);

  return (
    <Container size="lg" className="py-8">
      <VStack gap={8}>
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Toggle Components Demo</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unified and modern toggle components with consistent styling, smooth animations, 
            and excellent accessibility support.
          </p>
        </div>

        {/* Theme Toggle Switch */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Theme Toggle Switch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VStack gap={6}>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Modern Theme Switch</h4>
                  <ThemeToggleSwitch
                    checked={false}
                    onChange={(isDark) => console.log('Theme changed:', isDark ? 'dark' : 'light')}
                    showLabel={true}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Beautiful switch with sun/moon icons and smooth animations
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">Integrated Theme Toggle</h4>
                  <ThemeToggle showLabel={true} />
                  <p className="text-xs text-muted-foreground mt-2">
                    Connected to the actual theme system with system mode support
                  </p>
                </div>
              </div>
            </VStack>
          </CardContent>
        </Card>

        {/* Control Toggle Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Control Toggle Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <VStack gap={6}>
              <div>
                <h4 className="text-sm font-medium mb-3">Unified Header Controls</h4>
                <ToggleButtonGroup spacing="tight">
                  <LanguageSwitcher />
                  <VolumeControl />
                  <ThemeSwitcher />
                </ToggleButtonGroup>
                <p className="text-xs text-muted-foreground mt-2">
                  Actual components used in the application header
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-3">Individual Control Buttons</h4>
                <ToggleButtonGroup spacing="normal">
                  <ControlToggleButton
                    icon={notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                    active={notifications}
                    onClick={() => setNotifications(!notifications)}
                    aria-label="Toggle notifications"
                    tooltip={notifications ? "Disable notifications" : "Enable notifications"}
                  />
                  <ControlToggleButton
                    icon={wifi ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                    active={wifi}
                    onClick={() => setWifi(!wifi)}
                    aria-label="Toggle WiFi"
                    tooltip={wifi ? "Disconnect" : "Connect"}
                  />
                  <ControlToggleButton
                    icon={playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    active={playing}
                    onClick={() => setPlaying(!playing)}
                    aria-label="Toggle playback"
                    tooltip={playing ? "Pause" : "Play"}
                  />
                </ToggleButtonGroup>
                <p className="text-xs text-muted-foreground mt-2">
                  Consistent styling with hover effects and active states
                </p>
              </div>
            </VStack>
          </CardContent>
        </Card>

        {/* Basic Toggle Components */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Toggle Components</CardTitle>
          </CardHeader>
          <CardContent>
            <VStack gap={6}>
              <div>
                <h4 className="text-sm font-medium mb-3">Toggle Switches</h4>
                <VStack gap={4}>
                  <ToggleSwitch
                    checked={customToggle}
                    onChange={setCustomToggle}
                    size="sm"
                    aria-label="Small toggle"
                  >
                    <span className="text-sm">Small Toggle</span>
                  </ToggleSwitch>

                  <ToggleSwitch
                    checked={notifications}
                    onChange={setNotifications}
                    size="md"
                    aria-label="Medium toggle"
                  >
                    <span className="text-sm">Medium Toggle</span>
                  </ToggleSwitch>

                  <ToggleSwitch
                    checked={wifi}
                    onChange={setWifi}
                    size="lg"
                    aria-label="Large toggle"
                  >
                    <span className="text-sm">Large Toggle</span>
                  </ToggleSwitch>
                </VStack>
                <p className="text-xs text-muted-foreground mt-2">
                  Three sizes available with smooth spring animations
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-3">Toggle Buttons</h4>
                <HStack gap={2}>
                  <ToggleButton
                    pressed={notifications}
                    onPressedChange={setNotifications}
                    variant="outline"
                    size="sm"
                    aria-label="Notifications"
                  >
                    <Bell className="h-4 w-4" />
                  </ToggleButton>

                  <ToggleButton
                    pressed={wifi}
                    onPressedChange={setWifi}
                    variant="ghost"
                    size="sm"
                    aria-label="WiFi"
                  >
                    <Wifi className="h-4 w-4" />
                  </ToggleButton>

                  <ToggleButton
                    pressed={playing}
                    onPressedChange={setPlaying}
                    variant="default"
                    size="sm"
                    aria-label="Playback"
                  >
                    {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </ToggleButton>
                </HStack>
                <p className="text-xs text-muted-foreground mt-2">
                  Button-style toggles with multiple variants
                </p>
              </div>
            </VStack>
          </CardContent>
        </Card>

        {/* Features List */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Design & Aesthetics</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Unified visual language across all controls</li>
                  <li>• Smooth spring-based animations</li>
                  <li>• Modern toggle switch with themed decorations</li>
                  <li>• Consistent sizing (9x9 for icon buttons)</li>
                  <li>• Beautiful hover and active states</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Functionality & Accessibility</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Full keyboard navigation support</li>
                  <li>• Proper ARIA labels and roles</li>
                  <li>• Screen reader friendly</li>
                  <li>• Reduced motion support</li>
                  <li>• Touch-friendly interaction areas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </VStack>
    </Container>
  );
}