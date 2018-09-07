
const framework = require('./framework');
const api = require('./framework/interface');

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

exports.setup = function(app, gets) { // when the API is setup
  app.get("/api/get/:type", function(req, res) { // when a simple API get is called
    var type = req.params.type; // find the type of get needed
    console.log("--- ## API Get ## ---");
    console.log(type);

    if (gets[type]) {
      res.send(gets[type]);
    } // if the get type is known return with the pre-defined static value
    else if (type == "orders") {
      res.send(framework.database.getOrders());
    } // if the get type is a pre-defined get, but has a dynamic response (specifically 'orders')
    else {
      res.send({
        type: "error",
        data: "No API Answer, please contact developers!"
      });
    } // if the get type is unkown return an error
  });

  app.post("/api/send/:type", function(req, res) { // when a API post with incoming data is called
    var type = req.params.type; // determine post type
    var data = req.body; // determine sent data
    console.log("--- ## API Post ## ---");
    console.log(type);
    console.log(data);

    if (type == "buy-producer") {
      api.buyProducer(data, req, res)
    } else if (type == "get-map") { // if the post type is get map
      api.getMap(data, req, res);
    } else if (type == "get-other-map") {
      api.getOtherMap(data, req, res)
    } else if (type == "get-commodities") { // if the post type is get commodities
      api.getCommodities(data, req, res);
    } else if (type == "get-info") {
      api.getInfo(data, req, res);
    } else if (type == "upgrade-producer") { // if the post type is upgrade producer
      api.upgradeProducer(data, req, res)
    } else if (type == "sell-producer") { // if the post type is sell producer
      api.sellProducer(data, req, res)
    } else if (type == "get-balance") { // if the post type is get balance
      api.getBalance(data, req, res)
    } else if (type == "create-order") { // if the post type is create order
      api.createOrder(data, req, res)
    } else if (type == "cancel-order") { // if the psot type s cancel order
      api.cancelOrder(data, req, res)
    } else if (type == "get-order") { // if the post type is get order
      api.getOrder(data, req, res)
    } else if (type == "fulfill-order") { // if the post type is fulfill order
      api.fulfillOrder(data, req, res)
    } else if (type == "get-producer") { // if the post type is get producer
      api.getProducer(data, req, res);
    } else if (type == "get-other-producer") { // if the post type is get producer
      api.getOtherProducer(data, req, res);
    } else if (type == "get-leaderboard") {
      api.getLeaderboard(data, req, res)
    } else if (type == "get-yeild") { // if the post type is get yeild
      api.getYeild(data, req, res)
    } else if (type == "get-other-yeild") { // if the post type is get yeild
      api.getOtherYeild(data, req, res);
    } else {
      res.send({
        type: "error",
       data: "No API Answer, please contact developers!"
      });
    }
  });
}
