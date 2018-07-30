
const Objectable = require('./objectable');

/*
 * <---> # Kingdom class # <--->
 */

class Kingdom extends Objectable {
  constructor(id, name, treasury) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.name = name; // string name
    this.treasury = treasury; // treasury owned by kingdom
    // TODO: Add kingdom functions
  }
}

module.exports = Producer;
