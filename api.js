
exports.setup = function (app, gets) {
  app.get("/api/get/:type", function (req, res) {
    var type = req.params.type;
    console.log("--- ## API Get ## ---");
    console.log(type);

    if(gets[type]) { res.send(gets[type]);  }
    else           { res.send("undefined"); }
  });

  app.post("/api/send/:type", function (req, res) {
    var type = req.params.type;
    var data = req.body;
    console.log("--- ## API Post ## ---");
    console.log(type);
    console.log(data);

    if(type == "buy-producer") {
      res.send("ok")
    } else { res.send("undefined"); }
  });
}
