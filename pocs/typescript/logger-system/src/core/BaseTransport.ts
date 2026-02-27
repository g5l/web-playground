import { LogEntryData, LogLevel, LogLevelPriority, BaseTransportOptions, WriteResult } from '../types';

export abstract class BaseTransport {
  public abstract readonly name: string;
  protected level: LogLevel;
  protected formatter: (entry: LogEntryData) => string;

  constructor(options: BaseTransportOptions = {}) {
    this.level = options.level ?? 'info';
    this.formatter = options.formatter ?? this.defaultFormatter;
  }
  
  protected defaultFormatter(entry: LogEntryData): string {
    const ts = entry.timestamp.toISOString();
    const level = entry.level.toUpperCase().padEnd(5);
    let str = `[${ts}] [${level}] ${entry.message}`;
    
    console.log({ metadata: entry.metadata });
    
    if (entry.metadata && Object.keys(entry.metadata).length > 0) {
      str += ` ${JSON.stringify(entry.metadata)}`;
    }

    return str;
  }
  
  shouldLog(level: LogLevel): boolean {
    return LogLevelPriority[level] <= LogLevelPriority[this.level];
  }
  
  protected format(entry: LogEntryData): string {
    return this.formatter(entry);
  }

  protected createResult(success: boolean, error?: Error): WriteResult {
    return {
      success,
      error,
      transportName: this.name,
    };
  }

  abstract write(entry: LogEntryData): WriteResult;
  abstract writeAsync(entry: LogEntryData): Promise<WriteResult>;
  abstract flush(): Promise<void>;
  abstract close(): Promise<void>;
}