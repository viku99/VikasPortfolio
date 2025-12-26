import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, Code, BrainCircuit, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const TechItem: React.FC<{ name: string; reason: string }> = ({ name, reason }) => (
    <motion.div 
        className="bg-primary border border-secondary/50 rounded-lg p-6"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
    >
        <h4 className="font-mono text-lg text-accent">{name}</h4>
        <p className="text-neutral-400 mt-2 text-sm">{reason}</p>
    </motion.div>
);


const AboutWebsite = () => {
  return (
    <div className="container mx-auto px-6 md:px-8 pt-40 pb-24 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-24 md:mb-32">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-accent">
            The Blueprint
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
            This site is more than a collection of work; it's an experience built on a core philosophy. Here's a look under the hood.
          </p>
        </motion.div>

        {/* Section 1: Collaboration */}
        <motion.div 
            className="text-center mb-24 md:mb-32 bg-white/[0.02] p-12 rounded-[2rem] border border-white/5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 mb-8">
                <BrainCircuit size={48} className="text-accent" strokeWidth={1}/>
                <div className="text-3xl font-thin text-neutral-600">+</div>
                <Code size={48} className="text-accent" strokeWidth={1}/>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-neutral-100 tracking-tighter uppercase">Human Curation, <br className="md:hidden" /> AI Acceleration.</motion.h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-neutral-400 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
              This site was built in partnership with a generative AI. This collaboration helps me elevate my speed and thinking, allowing for rapid technical execution and freeing me to focus purely on creative direction.
            </motion.p>
        </motion.div>

        {/* Section 2: Philosophy */}
        <motion.div 
            className="text-center mb-24 md:mb-32"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.h2 variants={itemVariants} className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Philosophy</motion.h2>
            <motion.p variants={itemVariants} className="text-3xl md:text-4xl font-medium text-neutral-100 leading-tight tracking-tight">
                Motion is the primary language, not an afterthought. Every animation, transition, and interaction is designed to tell a story and evoke emotion.
            </motion.p>
        </motion.div>

        {/* Section 3: Technology */}
         <motion.div 
            className="mb-24 md:mb-32"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center tracking-tight mb-12 uppercase">Code & Creativity</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TechItem name="React & TypeScript" reason="Provides a robust, modern foundation for building a complex, type-safe user interface." />
                <TechItem name="Framer Motion" reason="The core animation library chosen for its power in creating fluid, physics-based UI and complex, gesture-driven interactions." />
                <TechItem name="Tailwind CSS" reason="Enables rapid, utility-first styling to craft a bespoke design system without leaving the HTML." />
                <TechItem name="Lucide Icons" reason="A clean, consistent, and highly customizable icon set that complements the site's minimalist aesthetic." />
            </div>
        </motion.div>

        <motion.div 
            className="mt-16 text-center pt-16 border-t border-white/5"
            variants={itemVariants}
        >
            <Link to="/portfolio" className="group inline-flex items-center justify-center text-lg text-accent font-semibold transition-colors hover:text-white uppercase tracking-widest">
                See the result
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutWebsite;