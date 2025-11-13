
import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
}

const navItems = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Sobre Mí' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'photography', label: 'Fotografía' },
  { id: 'contact', label: 'Contacto' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeSection, setActiveSection, onLogout }) => {
  return (
    <div className="min-h-screen bg-black text-gray-200 flex">
      <aside className="w-64 bg-gray-900 p-6 border-r border-gray-800 flex flex-col">
        <h1 className="text-2xl font-bold text-brand-green mb-8">Admin</h1>
        <nav className="flex-grow">
          <ul>
            {navItems.map(item => (
              <li key={item.id} className="mb-4">
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeSection === item.id 
                    ? 'bg-brand-green text-black' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2">
          <a
            href="#/"
            className="block w-full text-left px-4 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            Volver al Sitio
          </a>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 rounded-md text-gray-400 hover:bg-red-800/50 hover:text-white transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
