// Simulate fetching data from an API
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'Data successfully loaded from remote!',
        timestamp: new Date().toISOString(),
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' }
        ]
      });
    }, 1000); // Simulate network delay
  });
}

// Using top-level await in a module
const data = await fetchData();
console.log('Remote data module initialized with:', data);

export default data;