const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Hi');
});

router.get('/ship/:id', function(req, res) {
    const shipId = req.params.id;

    res.interface.Ship.getById(shipId)
    .catch(error => _handleError(res, error))
    .then(ship => {
        res.json(ship);
    })
});

router.get('/star/:id', function(req, res) {
    const starId = req.params.id;

    res.interface.Star.getById(starId)
    .catch(error => _handleError(res, error))
    .then(starData => {
        res.json(starData);
    })
});

router.route('/star/:id/nearby')
.get(function(req, res) {
    const starId = req.params.id;

    res.interface.Star.getById(starId)
    .catch(error => _handleError(res, error))
    .then(starData => {
        console.log('got stardata', starData);
        return res.interface.Star.getByDistanceFromCoord(starData.x, starData.y, 10);
    })
    .then(starData => {
        res.json(starData);
    });
})
.post(function (req, res) {

});

function _handleError(res, data) {
    if (!data && !data.error) {
        data.error = "Unknown Error";
    }

    res.status(400).json(data);
}

module.exports = router;
