const mysql = require('mysql');


const dbConfig = {
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'employeedb', 
};


function connectToDatabase(config) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
}


function insertEmployee(connection, employee) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO employee SET ?', employee, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


function getAllEmployees(connection) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM employee', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}


async function main() {
  try {

    const connection = await connectToDatabase(dbConfig);
    console.log('Connected to the database!');

    
    const newEmployee = {
      name: 'Test Abc',
      position: 'Software Developer',
      salary: 60000,
    };
    const insertResult = await insertEmployee(connection, newEmployee);
    console.log('New employee added with ID:', insertResult.insertId);

   
    const allEmployees = await getAllEmployees(connection);
    console.log('All employees:', allEmployees);

    
    connection.end();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error:', error);
  }
}


main();
