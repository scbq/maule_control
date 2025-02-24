import React, { useState } from 'react';
import { Search, FileText, Download } from 'lucide-react';

interface Document {
  id: number;
  titulo: string;
  tipo: string;
  departamento: string;
  fecha: string;
  descripcion: string;
}

const SearchDocument = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically search in a database
    setDocuments([
      {
        id: 1,
        titulo: 'Contrato de Trabajo',
        tipo: 'Contrato',
        departamento: 'Recursos Humanos',
        fecha: '2024-03-20',
        descripcion: 'Contrato de trabajo para nuevo empleado'
      },
      {
        id: 2,
        titulo: 'Informe Mensual',
        tipo: 'Informe',
        departamento: 'Contabilidad',
        fecha: '2024-03-15',
        descripcion: 'Informe mensual de gastos'
      }
    ]);
  };

  const handleDownload = (id: number) => {
    // Here you would typically handle the document download
    toast.success('Descargando documento...');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Buscar Documentos</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Término de búsqueda
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Título o descripción"
            />
          </div>
          <div>
            <label htmlFor="searchType" className="block text-sm font-medium text-gray-700">
              Tipo de búsqueda
            </label>
            <select
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">Todos los documentos</option>
              <option value="title">Por título</option>
              <option value="type">Por tipo</option>
              <option value="department">Por departamento</option>
              <option value="date">Por fecha</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </button>
        </div>
      </form>

      {/* Results */}
   
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <div key={doc.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{doc.titulo}</h3>
                      <button
                        onClick={() => handleDownload(doc.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        
                      </button>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Tipo:</span> {doc.tipo}
                      </div>
                      <div>
                        <span className="font-medium">Departamento:</span> {doc.departamento}
                      </div>
                      <div>
                        <span className="font-medium">Fecha:</span> {doc.fecha}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{doc.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
};

export default SearchDocument;
