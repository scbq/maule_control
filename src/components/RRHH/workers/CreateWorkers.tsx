import React, { useState } from "react";
import { toast } from "sonner";
import api from "../../../api"; // ✅ Importación correcta

interface WorkerForm {
  nombre: string;
  rut: string;
  cargo: string;
  fecha_contratacion: string;
  afp: string;
  sistema_salud: string;
  sueldo_base: string;
  id_departamento: string;
  es_chofer: boolean;
}

const CreateWorker = () => {
  const [formData, setFormData] = useState<WorkerForm>({
    nombre: "",
    rut: "",
    cargo: "",
    fecha_contratacion: "",
    afp: "",
    sistema_salud: "Fonasa",
    sueldo_base: "",
    id_departamento: "",
    es_chofer: false,
  });

  // 🔹 Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Manejar checkbox de "es_chofer"
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // 🔹 Enviar datos al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/trabajadores", formData);
      toast.success("Trabajador registrado correctamente");
      
      // Reiniciar formulario
      setFormData({
        nombre: "",
        rut: "",
        cargo: "",
        fecha_contratacion: "",
        afp: "",
        sistema_salud: "Fonasa",
        sueldo_base: "",
        id_departamento: "",
        es_chofer: false,
      });

    } catch (error) {
      console.error("❌ Error al registrar trabajador:", error);
      toast.error("Error al registrar el trabajador");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Registrar Nuevo Trabajador</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">RUT</label>
          <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cargo</label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Contratación</label>
          <input
            type="date"
            name="fecha_contratacion"
            value={formData.fecha_contratacion}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">AFP</label>
          <input
            type="text"
            name="afp"
            value={formData.afp}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sistema de Salud</label>
          <select
            name="sistema_salud"
            value={formData.sistema_salud}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Fonasa">Fonasa</option>
            <option value="Isapre">Isapre</option>
            <option value="Dipreca">Dipreca</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sueldo Base</label>
          <input
            type="number"
            name="sueldo_base"
            value={formData.sueldo_base}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ID Departamento</label>
          <input
            type="number"
            name="id_departamento"
            value={formData.id_departamento}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="es_chofer"
            checked={formData.es_chofer}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Es Chofer</label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() =>
              setFormData({
                nombre: "",
                rut: "",
                cargo: "",
                fecha_contratacion: "",
                afp: "",
                sistema_salud: "Fonasa",
                sueldo_base: "",
                id_departamento: "",
                es_chofer: false,
              })
            }
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Guardar Trabajador
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorker;
