require('dotenv').config();

const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const { url, modelsPath, options } = require('./config/database');

const port = process.env.SERVER_PORT || 3000;

mongoose.connect(url, options);
requireDir(modelsPath);

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(express.static('./uploads'));

app.use('/api', require('./app/routes'));

server.listen(port, () => console.log(`Server running at port ${port}`));

require('./app/services/socket')(io);
