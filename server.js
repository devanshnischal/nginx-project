// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3000;

// const appName = process.env.APP_NAME

// app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use('/', (req, res) => {
//     console.log(`Request served by ${appName}`);
// });

// app.listen(port, () => {
//     console.log(`${appName} is listening on port ${port}`);
// });

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const replicaApp =  process.env.APP_NAME

const appName = process.env.APP_NAME || 'NginxProject';

// Serve static files from "images" folder if any
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve static assets like CSS, JS (if you split them later)
app.use(express.static(path.join(__dirname)));

// Handle root route and send index.html
app.get('/', (req, res) => {
  console.log(`Request served by ${replicaApp}`);
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`${appName} is listening on port ${port}`);
});


