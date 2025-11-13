
import React, { useState, useEffect } from 'react';
import { getData, saveContact, PortfolioData, ContactData } from '../data/portfolioService';
import { AdminButton, AdminInput } from './common';

const ManageContact: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(getData());
  const [contact, setContact] = useState<ContactData>(data.contact);
  const [message, setMessage] = useState('');

  // Recargar datos cuando cambian
  useEffect(() => {
    const loadData = async () => {
      const currentData = await getData();
      setData(currentData);
      setContact(currentData.contact);
    };
    loadData();
  }, []);

  const handleSave = async () => {
    try {
      await saveContact(contact);
      setData({ ...data, contact });
      setMessage('¡Información de contacto actualizada con éxito!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error al guardar. Intenta nuevamente.');
      setTimeout(() => setMessage(''), 3000);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact(prev => ({...prev, [name]: value}));
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-green mb-6">Gestionar Contacto</h2>
      <div className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
        <AdminInput
          label="URL de WhatsApp (wa.me)"
          name="whatsapp"
          value={contact.whatsapp}
          onChange={handleChange}
        />
        <AdminInput
          label="URL de GitHub"
          name="github"
          value={contact.github}
          onChange={handleChange}
        />
        <AdminInput
          label="URL de LinkedIn"
          name="linkedin"
          value={contact.linkedin}
          onChange={handleChange}
        />
        <AdminInput
          label="URL de Instagram"
          name="instagram"
          value={contact.instagram}
          onChange={handleChange}
        />
        <div>
          <AdminButton onClick={handleSave}>Guardar Cambios</AdminButton>
          {message && <p className="mt-4 text-green-400">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ManageContact;
