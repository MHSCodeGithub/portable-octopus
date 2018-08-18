
const Commodity = require('../commodity');

/*
 * <---> # Wheat class # <--->
 */

class Wheat extends Commodity {
  constructor(id) {
    super(id, "wheat", "food");
  }
}

module.exports = Wheat;
