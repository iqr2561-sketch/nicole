import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl py-8 text-center text-gray-600 border-t border-gray-800/50 mt-16">
      <p>&copy; {new Date().getFullYear()} Nicole Ponce. All rights reserved.</p>
    </footer>
  );
};

export default Footer;