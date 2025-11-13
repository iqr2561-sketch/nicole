
import React, { useState } from 'react';
import Login from './Login';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');

  const handleLogin = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold text-brand-green mb-6">Panel de Control</h1>
        <p className="text-lg text-gray-400 mb-10 max-w-md">
            Bienvenido. Desde aquí podrás gestionar el contenido de tu sitio web próximamente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
            <a href="#/" className="px-6 py-3 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition-colors border border-gray-700">
                Volver al Sitio
            </a>
            <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-900/50 text-white font-bold rounded-md hover:bg-red-800/50 transition-colors border border-red-800/50"
            >
                Cerrar Sesión
            </button>
        </div>
    </div>
  );
};

export default AdminPanel;
