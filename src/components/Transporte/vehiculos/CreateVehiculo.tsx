import React, { useState } from 'react';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface VehiculoForm {
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
  observaciones: string;
}

const CreateVehiculo = () => {
  const [formData, setFormData] = useState<VehiculoForm>({
    patente: '',
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    tipo: '',
    capacidad: 0,
    kilometraje: 0,
    estado: 'activo',
    ultimaMantencion: '',
    proximaMantencion: '',
    conductor: '',
    observaciones: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to a database
    toast.success('Vehículo creado correctamente');
    handleCancel();
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
      patente: '',
      marca: '',
      modelo: '',
      año: new Date().getFullYear(),
      tipo: '',
      capacidad: 0,
      kilometraje: 0,
      estado: 'activo',
      ultimaMantencion: '',
      proximaMantencion: '',
      conductor: '',
      observaciones: ''
    });
    toast.info('Formulario reiniciado');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Crear Nuevo Vehículo</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="patente" className="block text-sm font-medium text-gray-700">
              Patente
            </label>
            <input
              type="text"
              id="patente"
              name="patente"
              value={formData.patente}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="XXXX-XX"
            />
          </div>

          <div>
            <label htmlFor="marca" className="block text-sm font-medium text-gray-700">
              Marca
            </label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">
              Modelo
            </label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="año" className="block text-sm font-medium text-gray-700">
              Año
            </label>
            <input
              type="number"
              id="año"
              name="año"
              value={formData.año}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear() + 1}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
              Tipo de Vehículo
            </label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Seleccione un tipo</option>
              <option value="camion">Camión</option>
              <option value="furgon">Furgón</option>
              <option value="camioneta">Camioneta</option>
              <option value="automovil">Automóvil</option>
            </select>
          </div>

          <div>
            <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700">
              Capacidad de Carga (kg)
            </label>
            <input
              type="number"
              id="capacidad"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="kilometraje" className="block text-sm font-medium text-gray-700">
              Kilometraje
            </label>
            <input
              type="number"
              id="kilometraje"
              name="kilometraje"
              value={formData.kilometraje}
              onChange={handleChange}
              required
              min="0"
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
              <option value="activo">Activo</option>
              <option value="mantenimiento">En Mantenimiento</option>
              <option value="reparacion">En Reparación</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div>
            <label htmlFor="ultimaMantencion" className="block text-sm font-medium text-gray-700">
              Última Mantención
            </label>
            <input
              type="date"
              id="ultimaMantencion"
              name="ultimaMantencion"
              value={formData.ultimaMantencion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="proximaMantencion" className="block text-sm font-medium text-gray-700">
              Próxima Mantención
            </label>
            <input
              type="date"
              id="proximaMantencion"
              name="proximaMantencion"
              value={formData.proximaMantencion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="conductor" className="block text-sm font-medium text-gray-700">
              Conductor Asignado
            </label>
            <input
              type="text"
              id="conductor"
              name="conductor"
              value={formData.conductor}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
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

export default CreateVehiculo;