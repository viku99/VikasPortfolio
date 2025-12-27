
import React, { useState, useEffect } from 'react';
import { motion, useSpring, Variants } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { useAppContext } from '../contexts/AppContext';

const CustomCursor = () => {
  const { x, y, isVisible } = useMousePosition();
  const { cursorVariant } = useAppContext();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth the motion values with a spring for that "premium" feel
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(true);
      window.removeEventListener('touchstart', checkTouch);
    };
    window.addEventListener('touchstart', checkTouch);
    return () => window.removeEventListener('touchstart', checkTouch);
  }, []);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      transition: { duration: 0.2 }
    },
    default: {
      opacity: 1,
      scale: 1,
      height: 24,
      width: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      mixBlendMode: 'difference' as const,
    },
    link: {
      opacity: 1,
      scale: 1,
      height: 64,
      width: 64,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      mixBlendMode: 'difference' as const,
    },
    text: {
      opacity: 1,
      scale: 1,
      height: 8,
      width: 8,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      mixBlendMode: 'difference' as const,
    },
  };

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block will-change-transform"
      variants={variants}
      animate={isVisible ? cursorVariant : 'hidden'}
      style={{ 
        x: smoothX,
        y: smoothY,
        translateX: '-50%', 
        translateY: '-50%' 
      }}
    />
  );
};

export default CustomCursor;
