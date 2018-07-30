
const Objectable = require('./objectable');

/*
 * <---> # Kingdom class # <--->
 */

class Kingdom extends Objectable {
  constructor(id, name, password) {
    this.id = id; // unique integer id (starts at 0)
    this.name = name; // string name
  }
}

module.exports = Producer;
