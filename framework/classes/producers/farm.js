
const Producer = require('../producer');

/*
 * <---> # Farm class # <--->
 */

class Farm extends Producer {
  constructor(id, owner, kingdom) {
    super(id, owner, kingdom);
  }
}

module.exports = Producer;
