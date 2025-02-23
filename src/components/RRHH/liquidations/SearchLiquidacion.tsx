import React, { useState } from 'react';
import { Search, FileSpreadsheet, File as FilePdf, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Liquidacion {
  id: number;
  empleado: string;
  periodo: string;
  fechaEmision: string;
  sueldoBase: number;
  horasExtras: number;
  bonos: number;
  comisiones: number;
  descuentos: number;
  total: number;
}

const SearchLiquidacion = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [liquidaciones, setLiquidaciones] = useState<Liquidacion[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search in a database
    setLiquidaciones([
      {
        id: 1,
        empleado: 'Juan Pérez',
        periodo: '2024-03',
        fechaEmision: '2024-03-25',
        sueldoBase: 500000,
        horasExtras: 50000,
        bonos: 30000,
        comisiones: 20000,
        descuentos: 45000,
        total: 555000
      },
      {
        id: 2,
        empleado: 'María González',
        periodo: '2024-03',
        fechaEmision: '2024-03-25',
        sueldoBase: 600000,
        horasExtras: 40000,
        bonos: 25000,
        comisiones: 30000,
        descuentos: 50000,
        total: 645000
      }
    ]);
  };

  const exportToExcel = (liquidacion: Liquidacion) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([liquidacion]);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Liquidación');
    XLSX.writeFile(workbook, `Liquidacion_${liquidacion.empleado}_${liquidacion.periodo}.xlsx`);
    toast.success('Liquidación exportada a Excel');
  };

  const exportToPDF = (liquidacion: Liquidacion) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Liquidación de Sueldo', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Empleado: ${liquidacion.empleado}`, 20, 40);
    doc.text(`Periodo: ${liquidacion.periodo}`, 20, 50);
    doc.text(`Fecha Emisión: ${liquidacion.fechaEmision}`, 20, 60);
    
    const data = [
      ['Concepto', 'Monto'],
      ['Sueldo Base', liquidacion.sueldoBase],
      ['Horas Extras', liquidacion.horasExtras],
      ['Bonos', liquidacion.bonos],
      ['Comisiones', liquidacion.comisiones],
      ['Descuentos', liquidacion.descuentos],
      ['Total', liquidacion.total]
    ];

    (doc as any).autoTable({
      startY: 70,
      head: [['Concepto', 'Monto']],
      body: data.slice(1),
    });
    
    doc.save(`Liquidacion_${liquidacion.empleado}_${liquidacion.periodo}.pdf`);
    toast.success('Liquidación exportada a PDF');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Buscar Liquidaciones</h2>

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
              placeholder="Nombre del empleado o periodo"
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
              <option value="all">Todas las liquidaciones</option>
              <option value="employee">Por empleado</option>
              <option value="period">Por periodo</option>
              <option value="date">Por fecha de emisión</option>
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
      {liquidaciones.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empleado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periodo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Emisión
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {liquidaciones.map((liquidacion) => (
                <tr key={liquidacion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {liquidacion.empleado}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {liquidacion.periodo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {liquidacion.fechaEmision}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    ${liquidacion.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => exportToExcel(liquidacion)}
                        className="text-green-600 hover:text-green-900"
                        title="Exportar a Excel"
                      >
                        <FileSpreadsheet className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => exportToPDF(liquidacion)}
                        className="text-red-600 hover:text-red-900"
                        title="Exportar a PDF"
                      >
                        <FilePdf className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="text-blue-600 hover:text-blue-900"
                        title="Descargar"
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

export default SearchLiquidacion;