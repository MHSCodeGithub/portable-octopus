
const Objectable = require('./objectable');

/*
 * <---> # Treasury class # <--->
 */

class Treasury extends Objectable {
  constructor(kingdom) {
    super();
    this.kingdom = kingdom;
  }
}

module.exports = Treasury;
