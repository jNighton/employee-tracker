const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('mysql2/typings/mysql/lib/Connection');
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
    } else if (answer.action === "view all employee") {
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
  db.query(`SELECT * FROM department ORDER BY id desc`, (err, res) => {
    if (err) throw err;
    console.table(res)
    promptUser()
  })
}

const viewAllRoles = () => {
  db.query(`SELECT * FROM roles ORDER BY id desc`, (err, res) => {
    if (err) throw err;
    console.table(res)
    promptUser()
  })
}

const viewAllEmployees = () => {
  db.query(`SELECT * FROM employee ORDER BY id desc`, (err, res) => {
    if (err) throw err;
    console.table(res)
    promptUser()
  })
}

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      
    }
  ])
  db.query(`SELECT * FROM department ORDER BY id desc`, (err, res) => {
    if (err) throw err;
    console.table(res)
    promptUser()
  })
}

const dbActions = (action) => {
  if (action === "view all departments")
  {
    const sql = `SELECT * FROM department ORDER BY id desc`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
  }
  if (action === "view all roles")
  {
    const sql = `SELECT * FROM roles ORDER BY id desc`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
  }
  if (action === "view all employees")
  {
    const sql = `SELECT * FROM employees ORDER BY id desc`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  }
  if (action === "add a department")
  {
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    const params = [body.department_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
  }
  if (action === "add a role")
  {
    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?)`;
    const params = [body.title, body.salary, body.department_id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
  }
  if (action === "add an employee")
  {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id]
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
  }
  if (action === "update an employee role")
  {
    
  }
}

// Query database
// db.query('SELECT * FROM department_id', function (err, results) {
//   console.log(results);
// });

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

promptUser();