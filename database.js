const fs = require('fs');

exports.read = function () {
  return JSON.parse(fs.readFileSync("./data.json"));
};

exports.write = function (data) {
  return fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};

if (!fs.existsSync("./data.json")) {
  fs.writeFileSync("./data.json", fs.readFileSync("setup.json"));
}

exports.addAccount = function (account) {
  var database = exports.read();
  database.accounts[account.id] = account;
  exports.write(database);
};

exports.getAccount = function (username) {
  var data = exports.read();
  for (var property in data.accounts) {
    if(data.accounts[property].username === username) {
      return data.accounts[property];
    }
  }

  return false;
};

exports.addOrder = function (order) {
  var database = exports.read();
  database.orders[order.id] = order;
  exports.write(database);
};

exports.getOrder = function (id) {
  var data = exports.read();
  for (var property in data.accounts) {
    if(data.orders[property].id === id) {
      return data.orders[property];
    }
  }

  return false;
};

exports.getItem = function (id) {
  var data = exports.read();
  for (var property in data.items) {
    if(data.items[property].id === id) {
      return data.items[property];
    }
  }

  return false;
};

exports.getItems = function () {
  return exports.read().items;
}

exports.getOrders = function () {
  return exports.read().orders;
}

exports.getCommodities = function () {
  return exports.read().commodities;
}
