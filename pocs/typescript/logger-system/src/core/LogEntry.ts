import { v4 as uuidv4 } from 'uuid';
import { LogEntryData, LogLevel, LogMetadata } from '../types';

export class LogEntry implements LogEntryData {
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly level: LogLevel;
  public readonly message: string;
  public readonly metadata?: LogMetadata;
  public readonly error?: Error;

  constructor(
    level: LogLevel,
    message: string,
    metadata?: LogMetadata,
    error?: Error
  ) {
    this.id = uuidv4();
    this.timestamp = new Date();
    this.level = level;
    this.message = message;
    this.metadata = metadata;
    this.error = error;
  }
  
  toJSON(): LogEntryData {
    return {
      id: this.id,
      timestamp: this.timestamp,
      level: this.level,
      message: this.message,
      metadata: this.metadata,
      error: this.error,
    };
  }
  
  toString(): string {
    const ts = this.timestamp.toISOString();
    const level = this.level.toUpperCase();
    let str = `[${ts}] [${level}] ${this.message}`;

    if (this.metadata && Object.keys(this.metadata).length > 0) {
      str += ` ${JSON.stringify(this.metadata)}`;
    }

    if (this.error) {
      str += `\n  Error: ${this.error.message}`;
      if (this.error.stack) {
        str += `\n  Stack: ${this.error.stack}`;
      }
    }

    return str;
  }
}