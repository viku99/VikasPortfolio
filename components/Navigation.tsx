import React from 'react';
import { NavLink } from 'react-router-dom';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import { useScrollDirection } from '../hooks/useScrollDirection';
import Logo from './Logo';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative text-sm uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-accent' : 'text-neutral-400 hover:text-accent'}`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {isActive && (
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-[1px] bg-accent"
              layoutId="underline"
              transition={{type: 'spring', stiffness: 300, damping: 25}}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

const Navigation = () => {
    const { playReel } = useAppContext();
    const scrollDirection = useScrollDirection();

    const variants = {
        visible: { y: 0 },
        hidden: { y: '-100%' },
    };

    return (
        <motion.header 
            className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 bg-background/50 backdrop-blur-sm"
            variants={variants}
            animate={scrollDirection === 'down' ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
            <div className="container mx-auto flex justify-between items-center">
                <Logo />

                <nav className="hidden md:flex items-center gap-10">
                    <NavItem to="/">Home</NavItem>
                    <NavItem to="/portfolio">Portfolio</NavItem>
                    <NavItem to="/about">About</NavItem>
                    <NavItem to="/about-this-site">About This Site</NavItem>
                    <NavItem to="/contact">Contact</NavItem>
                </nav>

                <button
                    onClick={playReel}
                    className="flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-400 hover:text-accent transition-colors duration-300"
                >
                    <Play className="w-4 h-4" />
                    <span>Showreel</span>
                </button>
            </div>
        </motion.header>
    );
};

export default Navigation;