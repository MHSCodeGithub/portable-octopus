
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

exports.sellProducer = function (data, req, res) {
  var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account
  if (testAcc.check()) { // validate the account
  console.log(data);

    for (var i = 0; i < testAcc.kingdom.producers.length; i++) { // for each producer that the user owns
      if (testAcc.kingdom.producers[i].id == data.target) { // if the producer matches the target's ID
        var items = framework.database.getItems(); // get all producer templates
        console.log(testAcc.kingdom.producers[i]);

        for (var k = 0; k < items.length; k++) { // match the template with the target producer
          if (items[k].name == data.type) {
            var price = (items[k].price * testAcc.kingdom.producers[i].level) / 2; // calaculate the sell price
            testAcc.kingdom.producers.splice(i, 1); // remove the producer from their kingdom
            testAcc.update();

            testAcc.charge(-price); // pay the user accordingly
            testAcc.update(); // update the actions to the db
            res.send("Updated!");
            return;
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
