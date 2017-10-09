const _defaultValues = {
    type: 'baseobject',
};

class BaseObject {
    constructor(params) {
        if (params.create) {
            Object.assign(this, params.data);
        }

        this.interface = require('modules/Interface').get();
    }
}

module.exports = BaseObject;