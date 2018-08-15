
/*
 * <---> # Objectable class # <--->
 * Allows classes to be turned into objects.
 */

class Objectable {
  constructor() {
    this.toJSON = function (target) {
      var jsonedObject = {};
      for (var x in target) {
        try {
          if((target[x].constructor !== Array && typeof target[x] == "object") || target[x].constructor === Array) {
            jsonedObject[x] = this.toJSON(target[x]);
          } else if (x === "toJSON" || x === "constructor" || typeof target[x] === 'function') {
            continue;
          } else {
            jsonedObject[x] = target[x];
          }
        } catch (e) {
          console.log("## ERR IN OBJECTABLE ##");
        }
      }
      return jsonedObject;
    }
  }
}

module.exports = Objectable;
