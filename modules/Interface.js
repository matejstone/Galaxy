const Database = require('modules/Database')();

const Player = require('classes/Player');
const Star = require('classes/Star');
const Ship = require('classes/Ship');
const Planet = require('classes/Planet');

const _interface = {
    Player: {
         getById(id) {
            return new Promise((resolve, reject) => {
                const player = new Player({ create: true, data: { id } });
                resolve(player);
            })
        },
        getScannedIdsFromListOfStarIds(starIds, playerId) {
            return Database.query(
                'SELECT * '
                + 'FROM `galaxy`.`stars_player_scanned` '
                + 'WHERE `star` IN ( ? ) '
                + 'AND `player` = ? ',
                [ starIds, playerId ]
            )
            .then(starIdsResults => {
                const starIds = [];

                starIdsResults.forEach(starIdResult => {
                    starIds.push(starIdResult.star);
                });

                return starIds;
            })
        },
    },
    Star: {
        getById(id) {
            return Database.query(
                'SELECT * FROM `galaxy`.`stars` '
                + 'WHERE `id` = ? ',
                id
            )
            .catch(_handleMySQLError)
            .then(starData => {
                if (starData.length < 1) {
                    return Promise.reject({
                        error: `Star (id: ${id}) not found`
                    });
                }

                return starData[0];
            })
            .then(starData => {
                return new Star({ create: true, data: starData });
            });
        },
        getByDistanceFromCoord(x, y, distance) {
            const minX = x - (distance + 10);
            const minY = y - (distance + 10);
            const maxX = x + (distance + 10);
            const maxY = y + (distance + 10);

            return Database.query(
                `SELECT *, (SQRT(POW(x - ${x}, 2) + POW(y - ${y}, 2))) AS distance `
                + 'FROM `galaxy`.`stars` '
                + 'WHERE x > ? AND x < ? '
                + 'AND y > ? AND y < ? '
                + 'ORDER BY distance ',
                [ minX, maxX, minY, maxY ]
            )
            .catch(_handleMySQLError)
            .then(starData => {
                const stars = [];

                starData.forEach(_starData => {
                    // Ensure the star is in range
                    if (_starData.distance <= distance) {
                        const star = new Star({ create: true, data: _starData });
                        stars.push(star);
                    }
                });

                return stars;
            });
        },
        generateSystem() {
            return new Promise((resolve, reject) => {
                const numPlanets = Math.floor(Star.MAX_NUMBER_OF_PLANETS * Math.random());
                const planets = [];

                for (let i = 0; i < numPlanets; i++) {
                    const type = Math.floor(Math.random() * 10) + 1;
                    const distance = Math.random();
                    const planet = new Planet({ create: true, data: { type, distance } });
                    planets.push(planet);
                }

                resolve(planets);
            });
        },
    },
    Planet: {
         getById(id) {
            return new Promise((resolve, reject) => {
                const planet = new Planet({ create: true, data: { id } });
                resolve(planet);
            })
        },
    },
    Ship: {
        getById(id) {
            return new Promise((resolve, reject) => {
                const ship = new Ship({ create: true, data: { id } });
                resolve(ship);
            })
        },
    },
};

// Error handler
function _handleMySQLError(error) {
    console.log('MySQL error', error);

    return Promise.reject({
        error
    });
}



// Exports

function get(type) {
    if (type) {
        return _interface[type];
    }
    
    return _interface;
}

module.exports = {
    get,
};