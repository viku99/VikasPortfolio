import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import Navigation from './Navigation';
import Showreel from './Showreel';
import BottomNavigation from './BottomNavigation';

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] },
  },
  out: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] },
  },
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isReelPlaying } = useAppContext();

  return (
    <div className="bg-background text-accent font-sans min-h-screen relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://assets.website-files.com/62338695029a995431057421/62338695029a997230057467_noise.gif')] opacity-5 z-0"></div>
      
      <AnimatePresence mode="wait">
        {isReelPlaying && <Showreel />}
      </AnimatePresence>

      <div className="relative z-10 pb-16 md:pb-0">
        <Navigation />
        <main>
           <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="enter"
              exit="out"
              variants={pageVariants}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;