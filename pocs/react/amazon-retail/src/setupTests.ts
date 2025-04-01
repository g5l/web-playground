import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

afterEach(() => {
  cleanup();
}); 