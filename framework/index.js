
// # Majors

exports.Player = require('./classes/player');
exports.Kingdom = require('./classes/kingdom');
exports.Treasury = require('./classes/treasury');
exports.Harbour = require('./classes/harbour');

// # Producer(s)

exports.Producer = require('./classes/producer');
exports.producers = {};
exports.producers.Bakery = require('./classes/producers/bakery');
exports.producers.Blacksmith = require('./classes/producers/blacksmith');
exports.producers.Butchery = require('./classes/producers/butchery');
exports.producers.CottonMill = require('./classes/producers/cotton_mill');
exports.producers.Farm = require('./classes/producers/farm');
exports.producers.Mine = require('./classes/producers/mine');
exports.producers.Mill = require('./classes/producers/mill');

// # Database

exports.database = require('../database');
