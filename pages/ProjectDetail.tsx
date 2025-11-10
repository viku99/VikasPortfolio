import React, { useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import VideoPlayer from '../components/VideoPlayer';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.15,
            delayChildren: 0.3,
        } 
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const ProjectDetail = () => {
  const { projectId } = useParams();

  const projectIndex = useMemo(() => 
    PROJECTS.findIndex((p) => p.id === projectId),
    [projectId]
  );
  
  const project = projectIndex !== -1 ? PROJECTS[projectIndex] : null;
  const nextProject = project ? PROJECTS[(projectIndex + 1) % PROJECTS.length] : null;

  const breakdownRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: breakdownRef,
    offset: ['start start', 'end end'],
  });

  if (!project || !nextProject) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p>Project not found.</p>
        <Link to="/portfolio" className="text-neutral-400 hover:text-accent transition-colors">Back to portfolio</Link>
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      {/* Hero Section */}
      <motion.div className="relative w-full h-screen" variants={itemVariants}>
        <motion.div 
            className="absolute inset-0"
            layoutId={`project-container-${project.id}`}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
             <VideoPlayer {...project.heroVideo} showControls={project.heroVideo.type === 'youtube'} />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
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
            className="absolute top-24 left-6 md:left-12 flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/50 transition-colors z-10"
        >
            <ArrowLeft size={16} />
            Back to Works
        </Link>
      </motion.div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left Column / Main Content */}
            <motion.div className="lg:col-span-8 space-y-20" variants={containerVariants}>
                {/* About Section */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-3xl font-bold mb-6 text-neutral-100">About the Project</h2>
                    <p className="text-neutral-300 leading-relaxed text-lg">{project.description}</p>
                </motion.div>

                {/* Challenge & Solution */}
                {(project.challenge || project.solution) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {project.challenge && (
                            <motion.div variants={itemVariants}>
                                <h3 className="text-2xl font-semibold text-accent mb-4">The Challenge</h3>
                                <p className="text-neutral-400 leading-relaxed">{project.challenge}</p>
                            </motion.div>
                        )}
                        {project.solution && (
                             <motion.div variants={itemVariants}>
                                <h3 className="text-2xl font-semibold text-accent mb-4">The Solution</h3>
                                <p className="text-neutral-400 leading-relaxed">{project.solution}</p>
                            </motion.div>
                        )}
                    </div>
                )}
            </motion.div>

            {/* Right Column / Details Sidebar */}
            <motion.div 
                className="lg:col-span-4 lg:sticky lg:top-40 h-fit" 
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                <div className="bg-primary/50 border border-secondary rounded-lg p-6 space-y-6">
                    <div>
                        <h3 className="font-semibold text-accent mb-2 uppercase text-sm tracking-widest">Role</h3>
                        <p className="text-neutral-300">{project.details.role}</p>
                    </div>
                    <div className="border-t border-secondary/50"></div>
                    <div>
                        <h3 className="font-semibold text-accent mb-2 uppercase text-sm tracking-widest">Year</h3>
                        <p className="text-neutral-300">{project.details.year}</p>
                    </div>
                     <div className="border-t border-secondary/50"></div>
                    <div>
                        <h3 className="font-semibold text-accent mb-3 uppercase text-sm tracking-widest">Tech Stack</h3>
                        <ul className="flex flex-wrap gap-2">
                            {project.details.techStack.map(tech => (
                                <li key={tech} className="bg-secondary text-neutral-300 text-xs font-mono px-3 py-1.5 rounded">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {project.details.liveUrl && (
                        <>
                            <div className="border-t border-secondary/50"></div>
                            <a 
                                href={project.details.liveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-neutral-300 hover:text-accent transition-colors group"
                            >
                                View Live Site <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
      </div>
      
      {/* Breakdown Section */}
      {project.breakdown && project.breakdown.length > 0 && (
        <motion.div 
            className="bg-background relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
          <div className="container mx-auto px-6 md:px-8 text-center pt-24 pb-16 md:pt-32 md:pb-24">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4 text-accent">Shot Breakdown</motion.h2>
             <motion.p variants={itemVariants} className="text-lg text-neutral-400 mt-4 max-w-2xl mx-auto">
                A step-by-step deconstruction of the creative and technical process, showing how the final shot was built from the ground up.
            </motion.p>
          </div>
          
          <div ref={breakdownRef} className="relative" style={{ height: `${project.breakdown.length * 100}vh` }}>
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {project.breakdown.map((step, index) => {
                    const totalSteps = project.breakdown.length;
                    const rangeStart = index / totalSteps;
                    const rangeEnd = (index + 1) / totalSteps;
                    
                    const scale = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0.88, 1]);
                    const opacity = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.05, rangeEnd - 0.05, rangeEnd], [0, 1, 1, 0]);

                    return (
                        <motion.div 
                            key={index}
                            style={{ 
                                scale,
                                opacity,
                                zIndex: index
                            }}
                            className="absolute w-[90%] max-w-5xl mx-auto h-[75vh] rounded-2xl overflow-hidden"
                        >
                            <div className="relative w-full h-full border border-secondary shadow-2xl bg-primary">
                                {step.media.type === 'image' ? (
                                    <img src={step.media.src} alt={step.title} className="w-full h-full object-cover"/>
                                ) : (
                                    <VideoPlayer {...step.media} />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                
                                <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
                                    <div className="flex items-baseline gap-4">
                                        <span className="font-black text-5xl text-accent/80 tracking-tighter">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="text-3xl font-bold">{step.title}</h3>
                                    </div>
                                    {step.description && <p className="text-neutral-300 mt-3 max-w-3xl">{step.description}</p>}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
          </div>
        </motion.div>
      )}

       {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <motion.div 
            className="pb-24 md:pb-32" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
          <div className="container mx-auto px-6 md:px-8">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-12 text-center">Visual Showcase</motion.h2>
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-primary rounded-lg overflow-hidden aspect-video"
                >
                  {item.type === 'image' ? (
                    <img src={item.src} alt={`${project.title} gallery image ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <VideoPlayer type="local" src={item.src} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Next Project Link */}
      <motion.div 
        className="container mx-auto px-6 md:px-8 pb-24"
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true, amount: 0.3}}
        transition={{duration: 1}}
      >
        <Link to={`/portfolio/${nextProject.id}`} className="block group relative aspect-video rounded-lg overflow-hidden bg-primary">
            <img src={nextProject.imageUrl} alt={nextProject.title} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <p className="uppercase tracking-widest text-sm text-neutral-400 mb-2">Next Project</p>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tight">{nextProject.title}</h3>
                <div className="mt-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-white rounded-full transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-45">
                        <ArrowRight size={32} />
                    </div>
                </div>
            </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;