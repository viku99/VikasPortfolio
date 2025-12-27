
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, X, Loader2 } from 'lucide-react';
import { PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  
  const sortRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="bg-background min-h-screen pt-32 md:pt-40">
      <div className="container mx-auto px-6 md:px-8 pb-32">
        <motion.div 
          initial="hidden" 
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <div className="mb-12 md:mb-20 text-center">
              <motion.span variants={itemVariants} className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.8em] text-neutral-500 font-mono mb-4 block">Archive Directory // Vol 1</motion.span>
              <motion.h1 variants={itemVariants} className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 md:mb-12">
                  Selected <br /> <span className="text-neutral-700">Works</span>
              </motion.h1>
          </div>

          {/* Controls Bar */}
          <div className="mb-12 md:mb-20 flex flex-col md:flex-row gap-4 items-center justify-center max-w-5xl mx-auto">
            <motion.div variants={itemVariants} className="relative w-full md:flex-grow">
              <input
                type="text"
                placeholder="Search work..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-primary/40 border border-white/5 backdrop-blur-md pl-12 pr-12 py-3 md:py-4 text-accent placeholder-neutral-600 focus:outline-none focus:border-accent/30 rounded-full transition-all text-[11px] md:text-sm uppercase tracking-wider"
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
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-auto" ref={techRef}>
                <button
                    onClick={() => setIsTechOpen(!isTechOpen)}
                    className={`w-full bg-primary/40 border border-white/5 px-6 py-3 md:py-4 text-[10px] md:text-sm uppercase tracking-widest rounded-full flex items-center justify-between min-w-[140px] md:min-w-[180px] transition-colors ${selectedTech ? 'text-accent border-accent/40' : 'text-neutral-400'}`}
                >
                    <span className="truncate max-w-[80px] md:max-w-[120px]">{techFilterLabel}</span>
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${isTechOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {isTechOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-3 left-0 md:right-0 w-64 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl"
                        >
                          <li 
                            onClick={() => { setSelectedTech(null); setIsTechOpen(false); }} 
                            className="px-5 py-4 cursor-pointer hover:bg-white/5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] border-b border-white/5"
                          >
                            Show All Work
                          </li>
                          {Object.entries(techCategories).map(([category, techs]) => (
                            <React.Fragment key={category}>
                                <li className="px-5 py-2 text-[8px] md:text-[9px] uppercase tracking-widest text-neutral-600 font-black bg-white/2">{category}</li>
                                {techs.map(tech => (
                                    <li 
                                      key={tech} 
                                      onClick={() => handleTechChange(tech)} 
                                      className={`px-5 py-3 text-[10px] md:text-[11px] uppercase tracking-widest cursor-pointer hover:bg-white/5 transition-colors ${selectedTech === tech ? 'text-accent bg-white/5' : 'text-neutral-400'}`}
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

              <div className="relative flex-grow md:w-auto" ref={sortRef}>
                <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className={`w-full bg-primary/40 border border-white/5 px-6 py-3 md:py-4 text-[10px] md:text-sm uppercase tracking-widest rounded-full flex items-center justify-between min-w-[120px] md:min-w-[150px] transition-colors ${sortBy !== 'default' ? 'text-accent border-accent/40' : 'text-neutral-400'}`}
                >
                    <span className="truncate max-w-[70px] md:max-w-[100px]">{sortLabel}</span>
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
                                    className={`px-5 py-4 text-[10px] md:text-[11px] uppercase tracking-widest cursor-pointer hover:bg-white/5 transition-colors ${sortBy === option.value ? 'text-accent' : 'text-neutral-400'}`}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Project List */}
          <motion.div 
              className="flex flex-col items-center gap-12 md:gap-40 max-w-5xl mx-auto"
              variants={containerVariants}
          >
              {displayedProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants} className="w-full">
                      <ProjectCard project={project} />
                  </motion.div>
              ))}
              
              {displayedProjects.length > 0 && (
                <motion.div 
                  variants={itemVariants}
                  className="w-full pt-12 flex flex-col items-center gap-6 opacity-30 group"
                >
                    <div className="relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="text-accent/20"
                      >
                        <Loader2 className="w-12 h-12 md:w-16 md:h-16" strokeWidth={0.5} />
                      </motion.div>
                    </div>
                    <div className="text-center space-y-2">
                      <h4 className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] font-mono text-neutral-400 group-hover:text-accent transition-colors">
                        More projects are getting cooked
                      </h4>
                      <p className="text-[6px] md:text-[8px] uppercase tracking-[0.3em] text-neutral-600 font-mono">
                        System update in progress
                      </p>
                    </div>
                </motion.div>
              )}
              
              {displayedProjects.length === 0 && (
                   <div className="text-center py-40 w-full">
                      <p className="text-[10px] md:text-sm text-neutral-600 uppercase tracking-[0.4em] font-mono">
                        No artifacts matching criteria.
                      </p>
                      <button 
                        onClick={() => {setSearchQuery(''); setSelectedTech(null); setSortBy('default');}}
                        className="mt-6 text-accent text-[8px] md:text-[10px] uppercase tracking-widest border-b border-accent/20 hover:border-accent"
                      >
                        Reset Archive
                      </button>
                  </div>
              )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
