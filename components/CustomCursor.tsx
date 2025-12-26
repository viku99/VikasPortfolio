import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { useAppContext } from '../contexts/AppContext';

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const { cursorVariant } = useAppContext();

  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      mixBlendMode: 'difference' as const,
    },
    link: {
      height: 80,
      width: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      mixBlendMode: 'difference' as const,
    },
    text: {
      height: 12,
      width: 12,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      mixBlendMode: 'difference' as const,
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.5 }}
      style={{ 
        left: `${x}px`, 
        top: `${y}px`, 
        translateX: '-50%', 
        translateY: '-50%' 
      }}
    />
  );
};

export default CustomCursor;