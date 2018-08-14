
const Objectable = require('./objectable');

/*
 * <---> # Item class # <--->
 */

class Item extends Objectable {
  constructor(id, name) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.name = name;
    this.level = 0; // level of producer, determines effectiveness
  }

  upgrade() {
    this.level += 1;
  }
}

module.exports = Producer;
