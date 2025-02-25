<<<<<<< HEAD
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Supplier {
  id: number;
  giro: string;
  razonSocial: string;
  rut: string;
  encargado: string;
  ubicacion: string;
  telefono: string;
  email: string;
}

const SearchSupplier = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search in a database
    // For demo purposes, we'll simulate finding supplier
    setSuppliers([
      {
        id: 1,
        giro: 'Transporte',
        razonSocial: 'electricidad andino limitada',
        rut: '77.555.999-7',
        encargado: 'Juan Pérez',
        ubicacion: 'Piso 2',
        telefono: '+56912345678',
        email: 'rrhh@ejemplo.com'
      },
      {
        id: 2,
        giro: 'Transporte',
        razonSocial: 'Constructora andino limitada',
        rut: '77.555.999-7',
        encargado: 'María González',
        ubicacion: 'Piso 1',
        telefono: '+56987654321',
        email: 'contabilidad@ejemplo.com'
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Buscar Proveedor</h2>

      {/* Search Form */}
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
              placeholder="Giro, Razon Social o Rut"
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
              <option value="all">Todos los Proveedores</option>
              <option value="name">Por giro</option>
              <option value="manager">Por razon social</option>
              <option value="location">Por rut</option>
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

      {/* Results Table */}
      {suppliers.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giro y Razon Social
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Encargado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contactos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((suppl) => (
                <tr key={suppl.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{suppl.giro}</div>
                    <div className="text-sm text-gray-500">{suppl.razonSocial}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {suppl.rut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {suppl.encargado}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{suppl.telefono}</div>
                    <div className="text-sm text-gray-500">{suppl.email}</div>
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

=======
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Supplier {
  id: number;
  giro: string;
  razonSocial: string;
  rut: string;
  encargado: string;
  ubicacion: string;
  telefono: string;
  email: string;
}

const SearchSupplier = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search in a database
    // For demo purposes, we'll simulate finding supplier
    setSuppliers([
      {
        id: 1,
        giro: 'Transporte',
        razonSocial: 'electricidad andino limitada',
        rut: '77.555.999-7',
        encargado: 'Juan Pérez',
        ubicacion: 'Piso 2',
        telefono: '+56912345678',
        email: 'rrhh@ejemplo.com'
      },
      {
        id: 2,
        giro: 'Transporte',
        razonSocial: 'Constructora andino limitada',
        rut: '77.555.999-7',
        encargado: 'María González',
        ubicacion: 'Piso 1',
        telefono: '+56987654321',
        email: 'contabilidad@ejemplo.com'
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Buscar Proveedor</h2>

      {/* Search Form */}
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
              placeholder="Giro, Razon Social o Rut"
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
              <option value="all">Todos los Proveedores</option>
              <option value="name">Por giro</option>
              <option value="manager">Por razon social</option>
              <option value="location">Por rut</option>
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

      {/* Results Table */}
      {suppliers.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giro y Razon Social
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Encargado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contactos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((suppl) => (
                <tr key={suppl.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{suppl.giro}</div>
                    <div className="text-sm text-gray-500">{suppl.razonSocial}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {suppl.rut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {suppl.encargado}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{suppl.telefono}</div>
                    <div className="text-sm text-gray-500">{suppl.email}</div>
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

>>>>>>> f7b3561ef45c376070f3047dc9a31893192d6658
export default SearchSupplier;