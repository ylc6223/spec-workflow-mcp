import React from 'react';

/**
 * ColorTest Component - Forces Tailwind to generate extended color classes
 * This component uses all extended color variables to ensure they are included in the build
 */
export function ColorTest() {
  // This component is hidden but forces Tailwind to include all our extended colors
  return (
    <div className="hidden">
      {/* Background colors */}
      <div className="bg-background-deep"></div>
      
      {/* Input colors */}
      <input className="bg-input-background text-input-placeholder" />
      
      {/* Layout colors */}
      <div className="bg-sidebar"></div>
      <div className="bg-sidebar-deep"></div>
      <div className="bg-header"></div>
      <div className="bg-menu"></div>
      
      {/* Accent colors */}
      <div className="bg-accent-hover"></div>
      
      {/* Heavy colors */}
      <div className="bg-heavy text-heavy-foreground"></div>
      
      {/* Success colors */}
      <div className="bg-success text-success-foreground"></div>
      
      {/* Warning colors */}
      <div className="bg-warning text-warning-foreground"></div>
      
      {/* Overlay */}
      <div className="bg-overlay"></div>
    </div>
  );
}