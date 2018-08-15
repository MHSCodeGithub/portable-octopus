
// # Majors

exports.Player = require('./classes/player');
exports.Kingdom = require('./classes/kingdom');
exports.Treasury = require('./classes/treasury');
exports.Harbour = require('./classes/harbour');

// # Producer(s)

exports.Producer = require('./classes/producer');
exports.producers.Bakery = require('./classes/producers/bakery');
exports.producers.Butcher = require('./classes/producers/butcher');
exports.producers.CottonMill = require('./classes/producers/cotton_mill');
exports.producers.Farm = require('./classes/producers/farm');
exports.producers.Mill = require('./classes/producers/mill');

// # Database

exports.database = require('../database');
