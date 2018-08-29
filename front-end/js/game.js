
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function cleanStr(string) {
  string = string.replace("_", " ");

  var words = string.split(" ");

  for (var i = 0; i < words.length; i++) {
    words[i] = capitalizeFirstLetter(words[i])
  }

  string = words.join(" ");

  return string;
}

/* On Document Load
––––––––––––––––––––––––––––––––––––––– */

$(function() {

  /* Initialisations
  ––––––––––––––––––––––––––––––––––––––– */

  var API = new APIClass();

  updateMap();

  $(".producer-info").hide();

  /* Image Preloading
  ––––––––––––––––––––––––––––––––––––––– */

  var images = new Array()
  function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
      images[i] = new Image()
      images[i].src = preload.arguments[i]
    }
  }
  preload(
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

  /* Draw Functions
  ––––––––––––––––––––––––––––––––––––––– */

  function drawFarm(id, x, y, type) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/farm-" + type + ".png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass("farm"+"-"+id+" built producer").addClass("y-" + y + " x-" + x);
  }

  function drawMine(id, x, y, type) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/mine-" + type + ".gif')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass("mine"+"-"+id+" built producer").addClass("y-" + y + " x-" + x);
  }

  function drawGrass(x, y) {
    $(".y-" + y + ".x-" + x).css("background", "url('../img/map/grass.png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass("grass empty").addClass("y-" + y + " x-" + x);
  }

  function drawProducer(id, x, y, type) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/" + type + ".gif')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass(type+"-"+id+" built producer").addClass("y-" + y + " x-" + x);
  }

  function drawHouse(id, x, y, type) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/" + type + ".png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass(type+"-"+id+" built producer").addClass("y-" + y + " x-" + x);
  }

  function drawFeature(id, x, y, type) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/" + type + ".png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass(type+"-"+id+" built feature").addClass("y-" + y + " x-" + x);
  }

  function drawSelect(x, y, reason) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/selected-tile.png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).addClass("selected "+reason);
  }

  function selectAvailiable() {
    for (var i = 0; i < 19; i++) {
      for (var j = 0; j < 19; j++) {
        if($(".y-" + (i+1) + ".x-" + (j+1)).hasClass("empty")) { drawSelect(j+1, i+1, "to-build"); }
      }
    }
  }

  /* Map Updating
  ––––––––––––––––––––––––––––––––––––––– */

  function updateMap() {

    API.send("get-map", {username: username, password: password}, function (data) { // request map from server
      for (var i = 0; i < 19; i++) { // set map to be just grass
        for (var j = 0; j < 19; j++) {
          drawGrass(i+1, j+1);
        }
      }

      for (var i = 0; i < data.length; i++) { // go through every block
        var producer = data[i];

        if(i == data.length-2) {                                        //
          drawFeature(producer.id, producer.y, producer.x, "treasury"); // Draw harbout/treasury at
        } else if(i == data.length-1) {                                 // designated positions.
          drawFeature(producer.id, producer.y, producer.x, "harbour");  //
        } else { // draw producers
          if(producer.type == "farm") {
            drawFarm(producer.id, producer.y, producer.x, producer.subType);
          } else if(producer.type == "mine") {
            drawMine(producer.id, producer.y, producer.x, producer.subType);
          } else if(producer.type == "house") {
            drawHouse(producer.id, producer.y, producer.x, "house");
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

        if($(this).attr("class").split(" ")[0].split("-")[0] == "harbour" ||  // if target is not producer
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
            if(data.subType) { data.type = data.subType + " " + data.type; } // change producer type to fit if has subtype

            for (var i = 0; i < items.length; i++) { // for every producer
              if(items[i].name == cleanStr(data.type)) { // if producer is target
                var price = items[i].price;

                API.send("get-yeild", { // get producer yeild
                  username: username,
                  password: password,
                  target: $(".hidden-id").text()
                }, function (producerYeild) {

                  /* Set Producer Information Front End
                  ––––––––––––––––––––––––––––––––––––––– */
                  $(".producer-info-name").html(cleanStr(data.type) + " <span class='producer-info-level'></span>");
                  $(".producer-info-level").text("Lvl."+data.level);
                  $("#producer-upgrade-btn").text("Upgrade($"+(price*(data.level+1))+")");
                  $("#producer-sell-btn").text("Sell(+$"+((price*data.level)/2)+")");

                  if(data.type == "house") { // producer is a house
                    $(".producer-info-gen").text(data.citizens+" citizens!");
                    $(".producer-info-intake").text("");
                    $(".producer-info-working").text("")
                  } else { // if not a house
                    $(".producer-info-gen").text("Output: "+cleanStr(data.produce)+" "+(producerYeild.val*12)+"/hour");

                    if(data.functioning == true) { // if producer is producing
                      $(".producer-info-working").text("Producing!") // show producer info
                    } else {
                      $(".producer-info-working").text("Not Producing!")
                    }

                    if(data.intake == "None") { // clean data.intake output
                      $(".producer-info-intake").text("Intake: "+cleanStr(data.intake));
                    } else {
                      $(".producer-info-intake").text("Intake: "+cleanStr(data.intake)+" "+(producerYeild.val*12)+"/hour");
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

    getBalance() // update balance (helps to show background transactions)
  }

  function updateAmount() {
    var amount;
    if($("#order-type").val() == "sell") {
      amount = Number($("#order-commodity").val().split("-")[1]);
    } else {
      amount = 10000;
    }

    $("#order-amount").attr({max: amount, min: 1});
    if(Number($("#order-amount").val()) > amount) {
      $("#order-amount").val(amount);
    } else if(Number($("#order-amount").val()) < 1) {
      $("#order-amount").val(1);
    }
  }

  function updateOrderAmount(amount) {
    $("#fulfill-amount").attr({max: amount, min: 1});
    if(Number($("#fulfill-amount").val()) > amount) {
      $("#fulfill-amount").val(amount);
    } else if(Number($("#fulfill-amount").val()) < 1) {
      $("#fulfill-amount").val(1);
    }
  }

  function updateCommodities() {
    API.send("get-commodities", {username: username, password, password}, function (data) {
      $("#commodities-table").html(`
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
        </tr>
        `);
      for (var i = 0; i < data.length; i++) {
        $("#commodities-table").append(
          `
            <tr>
              <td>${data[i].name}</td>
              <td>${data[i].type}</td>
              <td>${data[i].amount}</td>
            </tr>
          `
        );
      }
      console.log(data);
    });
  }

  function getSuitableCommodities() {
    API.send("get-commodities", {username: username, password, password}, function (data) {
      $("#order-commodity").html("");
      var total = false;
      for (var i = 0; i < data.length; i++) {
        if(data[i].amount > 0) { total = true; }
        if($("#order-type").val() == "sell" && data[i].amount > 0) {
          $("#order-commodity").append(
            `
              <option value="${data[i].name}-${data[i].amount}">
                ${data[i].name} - ${data[i].amount}
              </tr>
            `
          );
        } else if($("#order-type").val() == "buy") {
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
        updateAmount()
      });

      $("#order-type").unbind("change");
      $("#order-type").bind("change", function () {
        updateAmount()
      });

      $("#order-commodity").unbind("change");
      $("#order-commodity").bind("change", function () {
        updateAmount()
      });

      $("#order-submit").unbind("click");
      $("#order-submit").bind("click", function () {
        if($("#order-commodity").val()) {
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
        if(!total) {
          alert("You have nothing to sell!")
          $("#order-type").val("buy");
        }
        getSuitableCommodities()
      });

      console.log("DATA: ");
      console.log(data);
    });
  }

  function getSuitableFulfillment(id) {
    API.send("get-order", {username: username, password: password, id: id}, function (data) {
      console.log("ORDER DAATAA");
      console.log(data);
      $("#market-fulfill").html(
        `
          <h1>Fulfill Order</h1>
            <tr>
              <span>Type: </span><span id="fulfill-type">${data.type}</span><br>
              <span>Price: </span>$<span id="fulfill-price">${data.price}</span><br>
              <span>Amount to Buy/Sell </span><input id="fulfill-amount" type="number" value="1" min="1" max="${data.amount-data.fulfillment}">/${data.amount-data.fulfillment}<br>
              <button type="button" id="fulfill-submit">Fulfill</button>
            </tr>
        `
      );

      $("#fulfill-amount").unbind("change");
      $("#fulfill-amount").bind("change", function () {
        updateOrderAmount(Number(data.amount)-Number(data.fulfillment))
      });

      $("#fulfill-submit").unbind("click");
      $("#fulfill-submit").bind("click", function () {
        API.send("fulfill-order", {
          username: username,
          password: password,
          id: data.id,
          amount: Number($("#fulfill-amount").val())
        }, function (response) {
          console.log(response);
          $("#market-table").show();
          $("#market-fulfill").hide();
          $("#create-order-btn").text("Create Order")
          updateOrders();
          updateCommodities();
        })
      });
    })
  }

  function updateOrders() {
    API.get("orders", function (data) {
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
        `);
      for (var i = 0; i < data.length; i++) {
        if(data[i].author == username) {
          $("#market-table").append(
            `
              <tr id="order-${data[i].id}">
                <td>${data[i].type}</td>
                <td>${data[i].commodity}</td>
                <td>$${data[i].price}</td>
                <td>${data[i].amount}</td>
                <td>${data[i].fulfillment}/${data[i].amount}</td>
                <td>${data[i].author}</td>
                <td><button class="order-created-cancel">Cancel</button></td>
              </tr>
              <tr class="order-spacer"></tr>
            `
          );
        } else {
          $("#market-table").append(
            `
              <tr id="order-${data[i].id}">
                <td>${data[i].type}</td>
                <td>${data[i].commodity}</td>
                <td>$${data[i].price}</td>
                <td>${data[i].amount}</td>
                <td>${data[i].fulfillment}/${data[i].amount}</td>
                <td>${data[i].author}</td>
                <td><button class="order-fulfill">Fulfill</button></td>
              </tr>
              <tr class="order-spacer"></tr>
            `
          );
        }
      }

      $(".order-created-cancel").unbind("click");
      $(".order-created-cancel").bind("click", function () {
        API.send("cancel-order", {username: username, password: password, targetID: Number($(this).parent().parent().attr('id').split("-")[1])}, function (data) {
          console.log(data);
        });
      });

      $("#create-order-btn").unbind("click");
      $("#create-order-btn").bind("click", function () {
        if($("#market-table").is(":visible")) {
          $("#market-table").hide();
          $("#market-order").show();
          $("#create-order-btn").text("Cancel")
          getSuitableCommodities();
        } else if($("#market-fulfill").is(":visible")) {
          $("#market-table").show();
          $("#market-fulfill").hide();
          $("#create-order-btn").text("Create Order")
          updateOrders();
        } else {
          $("#market-table").show();
          $("#market-order").hide();
          $("#create-order-btn").text("Create Order")
          updateOrders();
        }
      });

      $(".order-fulfill").unbind("click");
      $(".order-fulfill").bind("click", function () {

        if($("#market-table").is(":visible")) {
          $("#market-table").hide();
          $("#market-fulfill").show();
          getSuitableFulfillment($(this).parent().parent().attr("id").split("-")[1])
          $("#create-order-btn").text("Cancel");
        }
      });
      console.log(data);
    });
  }

  /* Map Generation/Setups
  ––––––––––––––––––––––––––––––––––––––– */

  var total = 0;
  for (var i = 0; i < 19; i++) {
    for (var j = 0; j < 19; j++) {
      total++;
      $("#game-container").append("<div id='block-" + (total) + "' class='y-" + (i + 1) + " x-" + (j + 1) + " grass empty'> </div>");
    }
  }


  $(".modal-btn").click(function() {

    var target = $(this).attr('id').split('-')[0];
    if ($("#"+target+"-modal").css('display') == 'none') {
      $(".modal").css('display', 'none');
      $("#"+target+"-modal").css('display', 'block');

      $panzoom.panzoom("disable");

      API.get("items", function (items) {
        console.log(items);
        $("#shop-item-wrap").html("")
        for (var i = 0; i < items.length; i++) {
          var item = `
          <div class="shop-item" id="item-`+items[i].id+`">
            <h2 class="item-name">`+items[i].name+`</h2>
            <div class="item-desc-wrap">
              <img src="`+items[i].image+`" alt="" class="item-img">
              <p class="item-desc">`+items[i].description+`</p>
            </div>
            <button id="item-button-`+items[i].id+`" class="item-buy-btn">$`+items[i].price+`</button>
          </div>
          `
          $("#shop-item-wrap").append(item);
        }

        $(".modal-close-btn").unbind("click");
        $(".modal-close-btn").bind("click", function () {
          $("#"+target+"-modal").css('display', 'none');
          $panzoom.panzoom("enable")
        });

        if(target == "shop") {

          $('.item-buy-btn').bind("click", function () {
            selectAvailiable();
            $panzoom.panzoom("enable")
            $(".modal").css('display', 'none');

            var pre = this;

            $(".to-build").bind("click", function () {
              console.log("PRODUCER PLACE");
              console.log($(this).attr("class"));
              if($(this).hasClass("selected")) {
                API.send("buy-producer", {
                  username: username,
                  password: password,
                  target: $(pre).parent().attr('id').split("-")[1],
                  x: Number($(this).attr("class").split(' ')[2].split("-")[1]),
                  y: Number($(this).attr("class").split(' ')[3].split("-")[1])
                }, function (data) {
                  console.log(data);
                  $('.to-build').unbind("click");
                  updateMap();
                  getBalance()
                });
              }
            });
          });
        } else if(target == "market") {
          // deprecated
        }

      });
    } else {
      $panzoom.panzoom("enable")
      $("#"+target+"-modal").css('display', 'none');
    }
  });

  /*window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }*/

  /* Front-end JS
  ––––––––––––––––––––––––––––––––––––––– */
  $(document).ready(function() {
    $("#tabs").tabs();
  });

  /* Automatic Commodity Table Updater
  ––––––––––––––––––––––––––––––––––––––– */

  setInterval(function () {
    if($("#my-commodities").is(":visible")) {
      updateCommodities()
    } else if($("#market").is(":visible")) {
      updateOrders()
    }
  }, 5*1000);

  setInterval(function () {
    getBalance()
  }, 5*1000);

  function getBalance() {
    API.send("get-balance", {username: username, password: password}, function (balance) {
      $("#balance").text("$"+balance.data);
    });
  }

  $("#market-btn").click(function () {
    updateOrders();
  });

  $("#stockpile-btn").click(function () {
    updateCommodities();
  });


  $("#producer-upgrade-btn").click(function () {
    API.send("upgrade-producer", {
      username: username,
      password: password,
      target: $(".hidden-id").text()
    }, function (data) {

      API.send("get-producer", {
        username: username,
        password: password,
        target: $(".hidden-id").text()
      }, function (data) {

        API.get("items", function (items) {
          if(data.subType) { data.type = data.subType + " " + data.type; }

          for (var i = 0; i < items.length; i++) {
            if(items[i].name == cleanStr(data.type)) {
              var price = items[i].price;
              API.send("get-yeild", {
                username: username,
                password: password,
                target: $(".hidden-id").text()
              }, function (producerYeild) {
                getBalance()
                $(".producer-info-name").html(cleanStr(data.type) + " <span class='producer-info-level'></span>");
                $(".producer-info-level").text("Lvl."+data.level);
                $("#producer-upgrade-btn").text("Upgrade($"+(price*(data.level+1))+")");
                $("#producer-sell-btn").text("Sell(+$"+((price*data.level)/2)+")");
                if(data.type == "house") {
                  $(".producer-info-gen").text(data.citizens+" citizens!");
                  $(".producer-info-intake").text("");
                } else {
                  $(".producer-info-gen").text("Output: "+cleanStr(data.produce)+" "+(producerYeild.val*12)+"/hour");
                  console.log("PRODUCER:");
                  console.log(data);
                  if(data.functioning == true) {
                    $(".producer-info-working").text("Producing!")
                  } else {
                    $(".producer-info-working").text("Not Producing!")
                  }
                  if(data.intake == "None") {
                    $(".producer-info-intake").text("Intake: "+cleanStr(data.intake));
                  } else {
                    $(".producer-info-intake").text("Intake: "+cleanStr(data.intake)+" "+(producerYeild.val*12)+"/hour");
                  }
                }
              })
            }
          }
        })
      })
    });
  });

  $("#producer-sell-btn").click(function () {
    API.send("sell-producer", {
      username: username,
      password: password,
      target: $(".hidden-id").text()
    }, function (data) {
      $(".producer-info").hide();
      $("."+$(".hidden-target").text()).unbind("click");
      getBalance()
      updateMap()
    });
  });

  $("#logout-btn").click(function () {
    window.location.replace("/logout");
  });

});
