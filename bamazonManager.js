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

function validateInteger(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

function validateNumber(value) {
    var number = (typeof parseFloat(value)) === 'number';
	var positive = parseFloat(value) > 0;

    if (number && positive) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

function addInventory() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID for stock_count update',
            validate: validateInteger,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to add?',
            validate:validateInteger,
            filter: Number
        }
    ]).then(function(input) {

        var item = input.item_id;
        var addQuantity = input.quantity;

        var query = 'SELECT * FROM products WHERE ?';

        connection.query(query, {item_id: item}, function(err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                addInventory();

            } else {
                var productData = data[0];

                console.log('Updating Inventory......');

                var updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;

                connection.query(updateQuery, function(err, res) {
                    if (err) throw err;

                    console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
                    console.log("\n---------------------------------------------------------------------\n");
                    

                    connection.end();
                })
            }
        })
    })
}

function runBamazon() {

	// Prompt manager for input
	promptManagerAction();
}

// Run the application logic
runBamazon();