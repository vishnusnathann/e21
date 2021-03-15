const express = require('express');
const voteRoutes = require('./voteRoutes');
const router = express.Router(); 

router.use('/vote',voteRoutes);

module.exports = router;