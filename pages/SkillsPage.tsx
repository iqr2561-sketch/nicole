
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import { ReactIcon, TailwindIcon, JavaScriptIcon, TypeScriptIcon, NodeIcon, FigmaIcon } from '../components/Icons';

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const skills: Skill[] = [
  { name: 'React', icon: <ReactIcon /> },
  { name: 'Tailwind CSS', icon: <TailwindIcon /> },
  { name: 'JavaScript', icon: <JavaScriptIcon /> },
  { name: 'TypeScript', icon: <TypeScriptIcon /> },
  { name: 'Node.js', icon: <NodeIcon /> },
  { name: 'Figma', icon: <FigmaIcon /> },
];

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 transition-colors duration-300 hover:bg-gray-800/50"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-gray-300 mb-3">{skill.icon}</div>
      <p className="font-medium text-gray-300">{skill.name}</p>
    </motion.div>
  );
};

const SkillsPage: React.FC = () => {
  return (
    <AnimatedSection id="skills">
      <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 mb-12">
        Habilidades
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </AnimatedSection>
  );
};

export default SkillsPage;