import React, { useState } from 'react';
import { toast } from 'sonner';
import { Search, AlertTriangle } from 'lucide-react';

interface Worker {
  nombre: string;
  apellido: string;
  rut: string;
}

const DeleteWorker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [found, setFound] = useState(false);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search in a database
    // For demo purposes, we'll simulate finding a Workers
    setFound(true);
    setWorker({
      nombre: searchTerm,
      apellido: 'Rosario Palma',
      rut: '17.702.255-7'
    });
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    // Here you would typically delete from the database
    toast.success('Trabajador eliminado correctamente');
    setFound(false);
    setWorker(null);
    setSearchTerm('');
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setFound(false);
    setWorker(null);
    setSearchTerm('');
    setShowConfirmation(false);
    toast.info('Operación cancelada');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Eliminar Trabajador</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Buscar Trabajador
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Giro del Cliente"
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

      {/* Workers Information */}
      {found && worker && (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información del Trabajador</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre</p>
                <p className="mt-1">{worker.nombre}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Apellido</p>
                <p className="mt-1">{worker.apellido}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Rut</p>
              <p className="mt-1">{worker.rut}</p>
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
                    ¿Está seguro que desea eliminar este trabajador?
                  </h3>
                </div>
                <p className="mt-2 text-sm text-red-700">
                  Esta acción no se puede deshacer. Se eliminarán todos los datos asociados al trabajador.
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

export default DeleteWorker;