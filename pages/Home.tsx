import React, { useEffect, useRef } from 'react';
import { motion, Variants, useMotionValue, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const navigatedRef = useRef(false);
  
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
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [navigate, mouseX, mouseY]);

  const rotateX = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 0], [10, -10]);
  const rotateY = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 0], [-10, 10]);

  const name = "VIKAS";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
              className="text-[10vw] md:text-[12vw] lg:text-[10rem] font-black tracking-tighter text-accent leading-none"
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
            <motion.p 
              className="mt-6 text-lg md:text-2xl text-neutral-400 max-w-3xl font-light"
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              A motion-first developer crafting cinematic digital experiences.
            </motion.p>
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
            >
              <ChevronDown className="w-8 h-8 text-neutral-600" />
            </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;