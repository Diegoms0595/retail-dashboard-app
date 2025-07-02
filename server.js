const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (HTML/CSS/JS)
app.use(express.static(__dirname));
app.use(express.json());

// Routing
const orderRoute = require('./api/order');
app.use('/api/order', orderRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});