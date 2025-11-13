
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import ShineBorder from '../components/ShineBorder';

const AboutPage: React.FC = () => {
  return (
    <AnimatedSection id="about">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
          <ShineBorder className="rounded-full">
            <img
              src="https://picsum.photos/seed/portfolio-avatar/256/256"
              alt="Professional Avatar"
              className="w-full h-full object-cover rounded-full filter grayscale"
            />
          </ShineBorder>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
            Sobre Mí
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed">
            Soy una apasionada desarrolladora y diseñadora con un ojo para la estética moderna y el código eficiente. 
            Me especializo en la creación de experiencias de usuario fluidas y memorables utilizando tecnologías de vanguardia como React y Tailwind CSS.
            Mi objetivo es fusionar diseño y funcionalidad para construir productos digitales que no solo se vean increíbles, sino que también sean intuitivos y accesibles.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutPage;