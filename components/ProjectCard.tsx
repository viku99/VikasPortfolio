
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={`/portfolio/${project.id}`}
      className="block group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div 
        layoutId={`project-container-${project.id}`} 
        className="relative aspect-video overflow-hidden bg-[#0d0d0d] rounded-xl md:rounded-2xl ring-1 ring-white/5 group-hover:ring-white/10 transition-all duration-700 shadow-xl"
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-60 md:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] scale-[1.01] group-hover:scale-105"
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            layoutId={`project-image-${project.id}`}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-20" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-14 z-30 pointer-events-none">
          <div className="flex justify-between items-end gap-4">
             <div className="space-y-2 md:space-y-4">
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-accent/60 md:text-accent/40 font-mono block">
                {project.category}
              </span>
              <h3 className="text-xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] max-w-2xl">
                {project.title}
              </h3>
            </div>
             <div className="text-3xl md:text-7xl font-black text-white/[0.05] md:text-white/[0.03] select-none tracking-tighter leading-none whitespace-nowrap">
                {project.details.year}
            </div>
          </div>
        </div>

        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-30">
            <motion.div
                animate={isHovered ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0.8, rotate: -45, opacity: 0.4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="bg-accent text-background rounded-full p-3 md:p-4"
            >
                <ArrowUpRight strokeWidth={3} className="w-4 h-4 md:w-5 md:h-5" />
            </motion.div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isHovered && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                className="absolute -inset-4 md:-inset-10 bg-accent blur-[40px] md:blur-[120px] -z-10 rounded-full hidden md:block"
            />
        )}
      </AnimatePresence>
    </Link>
  );
};

export default ProjectCard;
