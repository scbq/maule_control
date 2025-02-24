// src/components/Departments/DeleteDepartment.tsx
import React, { useState } from "react";
import { toast } from "sonner";
import api from "../../../api";

const DeleteDepartment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState<{ id_departamento: number; nombre: string } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.get(`/departamentos/${searchTerm}`);
      setDepartment(response.data);
    } catch (error) {
      console.error("❌ Error al buscar departamento:", error);
      toast.error("Departamento no encontrado");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/departamentos/${department?.id_departamento}`);
      toast.success("Departamento eliminado correctamente");
      setDepartment(null);
      setSearchTerm("");
      setShowConfirmation(false);
    } catch (error) {
      console.error("❌ Error al eliminar departamento:", error);
      toast.error("Error al eliminar el departamento");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Eliminar Departamento</h2>
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="ID del Departamento"
        />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Buscar</button>
      </form>

      {department && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Departamento encontrado</h3>
          <p>Nombre: {department.nombre}</p>
          {!showConfirmation ? (
            <button onClick={() => setShowConfirmation(true)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md">Eliminar</button>
          ) : (
            <div>
              <p className="text-red-600">¿Está seguro de eliminar este departamento?</p>
              <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md">Sí, eliminar</button>
              <button onClick={() => setShowConfirmation(false)} className="ml-4 px-4 py-2 bg-gray-300 rounded-md">Cancelar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteDepartment;
