
import React from 'react';
import { motion } from 'framer-motion';
import ShineButton from '../components/ShineButton';

const HomePage: React.FC = () => {
  const name = "Nicole Ponce";
  const subtitle = "Porfolio Personal";

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

  return (
    <section id="hero" className="h-screen w-full flex flex-col justify-center items-center text-center">
      <motion.h1
        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600 pb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {name.split("").map((char, index) => (
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
        {subtitle}
      </motion.p>
      <motion.div 
        className="mt-10 flex flex-col sm:flex-row gap-4"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        <ShineButton href="#projects">Ver Proyectos</ShineButton>
        <ShineButton href="#contact">Contacto</ShineButton>
      </motion.div>
    </section>
  );
};

export default HomePage;