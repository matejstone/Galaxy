const BaseObject = require('classes/BaseObject');
const STAR_CONFIG = require('config/stars');

const _defaultValues = {
    _name: '',
    type: 'star',
    id: 0,
    class: 'U',
    generated: 0,
    planets: [],
};

class Star extends BaseObject {
    constructor(params) {
        params.data = Object.assign(_defaultValues, params.data);
        super(params);
    }

    get name() {
        if (!this._name) {
            return `P${this.class}-${this.x}-${this.y}`;
        }

        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    generateSystem() {
        return this.interface.Star.generateSystem()
        .then(planets => {
            this.generated = 1;
            this.planets = planets;
            return this;
        });
          
    }

    static get NUMBER_OF_PLANETS() {
        return STAR_CONFIG.NUMBER_OF_PLANETS;
    }
}

module.exports = Star;
