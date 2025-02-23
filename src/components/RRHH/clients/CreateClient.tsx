import React, { useState } from "react";
import api from "../../../api"; // Asegúrate de que la ruta de `api.ts` sea correcta

const CreateClient: React.FC = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    rut: "",
    giro: "",
    encargado: "",
    ubicacion: "",
    telefono: "",
    correo: "",
  });

  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);

    try {
      const response = await api.post("/clientes", cliente);
      setMensaje("✅ Cliente registrado con éxito!");
      console.log(response.data);
    } catch (error) {
      console.error("Error al registrar el cliente:", error);
      setMensaje("❌ Error al registrar el cliente.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Registrar Nuevo Cliente</h2>
      
      {mensaje && <p className="mb-4 text-center text-sm text-gray-700">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="nombre" placeholder="Razón Social" value={cliente.nombre} onChange={handleChange} required />
          <input type="text" name="rut" placeholder="RUT" value={cliente.rut} onChange={handleChange} required />
          <input type="text" name="giro" placeholder="Giro" value={cliente.giro} onChange={handleChange} />
          <input type="text" name="encargado" placeholder="Encargado" value={cliente.encargado} onChange={handleChange} />
          <input type="text" name="ubicacion" placeholder="Ubicación" value={cliente.ubicacion} onChange={handleChange} />
          <input type="text" name="telefono" placeholder="Teléfono" value={cliente.telefono} onChange={handleChange} required />
          <input type="email" name="correo" placeholder="Correo" value={cliente.correo} onChange={handleChange} required />
        </div>
        
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Guardar Cliente
        </button>
      </form>
    </div>
  );
};

export default CreateClient;
