import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import api from "../../../api"; // ✅ Importación correcta

interface Worker {
  id_trabajador: number;
  nombre: string;
  rut: string;
  cargo: string;
  fecha_contratacion: string;
  afp: string | null;
  sistema_salud: string | null;
  sueldo_base: number;
  id_departamento: number;
  es_chofer: boolean;
}

const SearchWorker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [workers, setWorkers] = useState<Worker[]>([]);

  // 🔹 Cargar todos los trabajadores al inicio
  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await api.get("/trabajadores", {
        params: { search: "", type: "all" },
      });
      setWorkers(response.data);
    } catch (error) {
      console.error("❌ Error al obtener trabajadores:", error);
      toast.error("Error al obtener trabajadores");
    }
  };

  // 🔹 Buscar trabajadores en la BD
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.get("/trabajadores", {
        params: { search: searchTerm, type: searchType },
      });

      setWorkers(response.data);
      if (response.data.length > 0) {
        toast.success("Trabajadores encontrados");
      } else {
        toast.info("No se encontraron trabajadores con ese criterio");
      }
    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      toast.error("Error en la búsqueda");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Buscar Trabajador</h2>

      {/* Formulario de Búsqueda */}
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Término de búsqueda
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ingrese Nombre, Rut o Cargo"
            />
          </div>
          <div>
            <label htmlFor="searchType" className="block text-sm font-medium text-gray-700">
              Tipo de búsqueda
            </label>
            <select
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">Todos los trabajadores</option>
              <option value="nombre">Por Nombre</option>
              <option value="rut">Por RUT</option>
              <option value="cargo">Por Cargo</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </button>
        </div>
      </form>

      {/* Tabla de Resultados */}
      {workers.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">RUT</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cargo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Contratación</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">AFP</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salud</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sueldo Base</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chofer</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workers.map((worker) => (
                <tr key={worker.id_trabajador} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">{worker.nombre}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600">{worker.rut}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600">{worker.cargo}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600">{worker.fecha_contratacion}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600">{worker.afp || "N/A"}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600">{worker.sistema_salud || "N/A"}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600">${worker.sueldo_base.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                    {worker.es_chofer ? "✅ Sí" : "❌ No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchWorker;
