
import React from 'react';
import { motion } from 'framer-motion';

interface Photo {
  id: number;
  alt: string;
  imageUrl: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onPhotoClick }) => {
  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          className="relative overflow-hidden rounded-lg cursor-pointer group"
          onClick={() => onPhotoClick(photo)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          style={{ aspectRatio: '3/4' }}
        >
          <img
            src={photo.imageUrl}
            alt={photo.alt}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default PhotoGallery;
