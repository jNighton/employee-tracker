const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
//const connection = require('mysql2/typings/mysql/lib/Connection');
require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["view all departments", "view all roles", "view all employees",
      "add a department", "add a role", "add an employee", "update an employee role"],
    },
  ]).then(answer => {
    if (answer.action === "view all departments") {
      viewAllDepartments()
    } else if (answer.action === "view all roles") {
      viewAllRoles()
    } else if (answer.action === "view all employees") {
      viewAllEmployees()
    } else if (answer.action === "add a department") {
      addDepartment()
    } else if (answer.action === "add a role") {
      addRole()
    } else if (answer.action === "add an employee") {
      addEmployee()
    } else if (answer.action === "update an employee role") {
      updateRole()
    } else {
      db.end()
    }
  })
};

const viewAllDepartments = () => {
  db.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res)
    promptUser()
  })
}

const viewAllRoles = () => {
  db.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err;
    console.table(res)
    promptUser()
  })
}

const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res)
    promptUser()
  })
}

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: newDepartment,
      message: "enter the name of the department...",
    },
  ]).then(
  db.query(`INSERT INTO department (department_name)
  VALUES (?)`, (err, res) => {
    if (err) throw err;
    console.table(res)
    promptUser()
  }))
}

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

promptUser();