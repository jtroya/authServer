const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();

// db setup
// mongoose.connect('mongodb://localhost:auth/auth');
const promise = mongoose.connect('mongodb://localhost/auth', {
  useMongoClient: true
});

// app setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('server listening on port: ', port);
