
const Commodity = require('../commodity');

/*
 * <---> # Beef class # <--->
 */

class Beef extends Commodity {
  constructor(id) {
    super(id, "beef", "food");
  }
}

module.exports = Beef;
