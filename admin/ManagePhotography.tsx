
import React, { useState } from 'react';
import { getData, saveData, PortfolioData, Photo } from '../data/portfolioService';
import { AdminButton, AdminInput } from './common';

const ManagePhotography: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(getData());
  const [photos, setPhotos] = useState<Photo[]>(data.photos);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  // Recargar datos cuando cambian
  React.useEffect(() => {
    const currentData = getData();
    setData(currentData);
    setPhotos(currentData.photos);
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };
  
  const handleSaveAll = () => {
    const updatedData = { ...data, photos };
    saveData(updatedData);
    setData(updatedData);
    showMessage('¡Galería de fotos guardada con éxito!');
  };

  const handleAdd = () => {
    setEditingPhoto({ id: `photo-${Date.now()}`, alt: '', imageUrl: '' });
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const handleEdit = (photo: Photo) => {
    setEditingPhoto({ ...photo });
    setIsCreating(false);
  };

  const handleUpdatePhoto = () => {
    if (!editingPhoto) return;
    if (isCreating) {
      setPhotos([...photos, editingPhoto]);
    } else {
      setPhotos(photos.map(p => p.id === editingPhoto.id ? editingPhoto : p));
    }
    setEditingPhoto(null);
    setIsCreating(false);
  };

  const renderEditForm = () => {
    if (!editingPhoto) return null;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 w-full max-w-lg space-y-4">
          <h3 className="text-xl font-bold text-brand-green">{isCreating ? 'Añadir Nueva Foto' : 'Editar Foto'}</h3>
          <AdminInput label="URL de Imagen" value={editingPhoto.imageUrl} onChange={e => setEditingPhoto({...editingPhoto, imageUrl: e.target.value})} />
          <AdminInput label="Texto Alternativo (Alt)" value={editingPhoto.alt} onChange={e => setEditingPhoto({...editingPhoto, alt: e.target.value})} />
          <div className="flex gap-4">
            <AdminButton onClick={handleUpdatePhoto}>Guardar Foto</AdminButton>
            <button onClick={() => setEditingPhoto(null)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-green mb-6">Gestionar Fotografía</h2>
      <div className="flex justify-end mb-4">
        <AdminButton onClick={handleAdd}>Añadir Foto</AdminButton>
      </div>
      {renderEditForm()}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="bg-gray-900 p-2 rounded-lg border border-gray-800 group relative">
            <img src={photo.imageUrl} alt={photo.alt} className="w-full h-40 object-cover rounded"/>
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-2 p-2">
              <p className="text-xs text-center text-white">{photo.alt}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(photo)} className="px-3 py-1 bg-blue-600 rounded text-xs hover:bg-blue-500">Editar</button>
                <button onClick={() => handleDelete(photo.id)} className="px-3 py-1 bg-red-600 rounded text-xs hover:bg-red-500">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <AdminButton onClick={handleSaveAll}>Guardar Todos los Cambios</AdminButton>
        {message && <p className="mt-4 text-green-400">{message}</p>}
      </div>
    </div>
  );
};

export default ManagePhotography;
