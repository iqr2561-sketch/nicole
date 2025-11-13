
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import { getIconByName } from './Icons';
import { Skill } from '../data/portfolioService';

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-6 bg-gray-900/50 rounded-lg border border-gray-800/50 transition-colors duration-300 hover:bg-gray-800/50 text-gray-300 hover:text-brand-green"
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-3">{getIconByName(skill.icon)}</div>
      <p className="font-medium">{skill.name}</p>
    </motion.div>
  );
};

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <AnimatedSection id="skills">
      <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-green mb-12">
        Habilidades
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;
