import React, { useState } from 'react';
import { toast } from 'sonner';
import { Search, AlertTriangle, Shield } from 'lucide-react';

interface User {
  nombre: string;
  apellido: string;
  email: string;
  cargo: string;
  estado: string;
}

const DeleteUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [found, setFound] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search in a database
    setFound(true);
    setUser({
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@example.com',
      cargo: 'Supervisor',
      estado: 'activo'
    });
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    // Here you would typically delete from the database
    toast.success('Usuario eliminado correctamente');
    setFound(false);
    setUser(null);
    setSearchTerm('');
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setFound(false);
    setUser(null);
    setSearchTerm('');
    setShowConfirmation(false);
    toast.info('Operación cancelada');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Eliminar Usuario</h2>
        <div className="flex items-center text-gray-600">
          <Shield className="w-5 h-5 mr-2" />
          <span className="text-sm">Control de Acceso</span>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Buscar Usuario
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Email del usuario"
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

      {/* User Information */}
      {found && user && (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información del Usuario</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                <p className="mt-1">{`${user.nombre} ${user.apellido}`}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cargo</p>
                <p className="mt-1">{user.cargo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Estado</p>
                <p className="mt-1">{user.estado}</p>
              </div>
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
                    ¿Está seguro que desea eliminar este usuario?
                  </h3>
                </div>
                <p className="mt-2 text-sm text-red-700">
                  Esta acción no se puede deshacer. Se eliminarán todos los datos y permisos asociados al usuario.
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

export default DeleteUser;