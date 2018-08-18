
const Commodity = require('../commodity');

/*
 * <---> # Gems class # <--->
 */

class Gems extends Commodity {
  constructor(id) {
    super(id, "gems", "mineral");
  }
}

module.exports = Gems;
