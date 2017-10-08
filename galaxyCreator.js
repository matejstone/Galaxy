const fs = require('fs');
const pureimage = require('pureimage');
const Color = require('color');

/****************************************************
* Configurable Settings
*****************************************************/

// Galaxy
const GALAXY_NUMBER_OF_STARS = 3000;

const GALAY_IS_SPIRAL = true;
// Spiral galaxy settings
const GALAXY_NUMBER_OF_ARMS = 3;
const GALAXY_ARM_OFFSET_MAX = 1.6;
const GALAXY_ROTATION_FACTOR = 6;

const GALAXY_RANDOM_OFFSET_XY = 10;

// Size
const GALAXY_WIDTH = 500;
const GALAXY_HEIGHT = GALAXY_WIDTH;

// Output Image
const IMAGE_FILENAME = 'galaxy.png';
const IMAGE_PADDING = 200;

// Star Configuration
const STAR_TYPES = {
    M: {
        color: Color.rgb(252, 152, 30),
        // temperature: {
        //     min: 0,
        //     max: 0,
        // },
        // brightness: {
        //     min: 0,
        //     max: 0,
        // },
        // mass: {
        //     min: 0,
        //     max: 0,
        // },
        // brightness: {
        //     min: 0,
        //     max: 0,
        // },
    },
    K: {
        color: Color.rgb(252, 185, 103),
    },
    G: {
        color: Color.rgb(255, 230, 43),
    },
    F: {
        color: Color.rgb(255, 245, 170),
    },
    A: {
        color: Color.rgb(255, 255, 255),
    },
    B: {
        color: Color.rgb(163, 221, 255),
    },
    O: {
        color: Color.rgb(34, 170, 249),
    },
};

/****************************************************
* Computed Settings
*****************************************************/
const GALAXY_WIDTH_HALF = GALAXY_WIDTH / 2;
const GALAXY_HEIGHT_HALF = GALAXY_HEIGHT / 2;

const GALAXY_ARM_SEPARATION_DISTANCE = 2 * Math.PI / GALAXY_NUMBER_OF_ARMS;

const IMAGE_WIDTH = GALAXY_WIDTH + IMAGE_PADDING;
const IMAGE_HEIGHT = GALAXY_HEIGHT + IMAGE_PADDING;

/****************************************************
* Functions
*****************************************************/
run();

function run() {
    new Promise((resolve, reject) => {
        const starsData = getStars();
        resolve(starsData);
    })
    .then(drawStarsOnImage)
}

function getStarsAndWriteImage() {
    const starsData = getStars();
    drawStarsOnImage(starsData);
}

function getStars() {
    const stars = [];

    for(let i = 0; i < GALAXY_NUMBER_OF_STARS; i++) {
        stars.push(getRandomStar());
    }

    return stars;
}

function drawStarsOnImage(stars) {
    return new Promise((resolve, reject) => {
        const image = pureimage.make(IMAGE_WIDTH, IMAGE_HEIGHT);
        const ctx = image.getContext('2d');

        stars.forEach(star => {
            ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${star.brightness})`;

            ctx.fillPixel(star.position.x, star.position.y);
        });

        writeImage(image);

        resolve(stars)
    });
}

function getRandomStar() {
    const position = getStarPosition();
    const type = getStarType();
    const brightness = getStarBrightness();
    const color = getStarColorFromType(type);

    const star = {
        type,
        color,
        position,
        brightness,
    };

    return star;
}

function getStarPosition() {
    const distance = getDistance();
    const angle = getAngle(distance);

    const position = {
        angle,
        distance,
        x: getX(distance, angle),
        y: getY(distance, angle),
    };

    return position;
}

function getDistance() {
    let distance = Math.random();

    if (GALAY_IS_SPIRAL) {
        // distance = Math.pow(distance, 2);
    }

    return distance;
}

function getAngle(distance) {
    let angle = Math.random() * 2 * Math.PI;

    if (GALAY_IS_SPIRAL) {
        // Choose an angle between 0 and 2 * PI.
        let armOffset = Math.random() * GALAXY_ARM_OFFSET_MAX;
        armOffset = (armOffset - GALAXY_ARM_OFFSET_MAX / 2) * (1 / distance);

        let squaredArmOffset = Math.pow(armOffset, 2);

        if(armOffset < 0){
            squaredArmOffset = squaredArmOffset * -1;
        }

        armOffset = squaredArmOffset;

        const rotation = distance * GALAXY_ROTATION_FACTOR;

        angle = Math.floor(angle / GALAXY_ARM_SEPARATION_DISTANCE) * GALAXY_ARM_SEPARATION_DISTANCE + armOffset + rotation;
    }

    return angle;
}

function getStarType() {
    const starTypeValue = Math.random();

    if (starTypeValue < 0.60) {
        return 'M';
    }
    else if (starTypeValue < 0.75) {
        return 'K';
    }
    else if (starTypeValue < 0.85) {
        return 'G';
    }
    else if (starTypeValue < 0.9) {
        return 'F';
    }
    else if (starTypeValue < 0.95) {
        return 'A';
    }
    else if (starTypeValue < 0.99) {
        return 'B';
    }

    return 'O';
}

function getStarBrightness() {
    let alpha = 1 - Math.random() + 0.3;
    alpha = alpha > 1.0 ? 1 : alpha;
    return alpha;
}

function getStarColorFromType(type) {
    return STAR_TYPES[type].color.object();
}

function getX(distance, angle) {
    let x = ((Math.cos(angle) * distance) * GALAXY_WIDTH_HALF) + IMAGE_WIDTH / 2;
    const randomOffsetX = Math.random() * GALAXY_RANDOM_OFFSET_XY;
    x += randomOffsetX;
    return Math.floor(x);
}

function getY(distance, angle) {
    let y = ((Math.sin(angle) * distance) * GALAXY_HEIGHT_HALF) + IMAGE_HEIGHT / 2;
    const randomOffsetY = Math.random() * GALAXY_RANDOM_OFFSET_XY;
    y += randomOffsetY;
    return Math.floor(y);
}

function writeImage(image) {
    pureimage.encodePNGToStream(image, fs.createWriteStream(IMAGE_FILENAME)).then(()=> {
        console.log("wrote out the png file to " + IMAGE_FILENAME);
    }).catch((e)=>{
        console.log("there was an error writing");
    });
}