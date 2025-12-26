
import React, { useEffect, useRef } from 'react';
import { motion, Variants, useMotionValue, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { SITE_INFO } from '../constants';

const Home = () => {
  const navigate = useNavigate();
  const navigatedRef = useRef(false);
  const touchStartY = useRef(0);
  
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
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

      // Threshold for swipe up
      if (deltaY < -50) { 
        navigatedRef.current = true;
        navigate('/portfolio');
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [navigate, mouseX, mouseY]);

  const rotateX = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 0], [10, -10]);
  const rotateY = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 0], [-10, 10]);

  const name = SITE_INFO.name;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50, skewY: 10 },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };
  
  const subtitleVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2 } }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      <motion.div style={{ perspective: '1000px' }}>
          <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
            <motion.h1
              className="text-[12vw] md:text-[15vw] lg:text-[12rem] font-black tracking-tighter text-accent leading-none"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              aria-label={name}
            >
              {name.split('').map((letter, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
            <motion.div 
              className="mt-6 flex flex-col gap-2"
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-xl md:text-3xl text-neutral-100 font-bold uppercase tracking-widest">{SITE_INFO.role}</p>
              <p className="text-lg md:text-2xl text-neutral-400 max-w-3xl font-light mx-auto">
                {SITE_INFO.tagline}
              </p>
            </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-10"
      >
        <Link to="/portfolio" aria-label="Scroll to portfolio">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Scroll to enter</span>
              <ChevronDown className="w-6 h-6 text-neutral-600" />
            </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
