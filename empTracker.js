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

        .then(function (answer) {
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

}

function ViewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function ViewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function ViewAllRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function AddEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        res = res.map(function (role) {
            return {
                name: role.title,
                value: role.id
            }
        })
        inquirer.prompt([{
            name: "firstname",
            message: "What is their first name?",
            type: "input"
        }, {
            name: "lastname",
            message: "What is their last name?",
            type: "input"
        }, {
            name: "role",
            message: "What is their role?",
            type: "list",
            choices: res
        }]).then(function (answers) {
            connection.query(`INSERT INTO employee (
                first_name, last_name, role_id
            ) VALUES (
                "${answers.firstname}", "${answers.lastname}", "${answers.role}"
            )`, function (err, res) {
                if (err) throw err;
                start();
            })
        })
    })
}

function AddRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        res = res.map(function (department) {
            return {
                name: department.name,
                value: department.id
            }
        })
        inquirer.prompt([{
            name: "title",
            message: "What is their title?",
            type: "input"
        }, {
            name: "salary",
            message: "What is their salary?",
            type: "number"
        }, {
            name: "department",
            message: "What is the role's department?",
            type: "list",
            choices: res
        }]).then(function (answers) {
            connection.query(`INSERT INTO role (
                title, salary, department_id
            ) VALUES (
                "${answers.title}", "${answers.salary}", "${answers.department}"
            )`, function (err, res) {
                if (err) throw err;
                start();
            })
        })
    })
}

function AddDepartment() {
    inquirer.prompt([{
        name: "name",
        message: "What is the department's name?",
        type: "input"
    }]).then(function (answers) {
        connection.query(`INSERT INTO department (
                name
            ) VALUES (
                "${answers.name}"
            )`, function (err, res) {
            if (err) throw err;
            start();
        })
    })
}

function UpdateEmployeeRoles() {
    connection.query("SELECT * FROM employee", function (err, employees) {
        if (err) throw err;
        employees = employees.map(function (employee) {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.id
            }
        })
        connection.query("SELECT * FROM role", function (err, roles) {
            if (err) throw err;
            roles = roles.map(function (role) {
                return {
                    name: role.title,
                    value: role.id
                }
            })
            inquirer.prompt([{
                name: "employee",
                message: "Select an employee to update.",
                type: "list",
                choices: employees
            }, {
                name: "role",
                message: "Select the new role.",
                type: "list",
                choices: roles
            }]).then(function (answers) {
                connection.query(`UPDATE employee SET role_id = ${answers.role} WHERE id = ${answers.employee}`, function (err, res) {
                    if (err) throw err;
                    start();
                })
            })
        })
    }
    )

}
