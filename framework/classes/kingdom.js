
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
    this.map = [];
    for (var i = 0; i < 20; i++) {
      this.map.push([]);
      for (var j = 0; j < 20; j++) {
        this.map[i].push("empty");
      }
    }
  }

}

module.exports = Kingdom;
