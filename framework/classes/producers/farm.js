
const Producer = require('../producer');

/*
 * <---> # Farm class # <--->
 */

class Farm extends Producer {
  constructor(id, owner, kingdom) {
    super(id, owner, kingdom);

    console.log(this.id);
  }
}

module.exports = Producer;
