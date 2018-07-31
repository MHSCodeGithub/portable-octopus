const fs = require('fs');

exports.read = function () {
  return JSON.parse(fs.readFileSync("./data.json"));
};

exports.write = function (data) {
  return fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};

if (!fs.existsSync("./data.json")) {
  fs.writeFileSync("./data.json", "{\"accounts\": {}}");
}

exports.addAccount = function (account) {
  var database = exports.read();
  database.accounts[account.id] = account;
  exports.write(database);
};

exports.getAccount = function (username) {
  var data = exports.read();
  for (property in data.accounts) {
    if(data.accounts[property].username === username) {
      return data.accounts[property];
    }
  }

  return false;
};
