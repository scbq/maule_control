
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Truck, LogOut, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import DashboardMenu from '../components/DashboardMenu';

// Department components
import CreateDepartment from '../components/RRHH/departments/CreateDepartment';
import ModifyDepartment from '../components/RRHH/departments/ModifyDepartment';
import DeleteDepartment from '../components/RRHH/departments/DeleteDepartment';
import SearchDepartment from '../components/RRHH/departments/SearchDepartment';

// Document components
import CreateDocument from '../components/RRHH/documents/CreateDocument';
import ModifyDocument from '../components/RRHH/documents/ModifyDocument';
import DeleteDocument from '../components/RRHH/documents/DeleteDocument';
import SearchDocument from '../components/RRHH/documents/SearchDocument';

// Clients components
import CreateClient from '../components/RRHH/clients/CreateClient';
import ModifyClient from '../components/RRHH/clients/ModifyClient';
import DeleteClient from '../components/RRHH/clients/DeleteClient';
import SearchClient from '../components/RRHH/clients/SearchClient';

// Workers components
import CreateWorker from '../components/RRHH/workers/CreateWorkers';
import ModifyWorker from '../components/RRHH/workers/ModifyWorkers';
import DeleteWorker from '../components/RRHH/workers/DeleteWorkers';
import SearchWorker from '../components/RRHH/workers/SearchWorkers';

// Suppliers components
import CreateSupplier from '../components/RRHH/suppliers/CreateSupplier';
import ModifySupplier from '../components/RRHH/suppliers/ModifySupplier';
import DeleteSupplier from '../components/RRHH/suppliers/DeleteSupplier';
import SearchSupplier from '../components/RRHH/suppliers/SearchSupplier';

// Liquidations components
import CreateLiquidacion from '../components/RRHH/liquidations/CreateLiquidacion';
import ModifyLiquidacion from '../components/RRHH/liquidations/ModifyLiquidacion';
import DeleteLiquidacion from '../components/RRHH/liquidations/DeleteLiquidacion';
import SearchLiquidacion from '../components/RRHH/liquidations/SearchLiquidacion';


// Cars components
import CreateVehiculo from '../components/Transporte/vehiculos/CreateVehiculo';
//import ModifyVehiculo from '../components/Transporte/vehiculos/ModifyVehiculo';
//import DeleteVehiculo from '../components/Transporte/vehiculos/DeleteVehiculo';
import SearchVehiculo from '../components/Transporte/vehiculos/SearchVehiculo';

{/*Ordenes de Trabajo components*/}
import CreateOrden from '../components/Transporte/OT/CreateOrden';
{/*import ModifyOrden from '../components/Transporte/OT/ModifyOrden';
import DeleteOrden from '../components/Transporte/OT/DeleteOrden';
import SearchOrden from '../components/Transporte/OT/SearchOrden';*/}


// User Management components
import CreateUser from '../components/CuentasDeUsuario/GestionDeUsuarios/CreateUser';
import ModifyUser from '../components/CuentasDeUsuario/GestionDeUsuarios/ModifyUser';
import DeleteUser from '../components/CuentasDeUsuario/GestionDeUsuarios/DeleteUser';
import SearchUser from '../components/CuentasDeUsuario/GestionDeUsuarios/SearchUser';


const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Sesión cerrada correctamente');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Truck className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Transporte Andino</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => toast.info('Soporte técnico: +56 9 4678 9239')}
              >
                <HelpCircle className="h-6 w-6" />
              </button>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={handleLogout}
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar Navigation */}
        <div className="w-72 bg-white shadow-lg overflow-y-auto">
          <DashboardMenu />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            
            {/* Department Routes */}
            <Route path="/rrhh/departamentos/crear" element={<CreateDepartment />} />
            <Route path="/rrhh/departamentos/modificar" element={<ModifyDepartment />} />
            <Route path="/rrhh/departamentos/eliminar" element={<DeleteDepartment />} />
            <Route path="/rrhh/departamentos/buscar" element={<SearchDepartment />} />
            
            {/* Document Routes */}
            <Route path="/rrhh/documentos/crear" element={<CreateDocument />} />
            <Route path="/rrhh/documentos/modificar" element={<ModifyDocument />} />
            <Route path="/rrhh/documentos/eliminar" element={<DeleteDocument />} />
            <Route path="/rrhh/documentos/buscar" element={<SearchDocument />} />

            {/* Client Routes */}
            <Route path="/rrhh/clientes/crear" element={<CreateClient />} />
            <Route path="/rrhh/clientes/modificar" element={<ModifyClient />} />
            <Route path="/rrhh/clientes/eliminar" element={<DeleteClient />} />
            <Route path="/rrhh/clientes/buscar" element={<SearchClient />} />

            {/* Workers Routes */}
            <Route path="/rrhh/trabajadores/crear" element={<CreateWorker />} />
            <Route path="/rrhh/trabajadores/modificar" element={<ModifyWorker />} />
            <Route path="/rrhh/trabajadores/eliminar" element={<DeleteWorker />} />
            <Route path="/rrhh/trabajadores/buscar" element={<SearchWorker />} />

            {/* Suppliers Routes */}
            <Route path="/rrhh/proveedores/crear" element={<CreateSupplier />} />
            <Route path="/rrhh/proveedores/modificar" element={<ModifySupplier />} />
            <Route path="/rrhh/proveedores/eliminar" element={<DeleteSupplier />} />
            <Route path="/rrhh/proveedores/buscar" element={<SearchSupplier />} />

            {/* Liquidations Routes */}
            <Route path="/rrhh/liquidaciones/crear" element={<CreateLiquidacion />} />
            <Route path="/rrhh/liquidaciones/modificar" element={<ModifyLiquidacion />} />
            <Route path="/rrhh/liquidaciones/eliminar" element={<DeleteLiquidacion />} />
            <Route path="/rrhh/liquidaciones/buscar" element={<SearchLiquidacion />} />

            {/* CARS Routes */}
            <Route path="/Transporte/vehiculos/crear" element={<CreateVehiculo />} />
           {/*  <Route path="/Transporte/vehiculos/modificar" element={<ModifyVehiculo />} />
            <Route path="/Transporte/vehiculos/eliminar" element={<DeleteVehiculo />} />*/}
            <Route path="/Transporte/vehiculos/buscar" element={<SearchVehiculo />} />


            {/* Ordenes de Trabajo Routes */}
            <Route path="/transporte/ordenes/crear" element={<CreateOrden />} />
            {/* <Route path="/transporte/ordenes/modificar" element={<ModifyOrden />} />
            <Route path="/transporte/ordenes/eliminar" element={<DeleteOrden />} />
            <Route path="/transporte/ordenes/buscar" element={<SearchOrden />} />*/}

            {/* User Management Routes */}
            <Route path="/usuarios/crear" element={<CreateUser />} />
            <Route path="/usuarios/modificar" element={<ModifyUser />} />
            <Route path="/usuarios/eliminar" element={<DeleteUser />} />
            <Route path="/usuarios/buscar" element={<SearchUser />} />


          </Routes>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = () => (
  <div className="max-w-7xl mx-auto">
    {/*<h1 className="text-2xl font-semibold text-gray-900">Panel de Control</h1>
    <p className="mt-2 text-gray-600">Bienvenido al sistema de gestión de transporte y logística.</p>*/}
    <div className="inset-0">
      <img
        src="https://www.transportesandino.cl/wp-content/uploads/2020/09/LogoANDINO1-01-e1601468142620.png"
        alt="Transporte"
        className="w-full h-full object-cover opacity-30"
      />
    </div>
  </div>
);

export default DashboardPage;