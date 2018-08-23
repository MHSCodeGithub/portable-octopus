
const Commodity = require('../commodity');

/*
 * <---> # Hop class # <--->
 */

class Hop extends Commodity {
  constructor(id) {
    super(id, "hop", "food");
  }
}

module.exports = Hop;
