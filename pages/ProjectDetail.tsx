
import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, Layers, PenTool, FileText, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import VideoPlayer from '../components/VideoPlayer';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    }
};

const ProjectDetail = () => {
  const { projectId } = useParams();

  const projectIndex = useMemo(() => 
    PROJECTS.findIndex((p) => p.id === projectId),
    [projectId]
  );
  
  const project = projectIndex !== -1 ? PROJECTS[projectIndex] : null;
  const nextProject = project ? PROJECTS[(projectIndex + 1) % PROJECTS.length] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project || !nextProject) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-background">
        <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-mono">Archive Entry Missing</p>
        <Link to="/portfolio" className="text-accent border-b border-accent/20 pb-1 text-xs uppercase tracking-widest">Return to Base</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      className="bg-background text-accent min-h-screen selection:bg-accent selection:text-background"
    >
      {/* 1. PRIMARY VIDEO PLAYER (START) */}
      <section className="pt-24 md:pt-32 px-6">
        <div className="container mx-auto">
            <motion.div 
                layoutId={`project-container-${project.id}`}
                className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] bg-primary border border-white/5"
            >
                <VideoPlayer {...project.heroVideo} showControls={true} />
            </motion.div>
        </div>
      </section>

      {/* 2. PROJECT TITLE (DIRECTLY BELOW VIDEO) */}
      <section className="mt-12 md:mt-20 px-6">
        <div className="container mx-auto">
            <motion.div variants={fadeUp} className="max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <h1 className="text-5xl md:text-[9vw] font-black tracking-tighter leading-[0.85] uppercase">
                        {project.title}
                    </h1>
                </div>
            </motion.div>
        </div>
      </section>

      <div className="mt-32 border-t border-white/5" />

      {/* 3. WHAT SOFTWARES I USED */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="container mx-auto">
            <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-16"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-500">
                        <Layers size={18} />
                        <h2 className="text-[12px] uppercase tracking-[0.6em] font-black">What softwares I used</h2>
                    </div>
                    <div className="h-[1px] w-12 bg-accent/20" />
                </div>
                
                <div className="lg:col-span-2">
                    <div className="flex flex-wrap gap-5">
                        {project.details.techStack.map((tech) => (
                            <div 
                                key={tech}
                                className="px-10 py-6 bg-primary border border-white/10 rounded-2xl hover:border-accent/40 transition-all group flex items-center gap-4"
                            >
                                <div className="w-2 h-2 rounded-full bg-accent/20 group-hover:bg-accent transition-colors" />
                                <span className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-400 group-hover:text-accent">
                                    {tech}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 4. HOW I EDITED */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="container mx-auto">
            <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-16"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-500">
                        <PenTool size={18} />
                        <h2 className="text-[12px] uppercase tracking-[0.6em] font-black">How I Edited</h2>
                    </div>
                    <div className="h-[1px] w-12 bg-accent/20" />
                </div>
                
                <div className="lg:col-span-2">
                    <div className="relative">
                        <p className="text-2xl md:text-4xl leading-[1.3] text-neutral-200 font-light tracking-tight">
                            {project.solution || project.challenge}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 5. VIDEO CONTENT */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="container mx-auto">
            <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-16"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-500">
                        <FileText size={18} />
                        <h2 className="text-[12px] uppercase tracking-[0.6em] font-black">Video Content</h2>
                    </div>
                    <div className="h-[1px] w-12 bg-accent/20" />
                </div>
                
                <div className="lg:col-span-2">
                    <div className="max-w-4xl">
                        <p className="text-lg md:text-2xl leading-relaxed text-neutral-400 font-normal">
                            {project.description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 6. NEXT PROJECT LINK (DOWNSIDE) */}
      <section className="mt-32">
        <Link 
            to={`/portfolio/${nextProject.id}`} 
            className="group block relative overflow-hidden bg-black h-[70vh] flex items-center justify-center"
        >
            <div className="absolute inset-0 z-0">
                <img 
                    src={nextProject.imageUrl} 
                    alt={nextProject.title} 
                    className="w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-[3s] ease-out"
                />
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
                <div className="flex items-center gap-4 text-accent/30 group-hover:text-accent transition-colors">
                    <span className="text-[10px] uppercase tracking-[1em]">Next Artifact</span>
                    <ChevronRight size={14} />
                </div>
                <h3 className="text-4xl md:text-8xl font-black uppercase tracking-tighter group-hover:tracking-normal transition-all duration-1000">
                    {nextProject.title}
                </h3>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="h-[1px] w-40 bg-accent/50" />
                </div>
            </div>
        </Link>
      </section>

      <footer className="py-20 flex flex-col items-center gap-10">
        <Link to="/portfolio" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-neutral-600 hover:text-accent transition-all">
            <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" />
            Return to Portfolio Index
        </Link>
      </footer>
    </motion.div>
  );
};

export default ProjectDetail;
