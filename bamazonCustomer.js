var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "Bamazon"
});

function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

// promptUserPurchase will prompt the user for the item/quantity they would like to purchase
function promptUserPurchase() {

    inquirer.prompt([{
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function(input, choices) {

        var item = input.item_id;
        var quantity = input.quantity;

        // Query db to confirm that the given item ID exists in the desired quantity
        var query = 'SELECT * FROM products WHERE ?';

        connection.query(query, {
            item_id: item
        }, function(err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            } else {
                var productData = data[0];


                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations, the product you requested is in stock! Placing order!');

                    // Construct the updating query string
                    var updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;


                    // Update the inventory
                    connection.query(updateQuery, function(err, data) {
                        if (err) throw err;

                        console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                            connection.end();
                   
                        
                    })
                } else {
                    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        })
    })
}

// displayInventory will retrieve the current inventory from the database and output it to the console
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
        //Prompt the user for item/quantity they would like to purchase
        promptUserPurchase();
    })
}

// runBamazon will execute the main application logic
function runBamazon() {

    // Display the available inventory
    displayInventory();
}

// Run the application logic
runBamazon();