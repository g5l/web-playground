export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace';

export const LogLevelPriority: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4,
};

export type LogMode = 'sync' | 'async';

export type LogMetadata = Record<string, unknown>;

export interface LogEntryData {
  id: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  metadata?: LogMetadata;
  error?: Error;
}

export interface BaseTransportOptions {
  level?: LogLevel;
  formatter?: (entry: LogEntryData) => string;
}


export interface WriteResult {
  success: boolean;
  error?: Error;
  transportName: string;
}