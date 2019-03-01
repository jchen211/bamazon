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
    showProducts();
});

function showProducts() {
    inquirer
        .prompt({
          name: "action",
          type: "rawlist",
          message: "What would you like to purchse?",
          choices: [
            "Potion",
            "Super Potion",
            "Max Potion",
            "Oran Berry",
            "Sitris Berry",
            "Razz Berry",
            "Ultra Ball",
            "Premier Ball",
            "Dusk Stone",
            "Dawn Stone"
          ]
    })
        .then(function(answer){
            switch (answer.action) {
             
             case "Potion":
             potion();
             break;

             case "Super Potion":
             superPotion();
             break;

             case "Max Potion":
             maxPotion();
             break;

             case "Oran Berry":
             oranBerry();
             break;

             case "Sitrus Berry":
             sitrusBerry();
             break;

             case "Razz Berry":
             razzBerry();
             break;

             case "Ultra Ball":
             ultraBall();
             break;

             case "Premier Ball":
             premierBall();
             break;

             case "Dusk Stone":
             duskStone();
             break;

             case "Dawn Stone":
             dawnStone();
             break;
            }
        })

        connection.end();
};
