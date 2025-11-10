import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Layers, ShieldCheck } from 'lucide-react';
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

const InteractiveBreakdownVisual = () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        { name: 'Plate', description: 'The original, untouched footage that serves as the canvas.' },
        { name: 'CG Integration', description: 'Adding computer-generated 3D elements into the scene.' },
        { name: 'FX Pass', description: 'Atmospherics, particles, and other dynamic visual effects.' },
        { name: 'Final Grade', description: 'Color correction and grading to unify the shot and create a mood.' }
    ];

    return (
        <div className="bg-primary/50 border border-secondary rounded-lg p-4 md:p-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-md shadow-xl">
                <motion.img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop"
                    alt="VFX Plate - A landscape with mountains and a lake"
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ filter: activeStep === 3 ? 'sepia(40%) contrast(1.1) saturate(1.2) brightness(0.95)' : 'sepia(0%) contrast(1) saturate(1) brightness(1)' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                />

                <AnimatePresence>
                    {activeStep >= 1 && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div 
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1), rgba(0, 255, 255, 0.5) 60%, rgba(0, 255, 255, 0) 70%)',
                                    backdropFilter: 'blur(3px)',
                                    border: '1px solid rgba(0, 255, 255, 0.6)',
                                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
                                }}
                             />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {activeStep >= 2 && (
                        <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute inset-0 bg-[url('https://assets.website-files.com/62338695029a995431057421/62338695029a997230057467_noise.gif')] opacity-[0.07] mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-6">
                <div className="flex justify-between items-center border-b border-secondary">
                    {steps.map((step, index) => (
                        <button
                            key={step.name}
                            onClick={() => setActiveStep(index)}
                            className="relative flex-1 text-center py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                        >
                            <span className={`font-bold text-sm uppercase tracking-widest transition-colors ${activeStep === index ? 'text-accent' : 'text-neutral-400 hover:text-accent'}`}>{step.name}</span>
                            {activeStep === index && (
                                <motion.div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-accent" layoutId="active-step-indicator" />
                            )}
                        </button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={activeStep}
                        className="text-center text-neutral-400 mt-4 min-h-[40px] flex items-center justify-center px-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {steps[activeStep].description}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    )
}

const Breakdown = () => {
  return (
    <div className="container mx-auto px-6 md:px-8 pt-40 pb-24 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Process is Everything
          </h1>
          <p className="text-lg md:text-xl text-neutral-400">
            Deconstructing the craft behind the canvas.
          </p>
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg text-neutral-300 leading-relaxed text-center max-w-3xl mx-auto mb-16">
            A final image is a statement, but the breakdown is the conversation. It’s where artistry is proven and technique is revealed. In a world of presets and templates, showing your work—every layer, every pass, every decision—is the ultimate act of transparency. It’s not just about the 'what'; it’s about the 'how'.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <InteractiveBreakdownVisual />
        </motion.div>

        <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-accent text-center mt-24 mb-12">
                More Than a 'Before and After'
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-primary/50 border border-secondary rounded-lg p-8">
                    <Layers className="w-8 h-8 text-accent mb-4" />
                    <h3 className="text-2xl font-semibold text-neutral-100 mb-3">Deconstructing Complexity</h3>
                    <p className="text-neutral-400 leading-relaxed">
                        A breakdown transforms a magical final shot into a series of deliberate, logical steps. It reveals a deep understanding of the professional pipeline—from raw plate to final composite—and demonstrates a methodical approach to problem-solving.
                    </p>
                </div>
                <div className="bg-primary/50 border border-secondary rounded-lg p-8">
                    <ShieldCheck className="w-8 h-8 text-accent mb-4" />
                    <h3 className="text-2xl font-semibold text-neutral-100 mb-3">Validating Artistry</h3>
                    <p className="text-neutral-400 leading-relaxed">
                        It serves as undeniable proof of work, separating original creation from imitation. It clarifies the artist's specific contribution on team projects and builds unwavering trust with collaborators and recruiters by making the thought process visible.
                    </p>
                </div>
            </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-24 text-center border-t border-secondary pt-16">
             <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                A polished render without a breakdown asks for trust. A polished render <em>with</em> a breakdown commands it. It’s an open invitation into the creative process, building confidence and showcasing a commitment to the craft that goes beyond the surface.
             </p>
             <Link to="/portfolio" className="group inline-flex items-center justify-center mt-8 text-lg text-accent font-semibold transition-colors hover:text-white">
                See it in action
            </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Breakdown;
