var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var item;
var stockRemaining = 0;
var sales = 0;
var itemCost =0;
var custCost= 0;

var connection = mysql.createConnection({
	host: 'localhost',
	port:3306,
	user: "root",
	password: "Yeroma1bru",
	database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	start();
});


function start(){
	console.log("Thanks for choosing Bamazon. The least infringing retail space on the web!");
	console.log("Inventory:");
	connection.query("SELECT * FROM products;", function(err, res){
		if (err) throw err;
		var table = new Table({
			head: ["ID", "Name", "Price", "Quantity"],
			colWidths: [10, 20, 10, 10]
		});
		for (var i = 0; i < res.length; i++){
			table.push([res[i].id, res[i].product, res[i].price, res[i].quantity]);
		}
		console.log(table.toString());
		inquirer
		.prompt([
		{
			type: "input",
			name: "id",
			message: "What would you like to purchase? Please enter the id number!"
		},
		{
			type: "input",
			name: "amount",
			message: "And how many would you like?"
		}
		])
		.then(function(response){
			item = function(){
				for(var i; i < res.length; i++){
					if (res[i].id === parseInt(response.id)){
						return res[i];
					}
				}
				return "";
			}
			if (response.amount<= item().quantity){
				stockRemaining = item().quantity - response.amount;
				itemCost = response.quantity * item().price;
				custCost += itemCost;
				sales = item().sales += itemcost;
				inventoryCheck();
			}
			else if (response.amount > item().quantity){
				console.log("I'm afraid that we don't have enough to offer you. Please try to buy less.");
				continueShopping();
			}
			else{
				console.log("That didn't match anything in our stocks...")
				continueShopping();
			}
		});
	});
}

function inventoryCheck(){
	connection.query("UPDATE products SET ? WHERE ?",
		[{
			quantity: stockRemaining,
			totalSales: sales
		},
		{
			id: item().id
		}],
		function(err, res){
			if (err) throw err;
			console.log("Your total cost is " + custCost);
			continueShopping();
		});
}

function continueShopping(){
	inquirer
	.prompt([
	{
		type: "confirm",
		name: "continue",
		message: "Would you like to continue shopping?",
		default: true
	}
	])
	.then(function(res){
		if (res.continue){
			start();
		}
		else{
			console.log("Thanks so much, come back any time!");
			connection.end();
		}
	});
}