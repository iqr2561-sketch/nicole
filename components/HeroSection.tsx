
import React from 'react';
import { motion } from 'framer-motion';
import ShineButton from './ShineButton';

interface HeroSectionProps {
  name: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ name, subtitle }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: name.length * 0.05,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: name.length * 0.05 + 0.5,
      },
    },
  };
  
  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="hero" className="h-screen w-full flex flex-col justify-center items-center text-center">
      <motion.h1
        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-brand-green to-gray-400 pb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {(name || "Nicole Ponce").split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p 
        className="mt-4 text-xl md:text-2xl text-gray-400"
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        {subtitle || "Porfolio Personal"}
      </motion.p>
      <motion.div 
        className="mt-10 flex flex-col sm:flex-row gap-4"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        <ShineButton href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Ver Proyectos</ShineButton>
        <ShineButton href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contacto</ShineButton>
      </motion.div>
    </section>
  );
};

export default HeroSection;
