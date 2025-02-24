import React, { useState } from 'react';
import { toast } from 'sonner';
import { Search, AlertTriangle, FileSpreadsheet, File as FilePdf } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Liquidacion {
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

const DeleteLiquidacion = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [found, setFound] = useState(false);
  const [liquidacion, setLiquidacion] = useState<Liquidacion | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search in a database
    setFound(true);
    setLiquidacion({
      empleado: 'Juan Pérez',
      periodo: '2024-03',
      fechaEmision: '2024-03-25',
      sueldoBase: 500000,
      horasExtras: 50000,
      bonos: 30000,
      comisiones: 20000,
      descuentos: 45000,
      total: 555000
    });
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    // Here you would typically delete from the database
    toast.success('Liquidación eliminada correctamente');
    setFound(false);
    setLiquidacion(null);
    setSearchTerm('');
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setFound(false);
    setLiquidacion(null);
    setSearchTerm('');
    setShowConfirmation(false);
    toast.info('Operación cancelada');
  };

  const exportToExcel = () => {
    if (!liquidacion) return;
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([liquidacion]);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Liquidación');
    XLSX.writeFile(workbook, `Liquidacion_${liquidacion.empleado}_${liquidacion.periodo}.xlsx`);
    toast.success('Liquidación exportada a Excel');
  };

  const exportToPDF = () => {
    if (!liquidacion) return;
    
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
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Eliminar Liquidación</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Buscar Liquidación
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
          <button
            type="submit"
            className="mt-7 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </button>
        </div>
      </form>

      {/* Liquidacion Information */}
      {found && liquidacion && (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{liquidacion.empleado}</h3>
              <p className="mt-1 text-sm text-gray-500">Periodo: {liquidacion.periodo}</p>
              <p className="text-sm text-gray-500">Fecha de Emisión: {liquidacion.fechaEmision}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={exportToExcel}
                className="text-green-600 hover:text-green-900"
                title="Exportar a Excel"
              >
                <FileSpreadsheet className="w-5 h-5" />
              </button>
              <button
                onClick={exportToPDF}
                className="text-red-600 hover:text-red-900"
                title="Exportar a PDF"
              >
                <FilePdf className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-500">Sueldo Base</p>
              <p className="mt-1">${liquidacion.sueldoBase.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Horas Extras</p>
              <p className="mt-1">${liquidacion.horasExtras.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Bonos</p>
              <p className="mt-1">${liquidacion.bonos.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Comisiones</p>
              <p className="mt-1">${liquidacion.comisiones.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Descuentos</p>
              <p className="mt-1">${liquidacion.descuentos.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Total</p>
              <p className="mt-1 font-bold text-blue-600">${liquidacion.total.toLocaleString()}</p>
            </div>
          </div>

          {!showConfirmation ? (
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmation(true)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          ) : (
            <div className="border-t pt-4 mt-4">
              <div className="bg-red-50 p-4 rounded-md">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                  <h3 className="text-sm font-medium text-red-800">
                    ¿Está seguro que desea eliminar esta liquidación?
                  </h3>
                </div>
                <p className="mt-2 text-sm text-red-700">
                  Esta acción no se puede deshacer. La liquidación será eliminada permanentemente.
                </p>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Sí, eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteLiquidacion;