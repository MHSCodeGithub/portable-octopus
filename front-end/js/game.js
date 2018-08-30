

/* Authentication
––––––––––––––––––––––––––––––––––––––– */

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}

const username = getCookie("username");
const password = getCookie("password");

if (!username || !password) {
  alert("Critical Error Please Login Again. (Reset session by re-opening browser)");
}

var me = {};

/* String Cleaning
––––––––––––––––––––––––––––––––––––––– */

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
 * @function cleanStr()
 *
 * @param {String} string
 *
 * @description returns the specified string however underscores are replaced with spaces
 *              and all word's first letter is capitalized
 *
 **/

function cleanStr(string) {
  string = string.replace("_", " "); // replace underscores with spaces and makes you breakfast

  var words = string.split(" ");

  for (var i = 0; i < words.length; i++) {
    words[i] = capitalizeFirstLetter(words[i]) // capitalizeFirstLetter() of each word
  }

  string = words.join(" ");

  return string; // return cleaned str
}

/* On Document Load
––––––––––––––––––––––––––––––––––––––– */

$(function () {

  /* Initialisations
  ––––––––––––––––––––––––––––––––––––––– */

  var images = new Array(); // set images array to allow preloading

  preload( // preload images so they dont load upon contact
    "../img/menu-btn-p.png",
    "../img/logout-btn-p.png",
    "../img/close-btn.png",
    "../img/close-btn-p.png",
    "../img/buy-btn.png",
    "../img/buy-btn-p.png",
    "../img/sell-btn.png",
    "../img/sell-btn-p.png",
    "../img/upgrade-btn.png",
    "../img/upgrade-btn-p.png"
  )

  var API = new APIClass(); // create API w/server

  updateMap(); // update the map to reflect the users current kingdom

  $(".producer-info").hide(); // hide producer info so its nice and clean

  /* Image Preloading
  ––––––––––––––––––––––––––––––––––––––– */

  /**
   *
   * @function preload()
   *
   * @param {List<String>} arguments
   *
   * @description creates a new image, sets its src and loads it for every parameter
   *
   **/

  function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
      images[i] = new Image() // create new image and append to image array
      images[i].src = preload.arguments[i] // set src to preload the image
    }
  }

  /* Map Draw Functions
  ––––––––––––––––––––––––––––––––––––––– */

  function drawFarm(id, x, y, type) { // used to display farms on the map (this is because the have subtypes)
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/farm-" + type + ".png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass("farm" + "-" + id + " built producer").addClass("y-" + y + " x-" + x);
  }

  function drawMine(id, x, y, type) { // used to display mines on the map (this is because they have subtypes)
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/mine-" + type + ".gif')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass("mine" + "-" + id + " built producer").addClass("y-" + y + " x-" + x);
  }

  function drawGrass(x, y) { // used to draw grass on map. Is looking for a new job because this one is too repetitive.
    $(".y-" + y + ".x-" + x).css("background", "url('../img/map/grass.png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass("grass empty").addClass("y-" + y + " x-" + x);
  }

  function drawProducer(id, x, y, type) { // used to display producers on map
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/" + type + ".gif')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass(type + "-" + id + " built producer").addClass("y-" + y + " x-" + x);
  }

  function drawFeature(id, x, y, type) { // used to display a treasury, harbour or house on map
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/" + type + ".png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass(type + "-" + id + " built feature").addClass("y-" + y + " x-" + x);
  }

  function drawSelect(x, y, reason) { // used to display a selection of a tile on the map
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/selected-tile.png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).addClass("selected " + reason);
  }

  function selectAvailiable() { // used to allow building placement
    for (var i = 0; i < 19; i++) {
      for (var j = 0; j < 19; j++) {
        if ($(".y-" + (i + 1) + ".x-" + (j + 1)).hasClass("empty")) {
          drawSelect(j + 1, i + 1, "to-build");
        } // select all available blocks on map
      }
    }
  }

  /* User Information Updating
  ––––––––––––––––––––––––––––––––––––––– */

  /**
   *
   * @function updateCommodities()
   *
   * @description updates a users commodity table. Unfortunately it won't make the table for dinner
   *
   **/

  function updateCommodities() {
    API.send("get-commodities", {
      username: username,
      password,
      password
    }, function (usersCommodities) { // get users commodities
      $("#commodities-table").html(`
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
        </tr>
        `); // add table headers
      for (var i = 0; i < usersCommodities.length; i++) { // for each commodity
        $("#commodities-table").append( // display the information on the table
          `

            <tr>
              <td>${usersCommodities[i].name}</td>
              <td>${usersCommodities[i].type}</td>
              <td>${usersCommodities[i].amount}</td>
            </tr>
          `
        );
      }
    });
  }

  function updateMap() {

    API.send("get-map", {
      username: username,
      password: password
    }, function (data) { // request map from server
      for (var i = 0; i < 19; i++) { // set map to be just grass. Nothing but grass.
        for (var j = 0; j < 19; j++) {
          drawGrass(i + 1, j + 1);
        }
      }

      for (var i = 0; i < data.length; i++) { // go through every block
        var producer = data[i];

        if (i == data.length - 2) { //
          drawFeature(producer.id, producer.y, producer.x, "treasury"); // Draw harbout/treasury at
        } else if (i == data.length - 1) { // designated positions.
          drawFeature(producer.id, producer.y, producer.x, "harbour"); //
        } else { // draw producers
          if (producer.type == "farm") {
            drawFarm(producer.id, producer.y, producer.x, producer.subType);
          } else if (producer.type == "mine") {
            drawMine(producer.id, producer.y, producer.x, producer.subType);
          } else if (producer.type == "house") {
            drawFeature(producer.id, producer.y, producer.x, "house");
          } else {
            drawProducer(producer.id, producer.y, producer.x, producer.type);
          }
        }
      }

      /* Block Interactions
      ––––––––––––––––––––––––––––––––––––––– */
      $('.built').unbind("click");
      $('.built').bind("click", function () { // when a producer is clicked on
        $(".producer-info").show()

        if ($(this).attr("class").split(" ")[0].split("-")[0] == "harbour" || // if target is not producer
          $(this).attr("class").split(" ")[0].split("-")[0] == "treasury") { // hide producer info
          $(".producer-info").hide() // hide producer info
          return; // end function
        }

        /* Misc Local Vars
        ––––––––––––––––––––––––––––––––––––––– */
        var id = $(this).attr("class").split(" ")[0].split("-")[1];
        var target = $(this).attr("class").split(" ")[0].split("-")[1];
        var another = $(this).attr("class").split(" ")[0];

        /* Data Response/Event Handling
        ––––––––––––––––––––––––––––––––––––––– */
        API.send("get-producer", { // get producer info
          username: username,
          password: password,
          target: target
        }, function (data) {

          $(".hidden-id").text(id); // set hidden data for later use
          $(".hidden-target").text(another);

          API.get("items", function (items) { // get all possible producers
            if (data.subType) {
              data.type = data.subType + " " + data.type;
            } // change producer type to fit if has subtype

            for (var i = 0; i < items.length; i++) { // for every producer
              if (items[i].name == cleanStr(data.type)) { // if producer is target
                var price = items[i].price;

                API.send("get-yeild", { // get producer yield
                  username: username,
                  password: password,
                  target: $(".hidden-id").text()
                }, function (producerYeild) {

                  /* Set Producer Information Front End
                  ––––––––––––––––––––––––––––––––––––––– */
                  $(".producer-info-name").html(cleanStr(data.type) + " <span class='producer-info-level'></span>");
                  $(".producer-info-level").text("Lvl." + data.level);
                  $("#producer-upgrade-btn").text("Upgrade($" + (price * (data.level + 1)) + ")");
                  $("#producer-sell-btn").text("Sell(+$" + ((price * data.level) / 2) + ")");

                  if (data.type == "house") { // producer is a house
                    $(".producer-info-gen").text(data.citizens + " citizens!");
                    $(".producer-info-intake").text("");
                    $(".producer-info-working").text("")
                  } else { // if not a house
                    $(".producer-info-gen").text("Output: " + cleanStr(data.produce) + " " + (producerYeild.val * 12) + "/hour");

                    if (data.functioning == true) { // if producer is producing
                      $(".producer-info-working").text("Producing!") // show producer info
                    } else {
                      $(".producer-info-working").text("Not Producing!")
                    }

                    if (data.intake == "None") { // clean data.intake output
                      $(".producer-info-intake").text("Intake: " + cleanStr(data.intake));
                    } else {
                      $(".producer-info-intake").text("Intake: " + cleanStr(data.intake) + " " + (producerYeild.val * 12) + "/hour");
                    }
                  }
                })
              }
            }
          })
        })
      });

      $(".producer-info-close").click(function () { // on close button
        $(".producer-info").hide() // close producer info
      })
    });

    updateBalance() // update balance (helps to show background transactions)
  }

  /* Order Creation
  ––––––––––––––––––––––––––––––––––––––– */

  /**
   *
   * @function updateOrderAmountRange()
   *
   * @description sets the maximum and minimum input on the create order form > amount input. Ask it nicely and it will give you a friednly hug!
   *
   **/

  function updateOrderAmountRange() { // function prevents invalid input when creating an order
    var maxAmount;
    if ($("#order-type").val() == "sell") { // determine max input amount
      maxAmount = Number($("#order-commodity").val().split("-")[1]);
    } else {
      maxAmount = 10000;
    }

    $("#order-amount").attr({
      max: maxAmount,
      min: 1
    }); // apply on front end the max input to the input[type=number]
    if (Number($("#order-amount").val()) > maxAmount) { // if input is over max
      $("#order-amount").val(maxAmount); // set to max amount
    } else if (Number($("#order-amount").val()) < 1) { // if input is under min
      $("#order-amount").val(1); // set to min amount
    }
  }

  /**
   *
   * @function getSuitableCommoditiesToSell()
   *
   * @description gets all commodities that the user has and appends to the commodity select input when creating an order. Thinks of itself as a free spirit
   *
   **/

  function getSuitableCommoditiesToSell() {
    API.send("get-commodities", {
      username: username,
      password,
      password
    }, function (data) {
      $("#order-commodity").html("");
      var total = false;
      for (var i = 0; i < data.length; i++) {
        if (data[i].amount > 0) {
          total = true;
        }
        if ($("#order-type").val() == "sell" && data[i].amount > 0) {
          $("#order-commodity").append(
            `
              <option value="${data[i].name}-${data[i].amount}">
                ${data[i].name} - ${data[i].amount}
              </tr>
            `
          );
        } else if ($("#order-type").val() == "buy") {
          $("#order-commodity").append(
            `
              <option value="${data[i].name}-${data[i].amount}">
                ${data[i].name} - ${data[i].amount}
              </tr>
            `
          );
        }
      }

      $("#order-amount").unbind("change");
      $("#order-amount").bind("change", function () {
        updateOrderAmountRange()
      });

      $("#order-type").unbind("change");
      $("#order-type").bind("change", function () {
        updateOrderAmountRange()
      });

      $("#order-commodity").unbind("change");
      $("#order-commodity").bind("change", function () {
        updateOrderAmountRange()
      });

      $("#order-submit").unbind("click");
      $("#order-submit").bind("click", function () {
        if ($("#order-commodity").val()) {
          API.send("create-order", {
            username: username,
            password: password,
            type: $("#order-type").val(),
            commodity: $("#order-commodity").val().split("-")[0],
            price: Number($("#order-price").val()),
            amount: Number($("#order-amount").val())
          }, function (response) {
            console.log("response");
            console.log(response);
            $("#market-table").show();
            $("#market-order").hide();
            $("#create-order-btn").text("Create Order")
            updateOrders();
          });
        } else {
          alert("Please Fill Out Correct Order!")
        }
      });

      $("#order-type").unbind("change");
      $("#order-type").bind("change", function () {
        if (!total) {
          alert("You have nothing to sell!")
          $("#order-type").val("buy");
        }
        getSuitableCommoditiesToSell()
      });

      console.log("DATA: ");
      console.log(data);
    });
  }

  /* Order Fulfillment
  ––––––––––––––––––––––––––––––––––––––– */

  /**
   *
   * @function updateOrderFulfillmentAmount()
   *
   * @param {Number} amount
   *
   * @description when a user tries to fulfill an order, this function checks that their input is valid. Note: this function likes 2 sugars in its coffee
   *
   **/

  function updateOrderFulfillmentAmount(amount) {
    $("#fulfill-amount").attr({
      max: amount,
      min: 1
    }); // set max/min
    if (Number($("#fulfill-amount").val()) > amount) { // check input to see if it matches the amount of commodities specified in the order
      $("#fulfill-amount").val(amount);
    } else if (Number($("#fulfill-amount").val()) < 1) {
      $("#fulfill-amount").val(1);
    }
  }

  /**
   *
   * @function getSuitableFulfillment()
   *
   * @param {Number} id
   *
   * @description updates the fulfill order form to fit the specified order
   *
   **/

  function getSuitableFulfillment(id) {
    API.send("get-order", {
      username: username,
      password: password,
      id: id
    }, function (order) { // get order data
      $("#market-fulfill").html( // display order data in form a.k.a. solve world hunger
        `
          <h1>Fulfill Order</h1>
            <tr>
              <span>Type: </span><span id="fulfill-type">${order.type}</span><br>
              <span>Price: </span>$<span id="fulfill-price">${order.price}</span><br>
              <span>Amount to Buy/Sell </span><input id="fulfill-amount" type="number" value="1" min="1" max="${order.amount-order.fulfillment}">/${order.amount-order.fulfillment}<br>
              <button type="button" id="fulfill-submit">Fulfill</button>
            </tr>
        `
      );

      $("#fulfill-amount").unbind("change"); // unbind previous listerners to prevent overlapping
      $("#fulfill-amount").bind("change", function () { // upon input change
        updateOrderFulfillmentAmount(Number(order.amount) - Number(order.fulfillment)) // ensure that fulfillment amount is not invalid
      });

      $("#fulfill-submit").unbind("click"); // unbind previous listerners to prevent overlapping
      $("#fulfill-submit").bind("click", function () { // upon user submits fulfillment form
        API.send("fulfill-order", {
          username: username,
          password: password,
          id: order.id,
          amount: Number($("#fulfill-amount").val())
        }, function (response) { // send fulfillment to server
          $("#market-table").show(); // return to market
          $("#market-fulfill").hide();
          $("#create-order-btn").text("Create Order") // update create order button to match its normal state
          updateOrders(); // update market/commodities/balance
          updateCommodities();
          updateBalance();
        })
      });
    })
  }

  /**
   *
   * @function updateOrders()
   *
   * @description updates the orders in market table. Unfortunately, it sometimes cannot do this, Dave.
   *
   **/

  function updateOrders() {
    API.get("orders", function (orders) { // get all orders from server
      $("#market-table").html(`
        <tr id="table-headers">
          <th>Buy/Sell</th>
          <th>Commodity</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Fulfillment</th>
          <th>Player</th>
          <th><button type="button" name="button" id="create-order-btn">Create Order</button></th>
        </tr>
        <tr class="order-spacer"></tr>
        `); // empty table and provide headers/create order button
      for (var i = 0; i < orders.length; i++) { // for each order
        if (orders[i].author == username) { // if the order is created by self
          $("#market-table").append( // append the order to the table, however provide a cancel button
            `
              <tr id="order-${orders[i].id}">
                <td>${orders[i].type}</td>
                <td>${orders[i].commodity}</td>
                <td>$${orders[i].price}</td>
                <td>${orders[i].amount}</td>
                <td>${orders[i].fulfillment}/${orders[i].amount}</td>
                <td>${orders[i].author}</td>
                <td><button class="order-created-cancel">Cancel</button></td>
              </tr>
              <tr class="order-spacer"></tr>
            `
          );
        } else { // if the order is created by someone else
          $("#market-table").append( // provide fulfill button
            `
              <tr id="order-${orders[i].id}">
                <td>${orders[i].type}</td>
                <td>${orders[i].commodity}</td>
                <td>$${orders[i].price}</td>
                <td>${orders[i].amount}</td>
                <td>${orders[i].fulfillment}/${orders[i].amount}</td>
                <td>${orders[i].author}</td>
                <td><button class="order-fulfill">Fulfill</button></td>
              </tr>
              <tr class="order-spacer"></tr>
            `
          );
        }
      }

      $(".order-created-cancel").unbind("click"); // unbind previous listerners to prevent overlapping
      $(".order-created-cancel").bind("click", function () {
        API.send("cancel-order", {
          username: username,
          password: password,
          targetID: Number($(this).parent().parent().attr('id').split("-")[1])
        }, function (data) {
          updateOrders();
        });
      });

      $("#create-order-btn").unbind("click"); // unbind previous listerners to prevent overlapping
      $("#create-order-btn").bind("click", function () { // when create order button is clicked
        if ($("#market-table").is(":visible")) { // if market tab is open
          $("#market-table").hide(); // show create order form
          $("#market-order").show();
          $("#create-order-btn").text("Cancel") // update button text to cancel
          getSuitableCommoditiesToSell(); // prepare create order form
        } else if ($("#market-fulfill").is(":visible")) { // if fulfill order form is visible
          $("#market-table").show(); // show market
          $("#market-fulfill").hide();
          $("#create-order-btn").text("Create Order") // change create order button to original form
          updateOrders();
        } else { // if create order form is open
          $("#market-table").show(); // show market, and bake cookies
          $("#market-order").hide();
          $("#create-order-btn").text("Create Order") // change create order button to original form
          updateOrders();
        }
      });

      $(".order-fulfill").unbind("click"); // unbind previous listerners to prevent overlapping
      $(".order-fulfill").bind("click", function () { // when user clicks to fulfill an order

        if ($("#market-table").is(":visible")) { // if market is open
          $("#market-table").hide(); // show fulfill order form
          $("#market-fulfill").show();
          getSuitableFulfillment($(this).parent().parent().attr("id").split("-")[1]) // prepare fulfill order form
          $("#create-order-btn").text("Cancel"); // update button text to cancel
        }
      });
    });
  }

  /* Map Generation/Setups
  ––––––––––––––––––––––––––––––––––––––– */

  var total = 0; // total used to give blocks an ID
  for (var i = 0; i < 19; i++) { // for each block in the 19x19 grid
    for (var j = 0; j < 19; j++) {
      total++; // add 1 to total
      $("#game-container").append("<div id='block-" + (total) + "' class='y-" + (i + 1) + " x-" + (j + 1) + " grass empty'> </div>"); // append a new block with a unique ID + x and y
    }
  }


  $(".modal-btn").click(function () { // when a menu button is clicked

    var target = $(this).attr('id').split('-')[0]; // get button being clicked on
    if ($("#" + target + "-modal").css('display') == 'none') { // if modal is hidden
      $(".modal").css('display', 'none');
      $("#" + target + "-modal").css('display', 'block'); // dynamically display the menu item

      $panzoom.panzoom("disable"); // disable panzoom to allow scrolling

      API.get("items", function (items) { // get all producers from server
        console.log(items);

        $(".modal-close-btn").unbind("click"); // unbind previous listerners to prevent overlapping
        $(".modal-close-btn").bind("click", function () { // if menu item close button is clicked
          $("#" + target + "-modal").css('display', 'none'); // hide menu item
          $panzoom.panzoom("enable") // re-enable panzoom
        });

        if (target == "shop") { // if menu item is shop

          $("#shop-item-wrap").html("") // reset shop
          for (var i = 0; i < items.length; i++) { // for each producer
            var item = `
            <div class="shop-item" id="item-` + items[i].id + `">
              <h2 class="item-name">` + items[i].name + `</h2>
              <div class="item-desc-wrap">
                <img src="` + items[i].image + `" alt="" class="item-img">
                <p class="item-desc">` + items[i].description + `</p>
              </div>
              <button id="item-button-` + items[i].id + `" class="item-buy-btn">$` + items[i].price + `</button>
            </div>
            `
            $("#shop-item-wrap").append(item); // add producer to producer list
          }

          $('.item-buy-btn').bind("click", function () { // if a producer's buy button is clicked
            selectAvailiable(); // show available blocks to place producer
            $panzoom.panzoom("enable") // re-enable panzoom
            $(".modal").css('display', 'none'); // hide menu item

            var pre = this; // save this into variable to asynchronous access

            $(".to-build").bind("click", function () { // if a block which a producer can be placed on is clicked
              if ($(this).hasClass("selected")) { // double check that the producer can be placed
                API.send("buy-producer", { // tell the server the user wants to buy a producer
                  username: username,
                  password: password,
                  target: $(pre).parent().attr('id').split("-")[1],
                  x: Number($(this).attr("class").split(' ')[2].split("-")[1]),
                  y: Number($(this).attr("class").split(' ')[3].split("-")[1])
                }, function (response) { // when the server responds
                  $('.to-build').unbind("click"); // dis-allow the user from placing more producers
                  updateMap(); // update map to show the new producer
                  updateBalance(); // update the users balance to reflect the purchase
                });
              }
            });
          });
        }

      });
    } else { // if menu item is shown
      $panzoom.panzoom("enable") // re-enable panzoom
      $("#" + target + "-modal").css('display', 'none'); // close menu item
    }
  });

  /*window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }*/

  /* Front-end JS
  ––––––––––––––––––––––––––––––––––––––– */

  $(document).ready(function () { // leaving this here for shits and giggles. My god this is so dumb, wtf was I thinking
    $("#tabs").tabs(); // enable menu items
  }); // its ALREADY in a $(document).ready and its ALREADY in a Front-end JS file

  /* Automatic Commodity Table/Market/Balance Updater
  ––––––––––––––––––––––––––––––––––––––– */

  setInterval(function () {
    if ($("#my-commodities").is(":visible")) { // if commodity list is visible
      updateCommodities()
    } else if ($("#market").is(":visible")) { // if market is visible
      updateOrders()
    }

    updateBalance()
  }, 5 * 1000); // every 5 seconds

  /**
   *
   * @function updateOrders()
   *
   * @description updates the users balance front end. Sometimes takes long holidays
   *
   **/

  function updateBalance() {
    API.send("get-balance", {
      username: username,
      password: password
    }, function (balance) { // get user's balance
      $("#balance").text("$" + balance.data); // display users balance
    });
  }

  $("#market-btn").click(function () { // when the market menu button is clicked
    updateOrders(); // update the market
  });

  $("#stockpile-btn").click(function () { // when the stockpile button is clicked
    updateCommodities(); // update the stockpile
  });


  $("#producer-upgrade-btn").click(function () { // when a user tries to upgrade a producer
    API.send("upgrade-producer", { // tell the server they want to upgrade
      username: username,
      password: password,
      target: $(".hidden-id").text()
    }, function (response) {

      API.send("get-producer", {
        username: username,
        password: password,
        target: $(".hidden-id").text()
      }, function (producer) { // get the target producer

        API.get("items", function (items) { // get all producers as reference
          if (producer.subType) {
            producer.type = producer.subType + " " + producer.type;
          } // create proper producer name if producer has a subtype

          for (var i = 0; i < items.length; i++) { // for each reference producer
            if (items[i].name == cleanStr(producer.type)) { // if reference producer is the same time as the target producer
              var price = items[i].price; // get base price of reference producer
              API.send("get-yeild", {
                username: username,
                password: password,
                target: $(".hidden-id").text()
              }, function (producerYeild) { // get target producer's yeild
                updateBalance(); // update user's balance

                // update producer information // TODO: REFACTOR
                $(".producer-info-name").html(cleanStr(producer.type) + " <span class='producer-info-level'></span>");
                $(".producer-info-level").text("Lvl." + producer.level);
                $("#producer-upgrade-btn").text("Upgrade($" + (price * (producer.level + 1)) + ")");
                $("#producer-sell-btn").text("Sell(+$" + ((price * producer.level) / 2) + ")");

                if (producer.type == "house") { // if the producer is a house
                  $(".producer-info-gen").text(producer.citizens + " citizens!"); // display the intake/outake fittingly
                  $(".producer-info-intake").text("");
                } else { // if the producer is a _real_ producer (not a house) (im not housist)
                  $(".producer-info-gen").text("Output: " + cleanStr(producer.produce) + " " + (producerYeild.val * 12) + "/hour"); // show the producer's yeild
                  if (producer.functioning == true) { // if the producer if functioning
                    $(".producer-info-working").text("Producing!") // let user know
                  } else {
                    $(".producer-info-working").text("Not Producing!")
                  }
                  if (producer.intake == "None") { // if the producer has no Intake
                    $(".producer-info-intake").text("Intake: " + cleanStr(producer.intake)); // clean the intake message
                  } else {
                    $(".producer-info-intake").text("Intake: " + cleanStr(producer.intake) + " " + (producerYeild.val * 12) + "/hour"); // display intake according to algo
                  }
                }
              })
            }
          }
        })
      })
    });
  });

  $("#producer-sell-btn").click(function () { // if the user tries to sell a producer
    API.send("sell-producer", { // tell the server (to frick off)
      username: username,
      password: password,
      target: $(".hidden-id").text()
    }, function (response) {
      $(".producer-info").hide(); // hide the producer info
      $("." + $(".hidden-target").text()).unbind("click"); // unbind ability to view removed producer information
      updateBalance() // update user's balance
      updateMap() // update map to show producer removed
    });
  });

  $("#logout-btn").click(function () { // if the user chooses to logout (goodbye user ): ...)
    window.location.replace("/logout"); // redirect to the logout page
  });

});
