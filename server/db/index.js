// Gathering all the models here so they're easier to require elsewhere.
const db = require('./db');

require('./models');

module.exports = db;
