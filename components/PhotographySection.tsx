
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import PhotoGallery from './PhotoGallery';
import PhotoModal from './PhotoModal';
import { Photo } from '../data/portfolioService';

interface PhotographySectionProps {
  photos: Photo[];
}

const PhotographySection: React.FC<PhotographySectionProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    return (
      <AnimatedSection id="photography">
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-green mb-12">
          Fotografía
        </h2>
        <p className="text-center text-gray-400">No hay fotografías disponibles</p>
      </AnimatedSection>
    );
  }

  return (
    <>
      <AnimatedSection id="photography">
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-green mb-12">
          Fotografía
        </h2>
        <PhotoGallery photos={photos} onPhotoClick={handlePhotoClick} />
      </AnimatedSection>
      <PhotoModal 
        imageUrl={selectedPhoto?.imageUrl || null} 
        alt={selectedPhoto?.alt || ''} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default PhotographySection;
