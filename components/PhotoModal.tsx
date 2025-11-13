import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoModalProps {
  imageUrl: string | null;
  alt: string;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
};

const PhotoModal: React.FC<PhotoModalProps> = ({ imageUrl, alt, onClose }) => {
  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={onClose}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] bg-gray-200 p-2 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the image
            variants={modalVariants}
          >
            <img src={imageUrl} alt={alt} className="max-w-full max-h-[85vh] object-contain rounded bg-black" />
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-black bg-white/50 rounded-full w-8 h-8 flex items-center justify-center text-2xl hover:bg-white/80 transition-colors"
              aria-label="Close image view"
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoModal;