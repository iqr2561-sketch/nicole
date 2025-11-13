
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import PhotoGallery from '../components/PhotoGallery';
import PhotoModal from '../components/PhotoModal';

interface Photo {
  id: number;
  alt: string;
  imageUrl: string;
}

const photos: Photo[] = [
  {
    id: 1,
    alt: 'Un parque tranquilo de noche, iluminado por una farola.',
    imageUrl: 'https://picsum.photos/seed/photo1/600/800',
  },
  {
    id: 2,
    alt: 'La luna y una estrella en un cielo crepuscular púrpura.',
    imageUrl: 'https://picsum.photos/seed/photo2/600/800',
  },
  {
    id: 3,
    alt: 'Un edificio de estilo clásico con árboles en primer plano.',
    imageUrl: 'https://picsum.photos/seed/photo3/600/800',
  },
  {
    id: 4,
    alt: 'Calle de la ciudad de noche con luces de neón.',
    imageUrl: 'https://picsum.photos/seed/photo4/600/800',
  },
  {
    id: 5,
    alt: 'Sendero brumoso en el bosque por la mañana.',
    imageUrl: 'https://picsum.photos/seed/photo5/600/800',
  },
  {
    id: 6,
    alt: 'Arquitectura geométrica abstracta.',
    imageUrl: 'https://picsum.photos/seed/photo6/600/800',
  }
];

const PhotographyPage: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <AnimatedSection id="photography">
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 mb-12">
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

export default PhotographyPage;