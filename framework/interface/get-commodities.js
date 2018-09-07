
const framework = require('../');


/**
 *
 * @function getItem()
 *
 * @param {String} name
 *
 * @description returns the specified item, if it does not exist, it return false
 *
 **/

function getItem(name) {
  var items = framework.database.getItems(); // get all producers from database

  for (var i = 0; i < items.length; i++) { // for each producer in db
    if (items[i].name == name) {
      return items[i];
    } // if producer fits parameters
  }

  return false;
}

/**
 *
 * @function getItem()
 *
 * @param {Number} id
 *
 * @description returns the specified item, if it does not exist, it return false
 *
 **/

function getItemByID(id) {
  var items = framework.database.getItems(); // get all producers from database

  for (var i = 0; i < items.length; i++) { // for each producer in db
    if (items[i].id == id) {
      return items[i];
    } // if producer fits parameters
  }

  return false;
}

/**
 *
 * @function getNextIDOfProducers()
 *
 * @param {Account} acc
 *
 * @description returns the highest ID + 1 from the latest account's producer
 *
 **/

function getNextIDOfProducers(acc) {
  current = -1;
  for (var i = 0; i < acc.kingdom.producers.length; i++) { // for each producer in accounts kingdom
    if (acc.kingdom.producers[i].id > current) {
      current = acc.kingdom.producers[i].id
    } // if target ID is the largest seen set current to that ID
  }
  return current + 1; // return the highest ID + 1
}

/**
 *
 * @function getNextIDOfOrders()
 *
 * @description returns the ID + 1 from the latest order
 *
 **/

function getNextIDOfOrders() {
  current = -1;
  for (var i = 0; i < framework.database.read().orders.length; i++) { // for each order in db
    if (framework.database.read().orders[i].id > current) {
      current = framework.database.read().orders[i].id
    } // if target ID is the largest seen set current to that ID
  }
  return current + 1; // return the highest ID + 1
}

/**
 *
 * @function capitalizeFirstLetter()
 *
 * @param {String} string
 *
 * @description returns the specified string however the first character is capitalized
 *
 **/

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @function capitalizeFirstLetter()
 *
 * @param {String} string
 *
 * @description returns the specified string however the first character is capitalized
 *
 **/

function cleanStr(string) {
  string = string.replace("_", " "); // replace all underscores with spaces

  var words = string.split(" "); // split all words up

  for (var i = 0; i < words.length; i++) { // for each word
    words[i] = capitalizeFirstLetter(words[i]); // capitalize the first letter of the word and update the word list
  }

  string = words.join(" "); // join the words back into a sentence

  return string;
}

exports.getCommodities = function (data, req, res) {
  var testAcc = new framework.Player(0, data.username, data.password, null, true);
  if (testAcc.check()) { // the the account is valid
    var data = framework.database.getCommodities(); // all commodity templates

    for (var i = 0; i < data.length; i++) { // for each commodity template
      data[i].amount = testAcc.getCommodityAmount(data[i].id); // set the amount of each commodity

      resourceProduction = 0; // create counter

      for (var j = 0; j < testAcc.kingdom.producers.length; j++) { // for each producer in user's kingdom
        if(testAcc.kingdom.producers[j].functioning) {
          if(cleanStr(testAcc.kingdom.producers[j].produce) == data[i].name) { // if it produces target commodity
            resourceProduction += testAcc.kingdom.producers[j].yeild() * 12; // update total production
          }
        }
      }

      data[i].production = resourceProduction; // update production to display front end
    }

    res.send(data); // send the users commodities w/amounts
  } else {
    res.send({
      type: "error",
      data: "Invalid Username/Password"
    })
  }
};
