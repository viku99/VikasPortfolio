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
    { value: 'default', label: 'Sort by: Default' },
    { value: 'year-newest', label: 'Year: Newest First' },
    { value: 'year-oldest', label: 'Year: Oldest First' },
    { value: 'title-az', label: 'Title: A-Z' },
    { value: 'title-za', label: 'Title: Z-A' },
    { value: 'category', label: 'Category' },
];


const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
            setIsSortOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayedProjects = useMemo(() => {
    // 1. Filter first based on search query
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    const filtered = lowercasedQuery === ''
      ? [...PROJECTS]
      : PROJECTS.filter(project =>
          project.title.toLowerCase().includes(lowercasedQuery) ||
          project.category.toLowerCase().includes(lowercasedQuery) ||
          project.description.toLowerCase().includes(lowercasedQuery) ||
          project.details.techStack.some(tech => tech.toLowerCase().includes(lowercasedQuery))
        );

    // 2. Then sort the filtered results
    const sorted = [...filtered];
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
  }, [searchQuery, sortBy]);
  
  const selectedSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort by...';

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
        
        <motion.div variants={itemVariants} className="mb-12 flex flex-col sm:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
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
          
           <div className="relative w-full sm:w-auto" ref={sortRef}>
            <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full sm:w-auto bg-primary border border-secondary pl-4 pr-4 py-3 text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full transition-all duration-300 flex items-center justify-between min-w-[220px]"
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
            {displayedProjects.length === 0 && searchQuery && (
                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center col-span-1 md:col-span-2 lg:col-span-3 py-16"
                 >
                    <p className="text-lg text-neutral-400">No projects found for "{searchQuery}"</p>
                </motion.div>
            )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portfolio;