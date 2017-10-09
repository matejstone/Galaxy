const PLANET_TYPES = {
    1: {
        name: 'Terrestrial',
        description: 'A planet composed primarily of carbonaceous or silicate rocks or metals',
    },
    2: {
        name: 'Protoplanet',
        description: 'A body in the process of becoming a planet',
    },
    3: {
        name: 'Ocean',
        description: 'A planet consisting mostly out of water',
    },
    4: {
        name: 'Lava',
        description: 'A planet covered almost entirely in lava',

    },
    5: {
        name: 'Iron',
        description: 'A planet consisting primarily of an iron core with no mantle',
    },
    6: {
        name: 'Ice',
        description: 'A planet with an icy surface with a global cryosphere',
    },
    7: {
        name: 'Gas Giant',
        description: 'A massive planet composed primarily of hydrogen and helium',
    },
    8: {
        name: 'Gas Dwarf',
        description: 'A low-mass planet composed primarily of hydrogen and helium',
    },
    9: {
        name: 'Desert',
        description: 'A dusty planet with virtually no water',
    },
    10: {
        name: 'Ice Giant',
        description: 'A giant planet covered in a form of ice',
    },
};

const PLANETS_PER_STAR = 6;
const PLANET_ORBITAL_TIME = {
    MIN: 3,
    MAX: 300,
};

const PLANET_DISTANCE = {
    MIN: 10,
    MAX: 65,
}

module.exports = {
    PLANET_TYPES,
    PLANETS_PER_STAR,
    PLANET_ORBITAL_TIME,
    PLANET_DISTANCE,
};