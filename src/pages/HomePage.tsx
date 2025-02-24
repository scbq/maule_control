import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Users, Calculator, Package, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const services = [
  {
    icon: <Truck className="w-12 h-12 text-blue-600" />,
    title: 'Gestión de Transporte',
    description: 'Control completo de flota, mantenimiento y viajes'
  },
  {
    icon: <Users className="w-12 h-12 text-blue-600" />,
    title: 'Recursos Humanos',
    description: 'Administración de personal y documentación'
  },
  {
    icon: <Calculator className="w-12 h-12 text-blue-600" />,
    title: 'Contabilidad y Finanzas',
    description: 'Control de gastos, ingresos y presupuestos'
  },
  {
    icon: <Package className="w-12 h-12 text-blue-600" />,
    title: 'Gestión de Bodega',
    description: 'Control de inventario y stock'
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
<<<<<<< HEAD
            src="../img/home.jpg"
=======
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
>>>>>>> f7b3561ef45c376070f3047dc9a31893192d6658
            alt="Transporte"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
<<<<<<< HEAD
            Transportes Andino
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Software de Transporte y Logística
=======
            Software de Transporte y Logística
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Contigo en cada viaje
>>>>>>> f7b3561ef45c376070f3047dc9a31893192d6658
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
          >
<<<<<<< HEAD
            Contactanos
=======
            Solicitar Demo
>>>>>>> f7b3561ef45c376070f3047dc9a31893192d6658
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nuestros Servicios
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Soluciones integrales para tu empresa de transporte
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-center">{service.icon}</div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 text-center">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p className="text-gray-400">Email: info@transporte.com</p>
              <p className="text-gray-400">Tel: +56 9 4678 9239</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Inicio</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contacto</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Iniciar Sesión</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horario</h3>
              <p className="text-gray-400">Lunes a Viernes: 9:00 - 18:00</p>
              <p className="text-gray-400">Sábado: 9:00 - 13:00</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2024 Software de Transporte. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;