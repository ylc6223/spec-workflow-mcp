import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSwitcher } from '@/modules/i18n/LanguageSwitcher';
import { VolumeControl } from '@/modules/notifications/VolumeControl';
import { ThemeSwitcher } from '@/modules/theme/ThemeSwitcher';
import { ToggleButtonGroup } from '@/components/ui/toggle-button';
import { Container } from '@/components/ui/container';
import { HStack } from '@/components/ui/stack';

/**
 * Visual consistency test for all toggle components
 */
export function ConsistencyTest() {
  return (
    <Container size="md" className="py-8">
      <Card>
        <CardHeader>
          <CardTitle>Toggle Components Consistency Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Individual Components Test */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Individual Components</h3>
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Language</div>
                <div className="flex justify-center">
                  <LanguageSwitcher />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Volume</div>
                <div className="flex justify-center">
                  <VolumeControl />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Theme</div>
                <div className="flex justify-center">
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              ✅ All components should have the same size (9x9) and visual alignment
            </div>
          </div>

          {/* Grouped Components Test */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Grouped Components (As Used in Header)</h3>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-center">
                <ToggleButtonGroup spacing="tight">
                  <LanguageSwitcher />
                  <VolumeControl />
                  <ThemeSwitcher />
                </ToggleButtonGroup>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              ✅ Components should be perfectly aligned and evenly spaced
            </div>
          </div>

          {/* Side by Side Comparison */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Side by Side Alignment Test</h3>
            <div className="p-4 bg-muted/30 rounded-lg">
              <HStack gap={1} align="center" justify="center">
                <LanguageSwitcher />
                <VolumeControl />
                <ThemeSwitcher />
              </HStack>
            </div>
            
            <div className="text-xs text-muted-foreground">
              ✅ Icons should be perfectly centered and at the same vertical level
            </div>
          </div>

          {/* Visual Guidelines */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Design Specifications</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Sizing</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Container: 36x36px (h-9 w-9)</li>
                  <li>• Icons: 16x16px (h-4 w-4)</li>
                  <li>• Border radius: 8px (rounded-lg)</li>
                  <li>• Perfect centering: flex items-center justify-center</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Interactions</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Hover: bg-accent + scale 1.02</li>
                  <li>• Active: scale 0.98</li>
                  <li>• Focus: ring-2 ring-ring</li>
                  <li>• Transition: 200ms ease</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}