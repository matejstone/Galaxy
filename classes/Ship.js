const BaseObject = require('classes/BaseObject');

const _defaultValues = {
    type: 'ship',
    id: 0,
    name: 'ShipName SN-001',
    status: 'idle',
    star: null,
    star_id: 270,
    _player: null,
};

class Ship extends BaseObject {
    constructor(params) {
        params.data = Object.assign(_defaultValues, params.data);
        super(params);
    }

    load(type) {
        if (type === 'star') {
            return this.interface.Star.getById(this.star_id)
            .then(star => {
                this.star = star;
                return this;
            });
        }
        else if (type === 'stars-in-scan-range') {
            if (!this.star) {
                return Promise.reject('Star was not loaded.');
            }

            return this.interface.Star.getByDistanceFromCoord(this.star.x, this.star.y, this.scanRange)
            .then(nearbyStars => {
                const starIds = [];
                nearbyStars.forEach(star => {
                    starIds.push(star.id);
                });
                this.stars_in_scan_range = nearbyStars;
                this.stars_in_scan_range_ids = starIds;
                return this;
            });
        }
        else if (type === 'stars-in-jump-range') {
            return new Promise((resolve, reject) => {
                if (this.stars_in_scan_range) {
                    const stars = [];

                    this.stars_in_scan_range.forEach(star => {
                        if (star.distance <= this.jumpRange) {
                            stars.push(star);
                        }
                    });

                    resolve(stars);
                }
                else {
                    resolve(this.interface.Star.getByDistanceFromCoord(this.star.x, this.star.y, this.jumpRange));
                }
            })
            .then(nearbyStars => {
                const starIds = [];
                nearbyStars.forEach(star => {
                    starIds.push(star.id);
                });
                this.stars_in_jump_range = nearbyStars;
                this.stars_in_jump_range_ids = starIds;

                return this;
            });
        }
        else if (type === 'stars-scanned-ids') {
            return this.interface.Player.getScannedIdsFromListOfStarIds(this.stars_in_scan_range_ids, this.player.id)
            .then(starIds => {
                this.stars_in_scan_range.forEach(star => {
                    if (starIds.indexOf(star.id) != -1) {
                        console.log('star with ID ', star.id, 'has been scanned');
                        star.is_scanned = true;
                    }
                });
                return this;
            });
        }
        else {
            console.log(`Attempted to load an unsupported type ('${type}')`);
            return Promise.resolve(this);
        }
    }

    get player() {
        return this._player;
    }

    set player(value) {
        this._player = value;
    }

    get jumpRange() {
        return 10;
    }

    get scanRange() {
        return 20;
    }
}

module.exports = Ship;
