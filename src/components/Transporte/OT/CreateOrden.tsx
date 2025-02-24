import React, { useState } from 'react';
import { toast } from 'sonner';
import { Save, FileSpreadsheet, File as FilePdf, Printer } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Viaje {
  origen: string;
  destino: string;
  distancia: number;
  peajes: number;
}

interface GastoAdicional {
  descripcion: string;
  monto: number;
}

interface OrdenTrabajoForm {
  numeroOrden: string;
  fecha: string;
  chofer: string;
  vehiculo: string;
  cliente: string;
  estado: string;
  tipoCarga: string;
  pesoCarga: number;
  viaje: Viaje;
  tarifaBase: number;
  gastosAdicionales: GastoAdicional[];
  observaciones: string;
}

const CreateOrden = () => {
  const [formData, setFormData] = useState<OrdenTrabajoForm>({
    numeroOrden: `OT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    fecha: new Date().toISOString().split('T')[0],
    chofer: '',
    vehiculo: '',
    cliente: '',
    estado: 'pendiente',
    tipoCarga: '',
    pesoCarga: 0,
    viaje: {
      origen: '',
      destino: '',
      distancia: 0,
      peajes: 0
    },
    tarifaBase: 0,
    gastosAdicionales: [],
    observaciones: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to a database
    toast.success('Orden de trabajo creada correctamente');
    exportToPDF();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('viaje.')) {
      const viajeField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        viaje: {
          ...prev.viaje,
          [viajeField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddGasto = () => {
    setFormData(prev => ({
      ...prev,
      gastosAdicionales: [
        ...prev.gastosAdicionales,
        { descripcion: '', monto: 0 }
      ]
    }));
  };

  const handleGastoChange = (index: number, field: 'descripcion' | 'monto', value: string | number) => {
    setFormData(prev => ({
      ...prev,
      gastosAdicionales: prev.gastosAdicionales.map((gasto, i) => 
        i === index ? { ...gasto, [field]: value } : gasto
      )
    }));
  };

  const removeGasto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gastosAdicionales: prev.gastosAdicionales.filter((_, i) => i !== index)
    }));
  };

  const calculateTotal = () => {
    const gastosTotal = formData.gastosAdicionales.reduce((sum, gasto) => sum + Number(gasto.monto), 0);
    return formData.tarifaBase + formData.viaje.peajes + gastosTotal;
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    
    // Prepare data for Excel
    const data = {
      'Número de Orden': formData.numeroOrden,
      'Fecha': formData.fecha,
      'Chofer': formData.chofer,
      'Vehículo': formData.vehiculo,
      'Cliente': formData.cliente,
      'Estado': formData.estado,
      'Tipo de Carga': formData.tipoCarga,
      'Peso de Carga (kg)': formData.pesoCarga,
      'Origen': formData.viaje.origen,
      'Destino': formData.viaje.destino,
      'Distancia (km)': formData.viaje.distancia,
      'Peajes': formData.viaje.peajes,
      'Tarifa Base': formData.tarifaBase,
      'Total Gastos Adicionales': formData.gastosAdicionales.reduce((sum, gasto) => sum + Number(gasto.monto), 0),
      'Total': calculateTotal(),
      'Observaciones': formData.observaciones
    };

    const worksheet = XLSX.utils.json_to_sheet([data]);
    
    // Add gastos adicionales in a separate section
    const gastosData = formData.gastosAdicionales.map(gasto => ({
      'Descripción': gasto.descripcion,
      'Monto': gasto.monto
    }));
    
    if (gastosData.length > 0) {
      XLSX.utils.sheet_add_json(worksheet, gastosData, {
        origin: 'A20',
        skipHeader: false
      });
    }
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orden de Trabajo');
    XLSX.writeFile(workbook, `OT_${formData.numeroOrden}.xlsx`);
    toast.success('Orden de trabajo exportada a Excel');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Orden de Trabajo', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`N°: ${formData.numeroOrden}`, 20, 30);
    doc.text(`Fecha: ${formData.fecha}`, 20, 40);
    
    // Client and Driver Info
    const clienteInfo = [
      ['Cliente', formData.cliente],
      ['Chofer', formData.chofer],
      ['Vehículo', formData.vehiculo],
      ['Estado', formData.estado]
    ];
    
    (doc as any).autoTable({
      startY: 50,
      head: [['Campo', 'Detalle']],
      body: clienteInfo
    });
    
    // Cargo Info
    const cargoInfo = [
      ['Tipo de Carga', formData.tipoCarga],
      ['Peso (kg)', formData.pesoCarga.toString()],
      ['Origen', formData.viaje.origen],
      ['Destino', formData.viaje.destino],
      ['Distancia (km)', formData.viaje.distancia.toString()]
    ];
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Detalles de Carga', '']],
      body: cargoInfo
    });
    
    // Costs
    const costsInfo = [
      ['Tarifa Base', `$${formData.tarifaBase.toLocaleString()}`],
      ['Peajes', `$${formData.viaje.peajes.toLocaleString()}`],
      ['Total Gastos Adicionales', `$${formData.gastosAdicionales.reduce((sum, gasto) => sum + Number(gasto.monto), 0).toLocaleString()}`],
      ['Total', `$${calculateTotal().toLocaleString()}`]
    ];
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Costos', 'Monto']],
      body: costsInfo
    });
    
    // Additional Expenses
    if (formData.gastosAdicionales.length > 0) {
      const gastosData = formData.gastosAdicionales.map(gasto => [
        gasto.descripcion,
        `$${gasto.monto.toLocaleString()}`
      ]);
      
      (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 10,
        head: [['Gastos Adicionales', 'Monto']],
        body: gastosData
      });
    }
    
    // Observations
    if (formData.observaciones) {
      (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 10,
        head: [['Observaciones']],
        body: [[formData.observaciones]]
      });
    }
    
    // Signatures
    doc.text('_____________________', 40, doc.internal.pageSize.height - 30);
    doc.text('Firma Chofer', 50, doc.internal.pageSize.height - 20);
    
    doc.text('_____________________', 120, doc.internal.pageSize.height - 30);
    doc.text('Firma Cliente', 130, doc.internal.pageSize.height - 20);
    
    doc.save(`OT_${formData.numeroOrden}.pdf`);
    toast.success('Orden de trabajo exportada a PDF');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Crear Orden de Trabajo</h2>
        <div className="space-x-2">
          <button
            onClick={exportToExcel}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Excel
          </button>
          <button
            onClick={exportToPDF}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <FilePdf className="w-4 h-4 mr-2" />
            PDF
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Printer className="w-4 h-4 mr-2" />
            Imprimir
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Información General */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="numeroOrden" className="block text-sm font-medium text-gray-700">
              Número de Orden
            </label>
            <input
              type="text"
              id="numeroOrden"
              name="numeroOrden"
              value={formData.numeroOrden}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="chofer" className="block text-sm font-medium text-gray-700">
              Chofer
            </label>
            <input
              type="text"
              id="chofer"
              name="chofer"
              value={formData.chofer}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="vehiculo" className="block text-sm font-medium text-gray-700">
              Vehículo
            </label>
            <input
              type="text"
              id="vehiculo"
              name="vehiculo"
              value={formData.vehiculo}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <input
              type="text"
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Información de Carga */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Carga</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tipoCarga" className="block text-sm font-medium text-gray-700">
                Tipo de Carga
              </label>
              <input
                type="text"
                id="tipoCarga"
                name="tipoCarga"
                value={formData.tipoCarga}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="pesoCarga" className="block text-sm font-medium text-gray-700">
                Peso de Carga (kg)
              </label>
              <input
                type="number"
                id="pesoCarga"
                name="pesoCarga"
                value={formData.pesoCarga}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Información del Viaje */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Viaje</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="viaje.origen" className="block text-sm font-medium text-gray-700">
                Origen
              </label>
              <input
                type="text"
                id="viaje.origen"
                name="viaje.origen"
                value={formData.viaje.origen}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="viaje.destino" className="block text-sm font-medium text-gray-700">
                Destino
              </label>
              <input
                type="text"
                id="viaje.destino"
                name="viaje.destino"
                value={formData.viaje.destino}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="viaje.distancia" className="block text-sm font-medium text-gray-700">
                Distancia (km)
              </label>
              <input
                type="number"
                id="viaje.distancia"
                name="viaje.distancia"
                value={formData.viaje.distancia}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="viaje.peajes" className="block text-sm font-medium text-gray-700">
                Peajes ($)
              </label>
              <input
                type="number"
                id="viaje.peajes"
                name="viaje.peajes"
                value={formData.viaje.peajes}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="tarifaBase" className="block text-sm font-medium text-gray-700">
                Tarifa Base ($)
              </label>
              <input
                type="number"
                id="tarifaBase"
                name="tarifaBase"
                value={formData.tarifaBase}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Gastos Adicionales */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Gastos Adicionales</h3>
            <button
              type="button"
              onClick={handleAddGasto}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Agregar Gasto
            </button>
          </div>
          
          {formData.gastosAdicionales.map((gasto, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={gasto.descripcion}
                  onChange={(e) => handleGastoChange(index, 'descripcion', e.target.value)}
                  placeholder="Descripción del gasto"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={gasto.monto}
                  onChange={(e) => handleGastoChange(index, 'monto', Number(e.target.value))}
                  placeholder="Monto"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeGasto(index)}
                  className="mt-1 px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t pt-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-900">Total</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              ${calculateTotal().toLocaleString()}
            </p>
          </div>
        </div>

        {/* Observaciones */}
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

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                numeroOrden: `OT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
                fecha: new Date().toISOString().split('T')[0],
                chofer: '',
                vehiculo: '',
                cliente: '',
                estado: 'pendiente',
                tipoCarga: '',
                pesoCarga: 0,
                viaje: {
                  origen: '',
                  destino: '',
                  distancia: 0,
                  peajes: 0
                },
                tarifaBase: 0,
                gastosAdicionales: [],
                observaciones: ''
              });
              toast.info('Formulario reiniciado');
            }}
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

export default CreateOrden;