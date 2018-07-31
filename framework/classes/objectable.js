
/*
 * <---> # Objectable class # <--->
 * Allows classes to be turned into objects.
 */

class Objectable {
  constructor() {
    /*this.toJSON = function (proto) {
      let jsoned = {};
      let toConvert = proto || this;
      Object.getOwnPropertyNames(toConvert).forEach((prop) => {
        const val = toConvert[prop];
        // don't include those
        if (prop === 'toJSON' || prop === 'constructor') {
          return jsoned;
        }
        if (typeof val === 'function') {
          // jsoned[prop] = val.bind(jsoned);
          return jsoned;
        }
        jsoned[prop] = val;
      });

      const inherited = Object.getPrototypeOf(toConvert);
      if (inherited !== null) {
        Object.keys(this.toJSON(inherited)).forEach(key => {
          if (!!jsoned[key] || key === 'constructor' || key === 'toJSON')
            return jsoned;
          if (typeof inherited[key] === 'function') {
            // jsoned[key] = inherited[key].bind(jsoned);
            return jsoned;
          }
          jsoned[key] = inherited[key];
        });
      }
      return jsoned;
    }*/
  }
}

module.exports = Objectable;
