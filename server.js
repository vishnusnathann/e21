const express = require('express');
const apiRoutes = require('./routes');
const cors = require('cors');

// Create the Express application
var app = express();
app.use(cors())

// Configuring Host and Port.
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);

// Server listens on http://localhost:5000
let server = app.listen(PORT, HOST, () => console.log(`Server started running on : http://${HOST}:${PORT}`));
