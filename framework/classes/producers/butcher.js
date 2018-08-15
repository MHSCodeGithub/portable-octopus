
const Producer = require('../producer');

/*
 * <---> # Butcher class # <--->
 */

class Butcher extends Producer {
  constructor(id) {
    super(id, "butcher");
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = Butcher;
