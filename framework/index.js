
// # Majors

exports.Player = require('./classes/player');
exports.Kingdom = require('./classes/kingdom');
exports.Treasury = require('./classes/treasury');
exports.Harbour = require('./classes/harbour');

// # Producer(s)

exports.Producer = require('./classes/producer');
exports.Producers.Bakery = require('./classes/producers/bakery');
exports.Producers.Butcher = require('./classes/producers/butcher');
exports.Producers.CottonMill = require('./classes/producers/cotton_mill');
exports.Producers.Farm = require('./classes/producers/farm');
exports.Producers.Mill = require('./classes/producers/mill');

// # Database

exports.database = require('../database');
