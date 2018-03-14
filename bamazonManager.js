// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: 'root',
	database: 'Bamazon'
});

function promptManagerAction() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Please select an option: ',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            filter: function (val) {
                if (val === 'View Products for Sale') {
                    return 'sale';
                } else if (val === 'View Low Inventory') {
                    return 'lowInventory';
                } else if (val === 'Add to Inventory') {
                    return 'addInventory';
                } else if (val === 'Add New Product') {
                    return 'newProduct';
                } else {
                    console.log('ERROR: Unsupported operation!!!');
                    exit(1);
                }
            }
        }
    ]).then(function(input) {

        if (input.option === 'sale') {
            displayInventory();
        } else if (input.option === 'lowInventory') {
            displayLowInventory();
        } else if (input.option === 'addInventory') {
            addInventory();
        } else if (input.option === 'newProduct') {
            addNewProduct();
        } else {
            console.log('ERROR: Unsupported operation!');
            exit(1);
        }

    })
}

function displayInventory() {

    // Construct the db query string
    query = 'SELECT * FROM products';

    // Make the db query
    connection.query(query, function(err, res) {
        if (err) throw err;

        console.log('Existing Inventory: ');
		console.log('...................\n');
		console.log('BAMAZON\n');
        console.table(res);
        console.log("---------------------------------------------------------------------\n");
       connection.end();
    })
}

function displayLowInventory() {

    // Construct the db query string
    query = 'SELECT * FROM products WHERE stock_quantity < 50';

    // Make the db query
    connection.query(query, function(err, res) {
        if (err) throw err;

        console.log('Low Inventory Items (below 50): ');
		console.log('...................\n');
		console.log('BAMAZON\n');
        console.table(res);
        console.log("---------------------------------------------------------------------\n");
       connection.end();
    })
}

function runBamazon() {

	// Prompt manager for input
	promptManagerAction();
}

// Run the application logic
runBamazon();