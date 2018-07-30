
const Objectable = require('./objectable');

/*
 * <---> # Island class # <--->
 */

class Island extends Objectable {
  constructor(id, owner) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.owner = owner; // player class
  }
}

module.exports = Island;