
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, Variants, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, ChevronDown, Lock, X } from 'lucide-react';
import { PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'year-newest', label: 'Newest First' },
    { value: 'title-az', label: 'Title: A-Z' },
];

const Portfolio = () => {
  // PERSISTENCE: Check if already unlocked in this session
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem('portfolio_unlocked') === 'true';
    }
    return false;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  
  const sortRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  
  // Transition logic for the initial unlock experience
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const overlayScale = useTransform(scrollY, [0, 400], [1, 1.05]);
  const contentY = useTransform(scrollY, [0, 400], [100, 0]);

  // Update unlock state and session storage on scroll
  useEffect(() => {
    if (isUnlocked) return; // Don't track if already permanently unlocked for this session

    const unsubscribe = scrollY.on('change', v => {
      if (v > 300) {
        setIsUnlocked(true);
        sessionStorage.setItem('portfolio_unlocked', 'true');
      }
    });
    return () => unsubscribe();
  }, [scrollY, isUnlocked]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (sortRef.current && !sortRef.current.contains(event.target as Node)) setIsSortOpen(false);
        if (techRef.current && !techRef.current.contains(event.target as Node)) setIsTechOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const techCategories = {
    'Motion Engineering': ["After Effects", "Premiere Pro", "Time Remapping"],
    'Advanced Techniques': ["AI Narrative Synthesis", "Sound Engineering", "Beat-Accuracy"]
  };

  const handleTechChange = (tech: string) => {
    setSelectedTech(prev => (prev === tech ? null : tech));
    setIsTechOpen(false);
  };

  const displayedProjects = useMemo(() => {
    let results = [...PROJECTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.details.techStack.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedTech) {
      results = results.filter(p => p.details.techStack.includes(selectedTech));
    }

    switch (sortBy) {
      case 'title-az': return results.sort((a, b) => a.title.localeCompare(b.title));
      case 'year-newest': return results.sort((a, b) => b.details.year - a.details.year);
      default: return results;
    }
  }, [searchQuery, sortBy, selectedTech]);
  
  const techFilterLabel = selectedTech ? selectedTech : 'Filter Tech';
  const sortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort';

  // Determine if we should show the animated entry based on session storage
  const isFirstVisitThisSession = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_unlocked') !== 'true';

  return (
    <div className={`relative bg-background ${isFirstVisitThisSession ? 'min-h-[200vh]' : 'min-h-screen'}`}>
      
      {/* 
          CINEMATIC OVERLAY 
          Only renders if the user hasn't scrolled past it in this session 
      */}
      {isFirstVisitThisSession && (
        <motion.div 
            style={{ 
                opacity: overlayOpacity, 
                scale: overlayScale,
                pointerEvents: isUnlocked ? 'none' : 'auto' 
            }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-background z-40 transition-colors duration-500"
        >
            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-6"
            >
            <div className="relative mb-8">
                <motion.div 
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-accent blur-3xl opacity-20 rounded-full"
                />
                <Lock className="w-10 h-10 text-accent mb-2 mx-auto relative z-10" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase text-accent">
                Accessing Archive
            </h1>
            
            <div className="flex items-center justify-center gap-6">
                <div className="h-[1px] w-8 md:w-16 bg-neutral-800"></div>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-500 font-mono">
                    Decryption in progress... Scroll
                </span>
                <div className="h-[1px] w-8 md:w-16 bg-neutral-800"></div>
            </div>
            </motion.div>

            <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12"
            >
            <ChevronDown className="w-6 h-6 text-neutral-700" />
            </motion.div>
        </motion.div>
      )}

      {/* 
          PORTFOLIO CONTENT 
          If already unlocked, remove the top padding
      */}
      <motion.div 
        style={isFirstVisitThisSession ? { y: contentY } : {}}
        className={`container mx-auto px-6 md:px-8 pb-32 relative z-30 ${isFirstVisitThisSession ? 'pt-[60vh]' : 'pt-40'}`}
      >
        <motion.div 
          initial={isFirstVisitThisSession ? "hidden" : "visible"} 
          animate={isUnlocked ? "visible" : (isFirstVisitThisSession ? "hidden" : "visible")}
          variants={containerVariants}
        >
          {/* Controls Bar */}
          <div className="mb-20 flex flex-col md:flex-row gap-4 items-center justify-center max-w-5xl mx-auto">
            <div className="relative w-full md:flex-grow">
              <input
                type="text"
                placeholder="Search work..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-primary/40 border border-white/5 backdrop-blur-md pl-12 pr-12 py-4 text-accent placeholder-neutral-600 focus:outline-none focus:border-accent/30 rounded-full transition-all text-sm uppercase tracking-wider"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-accent"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              {/* Tech Filter Dropdown */}
              <div className="relative flex-grow md:w-auto" ref={techRef}>
                <button
                    onClick={() => setIsTechOpen(!isTechOpen)}
                    className={`w-full bg-primary/40 border border-white/5 px-6 py-4 text-sm uppercase tracking-widest rounded-full flex items-center justify-between min-w-[180px] transition-colors ${selectedTech ? 'text-accent border-accent/40' : 'text-neutral-400'}`}
                >
                    <span className="truncate max-w-[120px]">{techFilterLabel}</span>
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${isTechOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {isTechOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-3 right-0 w-64 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl"
                        >
                          <li 
                            onClick={() => { setSelectedTech(null); setIsTechOpen(false); }} 
                            className="px-5 py-4 cursor-pointer hover:bg-white/5 text-[10px] uppercase tracking-[0.2em] border-b border-white/5"
                          >
                            Show All Work
                          </li>
                          {Object.entries(techCategories).map(([category, techs]) => (
                            <React.Fragment key={category}>
                                <li className="px-5 py-2 text-[9px] uppercase tracking-widest text-neutral-600 font-black bg-white/2">{category}</li>
                                {techs.map(tech => (
                                    <li 
                                      key={tech} 
                                      onClick={() => handleTechChange(tech)} 
                                      className={`px-5 py-3 text-[11px] uppercase tracking-widest cursor-pointer hover:bg-white/5 transition-colors ${selectedTech === tech ? 'text-accent bg-white/5' : 'text-neutral-400'}`}
                                    >
                                      {tech}
                                    </li>
                                ))}
                            </React.Fragment>
                          ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex-grow md:w-auto" ref={sortRef}>
                <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className={`w-full bg-primary/40 border border-white/5 px-6 py-4 text-sm uppercase tracking-widest rounded-full flex items-center justify-between min-w-[150px] transition-colors ${sortBy !== 'default' ? 'text-accent border-accent/40' : 'text-neutral-400'}`}
                >
                    <span className="truncate max-w-[100px]">{sortLabel}</span>
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {isSortOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-3 right-0 w-48 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl"
                        >
                            {sortOptions.map(option => (
                                <li
                                    key={option.value}
                                    onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                                    className={`px-5 py-4 text-[11px] uppercase tracking-widest cursor-pointer hover:bg-white/5 transition-colors ${sortBy === option.value ? 'text-accent' : 'text-neutral-400'}`}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Project List */}
          <motion.div 
              className="flex flex-col items-center gap-24 md:gap-40 max-w-5xl mx-auto"
              variants={containerVariants}
          >
              {displayedProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants} className="w-full">
                      <ProjectCard project={project} />
                  </motion.div>
              ))}
              
              {displayedProjects.length === 0 && (
                   <div className="text-center py-40 w-full">
                      <p className="text-sm text-neutral-600 uppercase tracking-[0.4em] font-mono">
                        No artifacts matching criteria.
                      </p>
                      <button 
                        onClick={() => {setSearchQuery(''); setSelectedTech(null); setSortBy('default');}}
                        className="mt-6 text-accent text-[10px] uppercase tracking-widest border-b border-accent/20 hover:border-accent"
                      >
                        Reset Archive
                      </button>
                  </div>
              )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portfolio;
