import {LogEntry} from './core/LogEntry';

console.log('Info LogEntry');
const entry = new LogEntry('info', 'Test message', {userId: 123});
console.log('Created entry:', entry.toString());
console.log('Entry ID:', entry.id);

console.log('Error LogEntry');
const errorEntry = new LogEntry(
  'error',
  'Something went wrong',
  {operation: 'database'},
  new Error('Connection failed')
);
console.log('Created entry:', errorEntry.toString());
