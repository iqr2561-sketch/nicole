
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import ShineButton from '../components/ShineButton';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from '../components/Icons';

const ContactPage: React.FC = () => {
  const whatsappUrl = "https://wa.me/5492245501359";

  return (
    <AnimatedSection id="contact">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 mb-4">
          Contacto
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          ¿Listo para colaborar o tienes alguna pregunta? ¡Envíame un mensaje por WhatsApp! Estaré encantado de conectar contigo.
        </p>
        <div className="text-center">
            <ShineButton href={whatsappUrl}>Chatear en WhatsApp</ShineButton>
        </div>
      </div>

      <div className="mt-16 flex justify-center gap-6">
        <a href="#" className="text-gray-500 hover:text-white transition-colors"><GithubIcon /></a>
        <a href="#" className="text-gray-500 hover:text-white transition-colors"><LinkedinIcon /></a>
        <a href="#" className="text-gray-500 hover:text-white transition-colors"><InstagramIcon /></a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><WhatsAppIcon /></a>
      </div>
    </AnimatedSection>
  );
};

export default ContactPage;