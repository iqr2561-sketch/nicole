import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Sobre Mí', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Fotografía', href: '#photography' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Contacto', href: '#contact' },
];

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.querySelector(link.href));
      let current = '';

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          // Offset by header height (h-16 is 4rem, approx 64px) + a little buffer
          if (sectionTop < 100) {
            current = navLinks[index].href;
          }
        }
      });
      
      // Handle the top of the page case
      if (window.scrollY < 200) {
        current = '';
      }

      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active link

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="text-2xl font-bold text-white">
              Nicole Ponce
            </a>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`transition-colors duration-300 ${
                      activeLink === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                  {activeLink === link.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-green"
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </li>
              ))}
              <li>
                <a href="#/admin" className="px-4 py-2 text-sm bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors">
                  Panel de Control
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;