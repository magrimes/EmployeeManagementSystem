var inquirer = require("inquirer");
var mysql = require("mysql");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Meredith1020!",
    database: "Employee_TrackerDB"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer
        .prompt({
            name: "EMS",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Roles", "exit"]

        })

        .then( function(answer){
            var EMS = answer.EMS
            switch (EMS) {
                case "View All Employees":
                    ViewAllEmployees();
                break;
                case "View All Employees by Department":
                    View
                break;
                case "exit":
                    console.log("exit");
                    connection.end();
                break;
            }
        })

}

function ViewAllEmployees() {
    connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err; 
        console.table(res);
        start();
    })
};

function ViewAllEmployeesByDepartment() {
    connection
}






