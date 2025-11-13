
import React, { useState, useEffect } from 'react';
import { getDataSync, saveHero, PortfolioData } from '../data/portfolioService';
import { AdminButton, AdminInput } from './common';

const ManageHero: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(getDataSync());
  const [name, setName] = useState(data.hero.name);
  const [subtitle, setSubtitle] = useState(data.hero.subtitle);
  const [message, setMessage] = useState('');

  // Recargar datos cuando cambian
  useEffect(() => {
    const loadData = async () => {
      const currentData = await getData();
      setData(currentData);
      setName(currentData.hero.name);
      setSubtitle(currentData.hero.subtitle);
    };
    loadData();
  }, []);

  const handleSave = async () => {
    try {
      await saveHero({ name, subtitle });
      setData({ ...data, hero: { name, subtitle } });
      setMessage('¡Sección de inicio actualizada con éxito!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error al guardar. Intenta nuevamente.');
      setTimeout(() => setMessage(''), 3000);
    }
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
