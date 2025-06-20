// Debug configuration for development environments
// This file allows easy customization of debug settings

export interface DebugConfig {
  enabled: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug' | 'trace';
  componentTracking: boolean;
  performanceTracking: boolean;
  errorTracking: boolean;
  themeDebugging: boolean;
  animationDebugging: boolean;
  debugPanel: {
    enabled: boolean;
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    autoRefresh: boolean;
    refreshInterval: number;
    defaultTab: 'overview' | 'performance' | 'components' | 'errors' | 'theme' | 'animations';
  };
  console: {
    enabled: boolean;
    showTimestamps: boolean;
    showComponentNames: boolean;
    maxLogEntries: number;
  };
  performance: {
    enabled: boolean;
    trackMemory: boolean;
    trackNetwork: boolean;
    trackAnimations: boolean;
    maxMeasures: number;
  };
  components: {
    enabled: boolean;
    trackProps: boolean;
    trackState: boolean;
    trackEffects: boolean;
    maxLifecycles: number;
  };
  errors: {
    enabled: boolean;
    captureStackTraces: boolean;
    captureContext: boolean;
    maxErrors: number;
  };
  theme: {
    enabled: boolean;
    trackUsage: boolean;
    trackChanges: boolean;
    maxUsage: number;
  };
  animations: {
    enabled: boolean;
    trackDuration: boolean;
    trackVariance: boolean;
    maxAnimations: number;
  };
}

// Default debug configuration
export const defaultDebugConfig: DebugConfig = {
  enabled: process.env.NODE_ENV === 'development',
  logLevel: 'debug',
  componentTracking: true,
  performanceTracking: true,
  errorTracking: true,
  themeDebugging: true,
  animationDebugging: true,
  debugPanel: {
    enabled: true,
    position: 'top-right',
    autoRefresh: true,
    refreshInterval: 1000,
    defaultTab: 'overview'
  },
  console: {
    enabled: true,
    showTimestamps: true,
    showComponentNames: true,
    maxLogEntries: 1000
  },
  performance: {
    enabled: true,
    trackMemory: true,
    trackNetwork: false,
    trackAnimations: true,
    maxMeasures: 100
  },
  components: {
    enabled: true,
    trackProps: true,
    trackState: false,
    trackEffects: true,
    maxLifecycles: 100
  },
  errors: {
    enabled: true,
    captureStackTraces: true,
    captureContext: true,
    maxErrors: 50
  },
  theme: {
    enabled: true,
    trackUsage: true,
    trackChanges: false,
    maxUsage: 100
  },
  animations: {
    enabled: true,
    trackDuration: true,
    trackVariance: true,
    maxAnimations: 50
  }
};

// Development-specific configuration (verbose debugging)
export const developmentDebugConfig: DebugConfig = {
  ...defaultDebugConfig,
  logLevel: 'trace',
  debugPanel: {
    ...defaultDebugConfig.debugPanel,
    refreshInterval: 500,
    defaultTab: 'overview'
  },
  console: {
    ...defaultDebugConfig.console,
    maxLogEntries: 2000
  },
  performance: {
    ...defaultDebugConfig.performance,
    trackNetwork: true,
    maxMeasures: 200
  },
  components: {
    ...defaultDebugConfig.components,
    trackState: true,
    maxLifecycles: 200
  },
  errors: {
    ...defaultDebugConfig.errors,
    maxErrors: 100
  },
  theme: {
    ...defaultDebugConfig.theme,
    trackChanges: true,
    maxUsage: 200
  },
  animations: {
    ...defaultDebugConfig.animations,
    maxAnimations: 100
  }
};

// Minimal debugging configuration (performance-focused)
export const minimalDebugConfig: DebugConfig = {
  ...defaultDebugConfig,
  logLevel: 'warn',
  debugPanel: {
    ...defaultDebugConfig.debugPanel,
    enabled: false
  },
  console: {
    ...defaultDebugConfig.console,
    maxLogEntries: 100
  },
  performance: {
    ...defaultDebugConfig.performance,
    trackMemory: false,
    trackNetwork: false,
    trackAnimations: false,
    maxMeasures: 20
  },
  components: {
    ...defaultDebugConfig.components,
    trackProps: false,
    trackState: false,
    trackEffects: false,
    maxLifecycles: 20
  },
  errors: {
    ...defaultDebugConfig.errors,
    captureStackTraces: false,
    captureContext: false,
    maxErrors: 10
  },
  theme: {
    ...defaultDebugConfig.theme,
    trackUsage: false,
    trackChanges: false,
    maxUsage: 20
  },
  animations: {
    ...defaultDebugConfig.animations,
    trackDuration: false,
    trackVariance: false,
    maxAnimations: 10
  }
};

// Error-focused debugging configuration
export const errorDebugConfig: DebugConfig = {
  ...defaultDebugConfig,
  logLevel: 'error',
  componentTracking: false,
  performanceTracking: false,
  themeDebugging: false,
  animationDebugging: false,
  debugPanel: {
    ...defaultDebugConfig.debugPanel,
    defaultTab: 'errors'
  },
  console: {
    ...defaultDebugConfig.console,
    maxLogEntries: 500
  },
  errors: {
    ...defaultDebugConfig.errors,
    maxErrors: 200
  }
};

// Performance-focused debugging configuration
export const performanceDebugConfig: DebugConfig = {
  ...defaultDebugConfig,
  logLevel: 'info',
  componentTracking: false,
  errorTracking: false,
  themeDebugging: false,
  animationDebugging: false,
  debugPanel: {
    ...defaultDebugConfig.debugPanel,
    defaultTab: 'performance'
  },
  performance: {
    ...defaultDebugConfig.performance,
    trackMemory: true,
    trackNetwork: true,
    trackAnimations: true,
    maxMeasures: 500
  }
};

// Get debug configuration based on environment and preferences
export const getDebugConfig = (): DebugConfig => {
  const env = process.env.NODE_ENV;
  const debugMode = process.env.REACT_APP_DEBUG_MODE || 'default';
  
  if (env !== 'development') {
    return { ...defaultDebugConfig, enabled: false };
  }
  
  switch (debugMode) {
    case 'development':
      return developmentDebugConfig;
    case 'minimal':
      return minimalDebugConfig;
    case 'error':
      return errorDebugConfig;
    case 'performance':
      return performanceDebugConfig;
    case 'default':
    default:
      return defaultDebugConfig;
  }
};

// Debug configuration utilities
export const debugConfigUtils = {
  // Check if a specific debug feature is enabled
  isEnabled: (feature: keyof DebugConfig): boolean => {
    const config = getDebugConfig();
    return config.enabled && config[feature] === true;
  },
  
  // Get log level
  getLogLevel: (): string => {
    return getDebugConfig().logLevel;
  },
  
  // Check if debug panel is enabled
  isDebugPanelEnabled: (): boolean => {
    return getDebugConfig().debugPanel.enabled;
  },
  
  // Get debug panel configuration
  getDebugPanelConfig: () => {
    return getDebugConfig().debugPanel;
  },
  
  // Check if console logging is enabled
  isConsoleEnabled: (): boolean => {
    return getDebugConfig().console.enabled;
  },
  
  // Get console configuration
  getConsoleConfig: () => {
    return getDebugConfig().console;
  }
};

// Export the current debug configuration
export const currentDebugConfig = getDebugConfig(); 