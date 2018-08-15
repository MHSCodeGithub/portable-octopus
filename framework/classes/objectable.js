
/*
 * <---> # Objectable class # <--->
 * Allows classes to be turned into objects.
 */

class Objectable {
  constructor() {
    this.toJSON = function (target, type) {
      if(type == undefined) { type = {}; }
      var jsonedObject = type;
      for (var x in target) {
        try {
          if((target[x].constructor !== Array && typeof target[x] == "object")) {
            jsonedObject[x] = this.toJSON(target[x]);
          } else if (x === "toJSON" || x === "constructor" || typeof target[x] === 'function') {
            continue;
          } else if(target[x].constructor === Array) {
            jsonedObject[x] = this.toJSON(target[x], []);
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
