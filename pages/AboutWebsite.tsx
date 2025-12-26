import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Layers, Zap, Wand2, Code, BrainCircuit, ArrowRight } from 'lucide-react';
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

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div 
    className="bg-primary border border-secondary/50 rounded-lg p-6 text-center flex flex-col items-center"
    variants={itemVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
  >
    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 border-2 border-accent/20 text-accent">
        {icon}
    </div>
    <h3 className="text-xl font-bold text-neutral-100 mb-2">{title}</h3>
    <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

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

        {/* Section 1: Philosophy */}
        <motion.div 
            className="text-center mb-24 md:mb-32"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.h2 variants={itemVariants} className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Philosophy</motion.h2>
            <motion.p variants={itemVariants} className="text-3xl md:text-4xl font-medium text-neutral-100 leading-tight">
                Motion is the primary language, not an afterthought. Every animation, transition, and interaction is designed to tell a story and evoke emotion.
            </motion.p>
        </motion.div>

        {/* Section 2: Deconstruction */}
        <motion.div 
            className="mb-24 md:mb-32"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center tracking-tight mb-12">Deconstructing the Experience</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<Layers size={28} />} 
                    title="Cinematic Transitions" 
                    description="Pages don't just load, they unveil. Custom shutter animations create a sense of entering a new scene, making navigation a deliberate, cinematic act." 
                />
                <FeatureCard 
                    icon={<Zap size={28} />} 
                    title="Living Canvases" 
                    description="Project cards are not static images. They are dormant videos that come to life on hover, transforming the grid into a dynamic, interactive preview of the work." 
                />
                <FeatureCard 
                    icon={<Wand2 size={28} />} 
                    title="Shared Element Motion" 
                    description="When you click a project, the card fluidly expands into the hero banner of the detail page, creating a seamless and magical transition that maintains context." 
                />
            </div>
        </motion.div>

        {/* Section 3: Technology */}
         <motion.div 
            className="mb-24 md:mb-32"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center tracking-tight mb-12">Code & Creativity</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TechItem name="React & TypeScript" reason="Provides a robust, modern foundation for building a complex, type-safe user interface." />
                <TechItem name="Framer Motion" reason="The core animation library chosen for its power in creating fluid, physics-based UI and complex, gesture-driven interactions." />
                <TechItem name="Tailwind CSS" reason="Enables rapid, utility-first styling to craft a bespoke design system without leaving the HTML." />
                <TechItem name="Lucide Icons" reason="A clean, consistent, and highly customizable icon set that complements the site's minimalist aesthetic." />
            </div>
        </motion.div>

        {/* Section 4: Collaboration */}
        <motion.div 
            className="text-center border-t border-secondary pt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 mb-6">
                <BrainCircuit size={32} className="text-accent"/>
                <div className="text-2xl font-thin text-neutral-600">+</div>
                <Code size={32} className="text-accent"/>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-neutral-100 tracking-tight">Human Curation, AI Acceleration.</motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-neutral-400 mt-4 max-w-2xl mx-auto">
              This site was built in partnership with a generative AI. This collaboration helps me elevate my speed and thinking, allowing for rapid technical execution and freeing me to focus purely on creative direction.
            </motion.p>
        </motion.div>

        <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
        >
            <Link to="/portfolio" className="group inline-flex items-center justify-center mt-6 text-lg text-accent font-semibold transition-colors hover:text-white">
                See the result
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutWebsite;