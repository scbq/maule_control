const mysql = require("mysql2/promise");

// Configuración de la base de datos
const pool = mysql.createPool({
  host: "207.210.102.120",
  user: "totalcon_maule_control",
  password: "Fa02125019f@",
  database: "totalcon_maul_control",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
