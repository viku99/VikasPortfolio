
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Cpu, Zap, ChevronDown, Terminal } from 'lucide-react';
import { PROJECTS } from '../constants';
import VideoPlayer from '../components/VideoPlayer';
import { useAppContext } from '../contexts/AppContext';

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
  const { setActiveVideoId } = useAppContext();
  const [showAiNotice, setShowAiNotice] = useState(false);
  const [isReelsMode, setIsReelsMode] = useState(false);
  const reelsContainerRef = useRef<HTMLDivElement>(null);

  const projectIndex = useMemo(() => 
    PROJECTS.findIndex((p) => p.id === projectId),
    [projectId]
  );
  
  const project = projectIndex !== -1 ? PROJECTS[projectIndex] : null;
  const nextProject = project ? PROJECTS[(projectIndex + 1) % PROJECTS.length] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsReelsMode(false);
    setActiveVideoId(null);
    
    if (projectId === 'the-vision-series') {
      const timer = setTimeout(() => setShowAiNotice(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [projectId, setActiveVideoId]);

  // ============================================================================
  // REELS AUTO-PLAY OBSERVER
  // ============================================================================
  useEffect(() => {
    if (!isReelsMode || !reelsContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reel-id');
            if (id) {
              setActiveVideoId(id);
            }
          }
        });
      },
      {
        root: reelsContainerRef.current,
        threshold: 0.6, // Must be 60% visible to trigger play
      }
    );

    const elements = reelsContainerRef.current.querySelectorAll('[data-reel-id]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isReelsMode, setActiveVideoId]);

  if (!project || !nextProject) return null;

  const enterReelsMode = () => {
    setIsReelsMode(true);
    // Explicitly set the first video as active on start
    const firstId = `reel-${projectId}-0`;
    setActiveVideoId(firstId);
    document.body.style.overflow = 'hidden';
  };

  const exitReelsMode = () => {
    setIsReelsMode(false);
    setActiveVideoId(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <motion.div initial="hidden" animate="visible" className="bg-background text-accent min-h-screen">
      
      {/* REELS MODE OVERLAY */}
      <AnimatePresence>
        {isReelsMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black"
          >
            {/* Exit Overlay Controls */}
            <button 
              onClick={exitReelsMode}
              className="fixed top-8 right-8 z-[210] p-4 bg-white/10 backdrop-blur-3xl rounded-full text-accent hover:bg-accent hover:text-background transition-all shadow-2xl"
            >
              <X size={24} />
            </button>

            <div 
              ref={reelsContainerRef}
              className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
            >
              {project.gallery?.map((item, idx) => {
                const reelId = `reel-${projectId}-${idx}`;
                return (
                  <div 
                    key={idx} 
                    data-reel-id={reelId}
                    className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden"
                  >
                    <div className="w-full h-full md:max-w-[450px] aspect-[9/16] bg-neutral-900 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                      <VideoPlayer 
                        type={item.type as 'youtube' | 'local'} 
                        src={item.src} 
                        showControls={true} 
                        autoplay={idx === 0}
                        startUnmuted={true} // Enabled because mode entered by user click
                        isReelsMode={true}
                        reelId={reelId}
                      />
                    </div>
                    
                    <div className="absolute bottom-12 left-8 md:left-[calc(50%-200px)] pointer-events-none z-20">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                      >
                        <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-accent/40 mb-2 block">
                          Artifact {idx + 1} // 0{project.gallery?.length}
                        </span>
                        <h4 className="text-xl font-black uppercase tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
                          {item.label || project.title}
                        </h4>
                      </motion.div>
                    </div>

                    {/* Hint for next scroll */}
                    {idx === 0 && (
                      <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20"
                      >
                        <ChevronDown size={24} />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI NOTICE */}
      <AnimatePresence>
        {showAiNotice && !isReelsMode && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-12 right-12 z-[100] max-w-md hidden md:block"
          >
            <div className="bg-primary/80 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent/20" />
              <button onClick={() => setShowAiNotice(false)} className="absolute top-6 right-6 text-neutral-500 hover:text-accent"><X size={20}/></button>
              <div className="flex gap-6">
                <Cpu size={40} className="text-accent shrink-0 animate-pulse" strokeWidth={1} />
                <div className="space-y-3">
                  <h4 className="text-lg font-black uppercase tracking-tight">AI Asset Study</h4>
                  <p className="text-sm text-neutral-400 font-mono leading-relaxed">Synthetic environments were synthesized from scratch for this study using Generative AI to bridge the fidelity gap.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <section className="pt-32 px-6">
        <div className="container mx-auto">
            {project.isSeries ? (
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-[10px] uppercase tracking-[0.4em] font-mono opacity-50">Archive Series // Active</span>
                    </div>
                    <h1 className="text-4xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85]">{project.title}</h1>
                  </div>
                  
                  <button 
                    onClick={enterReelsMode}
                    className="group relative flex items-center gap-4 bg-accent text-background px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all overflow-hidden shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                  >
                    <Zap size={16} fill="currentColor" />
                    Enter Reels Mode
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.gallery?.map((item, idx) => {
                    const reelId = `gallery-${project.id}-${idx}`;
                    return (
                      <motion.div key={idx} variants={fadeUp} className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-primary group">
                        <VideoPlayer 
                          type={item.type as 'youtube' | 'local'} 
                          src={item.src} 
                          autoplay={false} 
                          reelId={reelId}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                <motion.div layoutId={`project-container-${project.id}`} className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-primary">
                    <VideoPlayer {...project.heroVideo} showControls={true} reelId={`hero-${project.id}`} />
                </motion.div>
                <h1 className="text-4xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85]">{project.title}</h1>
              </div>
            )}
        </div>
      </section>

      {/* DETAILS GRID */}
      <section className="py-32 px-6 border-t border-white/5 mt-32">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Archive_Ref</span>
              <p className="text-neutral-400 leading-relaxed text-lg">{project.description}</p>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-accent/40 font-mono text-center md:text-left">Software_Stack</h4>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {project.details.techStack.map(t => (
                    <span key={t} className="px-4 py-2 bg-white/5 rounded-full text-[10px] uppercase tracking-widest border border-white/10 hover:border-accent/40 transition-colors">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 space-y-8 group hover:bg-white/[0.04] transition-all">
              <div className="flex items-center gap-4 text-accent/30 group-hover:text-accent transition-colors">
                <Terminal size={20} />
                <span className="text-[10px] uppercase tracking-[0.6em] font-mono">Process_Analysis</span>
              </div>
              <p className="text-xl md:text-4xl text-neutral-200 font-light leading-tight italic">
                "{project.details.analysis}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <section className="border-t border-white/5 pt-32 pb-40 px-6">
        <Link to={`/portfolio/${nextProject.id}`} className="group block max-w-7xl mx-auto text-center space-y-8">
          <span className="text-[10px] uppercase tracking-[1em] text-neutral-600 block">Next_Artifact</span>
          <h2 className="text-4xl md:text-[12vw] font-black uppercase tracking-tighter group-hover:tracking-normal transition-all duration-1000 leading-none">
            {nextProject.title}
          </h2>
          <div className="flex justify-center pt-8">
            <motion.div 
              whileHover={{ y: 5 }}
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all"
            >
              <ChevronDown className="-rotate-90" />
            </motion.div>
          </div>
        </Link>
      </section>
      
      <footer className="py-20 text-center opacity-20 hover:opacity-100 transition-opacity">
        <Link to="/portfolio" className="text-[10px] uppercase tracking-[0.5em] font-mono inline-flex items-center gap-4">
          <ArrowLeft size={12} /> Return to archive
        </Link>
      </footer>
    </motion.div>
  );
};

export default ProjectDetail;
