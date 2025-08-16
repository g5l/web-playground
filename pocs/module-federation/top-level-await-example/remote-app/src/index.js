// Import the data module that uses top-level await
import data from './data.js';

// Display the data in the UI
document.addEventListener('DOMContentLoaded', () => {
  const resultElement = document.getElementById('result');
  if (resultElement) {
    resultElement.innerHTML = `
      <h3>${data.message}</h3>
      <p>Timestamp: ${data.timestamp}</p>
      <p>Items loaded:</p>
      <ul>
        ${data.items.map(item => `<li>${item.name} (ID: ${item.id})</li>`).join('')}
      </ul>
      <p><strong>Note:</strong> This data is exposed via Module Federation and can be consumed by other applications.</p>
    `;
  }

  console.log('Remote app initialized with data:', data);
});