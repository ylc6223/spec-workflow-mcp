import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { VStack, HStack } from '@/components/ui/stack';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Navigation, FileText, CheckSquare, Settings } from 'lucide-react';

/**
 * Demo page showcasing the new navigation highlight effects
 */
export function NavigationHighlightDemo() {
  const [activeItem, setActiveItem] = useState(0);

  const navItems = [
    { icon: BarChart, label: 'Statistics', id: 0 },
    { icon: Navigation, label: 'Steering', id: 1 },
    { icon: FileText, label: 'Specs', id: 2 },
    { icon: CheckSquare, label: 'Tasks', id: 3 },
    { icon: Settings, label: 'Approvals', id: 4 }
  ];

  return (
    <Container size="lg" className="py-8">
      <VStack gap={8}>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Navigation Highlight Redesign</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            New clean and modern navigation with bottom indicator bars instead of heavy shadows and borders.
          </p>
        </div>

        {/* Before vs After Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Old Style (Before) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                Before: Heavy Shadows
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <HStack gap={1} align="center">
                  {navItems.slice(0, 3).map((item, index) => {
                    const Icon = item.icon;
                    const isActive = index === 0; // First item active for demo
                    
                    return (
                      <div key={item.id} className="relative">
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          size="sm"
                          className={`gap-2 transition-all duration-200 relative ${
                            isActive 
                              ? "shadow-lg border border-primary/20" 
                              : "hover:shadow-md"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="font-medium">{item.label}</span>
                        </Button>
                        {isActive && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-primary rounded-full" />
                        )}
                      </div>
                    );
                  })}
                </HStack>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div>❌ Heavy shadow effects</div>
                <div>❌ Border styling</div>
                <div>❌ Tiny bottom indicator (barely visible)</div>
                <div>❌ Background color change</div>
              </div>
            </CardContent>
          </Card>

          {/* New Style (After) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                After: Clean Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <HStack gap={1} align="center">
                  {navItems.slice(0, 3).map((item, index) => {
                    const Icon = item.icon;
                    const isActive = index === 0; // First item active for demo
                    
                    return (
                      <div key={item.id} className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-2 transition-all duration-200 relative ${
                            isActive 
                              ? "text-primary bg-transparent hover:bg-accent/50" 
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className={`font-medium transition-colors duration-200 ${isActive ? "text-primary" : ""}`}>
                            {item.label}
                          </span>
                        </Button>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 1 }}
                              exit={{ scaleX: 0, opacity: 0 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 500, 
                                damping: 30,
                                duration: 0.3 
                              }}
                              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full origin-center"
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </HStack>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div>✅ No shadows or borders</div>
                <div>✅ Clean color-only highlighting</div>
                <div>✅ Prominent bottom indicator bar</div>
                <div>✅ Smooth spring animations</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Demo - New Navigation Style</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-muted/30 rounded-lg">
              <div className="text-center mb-6">
                <div className="text-sm text-muted-foreground mb-2">Desktop Navigation</div>
                <HStack gap={1} align="center" justify="center">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = index === activeItem;
                    
                    return (
                      <div key={item.id} className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveItem(index)}
                          className={`gap-2 transition-all duration-200 relative cursor-pointer ${
                            isActive 
                              ? "text-primary bg-transparent hover:bg-accent/50" 
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className={`font-medium transition-colors duration-200 ${isActive ? "text-primary" : ""}`}>
                            {item.label}
                          </span>
                        </Button>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 1 }}
                              exit={{ scaleX: 0, opacity: 0 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 500, 
                                damping: 30,
                                duration: 0.3 
                              }}
                              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full origin-center"
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </HStack>
              </div>

              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-4">Mobile Navigation (Vertical)</div>
                <div className="max-w-xs mx-auto">
                  <VStack gap={1}>
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = index === activeItem;
                      
                      return (
                        <div key={item.id} className="relative w-full">
                          <Button
                            variant="ghost"
                            onClick={() => setActiveItem(index)}
                            className={`w-full justify-start gap-3 h-12 transition-all duration-200 cursor-pointer ${
                              isActive 
                                ? "text-primary bg-accent/30 hover:bg-accent/50" 
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className={`font-medium transition-colors duration-200 ${isActive ? "text-primary" : ""}`}>
                              {item.label}
                            </span>
                          </Button>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ scaleY: 1, opacity: 1 }}
                                exit={{ scaleY: 0, opacity: 0 }}
                                transition={{ 
                                  type: "spring", 
                                  stiffness: 500, 
                                  damping: 30,
                                  duration: 0.3 
                                }}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary rounded-full origin-center"
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </VStack>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Click any navigation item above to see the smooth transition effects!
            </div>
          </CardContent>
        </Card>

        {/* Design Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Design Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Desktop Navigation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active State:</span>
                    <span className="text-muted-foreground">text-primary</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Indicator Bar:</span>
                    <span className="text-muted-foreground">w-12 h-0.5 bg-primary</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Animation:</span>
                    <span className="text-muted-foreground">scaleX spring transition</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Position:</span>
                    <span className="text-muted-foreground">bottom -1px, centered</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Mobile Navigation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active State:</span>
                    <span className="text-muted-foreground">text-primary + bg-accent/30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Indicator Bar:</span>
                    <span className="text-muted-foreground">w-1 h-8 bg-primary</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Animation:</span>
                    <span className="text-muted-foreground">scaleY spring transition</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Position:</span>
                    <span className="text-muted-foreground">right 12px, centered</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </VStack>
    </Container>
  );
}