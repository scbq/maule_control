const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Importar la conexión con promesas

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/clientes", async (req, res) => {
  console.log("📡 Recibida petición: GET /clientes");
  try {
    const [rows] = await pool.query("SELECT * FROM Clientes");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error en la búsqueda de clientes:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Crear un nuevo cliente
app.post("/clientes", async (req, res) => {
  console.log("📡 Recibida petición: POST /clientes", req.body);
  const { nombre, rut, direccion, telefono, correo, encargado } = req.body;

  if (!nombre || !rut || !telefono || !correo) {
    return res.status(400).json({ error: "❌ Campos obligatorios faltantes." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO Clientes (nombre, rut, direccion, telefono, correo, encargado) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, rut, direccion, telefono, correo, encargado]
    );

    res.status(201).json({
      message: "✅ Cliente registrado con éxito!",
      id: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error al registrar el cliente:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});
