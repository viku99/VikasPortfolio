import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import VideoPlayer from './VideoPlayer';

const Showreel = () => {
  const { stopReel } = useAppContext();

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={stopReel}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          stopReel();
        }}
        className="absolute top-6 right-6 md:top-8 md-right-8 z-20 text-neutral-400 hover:text-accent transition-colors"
        aria-label="Close showreel"
      >
        <X size={32} />
      </button>

      <motion.div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl aspect-video relative bg-black shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <VideoPlayer 
          type="youtube" 
          src="CPnMek8iU1U" 
          showControls={true} 
          className="w-full h-full"
        />
      </motion.div>

    </motion.div>
  );
};

export default Showreel;
