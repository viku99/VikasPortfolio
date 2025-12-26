
import React from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, Cpu } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Showreel = () => {
  const { stopReel } = useAppContext();

  return (
    <motion.div
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={stopReel}
    >
      {/* Background Glitch Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div 
            animate={{ 
                x: [-20, 20, -10, 10, 0],
                opacity: [0.1, 0.3, 0.1, 0.5, 0.2]
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: 'mirror' }}
            className="absolute top-1/4 left-0 w-full h-[1px] bg-accent blur-[2px]"
        />
        <motion.div 
            animate={{ 
                x: [20, -20, 10, -10, 0],
                opacity: [0.1, 0.5, 0.1, 0.3, 0.2]
            }}
            transition={{ duration: 0.15, repeat: Infinity, repeatType: 'mirror', delay: 0.1 }}
            className="absolute top-2/3 left-0 w-full h-[1px] bg-accent blur-[1px]"
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          stopReel();
        }}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] text-neutral-500 hover:text-accent transition-all hover:rotate-90 duration-300"
        aria-label="Close"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <motion.div 
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 text-center max-w-2xl w-full"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col items-center gap-10">
            <div className="relative">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="text-accent/20"
                >
                    <Loader2 size={120} strokeWidth={0.5} />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu size={40} className="text-accent animate-pulse" strokeWidth={1} />
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-center gap-4 opacity-40">
                    <div className="h-[1px] w-12 bg-accent" />
                    <span className="text-[10px] uppercase tracking-[0.8em] font-mono">Status: Processing</span>
                    <div className="h-[1px] w-12 bg-accent" />
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                    Showreel is <br />
                    <span className="text-neutral-700 italic">getting cooked</span>
                </h2>
                
                <p className="text-sm md:text-lg text-neutral-500 font-light tracking-widest max-w-md mx-auto leading-relaxed">
                    I haven't finished the final render yet. High-quality frame-data takes time to stabilize.
                </p>

                <div className="pt-8">
                    <button 
                        onClick={stopReel}
                        className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-accent hover:text-background transition-all duration-300 font-bold"
                    >
                        Return to Archive
                    </button>
                </div>
            </div>
            
            <div className="mt-12 text-[9px] uppercase tracking-[1em] text-neutral-800 font-mono">
                System_v2.4 // Render_Queue_01
            </div>
        </div>
      </motion.div>

      {/* Cinematic scanlines effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,4px_100%] z-20 opacity-30" />
    </motion.div>
  );
};

export default Showreel;
