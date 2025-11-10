import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavItem: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `transition-colors duration-200 ${isActive ? 'text-accent' : 'text-neutral-400 hover:text-accent'}`
      }
    >
      <span className="text-sm font-medium uppercase tracking-wider">{label}</span>
    </NavLink>
  );
};

const BottomNavigation = () => {
  return (
    <motion.nav 
      className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-lg border-t border-secondary"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto flex justify-around items-center h-16">
        <NavItem to="/" label="Home" />
        <NavItem to="/portfolio" label="Portfolio" />
        <NavItem to="/about" label="About" />
        <NavItem to="/contact" label="Contact" />
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
