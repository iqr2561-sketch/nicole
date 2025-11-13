
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import PhotographySection from './components/PhotographySection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import { getData, getDataSync, PortfolioData, defaultData } from './data/portfolioService';

const Portfolio: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    const cached = getDataSync();
    // Asegurar que todos los arrays existan
    return {
      ...defaultData,
      ...cached,
      projects: cached?.projects || defaultData.projects,
      skills: cached?.skills || defaultData.skills,
      photos: cached?.photos || defaultData.photos,
    };
  });

  useEffect(() => {
    // Cargar datos desde la API al montar
    getData().then((apiData) => {
      // Asegurar que todos los arrays existan
      setData({
        ...defaultData,
        ...apiData,
        projects: apiData?.projects || defaultData.projects,
        skills: apiData?.skills || defaultData.skills,
        photos: apiData?.photos || defaultData.photos,
      });
    }).catch((error) => {
      console.error('Error loading data:', error);
      // Mantener los datos por defecto si falla la carga
    });

    const handleStorageChange = () => {
      const cached = getDataSync();
      // Asegurar que todos los arrays existan
      setData({
        ...defaultData,
        ...cached,
        projects: cached?.projects || defaultData.projects,
        skills: cached?.skills || defaultData.skills,
        photos: cached?.photos || defaultData.photos,
      });
    };

    // Escuchar cambios en localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // También escuchar eventos personalizados para cambios en la misma pestaña
    window.addEventListener('portfolioDataUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('portfolioDataUpdated', handleStorageChange);
    };
  }, []);

  const stars = React.useMemo(() => {
    const starCount = 150;
    return Array.from({ length: starCount }).map((_, i) => {
      const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 2}px`,
        height: `${Math.random() * 3 + 2}px`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      };
      return <div key={i} className="absolute bg-white star-shape animate-twinkle" style={style}></div>;
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">{stars}</div>

      {/* Diffused Lights Background Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: ['-30%', '30%', '-30%'],
          }}
          transition={{
            duration: 25,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-900/50 rounded-full filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            x: ['30%', '-30%', '30%'],
            y: ['20%', '-20%', '20%'],
          }}
          transition={{
            duration: 30,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-900/50 rounded-full filter blur-3xl opacity-20"
        />
      </div>

      <Header />

      <main className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <HeroSection name={data.hero.name} subtitle={data.hero.subtitle} />
        <AboutSection bio={data.about.bio} avatarUrl={data.about.avatarUrl} />
        <ProjectsSection projects={data.projects} />
        <PhotographySection photos={data.photos} />
        <SkillsSection skills={data.skills} />
        <ContactSection contact={data.contact} />
      </main>
    </div>
  );
};

export default Portfolio;
