
import React, { useState, useEffect } from 'react';
import { getData, saveAbout, PortfolioData } from '../data/portfolioService';
import { AdminButton, AdminInput, AdminTextarea } from './common';

const ManageAbout: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(getData());
  const [bio, setBio] = useState(data.about.bio);
  const [avatarUrl, setAvatarUrl] = useState(data.about.avatarUrl);
  const [message, setMessage] = useState('');

  // Recargar datos cuando cambian
  useEffect(() => {
    const loadData = async () => {
      const currentData = await getData();
      setData(currentData);
      setBio(currentData.about.bio);
      setAvatarUrl(currentData.about.avatarUrl);
    };
    loadData();
  }, []);

  const handleSave = async () => {
    try {
      await saveAbout({ bio, avatarUrl });
      setData({ ...data, about: { bio, avatarUrl } });
      setMessage('¡Sección "Sobre Mí" actualizada con éxito!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error al guardar. Intenta nuevamente.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-green mb-6">Gestionar "Sobre Mí"</h2>
      <div className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
        <AdminTextarea
          label="Biografía"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={6}
        />
        <AdminInput
          label="URL de la Imagen de Perfil"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <div>
          <AdminButton onClick={handleSave}>Guardar Cambios</AdminButton>
          {message && <p className="mt-4 text-green-400">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ManageAbout;
