import React, { useState } from "react";
import { Search } from "lucide-react";
import api from "../../../api"; // ✅ Importación corregida

interface Client {
  id_cliente: number;
  nombre: string;
  rut: string;
  encargado: string;
  direccion: string;
  telefono: string;
  correo: string;
}

const SearchClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log(`🔍 Buscando clientes por ${searchType}: "${searchTerm}"`);
      const response = await api.get(`/clientes?search=${searchTerm}&type=${searchType}`);
      setClients(response.data);
    } catch (err) {
      console.error("❌ Error al obtener los clientes:", err);
      setError("No se pudieron cargar los clientes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Buscar Cliente</h2>

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
              placeholder="Nombre, RUT o Dirección"
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
              <option value="all">Todos los clientes</option>
              <option value="nombre">Por Nombre</option>
              <option value="rut">Por RUT</option>
              <option value="direccion">Por Dirección</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </button>
        </div>
      </form>

      {loading && <p>Cargando clientes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {clients.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Encargado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((clie) => (
                <tr key={clie.id_cliente} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">{clie.nombre}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{clie.rut}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{clie.encargado}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{clie.direccion}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{clie.telefono}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{clie.correo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchClient;
