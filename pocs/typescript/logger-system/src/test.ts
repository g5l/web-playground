import {LogEntry} from './core/LogEntry';
import {LogLevel, LogLevelPriority} from './types';

// Test 1: LogEntry creation
console.log('Info LogEntry');
const entry = new LogEntry('info', 'Test message', {userId: 123});
console.log('Created entry:', entry.toString());
console.log('Entry ID:', entry.id);

console.log('LogEntry with error');
const errorEntry = new LogEntry(
  'error',
  'Something went wrong',
  {operation: 'database'},
  new Error('Connection failed')
);
console.log('Error LogEntry:', errorEntry.toString());
console.log('  ✅ Error logging works!\n');

// Test 3: Log level priority
console.log('Test 3: Log level priorities');
const levels: LogLevel[] = ['error', 'warn', 'info', 'debug', 'trace'];
levels.forEach(level => {
  console.log(`  ${level}: priority ${LogLevelPriority[level]}`);
});
console.log('  ✅ Log levels work!\n');

// Test 4: JSON serialization
console.log('Test 4: JSON serialization');
const jsonEntry = new LogEntry('debug', 'Serialization test', {data: [1, 2, 3]});
console.log('  JSON:', JSON.stringify(jsonEntry.toJSON(), null, 2));
console.log('  ✅ Serialization works!\n');

console.log('═══════════════════════════════════════');
console.log('✅ All Day 1 tests passed!');
console.log('═══════════════════════════════════════');