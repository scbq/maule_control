require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Importamos la conexión a la BD

const app = express();
app.use(cors());
app.use(express.json()); // Para procesar JSON en las solicitudes

// Ruta de prueba para verificar que el backend funciona
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

// **Rutas CRUD para Clientes**
// Obtener todos los clientes (con búsqueda opcional)
app.get("/clientes", async (req, res) => {
  try {
    const { search, type } = req.query;
    let query = "SELECT * FROM Clientes";
    let values = [];

    if (search && type && type !== "all") {
      switch (type) {
        case "nombre":
          query += " WHERE nombre ILIKE $1";
          break;
        case "rut":
          query += " WHERE rut ILIKE $1";
          break;
        case "direccion":
          query += " WHERE direccion ILIKE $1";
          break;
        default:
          return res.status(400).json({ error: "Tipo de búsqueda no válido" });
      }
      values.push(`%${search}%`);
    }

    const clientes = await pool.query(query, values);
    res.json(clientes.rows);
  } catch (err) {
    console.error("❌ Error en la búsqueda de clientes:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Obtener un cliente por ID
app.get("/clientes/:rut", async (req, res) => {
  try {
    const { rut } = req.params;
    const cliente = await pool.query("SELECT * FROM Clientes WHERE rut = $1", [
      rut,
    ]);

    if (cliente.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(cliente.rows[0]);
  } catch (err) {
    console.error("❌ Error al buscar cliente:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.put("/clientes/:rut", async (req, res) => {
  try {
    const { rut } = req.params;
    const { nombre, encargado, direccion, telefono, correo } = req.body;

    const clienteExistente = await pool.query(
      "SELECT * FROM Clientes WHERE rut = $1",
      [rut]
    );

    if (clienteExistente.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    await pool.query(
      "UPDATE Clientes SET nombre = $1, encargado = $2, direccion = $3, telefono = $4, correo = $5 WHERE rut = $6",
      [nombre, encargado, direccion, telefono, correo, rut]
    );

    res.json({ message: "Cliente actualizado con éxito" });
  } catch (err) {
    console.error("❌ Error al actualizar cliente:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Agregar un nuevo cliente
app.post("/clientes", async (req, res) => {
  try {
    console.log("📌 Datos recibidos en el backend:", req.body);

    const { nombre, rut, encargado, direccion, telefono, correo } = req.body; // 🔹 Cambiamos ubicacion por direccion

    if (!nombre || !rut || !telefono || !correo) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const nuevoCliente = await pool.query(
      "INSERT INTO Clientes (nombre, rut, encargado, direccion, telefono, correo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nombre, rut, encargado, direccion, telefono, correo] // 🔹 Cambiamos ubicacion por direccion
    );

    console.log("✅ Cliente insertado con éxito:", nuevoCliente.rows[0]);

    res.status(201).json({
      message: "Cliente registrado con éxito",
      cliente: nuevoCliente.rows[0],
    });
  } catch (err) {
    console.error("❌ Error en el servidor:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar un cliente
app.put("/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, rut, direccion, telefono, correo } = req.body;
    await pool.query(
      "UPDATE Clientes SET nombre = $1, rut = $2, direccion = $3, telefono = $4, correo = $5 WHERE id_cliente = $6",
      [nombre, rut, direccion, telefono, correo, id]
    );
    res.send("Cliente actualizado");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al actualizar el cliente");
  }
});

// Eliminar un cliente
app.delete("/clientes/:rut", async (req, res) => {
  try {
    const { rut } = req.params;

    const clienteExistente = await pool.query(
      "SELECT * FROM Clientes WHERE rut = $1",
      [rut]
    );

    if (clienteExistente.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    await pool.query("DELETE FROM Clientes WHERE rut = $1", [rut]);

    res.json({ message: "Cliente eliminado correctamente" });
  } catch (err) {
    console.error("❌ Error al eliminar cliente:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
