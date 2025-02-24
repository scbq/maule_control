const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Importar la conexión con promesas

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// CRUD de Clientes
// ✅ **Buscar clientes con filtros dinámicos**
app.get("/clientes", async (req, res) => {
  console.log("📡 Recibida petición: GET /clientes");

  try {
    const { search, type } = req.query;
    let query = "SELECT * FROM Clientes";
    let values = [];

    if (search && type && type !== "all") {
      switch (type) {
        case "rut":
          query += " WHERE rut LIKE ?";
          break;
        case "nombre":
          query += " WHERE nombre LIKE ?";
          break;
        case "direccion":
          query += " WHERE direccion LIKE ?";
          break;
        default:
          return res.status(400).json({ error: "Tipo de búsqueda no válido" });
      }
      values.push(`%${search}%`);
    }

    const [rows] = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error en la búsqueda de clientes:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Buscar cliente por RUT**
app.get("/clientes/:rut", async (req, res) => {
  console.log(`📡 Recibida petición: GET /clientes/${req.params.rut}`);

  try {
    const { rut } = req.params;
    const [cliente] = await pool.query("SELECT * FROM Clientes WHERE rut = ?", [
      rut,
    ]);

    if (cliente.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    console.log("📋 Cliente encontrado:", cliente[0]);
    res.json(cliente[0]);
  } catch (error) {
    console.error("❌ Error al buscar cliente:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Crear un nuevo cliente**
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

    console.log("✅ Cliente registrado con éxito!");
    res
      .status(201)
      .json({ message: "Cliente registrado con éxito!", id: result.insertId });
  } catch (error) {
    console.error("❌ Error al registrar el cliente:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Actualizar Cliente por RUT**
app.put("/clientes/:rut", async (req, res) => {
  console.log(`📡 Recibida petición: PUT /clientes/${req.params.rut}`);

  try {
    const { rut } = req.params;
    const { nombre, encargado, direccion, telefono, correo } = req.body;

    const [clienteExistente] = await pool.query(
      "SELECT * FROM Clientes WHERE rut = ?",
      [rut]
    );

    if (clienteExistente.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    await pool.query(
      "UPDATE Clientes SET nombre = ?, encargado = ?, direccion = ?, telefono = ?, correo = ? WHERE rut = ?",
      [nombre, encargado, direccion, telefono, correo, rut]
    );

    console.log(`✅ Cliente con RUT ${rut} actualizado.`);
    res.json({ message: "Cliente actualizado con éxito" });
  } catch (error) {
    console.error("❌ Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Eliminar un cliente por RUT**
app.delete("/clientes/:rut", async (req, res) => {
  console.log(`📡 Recibida petición: DELETE /clientes/${req.params.rut}`);

  try {
    const { rut } = req.params;

    const [clienteExistente] = await pool.query(
      "SELECT * FROM Clientes WHERE rut = ?",
      [rut]
    );

    if (clienteExistente.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    await pool.query("DELETE FROM Clientes WHERE rut = ?", [rut]);

    console.log(`🗑️ Cliente con RUT ${rut} eliminado.`);
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Iniciar el servidor**
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});
