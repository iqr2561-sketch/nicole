
import React, { useState, useEffect } from 'react';
import Portfolio from './Portfolio';
import AdminPanel from './admin/AdminPanel';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (route.startsWith('#/admin')) {
    return <AdminPanel />;
  }

  return <Portfolio />;
};

export default App;
