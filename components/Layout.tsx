import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import Navigation from './Navigation';
import Showreel from './Showreel';
import BottomNavigation from './BottomNavigation';

// Custom hook to get the previous value of a prop or state
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const transition = {
  duration: 0.7,
  ease: [0.76, 0, 0.24, 1] as const,
};

const topShutterVariants: Variants = {
  initial: { y: '0%' }, // Closed state
  animate: { // Open state
    y: '-100%',
    transition: { ...transition, delay: 0.7 },
  },
  exit: { // Close state
    y: '0%',
    transition: { ...transition, delay: 0.1 },
  },
};

const bottomShutterVariants: Variants = {
  initial: { y: '0%' }, // Closed state
  animate: { // Open state
    y: '100%',
    transition: { ...transition, delay: 0.7 },
  },
  exit: { // Close state
    y: '0%',
    transition: { ...transition, delay: 0.1 },
  },
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const previousLocation = usePrevious(location);
  const { isReelPlaying } = useAppContext();

  // Determine if the transition should be animated.
  // Any transition TO or FROM the portfolio page is instant.
  const isEnteringPortfolio = location.pathname === '/portfolio';
  const isLeavingPortfolio = previousLocation?.pathname === '/portfolio';
  const noAnimation = isEnteringPortfolio || isLeavingPortfolio;

  // By changing the key of AnimatePresence, we can force a complete remount of its children
  // instead of an animated exit. This is used to create an instant transition when
  // navigating to or from a no-animation route like the portfolio.
  const animationWrapperKey = noAnimation ? location.pathname : 'animated-region';

  return (
    <div className="bg-background text-accent font-sans min-h-screen relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://assets.website-files.com/62338695029a995431057421/62338695029a997230057467_noise.gif')] opacity-5 z-0"></div>

      <AnimatePresence mode="wait">
        {isReelPlaying && <Showreel />}
      </AnimatePresence>

      <div className="relative z-10 pb-16 md:pb-0">
        <Navigation />
        <main>
          <AnimatePresence mode="wait" key={animationWrapperKey}>
            <motion.div key={location.pathname}>
              <div className="bg-background">{children}</div>

              {/* Shutters are only rendered for transitions between animated pages. */}
              {!noAnimation && (
                <>
                  <motion.div
                    className="fixed top-0 left-0 w-full h-1/2 bg-primary z-[200]"
                    variants={topShutterVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    aria-hidden="true"
                  />
                  <motion.div
                    className="fixed bottom-0 left-0 w-full h-1/2 bg-primary z-[200]"
                    variants={bottomShutterVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    aria-hidden="true"
                  />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;