const express = require('express');
const app = express();
const port = 3000;

const data = [
  "Apple", "Banana", "Cherry", "Date", "Elderberry",
  "Fig", "Grape", "Honeydew", "Kiwi", "Lemon"
];

app.use(express.static('public'));

app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = data.filter(item => item.toLowerCase().includes(query));
  res.send(results.map(item => `<div>${item}</div>`).join(''));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});