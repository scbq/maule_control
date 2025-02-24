import React, { useState } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";
import api from "../../../api"; // Asegúrate de que la ruta sea correcta

interface DepartmentForm {
  id_departamento: number;
  nombre: string;
  descripcion: string;
}

const ModifyDepartment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [found, setFound] = useState(false);
  const [formData, setFormData] = useState<DepartmentForm>({
    id_departamento: 0,
    nombre: "",
    descripcion: "",
  });

  // 🔹 Buscar Departamento por ID
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.get(`/departamentos/${searchTerm}`);
      setFormData(response.data);
      setFound(true);
      toast.success("Departamento encontrado!");
    } catch (error) {
      console.error("❌ Error al buscar departamento:", error);
      toast.error("Departamento no encontrado");
      setFound(false);
    }
  };

  // 🔹 Guardar Cambios en la BD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/departamentos/${formData.id_departamento}`, formData);
      toast.success("Departamento modificado correctamente!");
    } catch (error) {
      console.error("❌ Error al modificar departamento:", error);
      toast.error("Error al modificar el departamento");
    }
  };

  // 🔹 Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFound(false);
    setSearchTerm("");
    setFormData({
      id_departamento: 0,
      nombre: "",
      descripcion: "",
    });
    toast.info("Formulario reiniciado");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Modificar Departamento</h2>

      {/* Buscar Departamento */}
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Buscar Departamento por ID
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ejemplo: 1"
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

      {/* Formulario de Edición */}
      {found && (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre del Departamento
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
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="ml-4 bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default ModifyDepartment;
