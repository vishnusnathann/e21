const express = require('express');
const apiRoutes = require('./routes');
const cors = require('cors');
const helmet = require("helmet");
const cookieParser = require('cookie-parser')
// Create the Express application
var app = express();
app.use(cors());
app.use(helmet());

// Configuring Host and Port.
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';




// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('client/build'));

app.use(cookieParser())

app.use('/api',apiRoutes);

// app.get('/**', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    
// });

// Server listens on http://localhost:5000
let server = app.listen(PORT, HOST, () => console.log(`Server started running on : http://${HOST}:${PORT}`));
