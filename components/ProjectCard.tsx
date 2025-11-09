import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import VideoPlayer from './VideoPlayer';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/portfolio/${project.id}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        layoutId={`project-container-${project.id}`} 
        className="relative aspect-[4/3] overflow-hidden bg-primary"
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence>
            {!isHovered && (
              <motion.img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                layoutId={`project-image-${project.id}`}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isHovered && (
               <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <VideoPlayer {...project.cardPreviewVideo} />
                 <div className="absolute inset-0 bg-black/40" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute bottom-0 left-0 p-5 text-accent"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            >
              <motion.h3 
                className="text-xl font-bold"
                initial={{ y: 10, scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.title}
              </motion.h3>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="mt-4 flex justify-between items-start">
        <div>
            <h3 className="text-lg font-medium tracking-wide text-neutral-100">{project.title}</h3>
            <p className="text-sm text-neutral-400 mt-1">{project.category}</p>
        </div>
        <motion.div
          animate={isHovered ? "hover" : "initial"}
          variants={{
            initial: { x: 0, y: 0 },
            hover: { x: 4, y: -4 }
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-accent transition-colors duration-300" />
        </motion.div>
      </div>
    </Link>
  );
};

export default ProjectCard;