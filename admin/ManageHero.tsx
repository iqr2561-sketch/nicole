
import React, { useState } from 'react';
import { getData, saveData, PortfolioData } from '../data/portfolioService';
import { AdminButton, AdminInput } from './common';

const ManageHero: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(getData());
  const [name, setName] = useState(data.hero.name);
  const [subtitle, setSubtitle] = useState(data.hero.subtitle);
  const [message, setMessage] = useState('');

  // Recargar datos cuando cambian
  React.useEffect(() => {
    const currentData = getData();
    setData(currentData);
    setName(currentData.hero.name);
    setSubtitle(currentData.hero.subtitle);
  }, []);

  const handleSave = () => {
    const updatedData = {
      ...data,
      hero: { name, subtitle }
    };
    saveData(updatedData);
    setData(updatedData);
    setMessage('¡Sección de inicio actualizada con éxito!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-green mb-6">Gestionar Inicio</h2>
      <div className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
        <AdminInput
          label="Nombre Principal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AdminInput
          label="Subtítulo"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <div>
          <AdminButton onClick={handleSave}>Guardar Cambios</AdminButton>
          {message && <p className="mt-4 text-green-400">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ManageHero;
