const BaseObject = require('classes/BaseObject');
const PLANET_CONFIG = require('config/planets');

const _defaultValues = {
    type: 'planet',
    id: 0,
    name: 'Planet Name',
    star_id: 0,
    type: 0,
    distance: 0.0,
};

class Planet extends BaseObject {
    constructor(params) {
        params.data = Object.assign(_defaultValues, params.data);
        super(params);
    }

    get type_name() {
        return PLANET_CONFIG.PLANET_TYPES[this.type].name;
    }

    get description() {
        return PLANET_CONFIG.PLANET_TYPES[this.type].description;
    }

    get orbitalTime() {
        return _calculateTimeFromDistance(this.distance);
    }

    get orbitalDistance() {
        const DISTANCE_DIFF = PLANET_CONFIG.PLANET_DISTANCE.MAX - PLANET_CONFIG.PLANET_DISTANCE.MIN;
        return this.distance * DISTANCE_DIFF + PLANET_CONFIG.PLANET_DISTANCE.MIN;
    }

    get orbitalPosition() {
        const maxTime = _calculateTimeFromDistance(1);
        return _calculateOrbitalPosition(maxTime);
    }
}

function _calculateTimeFromDistance(distance) {
    const MIN_DISTANCE = PLANET_CONFIG.PLANET_DISTANCE.MIN;
    const MAX_DISTANCE = PLANET_CONFIG.PLANET_DISTANCE.MAX;

    const DISTANCE_DIFF = MAX_DISTANCE - MIN_DISTANCE;
    const DISTANCE_CURRENT = distance * DISTANCE_DIFF + MIN_DISTANCE;

    const MIN_TIME = PLANET_CONFIG.PLANET_ORBITAL_TIME.MIN;
    const MAX_TIME = PLANET_CONFIG.PLANET_ORBITAL_TIME.MAX;

    const time = (((MAX_TIME - MIN_TIME) / DISTANCE_DIFF) * DISTANCE_CURRENT) + MIN_TIME - ((MIN_DISTANCE * (MAX_TIME - MIN_TIME) / DISTANCE_DIFF));

    return Math.floor(time);
}

function _calculateOrbitalPosition(maxOrbitalTime) {
    return Math.floor(Math.random() * (maxOrbitalTime * 2)) + 1;
}

module.exports = Planet;
