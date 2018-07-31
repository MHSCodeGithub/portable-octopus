
const Treasury = require('./classes/treasury');
const Harbour = require('./classes/harbour');
const Kingdom = require('./classes/kingdom');

var tre = new Treasury(0);
var har = new Harbour(0);

var king = new Kingdom(0, "island kand", tre, har);
console.log(king.toJSON(king));
