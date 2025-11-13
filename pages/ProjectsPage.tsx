
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import ShineBorder from '../components/ShineBorder';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Cyber Dashboard',
    description: 'Plataforma de análisis de datos con una estética futurista y visualizaciones interactivas.',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    technologies: ['React', 'D3.js', 'Tailwind'],
  },
  {
    id: 2,
    title: 'E-commerce Y2K',
    description: 'Una tienda online con un diseño inspirado en la era Y2K, enfocada en la experiencia de compra.',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    technologies: ['Next.js', 'TypeScript', 'Stripe'],
  },
  {
    id: 3,
    title: 'Portfolio Generativo',
    description: 'Un portfolio dinámico que genera layouts únicos cada vez que se visita, usando arte generativo.',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    technologies: ['p5.js', 'React', 'Framer Motion'],
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <ShineBorder className="rounded-xl">
        <div className="bg-black/80 backdrop-blur-sm rounded-xl overflow-hidden h-full flex flex-col">
          <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-2 text-gray-400 flex-grow">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies && Array.isArray(project.technologies) && project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ShineBorder>
    </motion.div>
  );
};

const ProjectsPage: React.FC = () => {
  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    return (
      <AnimatedSection id="projects">
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 mb-12">
          Proyectos Destacados
        </h2>
        <p className="text-center text-gray-400">No hay proyectos disponibles</p>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection id="projects">
      <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 mb-12">
        Proyectos Destacados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </AnimatedSection>
  );
};

export default ProjectsPage;