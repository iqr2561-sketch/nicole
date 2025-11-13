
import React, { useState } from 'react';
import Login from './Login';
import AdminLayout from './AdminLayout';
import ManageHero from './ManageHero';
import ManageAbout from './ManageAbout';
import ManageProjects from './ManageProjects';
import ManageSkills from './ManageSkills';
import ManagePhotography from './ManagePhotography';
import ManageContact from './ManageContact';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');
  const [activeSection, setActiveSection] = useState('hero');

  const handleLogin = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    window.location.hash = '#/';
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return <ManageHero />;
      case 'about':
        return <ManageAbout />;
      case 'projects':
        return <ManageProjects />;
      case 'skills':
        return <ManageSkills />;
      case 'photography':
        return <ManagePhotography />;
      case 'contact':
        return <ManageContact />;
      default:
        return <ManageHero />;
    }
  };

  return (
    <AdminLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      onLogout={handleLogout}
    >
      {renderSection()}
    </AdminLayout>
  );
};

export default AdminPanel;
