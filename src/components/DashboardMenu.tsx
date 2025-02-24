import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Users,  Truck, PenTool as UserCog, Plus, Edit, Trash, Search } from 'lucide-react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  path: string;
  actions?: ActionItem[];
}

interface ActionItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const createActionItems = (basePath: string, itemName: string): ActionItem[] => {
  return [
    {
      label: `Crear ${itemName}`,
      path: `${basePath}/crear`,
      icon: <Plus className="w-4 h-4" />
    },
    {
      label: `Modificar ${itemName}`,
      path: `${basePath}/modificar`,
      icon: <Edit className="w-4 h-4" />
    },
    {
      label: `Eliminar ${itemName}`,
      path: `${basePath}/eliminar`,
      icon: <Trash className="w-4 h-4" />
    },
    {
      label: `Buscar ${itemName}`,
      path: `${basePath}/buscar`,
      icon: <Search className="w-4 h-4" />
    }
  ];
};

const menuItems: MenuItem[] = [
  {
    label: 'Recursos Humanos',
    icon: <Users className="w-5 h-5" />,
    subItems: [
      {
        label: 'Departamentos',
        path: '/dashboard/rrhh/departamentos',
        actions: createActionItems('/dashboard/rrhh/departamentos', 'departamento')
      },
      {
        label: 'Documentos',
        path: '/dashboard/rrhh/documentos',
        actions: createActionItems('/dashboard/rrhh/documentos', 'documento')
      },
      {
        label: 'Liquidaciones',
        path: '/dashboard/rrhh/liquidaciones',
        actions: createActionItems('/dashboard/rrhh/liquidaciones', 'liquidación')
      },
      {
        label: 'Proveedores',
        path: '/dashboard/rrhh/proveedores',
        actions: createActionItems('/dashboard/rrhh/proveedores', 'proveedor')
      },
      {
        label: 'Clientes',
        path: '/dashboard/rrhh/clientes',
        actions: createActionItems('/dashboard/rrhh/clientes', 'cliente')
      },
      {
        label: 'Trabajadores',
        path: '/dashboard/rrhh/trabajadores',
        actions: createActionItems('/dashboard/rrhh/trabajadores', 'trabajador')
      }
    ]
  },
  {
    label: 'Transporte',
    icon: <Truck className="w-5 h-5" />,
    subItems: [
      {
        label: 'Vehículos',
        path: '/dashboard/transporte/vehiculos',
        actions: createActionItems('/dashboard/transporte/vehiculos', 'vehículo')
      },
      {
        label: 'Mantenimiento',
        path: '/dashboard/transporte/mantenimiento',
        actions: createActionItems('/dashboard/transporte/mantenimiento', 'mantenimiento')
      },
      {
        label: 'Viajes',
        path: '/dashboard/transporte/viajes',
        actions: createActionItems('/dashboard/transporte/viajes', 'viaje')
      },
      {
        label: 'Tarifas',
        path: '/dashboard/transporte/tarifas',
        actions: createActionItems('/dashboard/transporte/tarifas', 'tarifa')
      },
      {
        label: 'Órdenes de Trabajo',
        path: '/dashboard/transporte/ordenes',
        actions: createActionItems('/dashboard/transporte/ordenes', 'OT')
      }
    ]
  },
  
//  {
//    label: 'Contabilidad',
//    icon: <DollarSign className="w-5 h-5" />,
//    subItems: [
//      {
//        label: 'Facturas',
//        path: '/dashboard/contabilidad/facturas',
//        actions: createActionItems('/dashboard/contabilidad/facturas', 'factura')
//      },
//      {
//        label: 'Gastos',
//       path: '/dashboard/contabilidad/gastos',
//        actions: createActionItems('/dashboard/contabilidad/gastos', 'gasto')
//      },
//      {
//        label: 'Ingresos',
//        path: '/dashboard/contabilidad/ingresos',
//       actions: createActionItems('/dashboard/contabilidad/ingresos', 'ingreso')
//      }
//    ]
//  },
//  {
//    label: 'Bodega',
//    icon: <Package className="w-5 h-5" />,
//    subItems: [
//      {
//        label: 'Artículos',
//        path: '/dashboard/bodega/articulos',
//        actions: createActionItems('/dashboard/bodega/articulos', 'artículo')
//      },
//      {
//        label: 'Stock General',
//        path: '/dashboard/bodega/stock'
//      }
//    ]
//  },
//  {
//    label: 'Finanzas',
//    icon: <BarChart className="w-5 h-5" />,
//    subItems: [
//     {
//        label: 'Presupuestos',
//        path: '/dashboard/finanzas/presupuestos'
//      },
//      {
//        label: 'Proyectos de Inversión',
//        path: '/dashboard/finanzas/proyectos'
//      },
//      {
//        label: 'Flujo de Caja',
//        path: '/dashboard/finanzas/flujo-caja'
//      }
//    ]
//  },
  {
    label: 'Cuentas de Usuario',
    icon: <UserCog className="w-5 h-5" />,
    subItems: [
      {
        label: 'Gestión de Usuarios',
        path: '/dashboard/usuarios',
        actions: createActionItems('/dashboard/usuarios', 'usuario')
      }
    ]
  }
];

const DashboardMenu = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const toggleSubMenu = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenSubMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => (
        <div key={item.label} className="border-b border-gray-200 last:border-b-0">
          <button
            onClick={() => toggleMenu(item.label)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            <div className="flex items-center">
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </div>
            {item.subItems && (
              openMenus[item.label] ? 
                <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {openMenus[item.label] && item.subItems && (
            <div className="bg-gray-50">
              {item.subItems.map((subItem) => (
                <div key={subItem.path}>
                  <Link
                    to={subItem.path}
                    onClick={subItem.actions ? (e) => toggleSubMenu(subItem.path, e) : undefined}
                    className="block pl-11 pr-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 flex items-center justify-between"
                  >
                    {subItem.label}
                    {subItem.actions && (
                      openSubMenus[subItem.path] ?
                        <ChevronDown className="w-4 h-4" /> :
                        <ChevronRight className="w-4 h-4" />
                    )}
                  </Link>
                  {subItem.actions && openSubMenus[subItem.path] && (
                    <div className="pl-16 pr-4 bg-gray-100">
                      {subItem.actions.map((action) => (
                        <Link
                          key={action.path}
                          to={action.path}
                          className="flex items-center py-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                          {action.icon}
                          <span className="ml-2">{action.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DashboardMenu;