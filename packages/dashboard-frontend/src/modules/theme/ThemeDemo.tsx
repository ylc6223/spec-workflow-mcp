import React from 'react';
import { useTheme } from './ThemeProvider';

/**
 * ThemeDemo Component - Demonstrates the extended shadcn theme system
 * 
 * This component showcases all the available theme colors and how to use them
 * with the extended blue-focused theme system that integrates with theme-dark.css
 * and theme-light.css colors.
 * 
 * Usage Examples for New Components:
 * 
 * 1. Basic Colors:
 *    - bg-background / bg-background-deep
 *    - text-foreground
 *    - bg-card / text-card-foreground
 * 
 * 2. Primary Actions (Blue Theme):
 *    - bg-primary / text-primary-foreground
 *    - border-primary / ring-primary
 * 
 * 3. Status Colors:
 *    - bg-success / text-success-foreground
 *    - bg-warning / text-warning-foreground
 *    - bg-destructive / text-destructive-foreground
 * 
 * 4. Layout Colors:
 *    - bg-sidebar / bg-sidebar-deep
 *    - bg-header
 *    - bg-menu
 * 
 * 5. Interactive Elements:
 *    - bg-accent / text-accent-foreground
 *    - hover:bg-accent-hover
 *    - bg-heavy / text-heavy-foreground
 */
export function ThemeDemo() {
  const { actualTheme, toggleTheme, tokens } = useTheme();

  return (
    <div className="min-h-screen bg-background-deep text-foreground p-8">
      {/* Header */}
      <div className="bg-header border-b border-border p-6 mb-8 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Extended Shadcn Theme System
            </h1>
            <p className="text-muted-foreground">
              Blue-focused theme with {actualTheme} mode active
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Toggle Theme
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Colors */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Basic Colors</h2>
          <div className="space-y-3">
            <div className="bg-background p-3 rounded border">
              <span className="text-foreground">background + foreground</span>
            </div>
            <div className="bg-background-deep p-3 rounded border">
              <span className="text-foreground">background-deep</span>
            </div>
            <div className="bg-muted p-3 rounded">
              <span className="text-muted-foreground">muted + muted-foreground</span>
            </div>
          </div>
        </div>

        {/* Primary Blue Theme Colors */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Primary (Blue)</h2>
          <div className="space-y-3">
            <div className="bg-primary p-3 rounded text-primary-foreground">
              Primary Action Button
            </div>
            <div className="border-2 border-primary p-3 rounded text-primary">
              Primary Border
            </div>
            <input 
              className="w-full p-2 bg-input-background border border-input rounded focus:ring-2 focus:ring-ring"
              placeholder="Focus ring uses primary"
            />
          </div>
        </div>

        {/* Status Colors */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Status Colors</h2>
          <div className="space-y-3">
            <div className="bg-success p-3 rounded text-success-foreground">
              Success Message
            </div>
            <div className="bg-warning p-3 rounded text-warning-foreground">
              Warning Alert
            </div>
            <div className="bg-destructive p-3 rounded text-destructive-foreground">
              Error State
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Interactive</h2>
          <div className="space-y-3">
            <button className="w-full bg-accent text-accent-foreground p-3 rounded hover:bg-accent-hover transition-colors">
              Accent Button (hover me)
            </button>
            <button className="w-full bg-secondary text-secondary-foreground p-3 rounded hover:opacity-80 transition-opacity">
              Secondary Button
            </button>
            <div className="bg-heavy p-3 rounded text-heavy-foreground">
              Heavy Background
            </div>
          </div>
        </div>

        {/* Layout Components */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Layout</h2>
          <div className="space-y-3">
            <div className="bg-sidebar p-3 rounded border">
              <span className="text-foreground">Sidebar Background</span>
            </div>
            <div className="bg-sidebar-deep p-3 rounded border">
              <span className="text-foreground">Sidebar Deep</span>
            </div>
            <div className="bg-menu p-3 rounded border">
              <span className="text-foreground">Menu Background</span>
            </div>
          </div>
        </div>

        {/* Popover & Modal */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Overlays</h2>
          <div className="space-y-3">
            <div className="bg-popover border border-border p-3 rounded text-popover-foreground">
              Popover Content
            </div>
            <div className="relative">
              <div className="bg-overlay absolute inset-0 rounded"></div>
              <div className="relative bg-card p-3 rounded border text-card-foreground">
                Content over overlay
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Colors Demo */}
      <div className="mt-8 bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-4">Chart Colors</h2>
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i + 1}
              className={`w-20 h-20 rounded flex items-center justify-center text-white font-medium`}
              style={{ backgroundColor: `hsl(var(--chart-${i + 1}))` }}
            >
              Chart {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Usage Guide */}
      <div className="mt-8 bg-muted border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Usage Guide</h2>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p className="mb-3">
            <strong className="text-foreground">For new shadcn/ui components:</strong> All components will automatically use these theme colors through the Tailwind configuration.
          </p>
          <p className="mb-3">
            <strong className="text-foreground">For custom business components:</strong> Use the theme colors with standard Tailwind classes:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li><code className="bg-accent text-accent-foreground px-2 py-1 rounded">bg-primary text-primary-foreground</code> - Primary actions</li>
            <li><code className="bg-accent text-accent-foreground px-2 py-1 rounded">bg-card text-card-foreground</code> - Card containers</li>
            <li><code className="bg-accent text-accent-foreground px-2 py-1 rounded">bg-success text-success-foreground</code> - Success states</li>
            <li><code className="bg-accent text-accent-foreground px-2 py-1 rounded">bg-sidebar text-foreground</code> - Sidebar layouts</li>
            <li><code className="bg-accent text-accent-foreground px-2 py-1 rounded">hover:bg-accent-hover</code> - Interactive hover states</li>
          </ul>
          <p className="mt-3">
            <strong className="text-foreground">Theme switching:</strong> All colors automatically adapt to light/dark themes and respect the blue color scheme.
          </p>
        </div>
      </div>
    </div>
  );
}