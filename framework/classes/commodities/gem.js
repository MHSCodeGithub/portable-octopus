
const Commodity = require('../commodity');

/*
 * <---> # Gem class # <--->
 */

class Gem extends Commodity {
  constructor(id) {
    super(id, "gem", "mineral");
  }
}

module.exports = Gem;
