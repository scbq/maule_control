<<<<<<< HEAD
import React, { useState } from 'react';
import { toast } from 'sonner';

interface ClientForm {
  giro: string;
  razonSocial: string;
  rut: string;
  encargado: string;
  ubicacion: string;
  telefono: string;
  email: string;
}

const CreateClient = () => {
  const [formData, setFormData] = useState<ClientForm>({
    giro: '',
    razonSocial: '',
    rut: '',
    encargado: '',
    ubicacion: '',
    telefono: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to a database
    toast.success('Cliente creado correctamente');
    setFormData({
      giro: '',
      razonSocial: '',
      rut:'',
      encargado: '',
      ubicacion: '',
      telefono: '',
      email: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setFormData({
      giro: '',
      razonSocial: '',
      rut: '',
      encargado: '',
      ubicacion: '',
      telefono: '',
      email: ''
    });
    toast.info('Formulario reiniciado');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Crear Nuevo Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="giro" className="block text-sm font-medium text-gray-700">
            Giro
          </label>
          <input
            type="text"
            id="giro"
            name="giro"
            value={formData.giro}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700">
            Razon Social
          </label>
          <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            value={formData.razonSocial}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="rut" className="block text-sm font-medium text-gray-700">
            RUT
          </label>
          <input
            type="text"
            id="rut"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="encargado" className="block text-sm font-medium text-gray-700">
            Encargado
          </label>
          <input
            type="text"
            id="encargado"
            name="encargado"
            value={formData.encargado}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
            Ubicación
          </label>
          <input
            type="text"
            id="ubicacion"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClient;
=======
import React, { useState } from "react";
import api from "../../../api"; // Asegúrate de que la ruta de `api.ts` sea correcta

const CreateClient: React.FC = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    rut: "",
    giro: "",
    encargado: "",
    direccion: "", // 🔹 Cambié "ubicacion" por "direccion"
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
          <input type="text" name="direccion" placeholder="Dirección" value={cliente.direccion} onChange={handleChange} /> {/* 🔹 Cambié "ubicacion" por "direccion" */}
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
>>>>>>> f7b3561ef45c376070f3047dc9a31893192d6658
