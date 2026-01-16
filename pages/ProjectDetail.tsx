
import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Layers, Sparkles, Terminal, PenTool, FileText, Activity, ChevronDown, X, Info, Cpu } from 'lucide-react';
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
  const [showAiNotice, setShowAiNotice] = useState(false);

  const projectIndex = useMemo(() => 
    PROJECTS.findIndex((p) => p.id === projectId),
    [projectId]
  );
  
  const project = projectIndex !== -1 ? PROJECTS[projectIndex] : null;
  const nextProject = project ? PROJECTS[(projectIndex + 1) % PROJECTS.length] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Trigger AI Notice for the vision series
    if (projectId === 'the-vision-series') {
      const timer = setTimeout(() => setShowAiNotice(true), 1200);
      const autoClose = setTimeout(() => setShowAiNotice(false), 13200); // Show for 12s (after 1.2s delay)
      return () => {
        clearTimeout(timer);
        clearTimeout(autoClose);
      };
    } else {
      setShowAiNotice(false);
    }
  }, [projectId]);

  if (!project || !nextProject) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-background px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-mono">Archive Entry Missing</p>
        <Link to="/portfolio" className="text-accent border-b border-accent/20 pb-1 text-xs uppercase tracking-widest">Return to Base</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      className="bg-background text-accent min-h-screen selection:bg-accent selection:text-background pb-12"
    >
      {/* AI USAGE POPUP - ENHANCED SIZE AND DURATION */}
      <AnimatePresence>
        {showAiNotice && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:bottom-12 md:right-12 z-[100] md:max-w-xl"
          >
            <div className="relative bg-black/80 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Decorative Pulse Bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              
              <button 
                onClick={() => setShowAiNotice(false)}
                className="absolute top-6 right-6 text-neutral-500 hover:text-accent transition-all hover:scale-110 active:scale-90"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent">
                  <Cpu size={32} className="animate-pulse" strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-accent/50">Production Notice // 2025</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none">Synthetic Asset Integration</h4>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-mono font-light">
                    In the absence of high-fidelity source assets from the client, extensive <span className="text-accent font-bold">Generative AI</span> was deployed to synthesize all textures, volumetric lighting, and environmental physics from scratch. This project serves as a study in "Zero-Asset" creative direction.
                  </p>
                  
                  <div className="pt-2 flex items-center gap-4">
                    <div className="h-[1px] flex-grow bg-white/5" />
                    <span className="text-[8px] uppercase tracking-[0.3em] text-neutral-700 font-mono italic">Process_Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION (VIDEO OR SERIES FEED) */}
      <section className="pt-24 md:pt-32 px-4 md:px-6">
        <div className="container mx-auto">
            {project.isSeries ? (
              <div className="space-y-4 md:space-y-8">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-mono opacity-50">Multi-Artifact Feed // Active</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-30 text-[9px] uppercase tracking-widest">
                    <span>Scroll to view collection</span>
                    <ChevronDown size={12} className="animate-bounce" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {project.gallery?.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative aspect-[9/16] md:aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-primary border border-white/5"
                    >
                      <VideoPlayer 
                        type={item.type as 'youtube' | 'local'} 
                        src={item.src} 
                        showControls={true} 
                        autoplay={idx === 0} 
                      />
                      {/* Label removed as requested to clean up the UI */}
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div 
                  layoutId={`project-container-${project.id}`}
                  className="relative aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-primary border border-white/5"
              >
                  <VideoPlayer {...project.heroVideo} showControls={true} />
              </motion.div>
            )}
        </div>
      </section>

      {/* 2. PROJECT TITLE */}
      <section className="mt-8 md:mt-20 px-6">
        <div className="container mx-auto">
            <motion.div variants={fadeUp} className="max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                    <h1 className="text-3xl md:text-[9vw] font-black tracking-tighter leading-[0.9] md:leading-[0.85] uppercase">
                        {project.title}
                    </h1>
                </div>
            </motion.div>
        </div>
      </section>

      <div className="mt-16 md:mt-32 border-t border-white/5" />

      {/* 3. SOFTWARE STACK */}
      <section className="py-16 md:py-24 px-6 bg-white/[0.01]">
        <div className="container mx-auto">
            <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-500">
                        <Layers size={16} />
                        <h2 className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black">Software Stack</h2>
                    </div>
                </div>
                
                <div className="lg:col-span-2">
                    <div className="flex flex-wrap gap-3 md:gap-5">
                        {project.details.techStack.map((tech) => (
                            <div 
                                key={tech}
                                className="px-5 md:px-8 py-3 md:py-5 bg-primary border border-white/10 rounded-xl md:rounded-2xl hover:border-accent/40 transition-all group flex items-center gap-3 md:gap-4"
                            >
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent/20 group-hover:bg-accent transition-colors" />
                                <span className="text-[10px] md:text-sm font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-neutral-400 group-hover:text-accent">
                                    {tech}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 4. EDITING TECHNIQUES */}
      <section className="py-16 md:py-24 px-6 border-t border-white/5 bg-black/20">
        <div className="container mx-auto">
            <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-500">
                        <Sparkles size={16} />
                        <h2 className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black">Techniques</h2>
                    </div>
                </div>
                
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {project.details.techniques?.map((tech) => (
                            <div key={tech} className="flex items-center gap-4 p-4 md:p-5 rounded-lg md:rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                                <Activity size={12} className="text-accent/30" />
                                <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-400">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 5. PROCESS ANALYSIS */}
      <section className="py-16 md:py-24 px-6 border-t border-white/5">
        <div className="container mx-auto">
            <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-500">
                        <Terminal size={16} />
                        <h2 className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black">Analysis</h2>
                    </div>
                </div>
                
                <div className="lg:col-span-2">
                    <div className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/5 relative overflow-hidden group">
                        <div className="relative z-10 space-y-4 md:space-y-6">
                            <div className="flex items-center gap-3 md:gap-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                <h4 className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-accent/60 font-mono">Detailed Post-Mortem</h4>
                            </div>
                            <p className="text-lg md:text-2xl leading-relaxed text-neutral-300 font-light italic">
                                "{project.details.analysis}"
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 6. METHODOLOGY */}
      <section className="py-16 md:py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto">
            <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-500">
                        <PenTool size={16} />
                        <h2 className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black">Methodology</h2>
                    </div>
                </div>
                
                <div className="lg:col-span-2">
                    <p className="text-xl md:text-4xl leading-[1.3] text-neutral-200 font-light tracking-tight">
                        {project.solution || project.challenge}
                    </p>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 7. CONTENT INFO */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto">
            <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-500">
                        <FileText size={16} />
                        <h2 className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black">Brief</h2>
                    </div>
                </div>
                
                <div className="lg:col-span-2">
                    <div className="max-w-4xl">
                        <p className="text-base md:text-2xl leading-relaxed text-neutral-400 font-normal">
                            {project.description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* NEXT PROJECT LINK */}
      <section className="mt-20 md:mt-32">
        <Link 
            to={`/portfolio/${nextProject.id}`} 
            className="group block relative overflow-hidden bg-black h-[50vh] md:h-[70vh] flex items-center justify-center"
        >
            <div className="absolute inset-0 z-0">
                <img 
                    src={nextProject.imageUrl} 
                    alt={nextProject.title} 
                    className="w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-[3s] ease-out"
                />
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-4 md:gap-8 px-6 text-center">
                <div className="flex items-center gap-3 text-accent/30 group-hover:text-accent transition-colors">
                    <span className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[1em]">Next Artifact</span>
                </div>
                <h3 className="text-2xl md:text-8xl font-black uppercase tracking-tighter group-hover:tracking-normal transition-all duration-1000">
                    {nextProject.title}
                </h3>
            </div>
        </Link>
      </section>

      <footer className="py-12 md:py-20 flex flex-col items-center gap-10">
        <Link to="/portfolio" className="group flex items-center gap-4 text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-neutral-600 hover:text-accent transition-all px-4 text-center">
            <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
            Return to Base Archive
        </Link>
      </footer>
    </motion.div>
  );
};

export default ProjectDetail;
