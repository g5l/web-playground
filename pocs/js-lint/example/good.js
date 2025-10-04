function greet(name) {
  if (name) {
    const message = `Hello, ${name}! Welcome back.`;
    return message;
  }
  return 'Hello, guest!';
}

const greeting = greet('Gabriel');
export { greeting };
