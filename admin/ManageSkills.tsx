
import React, { useState } from 'react';
import { getData, saveData, PortfolioData, Skill } from '../data/portfolioService';
import { AdminButton, AdminInput } from './common';

const availableIcons = ['ReactIcon', 'TailwindIcon', 'JavaScriptIcon', 'TypeScriptIcon', 'NodeIcon', 'FigmaIcon'];

const ManageSkills: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(getData());
  const [skills, setSkills] = useState<Skill[]>(data.skills);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };
  
  const handleSaveAll = () => {
    const updatedData = { ...data, skills };
    saveData(updatedData);
    setData(updatedData);
    showMessage('¡Habilidades guardadas con éxito!');
  };

  const handleAdd = () => {
    setEditingSkill({ id: `skill-${Date.now()}`, name: '', icon: availableIcons[0] });
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill({ ...skill });
    setIsCreating(false);
  };

  const handleUpdateSkill = () => {
    if (!editingSkill) return;
    if (isCreating) {
      setSkills([...skills, editingSkill]);
    } else {
      setSkills(skills.map(s => s.id === editingSkill.id ? editingSkill : s));
    }
    setEditingSkill(null);
    setIsCreating(false);
  };
  
  const renderEditForm = () => {
    if (!editingSkill) return null;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 w-full max-w-lg space-y-4">
          <h3 className="text-xl font-bold text-brand-green">{isCreating ? 'Añadir Nueva Habilidad' : 'Editar Habilidad'}</h3>
          <AdminInput label="Nombre" value={editingSkill.name} onChange={e => setEditingSkill({...editingSkill, name: e.target.value})} />
          <div>
            <label className="block text-gray-400 mb-2">Icono</label>
            <select
              value={editingSkill.icon}
              onChange={e => setEditingSkill({...editingSkill, icon: e.target.value})}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
            </select>
          </div>
          <div className="flex gap-4">
            <AdminButton onClick={handleUpdateSkill}>Guardar Habilidad</AdminButton>
            <button onClick={() => setEditingSkill(null)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Cancelar</button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-green mb-6">Gestionar Habilidades</h2>
      <div className="flex justify-end mb-4">
        <AdminButton onClick={handleAdd}>Añadir Habilidad</AdminButton>
      </div>
      {renderEditForm()}
      <div className="space-y-4">
        {skills.map(skill => (
          <div key={skill.id} className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex justify-between items-center">
            <p className="font-bold">{skill.name}</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(skill)} className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-500">Editar</button>
              <button onClick={() => handleDelete(skill.id)} className="px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-500">Eliminar</button>
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

export default ManageSkills;
