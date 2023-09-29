const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'identitas', 
};

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
  if (error) {
    console.erroror(error);
    throw error;
  }
  console.log('koneksi berhasil');
});

module.exports = connection;