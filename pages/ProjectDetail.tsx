import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../constants';
import VideoPlayer from '../components/VideoPlayer';

const contentVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.8, 
            ease: 'easeOut', 
            staggerChildren: 0.2 
        } 
    }
};

const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut'} }
};

// FIX: Moved variants outside the component to fix a TypeScript type inference error.
// When defined inside the component, the cubic-bezier array for 'ease' was inferred
// as `number[]` instead of a tuple, causing an error.
const wordContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0.2 },
  },
};

const wordSpanVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// New component for staggered text animation
const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const words = text.split(' ');

  return (
    <motion.p
      variants={wordContainerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={wordSpanVariants}
          style={{ marginRight: '0.25em', display: 'inline-block' }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};


const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p>Project not found.</p>
        <Link to="/portfolio" className="text-neutral-400 hover:text-accent transition-colors">Back to portfolio</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full h-screen">
        <motion.div 
            className="absolute inset-0"
            layoutId={`project-container-${project.id}`}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
             <VideoPlayer {...project.heroVideo} showControls={project.heroVideo.type === 'youtube'} />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="container mx-auto">
                 <motion.h1 
                    className="text-5xl md:text-8xl font-black tracking-tighter"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                 >
                    {project.title}
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-neutral-300 mt-2 font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {project.category}
                </motion.p>
            </div>
        </div>
        
        <Link
            to="/portfolio"
            className="absolute top-24 left-6 md:left-12 flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/50 transition-colors"
        >
            <ArrowLeft size={16} />
            Back to Works
        </Link>
      </div>
      
      <motion.div 
        className="px-6 md:px-8 py-24 md:py-32"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
            <motion.div className="md:col-span-2" variants={childVariants}>
                <h2 className="text-3xl font-bold mb-6 text-neutral-100">About the Project</h2>
                <AnimatedText text={project.description} className="text-neutral-300 leading-relaxed text-lg"/>
            </motion.div>
            <motion.div className="space-y-8 text-neutral-300" variants={childVariants}>
                <div>
                    <h3 className="font-semibold text-accent mb-2">Role</h3>
                    <p>{project.details.role}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-accent mb-2">Year</h3>
                    <p>{project.details.year}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-accent mb-2">Tech Stack</h3>
                    <ul className="flex flex-wrap gap-2 mt-1">
                        {project.details.techStack.map(tech => (
                            <li key={tech} className="bg-neutral-800 text-neutral-300 text-xs font-mono px-3 py-1 rounded">
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
                {project.details.liveUrl && (
                     <a 
                        href={project.details.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-neutral-300 hover:text-accent transition-colors group"
                    >
                        View Live Site <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                )}
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
