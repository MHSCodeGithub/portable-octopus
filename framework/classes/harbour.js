
const Objectable = require('./objectable');

/*
 * <---> # Treasury class # <--->
 */

class Harbour extends Objectable {
  constructor(id) {
    super();
    this.id = id;
    this.health = 600;
    // TODO: Add Harbour functions
  }
}

module.exports = Harbour;
