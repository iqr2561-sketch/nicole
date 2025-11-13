
import React, { useState, useEffect } from 'react';
import { getData, saveProject, deleteProjectById, PortfolioData, Project } from '../data/portfolioService';
import { AdminButton, AdminInput } from './common';

const ManageProjects: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(getData());
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  // Recargar datos cuando cambian
  useEffect(() => {
    const loadData = async () => {
      const currentData = await getData();
      setData(currentData);
      setProjects(currentData.projects);
    };
    loadData();
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };
  
  const handleSave = async () => {
    try {
      // Guardar todos los proyectos
      for (const project of projects) {
        await saveProject(project);
      }
      showMessage('¡Proyectos guardados con éxito!');
    } catch (error) {
      showMessage('Error al guardar. Intenta nuevamente.');
    }
  };

  const handleAdd = () => {
    setEditingProject({ id: `proj-${Date.now()}`, title: '', description: '', imageUrl: '', technologies: [] });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProjectById(id);
      setProjects(projects.filter(p => p.id !== id));
      showMessage('¡Proyecto eliminado con éxito!');
    } catch (error) {
      showMessage('Error al eliminar. Intenta nuevamente.');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
    setIsCreating(false);
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;
    try {
      await saveProject(editingProject);
      if (isCreating) {
        setProjects([...projects, editingProject]);
      } else {
        setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
      }
      setEditingProject(null);
      setIsCreating(false);
      showMessage('¡Proyecto guardado con éxito!');
    } catch (error) {
      showMessage('Error al guardar. Intenta nuevamente.');
    }
  };

  const renderEditForm = () => {
    if (!editingProject) return null;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 w-full max-w-lg space-y-4">
          <h3 className="text-xl font-bold text-brand-green">{isCreating ? 'Añadir Nuevo Proyecto' : 'Editar Proyecto'}</h3>
          <AdminInput label="Título" value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} />
          <AdminInput label="Descripción" value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} />
          <AdminInput label="URL de Imagen" value={editingProject.imageUrl} onChange={e => setEditingProject({...editingProject, imageUrl: e.target.value})} />
          <AdminInput label="Tecnologías (separadas por coma)" value={editingProject.technologies.join(', ')} onChange={e => setEditingProject({...editingProject, technologies: e.target.value.split(',').map(t => t.trim())})} />
          <div className="flex gap-4">
            <AdminButton onClick={handleUpdateProject}>Guardar Proyecto</AdminButton>
            <button onClick={() => setEditingProject(null)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-green mb-6">Gestionar Proyectos</h2>
      <div className="flex justify-end mb-4">
        <AdminButton onClick={handleAdd}>Añadir Proyecto</AdminButton>
      </div>
      {renderEditForm()}
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex justify-between items-center">
            <div>
              <p className="font-bold">{project.title}</p>
              <p className="text-sm text-gray-400">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(project)} className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-500">Editar</button>
              <button onClick={() => handleDelete(project.id)} className="px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-500">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
       <div className="mt-6">
          <AdminButton onClick={handleSave}>Guardar Todos los Cambios</AdminButton>
          {message && <p className="mt-4 text-green-400">{message}</p>}
        </div>
    </div>
  );
};

export default ManageProjects;
