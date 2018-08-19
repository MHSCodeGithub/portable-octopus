
const framework = require('./framework');

function isItemName(name) {
  var items = framework.database.getItems();

  for (var i = 0; i < items.length; i++) {
    if(items[i].name == name) { return items[i]; }
  }

  return false;
}


function isItem(id) {
  var items = framework.database.getItems();

  for (var i = 0; i < items.length; i++) {
    if(items[i].id == id) { return items[i]; }
  }

  return false;
}

exports.setup = function (app, gets) {
  app.get("/api/get/:type", function (req, res) {
    var type = req.params.type;
    console.log("--- ## API Get ## ---");
    console.log(type);

    if(gets[type]) { res.send(gets[type]);  }
    else if(type == "orders") { res.send(framework.database.getOrders()); }
    else           { res.send({type: "error", data: "No API Answer, please contact developers!"}); }
  });

  app.post("/api/send/:type", function (req, res) {
    var type = req.params.type;
    var data = req.body;
    console.log("--- ## API Post ## ---");
    console.log(type);
    console.log(data);

    if(type == "buy-producer") {

      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if(testAcc.check()) {
        var kingdom = testAcc.kingdom;
        var current = kingdom.producers.length;
        var result = isItem(data.target);

        if(result) {
          switch (result.name) {
            case "Gold Mine":
              var producer = new framework.producers.Mine(current, "gold", Number(data.x), Number(data.y));

              var price = isItemName("Gold Mine").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
            case "Iron Mine":
              var producer = new framework.producers.Mine(current, "iron", Number(data.x), Number(data.y));

              var price = isItemName("Iron Mine").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
            case "Gem Mine":
              var producer = new framework.producers.Mine(current, "gem", Number(data.x), Number(data.y));

              var price = isItemName("Gem Mine").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
            case "Wheat Farm":
              var producer = new framework.producers.Farm(current, "wheat", Number(data.x), Number(data.y));

              var price = isItemName("Wheat Farm").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
            case "Cotton Farm":
              var producer = new framework.producers.Farm(current, "cotton", Number(data.x), Number(data.y));

              var price = isItemName("Cotton Farm").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
            case "Cattle Farm":
              var producer = new framework.producers.Farm(current, "cattle", Number(data.x), Number(data.y));

              var price = isItemName("Cattle Farm").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
            case "Mill":
              var producer = new framework.producers.Mill(current, Number(data.x), Number(data.y));

              var price = isItemName("Mill").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
            case "Bakery":
              var producer = new framework.producers.Bakery(current, Number(data.x), Number(data.y));

              var price = isItemName("Bakery").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
            case "Blacksmith":
              var producer = new framework.producers.Blacksmith(current, Number(data.x), Number(data.y));

              var price = isItemName("Blacksmith").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
            case "Cotton Mill":
              var producer = new framework.producers.CottonMill(current, Number(data.x), Number(data.y));

              var price = isItemName("Cotton Mill").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
            case "Butchery":
              var producer = new framework.producers.Butchery(current, Number(data.x), Number(data.y));

              var price = isItemName("Butchery").price;

              console.log(price);

              if(testAcc.kingdom.treasury.balance - price < 0) {
                res.send({type: "error", data: "You do not have enough money!"});
                return;
              }

              testAcc.charge(price);

              kingdom.producers.push(producer);
              break;
          }

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

            for (var k = 0; k < items.length; k++) {
              if(items[k].id == data.target) {
                var price = items[k].price * (testAcc.kingdom.producers[i].level+1);
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
