
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
    >
      <motion.div 
        layoutId={`project-container-${project.id}`} 
        className="relative aspect-video overflow-hidden bg-[#0d0d0d] rounded-2xl ring-1 ring-white/5 group-hover:ring-white/10 transition-all duration-700 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] scale-[1.01] group-hover:scale-105"
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? (isHovered ? 1 : 0.5) : 0 }}
            layoutId={`project-image-${project.id}`}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent z-20" />
        
        <div className="absolute bottom-0 left-0 w-full p-10 md:p-14 z-30 pointer-events-none">
          <div className="flex justify-between items-end">
             <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-[0.5em] text-accent/40 font-mono block">
                {project.category}
              </span>
              <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] max-w-2xl">
                {project.title}
              </h3>
            </div>
             <div className="text-4xl md:text-7xl font-black text-white/[0.03] select-none hidden lg:block tracking-tighter leading-none">
                {project.details.year}
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10 z-30">
            <motion.div
                animate={isHovered ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0.8, rotate: -45, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="bg-accent text-background rounded-full p-4"
            >
                <ArrowUpRight size={20} strokeWidth={3} />
            </motion.div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isHovered && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                className="absolute -inset-10 bg-accent blur-[120px] -z-10 rounded-full"
            />
        )}
      </AnimatePresence>
    </Link>
  );
};

export default ProjectCard;
