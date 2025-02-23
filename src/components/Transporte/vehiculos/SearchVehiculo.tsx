import React, { useState } from 'react';
import { Search, FileSpreadsheet, File as FilePdf, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Vehiculo {
  id: number;
  patente: string;
  marca: string;
  modelo: string;
  año: number;
  tipo: string;
  capacidad: number;
  kilometraje: number;
  estado: string;
  ultimaMantencion: string;
  proximaMantencion: string;
  conductor: string;
}

const SearchVehiculo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search in a database
    setVehiculos([
      {
        id: 1,
        patente: 'ABCD-12',
        marca: 'Toyota',
        modelo: 'Hilux',
        año: 2022,
        tipo: 'camioneta',
        capacidad: 1000,
        kilometraje: 50000,
        estado: 'activo',
        ultimaMantencion: '2024-02-15',
        proximaMantencion: '2024-05-15',
        conductor: 'Juan Pérez'
      },
      {
        id: 2,
        patente: 'WXYZ-98',
        marca: 'Volkswagen',
        modelo: 'Amarok',
        año: 2023,
        tipo: 'camioneta',
        capacidad: 1200,
        kilometraje: 25000,
        estado: 'activo',
        ultimaMantencion: '2024-03-01',
        proximaMantencion: '2024-06-01',
        conductor: 'María González'
      }
    ]);
  };

  const exportToExcel = (vehiculo: Vehiculo) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([vehiculo]);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehículo');
    XLSX.writeFile(workbook, `Vehiculo_${vehiculo.patente}.xlsx`);
    toast.success('Datos del vehículo exportados a Excel');
  };

  const exportToPDF = (vehiculo: Vehiculo) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Información del Vehículo', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Patente: ${vehiculo.patente}`, 20, 40);
    doc.text(`Marca: ${vehiculo.marca} ${vehiculo.modelo}`, 20, 50);
    doc.text(`Año: ${vehiculo.año}`, 20, 60);
    
    const data = [
      ['Campo', 'Valor'],
      ['Tipo', vehiculo.tipo],
      ['Capacidad', `${vehiculo.capacidad} kg`],
      ['Kilometraje', vehiculo.kilometraje],
      ['Estado', vehiculo.estado],
      ['Última Mantención', vehiculo.ultimaMantencion],
      ['Próxima Mantención', vehiculo.proximaMantencion],
      ['Conductor', vehiculo.conductor]
    ];

    (doc as any).autoTable({
      startY: 70,
      head: [['Campo', 'Valor']],
      body: data.slice(1),
    });
    
    doc.save(`Vehiculo_${vehiculo.patente}.pdf`);
    toast.success('Datos del vehículo exportados a PDF');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Buscar Vehículos</h2>

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
              placeholder="Patente, marca o conductor"
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
              <option value="all">Todos los vehículos</option>
              <option value="patente">Por patente</option>
              <option value="marca">Por marca</option>
              <option value="conductor">Por conductor</option>
              <option value="estado">Por estado</option>
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

      {/* Results */}
      {vehiculos.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patente/Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detalles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mantención
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehiculos.map((vehiculo) => (
                <tr key={vehiculo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vehiculo.patente}</div>
                    <div className="text-sm text-gray-500">{vehiculo.marca} {vehiculo.modelo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Año: {vehiculo.año}</div>
                    <div className="text-sm text-gray-500">Km: {vehiculo.kilometraje.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vehiculo.estado === 'activo' ? 'bg-green-100 text-green-800' :
                      vehiculo.estado === 'mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {vehiculo.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Última: {vehiculo.ultimaMantencion}</div>
                    <div>Próxima: {vehiculo.proximaMantencion}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => exportToExcel(vehiculo)}
                        className="text-green-600 hover:text-green-900"
                        title="Exportar a Excel"
                      >
                        <FileSpreadsheet className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => exportToPDF(vehiculo)}
                        className="text-red-600 hover:text-red-900"
                        title="Exportar a PDF"
                      >
                        <FilePdf className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="text-blue-600 hover:text-blue-900"
                        title="Imprimir"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
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

export default SearchVehiculo;