
const framework = require('./framework');

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

              kingdom.producers.push(producer);
              break;
            case "Iron Mine":
              var producer = new framework.producers.Mine(current, "iron", Number(data.x), Number(data.y));

              kingdom.producers.push(producer);
              break;
            case "Wheat Farm":
              var producer = new framework.producers.Farm(current, "wheat", Number(data.x), Number(data.y));

              kingdom.producers.push(producer);
              break;
            case "Cotton Farm":
              var producer = new framework.producers.Farm(current, "cotton", Number(data.x), Number(data.y));

              kingdom.producers.push(producer);
              break;
            case "Cattle Farm":
              var producer = new framework.producers.Farm(current, "cattle", Number(data.x), Number(data.y));

              kingdom.producers.push(producer);
              break;
            case "Mill":
              var producer = new framework.producers.Mill(current, Number(data.x), Number(data.y));

              kingdom.producers.push(producer);
              break;
            case "Bakery":
              var producer = new framework.producers.Bakery(current, Number(data.x), Number(data.y));

              kingdom.producers.push(producer);
              break;
            case "Cotton Mill":
              var producer = new framework.producers.CottonMill(current, Number(data.x), Number(data.y));

              kingdom.producers.push(producer);
              break;
            case "Butchery":
              var producer = new framework.producers.Butchery(current, Number(data.x), Number(data.y));

              kingdom.producers.push(producer);
              break;
          }

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

        res.send(kingdom.producers);
      } else {
        res.send({type: "error", data: "Invalid Username/Password"})
      }
    } else { res.send({type: "error", data: "No API Answer, please contact developers!"}); }
  });
}
