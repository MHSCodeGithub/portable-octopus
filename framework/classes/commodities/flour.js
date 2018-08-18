
const Commodity = require('../commodity');

/*
 * <---> # Flour class # <--->
 */

class Flour extends Commodity {
  constructor(id) {
    super(id, "flour", "food");
  }
}

module.exports = Flour;
