import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';

// Variants for the container to orchestrate animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5, // Delay to sync with page transition
      staggerChildren: 0.1,
    },
  },
};

// Variants for each project card
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
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
    { value: 'year-oldest', label: 'Oldest First' },
    { value: 'title-az', label: 'Title: A-Z' },
    { value: 'title-za', label: 'Title: Z-A' },
    { value: 'category', label: 'Category' },
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
        if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
            setIsSortOpen(false);
        }
        if (techRef.current && !techRef.current.contains(event.target as Node)) {
            setIsTechOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const techCategories = {
    'Design': ["Photoshop", "Illustrator"],
    'Video & Motion': ["After Effects", "Premiere Pro", "DaVinci Resolve"],
    '3D & VFX': ["Blender", "Maya", "Houdini", "Unreal Engine", "Substance Painter"]
  };

  const handleTechChange = (tech: string) => {
    setSelectedTech(prev => (prev === tech ? null : tech));
    setIsTechOpen(false);
  };

  const displayedProjects = useMemo(() => {
    // 1. Filter by search query
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    const filteredBySearch = lowercasedQuery === ''
      ? [...PROJECTS]
      : PROJECTS.filter(project =>
          project.title.toLowerCase().includes(lowercasedQuery) ||
          project.category.toLowerCase().includes(lowercasedQuery) ||
          project.description.toLowerCase().includes(lowercasedQuery) ||
          project.details.techStack.some(tech => tech.toLowerCase().includes(lowercasedQuery))
        );

    // 2. Filter by selected technologies
    const filteredByTech = !selectedTech
      ? filteredBySearch
      : filteredBySearch.filter(project =>
          project.details.techStack.includes(selectedTech)
        );

    // 3. Sort the results
    const sorted = [...filteredByTech];
    switch (sortBy) {
      case 'title-az':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-za':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'year-newest':
        return sorted.sort((a, b) => b.details.year - a.details.year);
      case 'year-oldest':
        return sorted.sort((a, b) => a.details.year - b.details.year);
      case 'category':
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      case 'default':
      default:
        // Find original index to sort back to default
        return sorted.sort((a, b) => PROJECTS.indexOf(a) - PROJECTS.indexOf(b));
    }
  }, [searchQuery, sortBy, selectedTech]);
  
  const selectedSortLabel = `Sort by: ${sortOptions.find(opt => opt.value === sortBy)?.label || 'Default'}`;
  const techFilterLabel = selectedTech
    ? `Technology: ${selectedTech}`
    : 'Filter by Technology';

  return (
    <div className="container mx-auto px-6 md:px-8 pt-40 pb-24 min-h-screen">
      <motion.div 
        initial="hidden" 
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                Selected Works
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                A curated selection of projects that blend creative direction with technical execution.
            </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-center max-w-4xl mx-auto">
          <div className="relative w-full flex-grow">
            <input
              type="text"
              placeholder="Search by title, technology, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-primary border border-secondary pl-12 pr-4 py-3 text-accent placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full transition-shadow, transition-colors duration-300"
              aria-label="Search projects"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
          </div>
          
          <div className="relative w-full md:w-auto" ref={techRef}>
            <button
                onClick={() => setIsTechOpen(!isTechOpen)}
                className="w-full md:w-auto bg-primary border border-secondary pl-4 pr-4 py-3 text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full transition-all duration-300 flex items-center justify-between min-w-[220px]"
                aria-haspopup="listbox"
                aria-expanded={isTechOpen}
            >
                <span>{techFilterLabel}</span>
                <motion.div
                    animate={{ rotate: isTechOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-5 h-5 text-neutral-400 ml-3" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isTechOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full mt-2 w-full md:w-72 bg-primary border border-secondary rounded-lg shadow-2xl z-20 overflow-hidden max-h-80 overflow-y-auto"
                        role="listbox"
                    >
                      <li
                        onClick={() => {
                          setSelectedTech(null);
                          setIsTechOpen(false);
                        }}
                        className="px-4 py-2 text-left cursor-pointer transition-colors duration-200 text-neutral-300 hover:bg-secondary"
                        role="option"
                        aria-selected={selectedTech === null}
                      >
                        <span className={selectedTech === null ? 'text-accent font-medium' : ''}>
                          All Technologies
                        </span>
                      </li>
                      <li className="px-4"><div className="border-t border-secondary/50"></div></li>
                      {Object.keys(techCategories).map((category) => (
                        <React.Fragment key={category}>
                            <li className="px-4 pt-3 pb-1 text-xs uppercase tracking-widest text-neutral-500 font-bold select-none">
                                {category}
                            </li>
                            {techCategories[category as keyof typeof techCategories].map(tech => (
                                <li
                                    key={tech}
                                    onClick={() => handleTechChange(tech)}
                                    className="px-4 py-2 text-left cursor-pointer transition-colors duration-200 text-neutral-300 hover:bg-secondary"
                                    role="option"
                                    aria-selected={selectedTech === tech}
                                >
                                    <span className={selectedTech === tech ? 'text-accent font-medium' : ''}>
                                        {tech}
                                    </span>
                                </li>
                            ))}
                        </React.Fragment>
                      ))}
                    </motion.ul>
                )}
            </AnimatePresence>
          </div>

           <div className="relative w-full md:w-auto" ref={sortRef}>
            <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full md:w-auto bg-primary border border-secondary pl-4 pr-4 py-3 text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full transition-all duration-300 flex items-center justify-between min-w-[220px]"
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
            >
                <span>{selectedSortLabel}</span>
                <motion.div
                    animate={{ rotate: isSortOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-5 h-5 text-neutral-400 ml-3" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isSortOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full mt-2 w-full bg-primary border border-secondary rounded-lg shadow-2xl z-20 overflow-hidden"
                        role="listbox"
                    >
                        {sortOptions.map(option => (
                            <li
                                key={option.value}
                                onClick={() => {
                                    setSortBy(option.value);
                                    setIsSortOpen(false);
                                }}
                                className={`px-4 py-3 text-left cursor-pointer transition-colors duration-200 ${sortBy === option.value ? 'bg-accent/10 text-accent' : 'text-neutral-300 hover:bg-secondary'}`}
                                role="option"
                                aria-selected={sortBy === option.value}
                            >
                                {option.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            variants={containerVariants}
        >
            {displayedProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants} layout>
                    <ProjectCard project={project} />
                </motion.div>
            ))}
            {displayedProjects.length === 0 && (searchQuery || selectedTech !== null) && (
                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center col-span-1 md:col-span-2 lg:col-span-3 py-16"
                 >
                    <p className="text-lg text-neutral-400">No projects found matching your criteria.</p>
                </motion.div>
            )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portfolio;