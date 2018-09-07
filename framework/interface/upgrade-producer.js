
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

exports.upgradeProducer = function (data, req, res) {
  var testAcc = new framework.Player(0, data.username, data.password, null, true);
  if (testAcc.check()) { // validate the user's account

    for (var i = 0; i < testAcc.kingdom.producers.length; i++) { // go through the user's producers
      if (testAcc.kingdom.producers[i].id == data.target) { // if the selected producer is the producer the user wants to upgrade
        var items = framework.database.getItems(); // get all producer templates

        var name = testAcc.kingdom.producers[i].type; // get the name of the target producer

        if (testAcc.kingdom.producers[i].subType) {
          name = testAcc.kingdom.producers[i].subType + " " + name;
        }

        name = cleanStr(name); // clean the name of the producer to make user friendly

        for (var k = 0; k < items.length; k++) { // for each producer template
          if (items[k].name == name) { // find the correct template
            var price = items[k].price * (testAcc.kingdom.producers[i].level + 1); // generate the price of upgrade

            if (testAcc.kingdom.treasury.balance - price < 0) { // check if the user has enough money
              res.send({
                type: "error",
                data: "You do not have enough money!"
              });
              return;
            } else { // if the user has enough money
              testAcc.kingdom.producers[i].upgrade(); // upgrade the target producer
              testAcc.charge(price); // charge the user for the upgrade
              testAcc.update(); // update the user's account in db
              res.send("Updated!");
              return;
            }
          }
        }
      }
    }

    res.send({
      type: "error",
      data: "Request for non-existant producer, please contact developers!"
    });
  } else {
    res.send({
      type: "error",
      data: "Invalid Username/Password"
    })
  }
};
