import React, { useState } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";
import api from "../../../api"; // ✅ Importación correcta

interface WorkerForm {
  nombre: string;
  rut: string;
  cargo: string;
  fecha_contratacion: string;
  afp: string;
  sistema_salud: string;
  sueldo_base: number;
  id_departamento: number;
  es_chofer: boolean;
}

const ModifyWorker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [found, setFound] = useState(false);
  const [formData, setFormData] = useState<WorkerForm>({
    nombre: "",
    rut: "",
    cargo: "",
    fecha_contratacion: "",
    afp: "",
    sistema_salud: "",
    sueldo_base: 0,
    id_departamento: 0,
    es_chofer: false,
  });

  // 🔹 Buscar Trabajador por RUT
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.get(`/trabajadores/${searchTerm}`);
      setFormData(response.data);
      setFound(true);
      toast.success("Trabajador encontrado!");
    } catch (error) {
      console.error("❌ Error al buscar trabajador:", error);
      toast.error("Trabajador no encontrado");
      setFound(false);
    }
  };

  // 🔹 Guardar Cambios en la BD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/trabajadores/${formData.rut}`, formData);
      toast.success("Trabajador modificado correctamente!");
    } catch (error) {
      console.error("❌ Error al modificar trabajador:", error);
      toast.error("Error al modificar el trabajador");
    }
  };

  // 🔹 Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "sueldo_base" || name === "id_departamento") {
      setFormData({ ...formData, [name]: Number(value) });
    } else if (name === "es_chofer") {
      setFormData({ ...formData, es_chofer: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCancel = () => {
    setFound(false);
    setSearchTerm("");
    setFormData({
      nombre: "",
      rut: "",
      cargo: "",
      fecha_contratacion: "",
      afp: "",
      sistema_salud: "",
      sueldo_base: 0,
      id_departamento: 0,
      es_chofer: false,
    });
    toast.info("Formulario reiniciado");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Modificar Trabajador</h2>

      {/* Buscar Trabajador */}
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Buscar Trabajador por RUT
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ejemplo: 9.555.999-7"
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

      {/* Formulario de Modificación */}
      {found && (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cargo</label>
            <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} required className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Contratación</label>
            <input type="date" name="fecha_contratacion" value={formData.fecha_contratacion} onChange={handleChange} required className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">AFP</label>
            <input type="text" name="afp" value={formData.afp} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sistema de Salud</label>
            <select name="sistema_salud" value={formData.sistema_salud} onChange={handleChange} required className="input">
              <option value="">Seleccione</option>
              <option value="Fonasa">Fonasa</option>
              <option value="Isapre">Isapre</option>
              <option value="Dipreca">Dipreca</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sueldo Base</label>
            <input type="number" name="sueldo_base" value={formData.sueldo_base} onChange={handleChange} required className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ID Departamento</label>
            <input type="number" name="id_departamento" value={formData.id_departamento} onChange={handleChange} required className="input" />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="es_chofer" name="es_chofer" checked={formData.es_chofer} onChange={handleChange} />
            <label htmlFor="es_chofer" className="ml-2 text-sm text-gray-700">Es Chofer</label>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={handleCancel} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-primary">Guardar Cambios</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ModifyWorker;
