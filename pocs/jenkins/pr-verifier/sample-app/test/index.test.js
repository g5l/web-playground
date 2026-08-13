const { add } = require('../src/index');

test('add(2, 3) returns 5', () => {
  expect(add(2, 3)).toBe(5);
});
