
exports.setup = function (app) {
  app.get("/api/get/:type", function (req, res) {
    var type = req.params.type;
    console.log("--- ## API ## ---");
    console.log(type);
    res.send("true")
  });

  app.post("/api/send/:type", function (req, res) {
    var type = req.params.type;
    var data = req.body;
    console.log("--- ## API ## ---");
    console.log(type);
    console.log(data);
    res.send("true");
  });
}
