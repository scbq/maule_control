import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Truck, LogOut, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import DashboardMenu from '../components/DashboardMenu';

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
                <span className="ml-2 text-xl font-bold text-gray-900">TransLog</span>
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
            {/* Routes will be added for each section */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = () => (
  <div className="max-w-7xl mx-auto">
    <h1 className="text-2xl font-semibold text-gray-900">Panel de Control</h1>
    <p className="mt-2 text-gray-600">Bienvenido al sistema de gestión de transporte y logística.</p>
  </div>
);

export default DashboardPage;