// Debug utility for development-only debugging capabilities
// This module provides comprehensive debugging tools that are only active in development

interface DebugConfig {
  enabled: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug' | 'trace';
  componentTracking: boolean;
  performanceTracking: boolean;
  errorTracking: boolean;
  themeDebugging: boolean;
  animationDebugging: boolean;
}

// Debug configuration - only active in development
const DEBUG_CONFIG: DebugConfig = {
  enabled: process.env.NODE_ENV === 'development',
  logLevel: 'debug',
  componentTracking: true,
  performanceTracking: true,
  errorTracking: true,
  themeDebugging: true,
  animationDebugging: true,
};

// Performance tracking
const performanceMarks: Record<string, number> = {};
const performanceMeasures: Record<string, number> = {};

// Component lifecycle tracking
const componentLifecycles: Record<string, {
  mountCount: number;
  updateCount: number;
  unmountCount: number;
  lastMountTime?: number;
  lastUpdateTime?: number;
  lastUnmountTime?: number;
}> = {};

// Error tracking
const errorLog: Array<{
  timestamp: number;
  component: string;
  error: Error;
  stack?: string;
}> = [];

// Theme debugging
const themeUsage: Record<string, number> = {};

// Animation debugging
const animationStates: Record<string, {
  startTime: number;
  duration: number;
  type: string;
  component: string;
}> = {};

/**
 * Debug logger with different log levels
 */
export const debugLog = {
  error: (component: string, message: string, data?: any) => {
    if (!DEBUG_CONFIG.enabled) return;
    console.error(`[DEBUG-ERROR] [${component}] ${message}`, data || '');
  },
  
  warn: (component: string, message: string, data?: any) => {
    if (!DEBUG_CONFIG.enabled || DEBUG_CONFIG.logLevel === 'error') return;
    console.warn(`[DEBUG-WARN] [${component}] ${message}`, data || '');
  },
  
  info: (component: string, message: string, data?: any) => {
    if (!DEBUG_CONFIG.enabled || ['error', 'warn'].includes(DEBUG_CONFIG.logLevel)) return;
    console.info(`[DEBUG-INFO] [${component}] ${message}`, data || '');
  },
  
  debug: (component: string, message: string, data?: any) => {
    if (!DEBUG_CONFIG.enabled || ['error', 'warn', 'info'].includes(DEBUG_CONFIG.logLevel)) return;
    console.log(`[DEBUG] [${component}] ${message}`, data || '');
  },
  
  trace: (component: string, message: string, data?: any) => {
    if (!DEBUG_CONFIG.enabled || DEBUG_CONFIG.logLevel !== 'trace') return;
    console.trace(`[DEBUG-TRACE] [${component}] ${message}`, data || '');
  }
};

/**
 * Performance tracking utilities
 */
export const debugPerformance = {
  mark: (name: string) => {
    if (!DEBUG_CONFIG.enabled || !DEBUG_CONFIG.performanceTracking) return;
    performanceMarks[name] = performance.now();
    debugLog.debug('Performance', `Mark: ${name}`, { timestamp: performanceMarks[name] });
  },
  
  measure: (name: string, startMark: string, endMark: string) => {
    if (!DEBUG_CONFIG.enabled || !DEBUG_CONFIG.performanceTracking) return;
    const start = performanceMarks[startMark];
    const end = performanceMarks[endMark];
    if (start && end) {
      const duration = end - start;
      performanceMeasures[name] = duration;
      debugLog.info('Performance', `Measure: ${name}`, { duration: `${duration.toFixed(2)}ms` });
    }
  },
  
  getMeasures: () => {
    if (!DEBUG_CONFIG.enabled) return {};
    return { ...performanceMeasures };
  },
  
  clear: () => {
    if (!DEBUG_CONFIG.enabled) return;
    Object.keys(performanceMarks).forEach(key => delete performanceMarks[key]);
    Object.keys(performanceMeasures).forEach(key => delete performanceMeasures[key]);
    debugLog.debug('Performance', 'Cleared all performance marks and measures');
  }
};

/**
 * Component lifecycle tracking
 */
export const debugComponent = {
  mount: (componentName: string, props?: any) => {
    if (!DEBUG_CONFIG.enabled || !DEBUG_CONFIG.componentTracking) return;
    
    if (!componentLifecycles[componentName]) {
      componentLifecycles[componentName] = {
        mountCount: 0,
        updateCount: 0,
        unmountCount: 0
      };
    }
    
    componentLifecycles[componentName].mountCount++;
    componentLifecycles[componentName].lastMountTime = Date.now();
    
    debugLog.info('Component', `Mounted: ${componentName}`, {
      mountCount: componentLifecycles[componentName].mountCount,
      props: props ? Object.keys(props) : 'no props'
    });
  },
  
  update: (componentName: string, prevProps?: any, nextProps?: any) => {
    if (!DEBUG_CONFIG.enabled || !DEBUG_CONFIG.componentTracking) return;
    
    if (!componentLifecycles[componentName]) {
      componentLifecycles[componentName] = {
        mountCount: 0,
        updateCount: 0,
        unmountCount: 0
      };
    }
    
    componentLifecycles[componentName].updateCount++;
    componentLifecycles[componentName].lastUpdateTime = Date.now();
    
    debugLog.debug('Component', `Updated: ${componentName}`, {
      updateCount: componentLifecycles[componentName].updateCount,
      hasPropsChanged: prevProps !== nextProps
    });
  },
  
  unmount: (componentName: string) => {
    if (!DEBUG_CONFIG.enabled || !DEBUG_CONFIG.componentTracking) return;
    
    if (!componentLifecycles[componentName]) {
      componentLifecycles[componentName] = {
        mountCount: 0,
        updateCount: 0,
        unmountCount: 0
      };
    }
    
    componentLifecycles[componentName].unmountCount++;
    componentLifecycles[componentName].lastUnmountTime = Date.now();
    
    debugLog.info('Component', `Unmounted: ${componentName}`, {
      unmountCount: componentLifecycles[componentName].unmountCount,
      totalLifetime: componentLifecycles[componentName].lastMountTime 
        ? Date.now() - componentLifecycles[componentName].lastMountTime 
        : 'unknown'
    });
  },
  
  getLifecycles: () => {
    if (!DEBUG_CONFIG.enabled) return {};
    return { ...componentLifecycles };
  },
  
  clear: () => {
    if (!DEBUG_CONFIG.enabled) return;
    Object.keys(componentLifecycles).forEach(key => delete componentLifecycles[key]);
    debugLog.debug('Component', 'Cleared all component lifecycle data');
  }
};

/**
 * Error tracking utilities
 */
export const debugError = {
  capture: (component: string, error: Error, additionalInfo?: any) => {
    if (!DEBUG_CONFIG.enabled || !DEBUG_CONFIG.errorTracking) return;
    
    const errorEntry = {
      timestamp: Date.now(),
      component,
      error,
      stack: error.stack,
      additionalInfo
    };
    
    errorLog.push(errorEntry);
    
    debugLog.error('Error', `Captured error in ${component}`, {
      message: error.message,
      stack: error.stack,
      additionalInfo
    });
  },
  
  getErrors: () => {
    if (!DEBUG_CONFIG.enabled) return [];
    return [...errorLog];
  },
  
  clear: () => {
    if (!DEBUG_CONFIG.enabled) return;
    errorLog.length = 0;
    debugLog.debug('Error', 'Cleared all error logs');
  }
};

/**
 * Theme debugging utilities
 */
export const debugTheme = {
  trackUsage: (themeProperty: string, value: any) => {
    if (!DEBUG_CONFIG.enabled || !DEBUG_CONFIG.themeDebugging) return;
    
    if (!themeUsage[themeProperty]) {
      themeUsage[themeProperty] = 0;
    }
    themeUsage[themeProperty]++;
    
    debugLog.trace('Theme', `Usage: ${themeProperty}`, { value, usageCount: themeUsage[themeProperty] });
  },
  
  getUsage: () => {
    if (!DEBUG_CONFIG.enabled) return {};
    return { ...themeUsage };
  },
  
  clear: () => {
    if (!DEBUG_CONFIG.enabled) return;
    Object.keys(themeUsage).forEach(key => delete themeUsage[key]);
    debugLog.debug('Theme', 'Cleared all theme usage data');
  }
};

/**
 * Animation debugging utilities
 */
export const debugAnimation = {
  start: (animationId: string, component: string, type: string, duration: number) => {
    if (!DEBUG_CONFIG.enabled || !DEBUG_CONFIG.animationDebugging) return;
    
    animationStates[animationId] = {
      startTime: Date.now(),
      duration,
      type,
      component
    };
    
    debugLog.debug('Animation', `Started: ${animationId}`, {
      component,
      type,
      duration: `${duration}ms`
    });
  },
  
  end: (animationId: string) => {
    if (!DEBUG_CONFIG.enabled || !DEBUG_CONFIG.animationDebugging) return;
    
    const animation = animationStates[animationId];
    if (animation) {
      const actualDuration = Date.now() - animation.startTime;
      debugLog.info('Animation', `Ended: ${animationId}`, {
        component: animation.component,
        type: animation.type,
        expectedDuration: `${animation.duration}ms`,
        actualDuration: `${actualDuration}ms`,
        variance: `${Math.abs(actualDuration - animation.duration)}ms`
      });
      
      delete animationStates[animationId];
    }
  },
  
  getActiveAnimations: () => {
    if (!DEBUG_CONFIG.enabled) return {};
    return { ...animationStates };
  },
  
  clear: () => {
    if (!DEBUG_CONFIG.enabled) return;
    Object.keys(animationStates).forEach(key => delete animationStates[key]);
    debugLog.debug('Animation', 'Cleared all animation states');
  }
};

/**
 * Global debug utilities
 */
export const debugGlobal = {
  getStats: () => {
    if (!DEBUG_CONFIG.enabled) return null;
    
    return {
      performance: debugPerformance.getMeasures(),
      components: debugComponent.getLifecycles(),
      errors: debugError.getErrors(),
      theme: debugTheme.getUsage(),
      animations: debugAnimation.getActiveAnimations(),
      config: DEBUG_CONFIG
    };
  },
  
  clearAll: () => {
    if (!DEBUG_CONFIG.enabled) return;
    
    debugPerformance.clear();
    debugComponent.clear();
    debugError.clear();
    debugTheme.clear();
    debugAnimation.clear();
    
    debugLog.info('Global', 'Cleared all debug data');
  },
  
  exportData: () => {
    if (!DEBUG_CONFIG.enabled) return null;
    
    const data = debugGlobal.getStats();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-data-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    debugLog.info('Global', 'Exported debug data');
  }
};

// Expose debug utilities to window in development for console access
if (DEBUG_CONFIG.enabled && typeof window !== 'undefined') {
  (window as any).__DEBUG__ = {
    log: debugLog,
    performance: debugPerformance,
    component: debugComponent,
    error: debugError,
    theme: debugTheme,
    animation: debugAnimation,
    global: debugGlobal
  };
  
  console.log('[DEBUG] Debug utilities available at window.__DEBUG__');
} 