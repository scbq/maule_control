<<<<<<< HEAD
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Search } from 'lucide-react';

interface ClientForm {
    giro: string;
    razonSocial: string;
    rut: string;
    encargado: string;
    ubicacion: string;
    telefono: string;
    email: string;
  }

const ModifyClient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [found, setFound] = useState(false);
  const [formData, setFormData] = useState<ClientForm>({
    giro: '',
    razonSocial: '',
    rut: '',
    encargado: '',
    ubicacion: '',
    telefono: '',
    email: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search in a database
    // For demo purposes, we'll simulate finding a client
    setFound(true);
    setFormData({
      giro: searchTerm,
      razonSocial: 'Transporte Andino Limitada',
      rut: '77.703.222-8',
      encargado: 'Juan Pérez',
      ubicacion: 'Piso 2',
      telefono: '+56912345678',
      email: 'cliente@ejemplo.com'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the database
    toast.success('cliente modificado correctamente');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setFound(false);
    setSearchTerm('');
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
      <h2 className="text-2xl font-bold mb-6">Modificar Cliente</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Buscar Cliente
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Giro del Cliente"
            />
          </div>
          <button
            type="submit"
            className="mt-7 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </button>
        </div>
      </form>

      {/* Edit Form */}
      {found && (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="giro" className="block text-sm font-medium text-gray-700">
              Giro del Cliente
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
              Rut
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
              Guardar Cambios
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ModifyClient;
=======
import React, { useState } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";
import api from "../../../api"; // ✅ Importación corregida

interface ClientForm {
  nombre: string;
  rut: string;
  encargado: string;
  direccion: string;
  telefono: string;
  correo: string;
}

const ModifyClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [found, setFound] = useState(false);
  const [formData, setFormData] = useState<ClientForm>({
    nombre: "",
    rut: "",
    encargado: "",
    direccion: "",
    telefono: "",
    correo: ""
  });

  // 🔹 Buscar Cliente en la BD por RUT
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("🔍 Buscando cliente...");

    try {
      console.log(`📡 Enviando petición: GET /clientes/${searchTerm}`);

      const response = await api.get(`/clientes/${searchTerm}`);

      if (response.data) {
        setFormData(response.data);
        setFound(true);
        toast.success("✅ Cliente encontrado!");
        console.log("📋 Datos del cliente recibidos:", response.data);
      } else {
        toast.error("⚠️ Cliente no encontrado.");
        setFound(false);
      }
    } catch (error) {
      console.error("❌ Error al buscar cliente:", error);
      toast.error("❌ Cliente no encontrado.");
      setFound(false);
    }
  };

  // 🔹 Guardar Cambios en la BD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("🔄 Guardando cambios...");

    try {
      console.log(`📡 Enviando petición: PUT /clientes/${formData.rut}`);
      console.log("📤 Datos enviados:", formData);

      await api.put(`/clientes/${formData.rut}`, formData);
      toast.success("✅ Cliente modificado correctamente!");
    } catch (error) {
      console.error("❌ Error al modificar cliente:", error);
      toast.error("❌ Error al modificar el cliente.");
    }
  };

  // 🔹 Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFound(false);
    setSearchTerm("");
    setFormData({
      nombre: "",
      rut: "",
      encargado: "",
      direccion: "",
      telefono: "",
      correo: ""
    });
    toast.info("⚠️ Edición cancelada.");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Modificar Cliente</h2>

      {/* 🔹 Buscar Cliente */}
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Buscar Cliente por RUT
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ejemplo: 77.703.222-8"
            />
          </div>
          <button
            type="submit"
            className="mt-7 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </button>
        </div>
      </form>

      {/* 🔹 Formulario de Edición */}
      {found && (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre del Cliente
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
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
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
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
              Guardar Cambios
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ModifyClient;
>>>>>>> f7b3561ef45c376070f3047dc9a31893192d6658
