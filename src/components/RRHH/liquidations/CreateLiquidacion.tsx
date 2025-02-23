import React, { useState } from 'react';
import { toast } from 'sonner';
import { Save, FileSpreadsheet, File as FilePdf } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface LiquidacionForm {
  empleado: string;
  periodo: string;
  fechaEmision: string;
  sueldoBase: number;
  horasExtras: number;
  bonos: number;
  comisiones: number;
  descuentos: number;
  prevision: string;
  salud: string;
  diasTrabajados: number;
  observaciones: string;
}

const CreateLiquidacion = () => {
  const [formData, setFormData] = useState<LiquidacionForm>({
    empleado: '',
    periodo: '',
    fechaEmision: '',
    sueldoBase: 0,
    horasExtras: 0,
    bonos: 0,
    comisiones: 0,
    descuentos: 0,
    prevision: '',
    salud: '',
    diasTrabajados: 0,
    observaciones: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to a database
    toast.success('Liquidación creada correctamente');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setFormData({
      empleado: '',
      periodo: '',
      fechaEmision: '',
      sueldoBase: 0,
      horasExtras: 0,
      bonos: 0,
      comisiones: 0,
      descuentos: 0,
      prevision: '',
      salud: '',
      diasTrabajados: 0,
      observaciones: ''
    });
    toast.info('Formulario reiniciado');
  };

  const calculateTotal = () => {
    const total = formData.sueldoBase + formData.horasExtras + formData.bonos + formData.comisiones - formData.descuentos;
    return total;
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([
      {
        ...formData,
        totalRemuneracion: calculateTotal()
      }
    ]);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Liquidación');
    XLSX.writeFile(workbook, `Liquidacion_${formData.empleado}_${formData.periodo}.xlsx`);
    toast.success('Liquidación exportada a Excel');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Liquidación de Sueldo', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Empleado: ${formData.empleado}`, 20, 40);
    doc.text(`Periodo: ${formData.periodo}`, 20, 50);
    doc.text(`Fecha Emisión: ${formData.fechaEmision}`, 20, 60);
    
    const data = [
      ['Concepto', 'Monto'],
      ['Sueldo Base', formData.sueldoBase],
      ['Horas Extras', formData.horasExtras],
      ['Bonos', formData.bonos],
      ['Comisiones', formData.comisiones],
      ['Descuentos', formData.descuentos],
      ['Total', calculateTotal()]
    ];

    (doc as any).autoTable({
      startY: 70,
      head: [['Concepto', 'Monto']],
      body: data.slice(1),
    });
    
    doc.save(`Liquidacion_${formData.empleado}_${formData.periodo}.pdf`);
    toast.success('Liquidación exportada a PDF');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Crear Nueva Liquidación</h2>
        <div className="space-x-2">
          <button
            onClick={exportToExcel}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Exportar Excel
          </button>
          <button
            onClick={exportToPDF}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <FilePdf className="w-4 h-4 mr-2" />
            Exportar PDF
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="empleado" className="block text-sm font-medium text-gray-700">
              Empleado
            </label>
            <input
              type="text"
              id="empleado"
              name="empleado"
              value={formData.empleado}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="periodo" className="block text-sm font-medium text-gray-700">
              Periodo
            </label>
            <input
              type="month"
              id="periodo"
              name="periodo"
              value={formData.periodo}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="fechaEmision" className="block text-sm font-medium text-gray-700">
              Fecha de Emisión
            </label>
            <input
              type="date"
              id="fechaEmision"
              name="fechaEmision"
              value={formData.fechaEmision}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="diasTrabajados" className="block text-sm font-medium text-gray-700">
              Días Trabajados
            </label>
            <input
              type="number"
              id="diasTrabajados"
              name="diasTrabajados"
              value={formData.diasTrabajados}
              onChange={handleChange}
              required
              min="0"
              max="31"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="sueldoBase" className="block text-sm font-medium text-gray-700">
              Sueldo Base
            </label>
            <input
              type="number"
              id="sueldoBase"
              name="sueldoBase"
              value={formData.sueldoBase}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="horasExtras" className="block text-sm font-medium text-gray-700">
              Horas Extras
            </label>
            <input
              type="number"
              id="horasExtras"
              name="horasExtras"
              value={formData.horasExtras}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="bonos" className="block text-sm font-medium text-gray-700">
              Bonos
            </label>
            <input
              type="number"
              id="bonos"
              name="bonos"
              value={formData.bonos}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="comisiones" className="block text-sm font-medium text-gray-700">
              Comisiones
            </label>
            <input
              type="number"
              id="comisiones"
              name="comisiones"
              value={formData.comisiones}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="descuentos" className="block text-sm font-medium text-gray-700">
              Descuentos
            </label>
            <input
              type="number"
              id="descuentos"
              name="descuentos"
              value={formData.descuentos}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="prevision" className="block text-sm font-medium text-gray-700">
              Previsión
            </label>
            <select
              id="prevision"
              name="prevision"
              value={formData.prevision}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Seleccione AFP</option>
              <option value="capital">Capital</option>
              <option value="cuprum">Cuprum</option>
              <option value="habitat">Habitat</option>
              <option value="planvital">Planvital</option>
              <option value="provida">Provida</option>
              <option value="modelo">Modelo</option>
            </select>
          </div>

          <div>
            <label htmlFor="salud" className="block text-sm font-medium text-gray-700">
              Salud
            </label>
            <select
              id="salud"
              name="salud"
              value={formData.salud}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Seleccione Isapre/Fonasa</option>
              <option value="fonasa">Fonasa</option>
              <option value="banmedica">Banmédica</option>
              <option value="colmena">Colmena</option>
              <option value="cruzblanca">Cruz Blanca</option>
              <option value="vidatres">Vida Tres</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">
            Observaciones
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">Total Remuneración</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            ${calculateTotal().toLocaleString()}
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLiquidacion;