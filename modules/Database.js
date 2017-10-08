const mysql = require('promise-mysql');
const DB_CONFIG = require('./../config/database').config;

function Database() {
    const pool = mysql.createPool(settings);
    return pool;
}

module.exports = Database;
