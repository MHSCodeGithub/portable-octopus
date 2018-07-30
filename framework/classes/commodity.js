
const Objectable = require('./objectable');

/*
 * <---> # Producer class # <--->
 */

class Commodity extends Objectable {
  constructor(id, name, type) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.value = 0; // value of commodity
    this.name = name; // name of commodity
    this.type = type; // type of commodity (used for sorting)
  }
}

module.exports = Commodity;
