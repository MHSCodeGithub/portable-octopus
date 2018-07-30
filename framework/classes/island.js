
const Objectable = require('./objectable');

/*
 * <---> # Island class # <--->
 */

class Island extends Objectable {
  constructor(id, owner, kingdom) {
    super(); // load Objectable class
    this.id = id; // unique integer id (starts at 0)
    this.owner = owner; // player class
    this.kingdom = kingdom; // player class
    // TODO: Work out resource system
    // TODO: Add Island functions
  }
}

module.exports = Island;
