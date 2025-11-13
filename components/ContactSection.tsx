
import React from 'react';
import AnimatedSection from './AnimatedSection';
import ShineButton from './ShineButton';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from './Icons';
import Footer from './Footer';
import { ContactData } from '../data/portfolioService';

interface ContactSectionProps {
  contact: ContactData;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  if (!contact) {
    return null;
  }

  const safeContact = {
    whatsapp: contact.whatsapp || '#',
    github: contact.github || '#',
    linkedin: contact.linkedin || '#',
    instagram: contact.instagram || '#',
  };

  return (
    <>
      <AnimatedSection id="contact">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-green mb-4">
            Contacto
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            ¿Listo para colaborar o tienes alguna pregunta? ¡Envíame un mensaje por WhatsApp! Estaré encantado de conectar contigo.
          </p>
          <div className="text-center">
              <ShineButton href={safeContact.whatsapp} target="_blank" rel="noopener noreferrer">Chatear en WhatsApp</ShineButton>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-6">
          <a href={safeContact.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-green transition-colors"><GithubIcon /></a>
          <a href={safeContact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-green transition-colors"><LinkedinIcon /></a>
          <a href={safeContact.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-green transition-colors"><InstagramIcon /></a>
          <a href={safeContact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-green transition-colors"><WhatsAppIcon /></a>
        </div>
      </AnimatedSection>
      <Footer />
    </>
  );
};

export default ContactSection;
