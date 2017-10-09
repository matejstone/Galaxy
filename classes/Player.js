const BaseObject = require('classes/BaseObject');

const _defaultValues = {
    type: 'player',
    id: 0,
    name: 'Player Name',
    email: 'none@email.none',
    ship_id: 1,
};

class Player extends BaseObject {
    constructor(params) {
        params.data = Object.assign(_defaultValues, params.data);
        super(params);
    }

    load(type) {
        if (type === 'ship') {
            return this.interface.Ship.getById(this.ship_id)
            .then(ship => {
                this.ship = ship;
                ship.player = this;
                return ship;
            });
        }
    } 
}

module.exports = Player;
