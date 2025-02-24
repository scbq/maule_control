import React, { useState } from 'react';
import { toast } from 'sonner';
import { Save, Shield } from 'lucide-react';

interface ModuleAccess {
  id: string;
  name: string;
  allowed: boolean;
  submodules: {
    id: string;
    name: string;
    allowed: boolean;
  }[];
}

interface UserForm {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
  cargo: string;
  telefono: string;
  estado: 'activo' | 'inactivo';
  modulos: ModuleAccess[];
}

const initialModules: ModuleAccess[] = [
  {
    id: 'rrhh',
    name: 'Recursos Humanos',
    allowed: false,
    submodules: [
      { id: 'departamentos', name: 'Departamentos', allowed: false },
      { id: 'documentos', name: 'Documentos', allowed: false },
      { id: 'liquidaciones', name: 'Liquidaciones', allowed: false },
      { id: 'proveedores', name: 'Proveedores', allowed: false },
      { id: 'clientes', name: 'Clientes', allowed: false },
      { id: 'trabajadores', name: 'Trabajadores', allowed: false }
    ]
  },
  {
    id: 'transporte',
    name: 'Transporte',
    allowed: false,
    submodules: [
      { id: 'vehiculos', name: 'Vehículos', allowed: false },
      { id: 'mantenimiento', name: 'Mantenimiento', allowed: false },
      { id: 'viajes', name: 'Viajes', allowed: false },
      { id: 'tarifas', name: 'Tarifas', allowed: false },
      { id: 'ordenes', name: 'Órdenes de Trabajo', allowed: false }
    ]
  },
  {
    id: 'contabilidad',
    name: 'Contabilidad',
    allowed: false,
    submodules: [
      { id: 'facturas', name: 'Facturas', allowed: false },
      { id: 'gastos', name: 'Gastos', allowed: false },
      { id: 'ingresos', name: 'Ingresos', allowed: false }
    ]
  },
  {
    id: 'bodega',
    name: 'Bodega',
    allowed: false,
    submodules: [
      { id: 'articulos', name: 'Artículos', allowed: false },
      { id: 'stock', name: 'Stock General', allowed: false }
    ]
  },
  {
    id: 'finanzas',
    name: 'Finanzas',
    allowed: false,
    submodules: [
      { id: 'presupuestos', name: 'Presupuestos', allowed: false },
      { id: 'proyectos', name: 'Proyectos de Inversión', allowed: false },
      { id: 'flujo-caja', name: 'Flujo de Caja', allowed: false }
    ]
  }
];

const CreateUser = () => {
  const [formData, setFormData] = useState<UserForm>({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    cargo: '',
    telefono: '',
    estado: 'activo',
    modulos: initialModules
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    // Here you would typically save to a database
    console.log('User data:', formData);
    toast.success('Usuario creado correctamente');
    
    // Reset form
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      confirmPassword: '',
      cargo: '',
      telefono: '',
      estado: 'activo',
      modulos: initialModules
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModuleChange = (moduleId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            allowed: checked,
            // If module is unchecked, uncheck all submodules
            submodules: module.submodules.map(sub => ({
              ...sub,
              allowed: checked ? sub.allowed : false
            }))
          };
        }
        return module;
      })
    }));
  };

  const handleSubmoduleChange = (moduleId: string, submoduleId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(module => {
        if (module.id === moduleId) {
          const updatedSubmodules = module.submodules.map(sub =>
            sub.id === submoduleId ? { ...sub, allowed: checked } : sub
          );
          // If any submodule is checked, ensure the parent module is checked
          const shouldModuleBeChecked = updatedSubmodules.some(sub => sub.allowed);
          return {
            ...module,
            allowed: shouldModuleBeChecked,
            submodules: updatedSubmodules
          };
        }
        return module;
      })
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Crear Nuevo Usuario</h2>
        <div className="flex items-center text-gray-600">
          <Shield className="w-5 h-5 mr-2" />
          <span className="text-sm">Control de Acceso</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Información Personal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
              Cargo
            </label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
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
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Permisos de Acceso */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Permisos de Acceso</h3>
          <div className="space-y-6">
            {formData.modulos.map(module => (
              <div key={module.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id={module.id}
                    checked={module.allowed}
                    onChange={(e) => handleModuleChange(module.id, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={module.id} className="ml-2 text-sm font-medium text-gray-900">
                    {module.name}
                  </label>
                </div>
                
                <div className="ml-6 grid grid-cols-2 gap-4">
                  {module.submodules.map(sub => (
                    <div key={sub.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${module.id}-${sub.id}`}
                        checked={sub.allowed}
                        disabled={!module.allowed}
                        onChange={(e) => handleSubmoduleChange(module.id, sub.id, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`${module.id}-${sub.id}`}
                        className={`ml-2 text-sm ${module.allowed ? 'text-gray-700' : 'text-gray-400'}`}
                      >
                        {sub.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                nombre: '',
                apellido: '',
                email: '',
                password: '',
                confirmPassword: '',
                cargo: '',
                telefono: '',
                estado: 'activo',
                modulos: initialModules
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

export default CreateUser;