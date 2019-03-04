var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    PORT: 3306,

    user: "root",

    password: "lavii677914744",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("conneted as id " + connection.threadId + "\n");
    managerOptions();
});

function managerOptions() {
    inquirer
        .prompt({
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add Inventory", "Add New Product"]
        })

        .then(function(answer) {
            switch (answer.options) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
            }
        }); 
};

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + "  ||  " + res[i].product_name + "  ||  price: " + res[i].price + "  ||  qty: " + res[i].stock_quantity);
        }
    })
};

function lowInventory() {
    connection.query("SELECT stock_quantity FROM products ", function (err, res) {
        if (err) throw err;

        if (res < 5) {
            console.log(res);
        } else {
            console.log("Everything is fully in stock.");
        }
    })
};

function addInventory() {
    viewProducts();

    inquirer
        .prompt([
            {
                name: "productID",
                type: "input",
                message: "Which product would you like to add inventory of?"       
            }, {
                name: "ADDqty",
                type: "input",
                message: "What quantity would you like to add?"
            }
        ])
        .then(function(answers) {

            var product = answers.productID;
            var qty = answers.ADDqty;

            connection.query("UPDATE PRODUCTS SET ? WHERE ?", [{
                stock_quantity: qty
            }, {
                id: product
            }],
             function(err, res) { 
                if (err) throw err;
                
                console.log("Updated Inventory!");
                console.log(res);
        })
    })
};

function addProduct() {
    inquirer
        .prompt([
            {
                name: "product_name",
                type: "input",
                message: "What is the name of the product?"
            } , {
                name: "depart_name",
                type: "input",
                message: "What department does the product belong to?"
            } , {
                name: "price",
                type: "input",
                message: "What is the price of the product?"
            } , {
                name: "stock_quantity",
                type: "input",
                message: "What is the quantity in stock?"
            }
        ])
        .then(function(answers) {
            var product_name = answers.product_name;
            var depart = answers.depart_name;
            var price = answers.price;
            var stock = answers.stock_quantity;

            connection.query("INSERT INTO products SET ?", {
                product_name: product_name,
                department_name: depart,
                price: price,
                stock_quantity: stock

            }, function(err, res){
                if (err) throw err;
                console.log(res);
            })
        })
};