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
      border: '1px solid rgba(255, 255, 255, 0.5)',
      mixBlendMode: 'difference',
    },
    link: {
      height: 64,
      width: 64,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      mixBlendMode: 'difference',
    },
    text: {
        height: 8,
        width: 8,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        mixBlendMode: 'difference',
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      initial={false}
      // FIX: Merged duplicate `style` props into one to fix a JSX error.
      style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
    />
  );
};

export default CustomCursor;