
const framework = require('./framework');

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
    if(items[i].name == name) { return items[i]; } // if producer fits parameters
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
    if(items[i].id == id) { return items[i]; } // if producer fits parameters
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
    if(acc.kingdom.producers[i].id > current) { current = acc.kingdom.producers[i].id } // if target ID is the largest seen set current to that ID
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
    if(framework.database.read().orders[i].id > current) { current = framework.database.read().orders[i].id } // if target ID is the largest seen set current to that ID
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

/**
 *
 * @function exports.setup()
 *
 * @param {Express} app
 *
 * @param {Object} gets
 *
 * @description sets listeners for front end API calls and responds accordingly
 *
 **/

exports.setup = function (app, gets) { // when the API is setup
  app.get("/api/get/:type", function (req, res) { // when a simple API get is called
    var type = req.params.type; // find the type of get needed
    console.log("--- ## API Get ## ---");
    console.log(type);

    if(gets[type]) { res.send(gets[type]);  } // if the get type is known return with the pre-defined static value
    else if(type == "orders") { res.send(framework.database.getOrders()); } // if the get type is a pre-defined get, but has a dynamic response (specifically 'orders')
    else           { res.send({type: "error", data: "No API Answer, please contact developers!"}); } // if the get type is unkown return an error
  });

  app.post("/api/send/:type", function (req, res) { // when a API post with incoming data is called
    var type = req.params.type; // determine post type
    var data = req.body; // determine sent data
    console.log("--- ## API Post ## ---");
    console.log(type);
    console.log(data);

    if(type == "buy-producer") {

      var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account to check validity and get the real account
      if(testAcc.check()) { // check the validity of the account and fill in the real accounts data
        var kingdom = testAcc.kingdom; // get the
        var current = getNextIDOfProducers(testAcc); // get the next producer ID
        var result = getItemByID(data.target); // get the database defaults for the producer the user wants to buy

        if(result) { // if the target producer exists
          console.log(result);

          // set producer defaults
          var price;
          var producer;

          switch (result.name) {
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

          if((testAcc.kingdom.treasury.balance - price) < 0) {
            res.send({type: "error", data: "You do not have enough money!"});
            return;
          }

          testAcc.charge(price);
          kingdom.producers.push(producer);

          testAcc.kingdom = kingdom;

          testAcc.update();
          res.send("Updated!")
        } else {
          res.send({type: "error", data: "Invalid Item!"})
        }
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "get-map") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {
        var kingdom = testAcc.toJSON(testAcc).kingdom;

        var target = kingdom.producers;
        target.push(kingdom.treasury);
        target.push(kingdom.harbour);

        res.send(kingdom.producers);
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "get-commodities") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {
        var data = framework.database.getCommodities();

        for (var i = 0; i < data.length; i++) {
          data[i].amount = testAcc.getCommodityAmount(data[i].id);
        }

        res.send(data);
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "upgrade-producer") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {


        for (var i = 0; i < testAcc.kingdom.producers.length; i++) {
          if(testAcc.kingdom.producers[i].id == data.target) {
            var items = framework.database.getItems();

            var name = testAcc.kingdom.producers[i].type;

            if(testAcc.kingdom.producers[i].subType) { name = testAcc.kingdom.producers[i].subType + " " + name; }

            name = cleanStr(name);

            console.log("Name;");
            console.log(name);

            for (var k = 0; k < items.length; k++) {
              if(items[k].name == name) {
                var price = items[k].price * (testAcc.kingdom.producers[i].level+1);
                console.log("price: ");
                console.log(items[k]);
                console.log(testAcc.kingdom.producers[i]);
                console.log(price);
                if(testAcc.kingdom.treasury.balance - price < 0) {
                  res.send({type: "error", data: "You do not have enough money!"});
                  return;
                } else {
                  testAcc.kingdom.producers[i].upgrade();
                  testAcc.charge(price);
                  testAcc.update();
                  res.send("Updated!");
                  return;
                }
              }
            }
          }
        }

        res.send({type: "error", data: "Request for non-existant producer, please contact developers!"});
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "sell-producer") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {

        for (var i = 0; i < testAcc.kingdom.producers.length; i++) {
          if(testAcc.kingdom.producers[i].id == data.target) {
            var items = framework.database.getItems();

            for (var k = 0; k < items.length; k++) {
              if(items[k].id == data.target) {
                var price = (items[k].price * testAcc.kingdom.producers[i].level)/2;

                testAcc.kingdom.producers[i].upgrade();
                testAcc.charge(-price);
                testAcc.kingdom.producers.splice(i, 1);
                testAcc.update();
                res.send("Updated!");
                return;
              }
            }
          }
        }

        res.send({type: "error", data: "Request for non-existant producer, please contact developers!"});
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "get-balance") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {
        res.send({data: testAcc.kingdom.treasury.balance});
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "create-order") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {
        delete data.password;
        data.author = data.username;
        delete data.username;
        data.id = getNextIDOfOrders();

        data.fulfillment = 0;

        framework.database.addOrder(data);
        res.send("OK");
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "cancel-order") {

      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {
        var db = framework.database.read();
        for (var i = 0; i < db.orders.length; i++) {
          if(db.orders[i].id == data.targetID) {
            db.orders.splice(i, 1);
          }
        }

        framework.database.write(db);
        res.send("OK");
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "get-order") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {
        res.send(framework.database.getOrder(Number(data.id)));
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "fulfill-order") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {
        var order = framework.database.getOrder(Number(data.id));

        var otherAccount = framework.database.getAccount(order.author);
        var other = new framework.Player(0, otherAccount.username, otherAccount.password, null, true);
        if(other.check()) {

          console.log(order);
          if(order.type == "sell") {
            var balance = testAcc.kingdom.treasury.balance;

            if(balance >= order.price*data.amount) {
              if(other.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount >= Number(data.amount)) {
                testAcc.charge(order.price*data.amount);
                other.pay(order.price*data.amount);

                testAcc.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount += Number(data.amount);
                other.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount -= Number(data.amount);
                res.send("SUCCESS!")
              } else {
                res.send({type: "error", data: "Seller does not have enough commodities to sell!"})
              }
            } else {
              res.send({type: "error", data: "Not Enough Money in Balance!"})
            }
          } else if(order.type == "buy") {
            var balance = other.kingdom.treasury.balance;

            if(balance >= order.price*data.amount) {
              if(testAcc.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount >= Number(data.amount)) {
                other.charge(order.price*data.amount);
                testAcc.pay(order.price*data.amount);

                other.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount += Number(data.amount);
                testAcc.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount -= Number(data.amount);
                res.send("SUCCESS!")
              } else {
                res.send({type: "error", data: "You do not have enough commodities to sell!"})
              }
            } else {
              res.send({type: "error", data: "Not Enough Money in Seller's Balance!"})
            }
          }
          var db = framework.database.read();

          for (var i = 0; i < db.orders.length; i++) {
            if(db.orders[i].id == data.id) {
              db.orders[i].fulfillment += Number(data.amount);
              if(db.orders[i].fulfillment == Number(db.orders[i].amount)) {
                db.orders.splice(i, 1);
              }
            }
          } framework.database.write(db);

          other.update()
          testAcc.update()
        } else {
          res.send({type: "error", data: "Author of Order Does Not Exist!"})
        }
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "get-producer") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {


        for (var i = 0; i < testAcc.kingdom.producers.length; i++) {
          if(testAcc.kingdom.producers[i].id == data.target) {
            res.send(testAcc.toJSON(testAcc).kingdom.producers[i]);
            return;
          }
        }

        res.send({type: "error", data: "Request for non-existant producer, please contact developers!"});
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else if(type == "get-yeild") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {


        for (var i = 0; i < testAcc.kingdom.producers.length; i++) {
          if(testAcc.kingdom.producers[i].id == data.target) {
            res.send({val: testAcc.kingdom.producers[i].yeild()});
            return;
          }
        }

        res.send({type: "error", data: "Request for non-existant producer, please contact developers!"});
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else { res.send({type: "error", data: "No API Answer, please contact developers!"}); }
  });
}
