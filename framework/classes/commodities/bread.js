
const Commodity = require('../commodity');

/*
 * <---> # Bread class # <--->
 */

class Bread extends Commodity {
  constructor(id) {
    super(id, "bread", "food");
  }
}

module.exports = Bread;
