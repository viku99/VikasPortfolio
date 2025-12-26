
import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Instagram, Briefcase, Target, Zap, Cpu, Activity, Layout, Sparkles, TrendingUp, Globe } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const USER_PHOTO = "https://i.postimg.cc/52X4J8tj/moonji.jpg"; 

const PHILOSOPHY_VARIANTS = [
  {
    lang: 'EN',
    text: (
      <>
        I don't just move pixels; I manipulate <span className="text-accent">attention</span>. Every speed ramp and keyframe is a deliberate choice to guide the viewer's heartbeat. I believe that technical mastery is the only way to achieve <span className="text-accent">true creative freedom</span>.
      </>
    )
  },
  {
    lang: 'TM',
    text: (
      <>
        Naan pixels-ah mattum nagarthala; ungal <span className="text-accent">attention-ah</span> dhaan control panren. Ovvoru speed ramp-um keyframe-um ungal heartbeat-ah guide panna yedukkura mudivu. <span className="text-accent">Technical mastery</span> dhaan creative freedom-ku ore vazhi-nu namburen.
      </>
    )
  },
  {
    lang: 'HI',
    text: (
      <>
        Main sirf pixels nahi hilaata; main aapka <span className="text-accent">attention</span> control karta hoon. Har speed ramp aur keyframe aapki heartbeat ko guide karne ka ek deliberate decision hai. Mera maanna hai ki <span className="text-accent">technical mastery</span> hi creative freedom ka ek matra raasta hai.
      </>
    )
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const expertiseData = [
  {
    category: 'Creative Direction',
    skills: [
      { name: 'Motion Narrative', level: 95, label: 'Advanced' },
      { name: 'Visual Concepting', level: 90, label: 'Advanced' },
      { name: 'Art Direction', level: 85, label: 'Inter–Adv' },
    ],
  },
  {
    category: 'Technical Execution',
    skills: [
      { name: 'After Effects / Compositing', level: 98, label: 'Advanced' },
      { name: 'Time-Remapping & Editorial Rhythm', level: 95, label: 'Advanced' },
      { name: 'VFX & Color Grading', level: 75, label: 'Intermediate' },
    ],
  },
];

const SignatureMethodology = [
    {
        title: "Frame-Data Analysis",
        desc: "Strict adherence to sub-frame audio transients to ensure absolute synchronization between visual impact and sonic peaks.",
        icon: <Cpu size={20} />
    },
    {
        title: "Kinetic Physics",
        desc: "Manual curve-editing in the Graph Editor to simulate real-world weight and momentum in digital assets.",
        icon: <Activity size={20} />
    },
    {
        title: "Modular Comps",
        desc: "Building dynamic, automated workflows that allow for high-end cinematic results under aggressive newsroom deadlines.",
        icon: <Layout size={20} />
    }
];

const SkillBar: React.FC<{ name: string; level: number; label: string }> = ({ name, level, label }) => (
  <div className="mb-6 group">
    <div className="flex justify-between items-end mb-2">
      <div className="flex flex-col">
        <h4 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono group-hover:text-accent transition-colors">{name}</h4>
      </div>
      <span className="text-[9px] font-mono text-neutral-700 tracking-widest">{label} // {level}%</span>
    </div>
    <div className="h-[2px] w-full bg-white/5 overflow-hidden">
      <motion.div
        className="h-full bg-accent"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </div>
);

const About = () => {
  const [phiIndex, setPhiIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setPhiIndex((prev) => (prev + 1) % PHILOSOPHY_VARIANTS.length);
      }, 9000); // Increased to 9 seconds for easier reading
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const socialIcons: { [key: string]: React.ReactNode } = {
    LinkedIn: <Linkedin size={18} />,
    Behance: <Briefcase size={18} />,
    Github: <Github size={18} />,
    Instagram: <Instagram size={18} />,
  };

  return (
    <div className="bg-background min-h-screen selection:bg-accent selection:text-background">
      {/* CINEMATIC HEADER */}
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
            >
                {/* IDENTITY VIEWPORT */}
                <motion.div variants={itemVariants} className="lg:col-span-5 relative group">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-primary shadow-2xl">
                        <img 
                            src={USER_PHOTO} 
                            alt="Vikas" 
                            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                    </div>
                    
                    <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-accent/20 rounded-tl-2xl pointer-events-none" />
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-accent/20 rounded-br-2xl pointer-events-none" />
                </motion.div>

                <motion.div variants={itemVariants} className="lg:col-span-7">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-accent/40 mb-2">
                            <span className="text-[10px] uppercase tracking-[0.8em] font-mono">Profile // 01</span>
                            <div className="h-[1px] w-12 bg-accent/20" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                            Vikas <br /> <span className="text-neutral-700">Bala</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-neutral-400 font-light tracking-tight max-w-xl leading-relaxed">
                            A <span className="text-accent">Motion Director</span> obsessed with the marriage of frame-perfect timing and cinematic emotion.
                        </p>
                        
                        <div className="flex flex-wrap gap-8 pt-8">
                            {SOCIAL_LINKS.map(link => (
                                <a 
                                    key={link.name} 
                                    href={link.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-3 text-neutral-600 hover:text-accent transition-all group"
                                >
                                    <div className="p-3 bg-white/5 rounded-full group-hover:bg-accent group-hover:text-background transition-all">
                                        {socialIcons[link.name]}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-mono hidden md:block">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* CORE PHILOSOPHY - MULTILINGUAL LOOP */}
      <section 
        className="py-32 px-6 border-y border-white/5 bg-white/[0.01]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="space-y-8">
                    <div className="flex items-center gap-3 text-neutral-500">
                        <Target size={18} />
                        <h2 className="text-[12px] uppercase tracking-[0.6em] font-black">Philosophy</h2>
                    </div>
                    
                    <div className="flex gap-4">
                      {PHILOSOPHY_VARIANTS.map((variant, idx) => (
                        <button 
                          key={variant.lang}
                          onClick={() => setPhiIndex(idx)}
                          className={`text-[9px] font-mono tracking-widest px-3 py-1 rounded-full border transition-all duration-300 ${phiIndex === idx ? 'border-accent text-accent bg-accent/10' : 'border-white/10 text-neutral-600 hover:border-white/30'}`}
                        >
                          {variant.lang}
                        </button>
                      ))}
                    </div>
                    {isPaused && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[8px] uppercase tracking-[0.3em] text-accent font-mono"
                      >
                        Playback Paused
                      </motion.div>
                    )}
                </div>
                
                <div className="lg:col-span-2 relative min-h-[220px] md:min-h-[180px]">
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={phiIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                        className="text-2xl md:text-4xl text-neutral-300 leading-tight tracking-tight font-light"
                      >
                        {PHILOSOPHY_VARIANTS[phiIndex].text}
                      </motion.p>
                    </AnimatePresence>
                    
                    <div className="absolute -bottom-8 left-0 flex items-center gap-3 text-neutral-800">
                      <Globe size={12} className="animate-pulse" />
                      <span className="text-[8px] uppercase tracking-[0.5em] font-mono">Archive_Relay_{PHILOSOPHY_VARIANTS[phiIndex].lang}</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* EXPERTISE & SIGNATURE WORKFLOW */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-500">
                        <Zap size={18} />
                        <h2 className="text-[12px] uppercase tracking-[0.6em] font-black">Expertise</h2>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-24">
                    {/* SKILL BARS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {expertiseData.map((group) => (
                            <div key={group.category} className="space-y-10">
                                <h3 className="text-[10px] uppercase tracking-[0.4em] text-accent/40 font-mono flex items-center gap-4">
                                    <span className="w-2 h-2 rounded-full bg-accent" />
                                    {group.category}
                                </h3>
                                <div>
                                    {group.skills.map((skill) => (
                                        <SkillBar key={skill.name} name={skill.name} level={skill.level} label={skill.label} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* STRENGTHS & CURRENT FOCUS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                            <div className="flex items-center gap-3 text-accent/40">
                                <Sparkles size={16} />
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-mono">Strengths</h4>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Pacing, timing, editorial rhythm, and clean technical execution.
                            </p>
                        </div>
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                            <div className="flex items-center gap-3 text-accent/40">
                                <TrendingUp size={16} />
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-mono">Current Focus</h4>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Expanding advanced VFX workflows & cinematic color pipelines.
                            </p>
                        </div>
                    </div>

                    {/* SIGNATURE TECHNIQUES / ANALYSIS */}
                    <div className="space-y-12">
                        <h3 className="text-[10px] uppercase tracking-[0.4em] text-accent/40 font-mono flex items-center gap-4">
                            <span className="w-2 h-2 rounded-full bg-accent" />
                            Signature Methodologies
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {SignatureMethodology.map((item) => (
                                <div key={item.title} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6 hover:bg-white/[0.05] transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent/30 group-hover:text-accent transition-colors">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold uppercase tracking-widest">{item.title}</h4>
                                        <p className="text-xs leading-relaxed text-neutral-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-40 px-6 bg-white/[0.01]">
        <div className="container mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto space-y-12"
            >
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Ready to <span className="text-accent/20 hover:text-accent transition-colors">ignite</span> your vision?</h2>
                <Link to="/contact" className="inline-flex items-center gap-6 px-12 py-6 bg-accent text-background rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">
                    Initialize Contact
                    <ArrowRight size={20} />
                </Link>
            </motion.div>
        </div>
      </section>

      <footer className="py-20 flex flex-col items-center gap-10 opacity-40">
        <div className="text-[10px] uppercase tracking-[1em] text-neutral-600">Archive Identity // VB-2024</div>
      </footer>
    </div>
  );
};

export default About;
