
const Objectable = require('./objectable');

/*
 * <---> # Treasury class # <--->
 */

class Treasury extends Objectable {
  constructor(id, kingdom) {
    super();
    this.id = id;
    this.kingdom = kingdom;
  }
}

module.exports = Treasury;
