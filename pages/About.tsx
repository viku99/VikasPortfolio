import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Instagram, Briefcase } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const expertiseData = [
  {
    category: 'Creative & Direction',
    skills: [
      { name: 'Motion Design & Storytelling', level: 95 },
      { name: 'Cinematic Direction & Concept', level: 90 },
      { name: 'Art Direction & Aesthetic Design', level: 85 },
      { name: 'Visual Research & Ideation', level: 80 },
    ],
  },
  {
    category: 'Technical Artistry',
    skills: [
      { name: 'Visual Effects & Compositing', level: 90 },
      { name: 'Typography & Experimental Design', level: 88 },
      { name: '3D & Mixed Media Integration', level: 75 },
    ],
  },
  {
    category: 'Execution & Craft',
    skills: [
      { name: 'Creative Editing & Sound Sync', level: 92 },
      { name: 'Brand & Title Identity Motion', level: 85 },
      { name: 'Portfolio & Presentation Design', level: 80 },
    ],
  },
];

const SkillBar: React.FC<{ name: string; level: number }> = ({ name, level }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <h4 className="text-base font-medium text-neutral-300">{name}</h4>
      <span className="text-sm font-mono text-neutral-500">{level}%</span>
    </div>
    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-accent rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </div>
);

const About = () => {
  const socialIcons: { [key: string]: React.ReactNode } = {
    LinkedIn: <Linkedin size={20} />,
    Behance: <Briefcase size={20} />,
    Github: <Github size={20} />,
    Instagram: <Instagram size={20} />,
  };

  return (
    <div className="container mx-auto px-6 md:px-8 pt-40 pb-24 min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-start">
          <motion.div 
            className="lg:col-span-1 lg:sticky lg:top-40" 
            variants={itemVariants}
          >
            <div className="group aspect-[3/4] rounded-lg overflow-hidden mb-8">
                <img 
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Vikas" 
                    className="w-full h-full object-cover filter grayscale transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100">Vikas</h1>
            <p className="text-lg md:text-xl text-neutral-400 mt-1">Motion Director & Creative Technologist</p>
             <p className="text-neutral-300 leading-relaxed mt-6">
              I build emotionally-driven digital experiences where cinematic storytelling meets technical innovation. My work is about creating visuals that aren't just seen, but felt.
            </p>
            <div className="flex items-center gap-5 mt-8">
              {SOCIAL_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.name}
                  className="text-neutral-500 hover:text-accent transition-colors"
                >
                  {socialIcons[link.name]}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div className="lg:col-span-2 space-y-16" variants={itemVariants}>
            <div className="space-y-12">
              <h2 className="text-4xl font-bold text-accent mb-8 pb-2 border-b border-secondary">Expertise Breakdown</h2>
              {expertiseData.map((mainCategory) => (
                 <div key={mainCategory.category}>
                    <h3 className="text-2xl font-semibold text-neutral-100 mb-6 tracking-wide">{mainCategory.category}</h3>
                    <div className="space-y-4">
                      {mainCategory.skills.map((skill) => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                      ))}
                    </div>
                 </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
            className="mt-32 text-center border-t border-secondary pt-16"
            variants={itemVariants}
        >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-100">Have a vision?</h2>
            <p className="text-lg text-neutral-400 mt-4 max-w-2xl mx-auto">I'm always seeking ambitious partners for projects that demand creative courage and technical excellence. If that sounds like you, let's talk.</p>
            <Link to="/contact" className="group inline-flex items-center justify-center mt-8 px-8 py-4 bg-accent text-background font-bold rounded-full transition-transform duration-300 ease-in-out hover:scale-105">
                Let's build something unforgettable
                <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
            </Link>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default About;