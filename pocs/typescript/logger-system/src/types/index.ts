export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace';

export type LogMetadata = Record<string, unknown>;

export interface LogEntryData {
  id: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  metadata?: LogMetadata;
  error?: Error;
}