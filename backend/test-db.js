const pool = require("./db");

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Conexión exitosa a MySQL. Resultado:", rows[0].result);
  } catch (error) {
    console.error("❌ Error en la conexión a MySQL:", error);
  }
}

testConnection();
