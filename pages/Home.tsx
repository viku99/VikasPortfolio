
import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { SITE_INFO } from '../constants';

const Home = () => {
  const navigate = useNavigate();
  const navigatedRef = useRef(false);
  const touchStartY = useRef(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    // Initialize dimensions only on mount
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0 && !navigatedRef.current) {
        navigatedRef.current = true;
        navigate('/portfolio');
      }
    };
    window.addEventListener('wheel', handleScroll, { passive: true });

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (navigatedRef.current) return;
      const currentY = event.touches[0].clientY;
      const deltaY = currentY - touchStartY.current;
      if (deltaY < -40) { 
        navigatedRef.current = true;
        navigate('/portfolio');
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [navigate, mouseX, mouseY]);

  const rotateX = useTransform(smoothY, [0, windowSize.height || 1000], [10, -10]);
  const rotateY = useTransform(smoothX, [0, windowSize.width || 1920], [-10, 10]);

  const name = SITE_INFO.name;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 100, skewX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      skewX: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };
  
  const subtitleVariants: Variants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.0, ease: 'easeOut' } }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative overflow-hidden bg-background">
      <motion.div style={{ perspective: '1200px' }} className="z-10 w-full px-4">
          <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
            <motion.h1
              className="text-[22vw] md:text-[16vw] lg:text-[14rem] font-[900] tracking-tighter text-accent leading-[0.8] mb-8 select-none"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              aria-label={name}
            >
              {name.split('').map((letter, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block origin-bottom">
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.div 
              className="flex flex-col gap-4 mt-2"
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-sm md:text-xl lg:text-2xl text-accent font-black uppercase tracking-[0.2em] md:tracking-[0.45em]">
                {SITE_INFO.role}
              </h2>
              <p className="text-[10px] md:text-lg text-neutral-500 max-w-2xl mx-auto font-medium tracking-wide px-4">
                {SITE_INFO.tagline}
              </p>
            </motion.div>
        </motion.div>
      </motion.div>
      
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-20 md:bottom-12"
      >
        <Link to="/portfolio" aria-label="Scroll to portfolio">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.6em] md:tracking-[0.8em] text-neutral-600 font-mono">Scroll to explore</span>
              <ChevronDown className="w-5 h-5 text-neutral-800" />
            </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
