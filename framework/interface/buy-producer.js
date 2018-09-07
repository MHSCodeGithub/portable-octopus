
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

exports.buyProducer = function (data, req, res) {
  var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account to check validity and get the real account
  if (testAcc.check()) { // check the validity of the account and fill in the real accounts data
    var kingdom = testAcc.kingdom; // get the
    var current = getNextIDOfProducers(testAcc); // get the next producer ID
    var result = getItemByID(data.target); // get the database defaults for the producer the user wants to buy

    if (result) { // if the target producer exists
      console.log(result);

      // set producer defaults
      var price;
      var producer;

      switch (result.name) { // go though switch statement to determine the target producer
        case "Gold Mine":
          producer = new framework.producers.Mine(current, "gold", Number(data.x), Number(data.y));

          price = getItem("Gold Mine").price;
          break;
        case "Iron Mine":
          producer = new framework.producers.Mine(current, "iron", Number(data.x), Number(data.y));

          price = getItem("Iron Mine").price;
          break;
        case "Gem Mine":
          producer = new framework.producers.Mine(current, "gem", Number(data.x), Number(data.y));

          price = getItem("Gem Mine").price;
          break;
        case "Wheat Farm":
          producer = new framework.producers.Farm(current, "wheat", Number(data.x), Number(data.y));

          price = getItem("Wheat Farm").price;
          break;
        case "Hop Farm":
          producer = new framework.producers.Farm(current, "hop", Number(data.x), Number(data.y));

          price = getItem("Hop Farm").price;
          break;
        case "Grape Farm":
          producer = new framework.producers.Farm(current, "grape", Number(data.x), Number(data.y));

          price = getItem("Grape Farm").price;
          break;
        case "Brewery":
          producer = new framework.producers.Brewery(current, Number(data.x), Number(data.y));

          price = getItem("Brewery").price;
          break;
        case "House":
          producer = new framework.producers.House(current, Number(data.x), Number(data.y), 5);

          price = getItem("House").price;
          break;
        case "Winery":
          producer = new framework.producers.Winery(current, Number(data.x), Number(data.y));

          price = getItem("Winery").price;
          break;
        case "Cotton Farm":
          producer = new framework.producers.Farm(current, "cotton", Number(data.x), Number(data.y));

          price = getItem("Cotton Farm").price;
          break;
        case "Wood Farm":
          producer = new framework.producers.Farm(current, "wood", Number(data.x), Number(data.y));

          price = getItem("Wood Farm").price;
          break;
        case "Quarry":
          producer = new framework.producers.Quarry(current, Number(data.x), Number(data.y));

          price = getItem("Quarry").price;
          break;
        case "Cattle Farm":
          producer = new framework.producers.Farm(current, "cattle", Number(data.x), Number(data.y));

          price = getItem("Cattle Farm").price;
          break;
        case "Mill":
          producer = new framework.producers.Mill(current, Number(data.x), Number(data.y));

          price = getItem("Mill").price;
          break;
        case "Bakery":
          producer = new framework.producers.Bakery(current, Number(data.x), Number(data.y));

          price = getItem("Bakery").price;
          break;
        case "Blacksmith":
          producer = new framework.producers.Blacksmith(current, Number(data.x), Number(data.y));

          price = getItem("Blacksmith").price;
          break;
        case "Cotton Mill":
          producer = new framework.producers.CottonMill(current, Number(data.x), Number(data.y));

          price = getItem("Cotton Mill").price;
          break;
        case "Butchery":
          producer = new framework.producers.Butchery(current, Number(data.x), Number(data.y));

          price = getItem("Butchery").price;
          break;
      }

      if ((testAcc.kingdom.treasury.balance - price) < 0) { // check that the user can afford the producer
        res.send({
          type: "error",
          data: "You do not have enough money!"
        }); // if not alert the user
        return;
      }

      testAcc.charge(price); // charge the user
      kingdom.producers.push(producer); // add the producer to the users kingdom

      testAcc.kingdom = kingdom; // update the kingdom

      testAcc.update(); // update the user to the database
      res.send("Updated!")
    } else {
      res.send({
        type: "error",
        data: "Invalid Item!"
      })
    }
  } else {
    res.send({
      type: "error",
      data: "Invalid Username/Password"
    })
  }
};
