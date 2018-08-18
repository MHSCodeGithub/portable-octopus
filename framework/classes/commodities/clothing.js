
const Commodity = require('../commodity');

/*
 * <---> # Clothing class # <--->
 */

class Clothing extends Commodity {
  constructor(id) {
    super(id, "clothing", "textile");
  }
}

module.exports = Clothing;
