import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

const Logo = () => {
  const svgVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const pathVariants: Variants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
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
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#A3A3A3', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <motion.path
          d="M50 80 L20 20"
          stroke="url(#gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
          variants={pathVariants}
        />
        <motion.path
          d="M50 80 L80 20"
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
