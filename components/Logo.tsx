import React from 'react';
// FIX: Import `Variants` to correctly type animation variants.
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

const Logo = () => {
  const svgVariants = {
    hidden: {
      rotate: -180
    },
    visible: {
      rotate: 0,
      transition: { duration: 1 }
    }
  };

  // FIX: Added `Variants` type annotation to resolve type error with the `ease` property.
  const pathVariants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 41.5, // 2s duration + 41.5s delay = 43.5s cycle
      }
    }
  };

  return (
    <Link to="/" aria-label="Go to homepage">
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#C0C0C0', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <motion.path
          d="M20 20 L50 80 L80 20"
          stroke="url(#gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
          variants={pathVariants}
        />
      </motion.svg>
    </Link>
  );
};

export default Logo;