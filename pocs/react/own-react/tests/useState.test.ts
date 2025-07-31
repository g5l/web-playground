import { useState } from '../src/core/hooks';

describe('useState', () => {
  test('returns initial state and setter', () => {
    let stateValue;
    function TestComponent() {
      const [state] = useState(123);
      stateValue = state;
      return null;
    }
    TestComponent();
    expect(stateValue).toBe(123);
  });
});