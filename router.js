const express = require('express');
const router = express.Router();

const api = require('./routes/api');

router.get('/', function (req, res) {
    res.render('index', {
        ship: req.ship,
        player: req.player,
    });
});

router.use('/api', api);

module.exports = router;
