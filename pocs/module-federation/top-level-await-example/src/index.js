// Import the data module that uses top-level await
import data from './data.js';

// The code example to display in the UI
const codeExample = `// data.js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'Data successfully loaded!',
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
console.log('Data module initialized with:', data);

export default data;

// index.js
import data from './data.js';

// This code runs after the data is already loaded
// because the top-level await in data.js ensures
// the Promise is resolved before the module is exported
console.log('Main module received data:', data);`;

// Display the code example
document.getElementById('code-example').textContent = codeExample;

// Display the result
const resultElement = document.getElementById('result');
resultElement.innerHTML = `
  <h3>${data.message}</h3>
  <p>Timestamp: ${data.timestamp}</p>
  <p>Items loaded:</p>
  <ul>
    ${data.items.map(item => `<li>${item.name} (ID: ${item.id})</li>`).join('')}
  </ul>
  <p><strong>Note:</strong> The data was already loaded when this module was imported, 
  thanks to top-level await in the data.js module.</p>
`;

console.log('Main module received data:', data);