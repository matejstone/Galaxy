const mysql = require('promise-mysql');
const DB_CONFIG = require('./../config/database').config;

function Database() {
    return mysql.createPool(DB_CONFIG);
}

module.exports = Database;
