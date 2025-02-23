require("dotenv").config();
const mysql = require("mysql2/promise");

// Crear una conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Dirección del hosting donde está la BD
  user: process.env.DB_USER, // Usuario de la BD
  password: process.env.DB_PASSWORD, // Contraseña de la BD
  database: process.env.DB_NAME, // Nombre de la BD
  port: process.env.DB_PORT || 3306, // Puerto de MySQL (3306 por defecto)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
