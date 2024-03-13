const { MySQLConnector } = require('anythinglm');

// Create a MySQL connection
const conn = new MySQLConnector({
  host: '127.0.0.1',
  user: 'root',
  password: 'FormR!1234',
  database: 'world'
});

// Write your SQL query
const query = "SELECT * FROM country";

// Execute the query
conn.execute(query, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
});
