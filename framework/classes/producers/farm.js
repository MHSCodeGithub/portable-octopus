
const Producer = require('../producer');

/*
 * <---> # Farm class # <--->
 */

class Farm extends Producer {
  constructor(id, owner) {
    super(id, owner);
  }
}

module.exports = Producer;
