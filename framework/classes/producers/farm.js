
const Producer = require('../producer');

/*
 * <---> # Farm class # <--->
 */

class Farm extends Producer {
  constructor(id, type, x, y) {
    if(type == "cattle") { super(id, "farm", x, y, "beef"); }
    else                 { super(id, "farm", x, y, type);   }
    this.growth = 0;
    this.subType = type;
  }

  yeild() {
    return this.level * 4;
  }
}

module.exports = Farm;
