import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BrainCircuit, Zap, UserCheck, Check } from 'lucide-react';
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

const DetailListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start gap-3">
        <Check size={20} className="text-accent flex-shrink-0 mt-1" />
        <p className="text-neutral-400">{children}</p>
    </div>
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
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-accent">
            I Built This Site With an AI.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400">
            Here's the real story of how I combined my creative vision with a little help from an AI to build this thing.
          </p>
        </motion.div>

        <div className="space-y-16">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start gap-8">
            <div className="p-3 bg-secondary rounded-full text-accent self-start">
              <BrainCircuit size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">The Idea vs. The Reality</h2>
              <p className="text-neutral-300 leading-relaxed text-lg">
                I had a very specific vision for this portfolio. I wanted it to feel like my video work—dynamic, cinematic, and full of life. The only problem? I'm a motion director, <span className="font-semibold text-neutral-100">not a hardcore coder.</span> Building a site this complex from scratch would have taken me months. So, I tried something different. I used an AI as my coding partner, and we built this entire site in <span className="font-bold text-accent">under 20 hours.</span> It was a <span className="italic">wild experiment</span> that completely changed how I think about creating things for the web.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start gap-8">
            <div className="p-3 bg-secondary rounded-full text-accent self-start">
              <Zap size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">How We Actually Worked Together</h2>
              <p className="text-neutral-300 leading-relaxed text-lg mb-6">
                This wasn't about pushing a button and getting a website. It was more like a conversation. I was the creative director, and the AI was my incredibly fast, incredibly knowledgeable programmer. I guided it every step of the way. Here's what that looked like:
              </p>
              <div className="space-y-4">
                <DetailListItem>
                    <strong>Getting Started:</strong> I started by telling it what I needed: a fast, modern website built with React. It immediately set up the basic project structure, files, and all the boring configuration stuff for me.
                </DetailListItem>
                 <DetailListItem>
                    <strong>Building Piece by Piece:</strong> For every part of the site, like the project grid, I'd describe what I wanted. I'd say something like, <em className="text-neutral-300 font-medium">"Make me a grid of cards. When I hover over one, the picture should swap out for a video, and the whole card should pop out a bit."</em> It would spit out the code, and then it was my job to plug it in, test it, and fine-tune the animations until they felt just right.
                </DetailListItem>
                 <DetailListItem>
                    <strong>Fixing Things (A Lot):</strong> Whenever I got stuck, I could just paste my broken code and say, <em className="text-neutral-300 font-medium">"This isn't working, why?"</em> It would find the bug in seconds and explain what was wrong. It was like having a senior developer on call 24/7.
                </DetailListItem>
                 <DetailListItem>
                    <strong>Handling the Details:</strong> I handled the look and feel: the colors, the fonts, the overall vibe. I gave the AI my design rules, and it turned them into a consistent style guide. It handled the tedious parts so I could focus on the creative details.
                </DetailListItem>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start gap-8">
            <div className="p-3 bg-secondary rounded-full text-accent self-start">
              <UserCheck size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">My Take: It's Just a Tool.</h2>
              <p className="text-neutral-300 leading-relaxed text-lg">
                Look, I get it. Using an AI to code might seem like a shortcut. But for me, it's just a different kind of tool, like a camera or a piece of editing software. The AI can write code, sure. But it can't have a vision. It doesn't have taste. It can't tell a story. <span className="font-bold text-accent">That was still my job.</span> Every animation you see, every layout, every color choice, all of it came from me. I was the director making every single decision. The AI was just the tool that helped me bring those ideas to life incredibly fast. This is the future for creatives like me: <span className="font-semibold text-neutral-100">using powerful new tools to build bigger and better things than we could before.</span>
              </p>
            </div>
          </motion.div>
        </div>

         <motion.div 
            className="mt-24 text-center border-t border-secondary pt-16"
            variants={itemVariants}
        >
            <p className="text-xl text-neutral-300">Anyway, that's the story behind this site.</p>
            <Link to="/portfolio" className="group inline-flex items-center justify-center mt-6 text-lg text-accent font-semibold transition-colors hover:text-white">
                Check out the work
            </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutWebsite;
