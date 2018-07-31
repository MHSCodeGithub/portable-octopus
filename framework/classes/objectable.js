
/*
 * <---> # Objectable class # <--->
 * Allows classes to be turned into objects.
 */

class Objectable {
  constructor() {
    this.toJSON = function () {
      var jsonedObject = {};
      for (var x in this) {

        if (x === "toJSON" || x === "constructor" || typeof this[x] === 'function') {
          continue;
        }
        jsonedObject[x] = this[x];
      }
      return jsonedObject;
    }
  }
}

module.exports = Objectable;
