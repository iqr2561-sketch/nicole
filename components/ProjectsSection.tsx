
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import ShineBorder from './ShineBorder';
import { Project } from '../data/portfolioService';

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
              {project.technologies.map((tech) => (
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

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <AnimatedSection id="projects">
      <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-green mb-12">
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

export default ProjectsSection;
