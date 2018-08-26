
const Objectable = require('./objectable');

/*
 * <---> # Kingdom class # <--->
 */

class Kingdom extends Objectable {
  constructor(id, name, treasury, harbour) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.name = name; // string name
    this.treasury = treasury; // treasury owned by kingdom
    this.producers = []; // array of producers
    this.harbour = harbour; // harbour that connects kingdom to market
  }

  getCitizens() {
    var citizens = 0;
    for (var i = 0; i < this.producers.length; i++) {
      if(this.producers[i].type == "house") {
        citizens += this.producers[i].citizens;
      }
    }
    return citizens;
  }
}

module.exports = Kingdom;
