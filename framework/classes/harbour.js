
const Objectable = require('./objectable');

/*
 * <---> # Treasury class # <--->
 */

class Harbour extends Objectable {
  constructor(id, kingdom) {
    super();
    this.id = id;
    this.kingdom = kingdom;
  }
}

module.exports = Harbour;
