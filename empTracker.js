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

// Initiate MySQL connection
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
                case "View All Departments":
                    ViewAllDepartments();
                break;
                case "View All Roles":
                    ViewAllRoles();
                break;
                case "Add Employee":
                    AddEmployee();
                break;
                case "Add Department":
                    AddDepartment();
                break;
                case "Add Role":
                    AddRole();
                break;
                case "Update Employee Roles":
                    UpdateEmployeeRoles();
                break;
                case "exit":
                    console.log("exit");
                    connection.end();
                break;
            }
        })

};

function ViewAllEmployees() {
    connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err; 
        console.table(res);
        start();
    })
};

function ViewAllDepartments() {
    connection.query("SELECT * FROM department", function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};

function ViewAllRoles() {
    connection.query("SELECT * FROM role", function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};

function AddEmployee() {
    connection.query("INSERT INTO", function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};

function AddDepartment() {
    connection.query("INSERT INTO", function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};

function AddRole() {
    connection.query("INSERT INTO", function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};

function UpdateEmployeeRoles() {
    connection.query("", function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};
