var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    PORT: 3306,

    user: "root",

    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("conneted as id " + connection.threadId + "\n");
    showProducts();
});

function showProducts() {
    
    console.log("Items for Sale");
    console.log("--------------------------------------------");

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
    
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + "  ||  " + res[i].product_name + "  ||  price: " + res[i].price + "  ||  qty: " + res[i].stock_quantity);
        }
        console.log("--------------------------------------------");

    inquirer
        .prompt({
          name: "confirm",
          type: "list",
          message: "Would you like to make a purchase?",
          choices: ["yes", "no"]
        })
        .then(function(answer){
            if(answer.confirm === "yes") {
                productSelect();
            } else {
                console.log("Thank you for stopping by!");
                connection.end();
            }
        })
    })
}

function productSelect(){
    inquirer
        .prompt([
        {
            name: "productID",
            type: "input",
            message: "Please enter Product ID to select the product.",
        }, {
            name: "qty",
            type: "input",
            message: "Please enter the quantity of the product you would like to purchase."
        }
        ])
        .then(function(answer){
            connection.query("SELECT * FROM products WHERE id = " + answer.productID, function(err, res){
                if (err) throw err;

                for (var i = 0; i < res.length; i++) {
                    if (answer.qty < res[i].stock_quantity) {
                        console.log("------------------------------"),
                        console.log(res[i].product_name +  "  ||  $" + res[i].price);
                        console.log("You have purchase: QTY: " + answer.qty +  "  ||  " + "Your total will be: " + res[i].price * answer.qty);

                        var updateQTY = (res[i].stock_quantity - answer.qty);
                        var id = answer.productID;

                        finalizePurchase(updateQTY, id);

                    } else {
                        console.log("------------------------------"),
                        console.log("Sorry! Not enough in stock.");
                        connection.end();
                    }
                }
            })
        });
};

function finalizePurchase(updateQTY, id) {
    inquirer
        .prompt({
            name: "confirm",
            type: "list",
            message: "Place Order?",
            choices: ["yes", "no"]
        })
        .then(function(answer){
            if (answer.confirm === "yes") {
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: updateQTY

                }, {
                    id: id

                }], function (err, res) {
                    if (err) throw err;
    
                    console.log("Your Order has been submitted! Thank you!");
                    connection.end();
                })
            } else {
                console.log("Sorry to hear that. But Thank you for stopping by!");
                connection.end();
            }
        })
};