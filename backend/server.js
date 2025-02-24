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

/* =========================
   CRUD PARA TRABAJADORES
   ========================= */

// ✅ **Buscar trabajadores con filtros dinámicos**
app.get("/trabajadores", async (req, res) => {
  console.log("📡 Recibida petición: GET /trabajadores");

  try {
    const { search, type } = req.query;
    let query = "SELECT * FROM Trabajadores";
    let values = [];

    if (search && type && type !== "all") {
      switch (type) {
        case "rut":
          query += " WHERE rut LIKE ?";
          break;
        case "nombre":
          query += " WHERE nombre LIKE ?";
          break;
        case "cargo":
          query += " WHERE cargo LIKE ?";
          break;
        default:
          return res.status(400).json({ error: "Tipo de búsqueda no válido" });
      }
      values.push(`%${search}%`);
    }

    const [rows] = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error en la búsqueda de trabajadores:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Buscar trabajador por RUT**
app.get("/trabajadores/:rut", async (req, res) => {
  console.log(`📡 Recibida petición: GET /trabajadores/${req.params.rut}`);

  try {
    const { rut } = req.params;
    const [trabajador] = await pool.query(
      "SELECT * FROM Trabajadores WHERE rut = ?",
      [rut]
    );

    if (trabajador.length === 0) {
      return res.status(404).json({ error: "Trabajador no encontrado" });
    }

    console.log("📋 Trabajador encontrado:", trabajador[0]);
    res.json(trabajador[0]);
  } catch (error) {
    console.error("❌ Error al buscar trabajador:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Crear un nuevo trabajador**
app.post("/trabajadores", async (req, res) => {
  console.log("📡 Recibida petición: POST /trabajadores", req.body);
  const {
    nombre,
    rut,
    cargo,
    fecha_contratacion,
    afp,
    sistema_salud,
    sueldo_base,
    id_departamento,
    es_chofer,
  } = req.body;

  if (!nombre || !rut || !cargo || !fecha_contratacion || !sueldo_base) {
    return res.status(400).json({ error: "❌ Campos obligatorios faltantes." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO Trabajadores (nombre, rut, cargo, fecha_contratacion, afp, sistema_salud, sueldo_base, id_departamento, es_chofer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        rut,
        cargo,
        fecha_contratacion,
        afp,
        sistema_salud,
        sueldo_base,
        id_departamento,
        es_chofer,
      ]
    );

    console.log("✅ Trabajador registrado con éxito!");
    res.status(201).json({
      message: "Trabajador registrado con éxito!",
      id: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error al registrar el trabajador:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// 🔹 Actualizar Trabajador por RUT
app.put("/trabajadores/:rut", async (req, res) => {
  console.log(`📡 Recibida petición: PUT /trabajadores/${req.params.rut}`);

  try {
    const { rut } = req.params;
    let {
      nombre,
      cargo,
      fecha_contratacion,
      afp,
      sistema_salud,
      sueldo_base,
      id_departamento,
      es_chofer,
    } = req.body;

    // Verificar si el trabajador existe
    const [trabajadorExistente] = await pool.query(
      "SELECT * FROM Trabajadores WHERE rut = ?",
      [rut]
    );

    if (trabajadorExistente.length === 0) {
      return res.status(404).json({ error: "Trabajador no encontrado" });
    }

    // Manejar valores nulos o incorrectos
    if (!nombre || !cargo || !sueldo_base || !fecha_contratacion) {
      return res
        .status(400)
        .json({ error: "❌ Campos obligatorios faltantes." });
    }

    // Convertir booleano `es_chofer` a `0` o `1`
    es_chofer = es_chofer ? 1 : 0;

    // Si `id_departamento` es vacío, asignar `NULL`
    id_departamento = id_departamento ? parseInt(id_departamento) : null;

    // Validar el formato de la fecha de contratación
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_contratacion)) {
      return res
        .status(400)
        .json({ error: "Formato de fecha inválido (YYYY-MM-DD requerido)" });
    }

    // Actualizar trabajador
    await pool.query(
      `UPDATE Trabajadores 
      SET nombre = ?, cargo = ?, fecha_contratacion = ?, afp = ?, sistema_salud = ?, sueldo_base = ?, id_departamento = ?, es_chofer = ?
      WHERE rut = ?`,
      [
        nombre,
        cargo,
        fecha_contratacion,
        afp,
        sistema_salud,
        sueldo_base,
        id_departamento,
        es_chofer,
        rut,
      ]
    );

    console.log(`✅ Trabajador con RUT ${rut} actualizado.`);
    res.json({ message: "Trabajador actualizado con éxito" });
  } catch (error) {
    console.error("❌ Error al actualizar trabajador:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Eliminar un trabajador por RUT**
app.delete("/trabajadores/:rut", async (req, res) => {
  console.log(`📡 Recibida petición: DELETE /trabajadores/${req.params.rut}`);

  try {
    const { rut } = req.params;

    const [trabajadorExistente] = await pool.query(
      "SELECT * FROM Trabajadores WHERE rut = ?",
      [rut]
    );

    if (trabajadorExistente.length === 0) {
      return res.status(404).json({ error: "Trabajador no encontrado" });
    }

    await pool.query("DELETE FROM Trabajadores WHERE rut = ?", [rut]);

    console.log(`🗑️ Trabajador con RUT ${rut} eliminado.`);
    res.json({ message: "Trabajador eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar trabajador:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

/* =========================
   CRUD PARA DEPARTAMENTOS
   ========================= */

// ✅ **Buscar departamentos con filtros dinámicos**
app.get("/departamentos", async (req, res) => {
  console.log("📡 Recibida petición: GET /departamentos");

  try {
    const { search, type } = req.query;
    let query = "SELECT * FROM Departamentos";
    let values = [];

    if (search && type && type !== "all") {
      switch (type) {
        case "nombre":
          query += " WHERE nombre LIKE ?";
          break;
        case "encargado":
          query += " WHERE encargado LIKE ?";
          break;
        case "ubicacion":
          query += " WHERE ubicacion LIKE ?";
          break;
        default:
          return res.status(400).json({ error: "Tipo de búsqueda no válido" });
      }
      values.push(`%${search}%`);
    }

    const [rows] = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error en la búsqueda de departamentos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Buscar departamento por ID**
app.get("/departamentos/:id", async (req, res) => {
  console.log(`📡 Recibida petición: GET /departamentos/${req.params.id}`);

  try {
    const { id } = req.params;
    const [departamento] = await pool.query("SELECT * FROM Departamentos WHERE id_departamento = ?", [
      id,
    ]);

    if (departamento.length === 0) {
      return res.status(404).json({ error: "Departamento no encontrado" });
    }

    console.log("📋 Departamento encontrado:", departamento[0]);
    res.json(departamento[0]);
  } catch (error) {
    console.error("❌ Error al buscar departamento:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Crear un nuevo departamento**
app.post("/departamentos", async (req, res) => {
  console.log("📡 Recibida petición: POST /departamentos", req.body);
  const { nombre, descripcion, encargado, ubicacion, telefono, email } = req.body;

  if (!nombre || !encargado) {
    return res.status(400).json({ error: "❌ Campos obligatorios faltantes." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO Departamentos (nombre, descripcion, encargado, ubicacion, telefono, email) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, descripcion, encargado, ubicacion, telefono, email]
    );

    console.log("✅ Departamento registrado con éxito!");
    res.status(201).json({
      message: "Departamento registrado con éxito!",
      id: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error al registrar el departamento:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Actualizar Departamento por ID**
app.put("/departamentos/:id", async (req, res) => {
  console.log(`📡 Recibida petición: PUT /departamentos/${req.params.id}`);

  try {
    const { id } = req.params;
    const { nombre, descripcion, encargado, ubicacion, telefono, email } = req.body;

    const [departamentoExistente] = await pool.query(
      "SELECT * FROM Departamentos WHERE id_departamento = ?",
      [id]
    );

    if (departamentoExistente.length === 0) {
      return res.status(404).json({ error: "Departamento no encontrado" });
    }

    await pool.query(
      `UPDATE Departamentos 
      SET nombre = ?, descripcion = ?, encargado = ?, ubicacion = ?, telefono = ?, email = ?
      WHERE id_departamento = ?`,
      [nombre, descripcion, encargado, ubicacion, telefono, email, id]
    );

    console.log(`✅ Departamento con ID ${id} actualizado.`);
    res.json({ message: "Departamento actualizado con éxito" });
  } catch (error) {
    console.error("❌ Error al actualizar departamento:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Eliminar un departamento por ID**
app.delete("/departamentos/:id", async (req, res) => {
  console.log(`📡 Recibida petición: DELETE /departamentos/${req.params.id}`);

  try {
    const { id } = req.params;

    const [departamentoExistente] = await pool.query(
      "SELECT * FROM Departamentos WHERE id_departamento = ?",
      [id]
    );

    if (departamentoExistente.length === 0) {
      return res.status(404).json({ error: "Departamento no encontrado" });
    }

    await pool.query("DELETE FROM Departamentos WHERE id_departamento = ?", [id]);

    console.log(`🗑️ Departamento con ID ${id} eliminado.`);
    res.json({ message: "Departamento eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar departamento:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ **Iniciar el servidor**
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});
