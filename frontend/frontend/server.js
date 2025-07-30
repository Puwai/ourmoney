const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// All other routes should serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Frontend server running on port ${port}`);
});