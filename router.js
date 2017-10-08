const express = require('express');
const router = express.Router();

const api = require('./routes/api');

router.use('/api', api);

module.exports = router;
