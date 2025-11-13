
import React from 'react';
import AnimatedSection from './AnimatedSection';
import ShineBorder from './ShineBorder';

interface AboutSectionProps {
  bio: string;
  avatarUrl: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ bio, avatarUrl }) => {
  return (
    <AnimatedSection id="about">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
          <ShineBorder className="rounded-full">
            <img
              src={avatarUrl}
              alt="Professional Avatar"
              className="w-full h-full object-cover rounded-full filter grayscale"
            />
          </ShineBorder>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-green">
            Sobre Mí
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed">
            {bio}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
