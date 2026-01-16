
import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import Navigation from './Navigation';
import Showreel from './Showreel';
import BottomNavigation from './BottomNavigation';
import CustomCursor from './CustomCursor';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isReelPlaying } = useAppContext();

  return (
    <div className="bg-background text-accent font-sans min-h-screen relative overflow-x-hidden selection:bg-accent selection:text-background">
      {/* Global custom cursor implementation */}
      <CustomCursor />
      
      {/* Enhanced Grain Overlay - Using global tailwind config from index.html */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] overflow-hidden">
        <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain" />
      </div>

      <AnimatePresence mode="wait">
        {isReelPlaying && <Showreel key="global-showreel" />}
      </AnimatePresence>

      <div className="relative z-10 pb-16 md:pb-0">
        <Navigation />
        <main>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div 
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-background">{children}</div>
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;
