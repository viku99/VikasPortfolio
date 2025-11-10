import React, { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, Briefcase, CheckCircle, AlertTriangle, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleFocus = () => {
      // If focus returns, clear the failure timeout and set to success
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setStatus('success');
    };

    if (status === 'submitting') {
      // Listen for when the user returns to the tab
      window.addEventListener('focus', handleFocus);

      // Set a timeout to handle the case where the mail client doesn't open
      timeoutRef.current = window.setTimeout(() => {
        setStatus(currentStatus => {
          if (currentStatus === 'submitting') {
            setError("Failed to open mail client. Please contact me directly at vikasbg.png@gmail.com");
            return 'error';
          }
          return currentStatus;
        });
      }, 3000); // 3-second wait

      return () => {
        window.removeEventListener('focus', handleFocus);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [status]);


  const socialIcons: { [key: string]: React.ReactNode } = {
    LinkedIn: <Linkedin size={28} />,
    Behance: <Briefcase size={28} />,
    Github: <Github size={28} />,
    Instagram: <Instagram size={28} />,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus('idle');

    if (!formData.name || !formData.message) {
      setError('Please fill out all fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    
    const subject = encodeURIComponent(`Contact from Portfolio: ${formData.name}`);
    const body = encodeURIComponent(
      `${formData.message}\n\n- ${formData.name}`
    );
    const mailtoLink = `mailto:vikasbg.png@gmail.com?subject=${subject}&body=${body}`;

    // Trigger the user's mail client
    window.location.href = mailtoLink;
  };

  return (
    <div className="container mx-auto px-6 md:px-8 pt-40 pb-24 min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full text-center">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100">Thank you!</h2>
              <p className="text-lg text-neutral-400 mt-4">Your message has been sent successfully. I'll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
                variants={itemVariants}
              >
                Let's Create.
              </motion.h1>
              <motion.p
                className="text-xl text-neutral-400 mb-12"
                variants={itemVariants}
              >
                Have a project in mind or just want to connect? Drop me a line.
              </motion.p>
              
              <motion.div
                className="flex justify-center gap-8 mb-12"
                variants={itemVariants}
              >
                {SOCIAL_LINKS.map((link) => (
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
                <a href="mailto:vikasbg.png@gmail.com" aria-label="Email" className="text-neutral-500 hover:text-accent transition-colors"><Mail size={28} /></a>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={itemVariants}
                noValidate
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-primary border border-secondary px-4 py-3 text-accent placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded transition-shadow, transition-colors duration-300"
                  aria-label="Your Name"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-primary border border-secondary px-4 py-3 text-accent placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded transition-shadow, transition-colors duration-300"
                  aria-label="Your Message"
                ></textarea>
                
                <div className="relative">
                   <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-accent text-background font-bold py-4 px-6 rounded hover:bg-neutral-300 transition-colors duration-300 flex items-center justify-center disabled:bg-neutral-500 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader className="w-5 h-5 mr-3" />
                        </motion.div>
                        Opening mail client...
                      </>
                    ) : 'Send Message'}
                  </button>
                </div>

                {status === 'error' && error && (
                    <motion.div 
                        className="flex items-center justify-center gap-2 text-red-400 bg-red-900/20 p-3 rounded mt-4"
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        aria-live="polite"
                    >
                        <AlertTriangle size={16} />
                        <p>{error}</p>
                    </motion.div>
                )}
              </motion.form>

              <motion.div
                variants={itemVariants}
                className="mt-16 text-center md:hidden"
              >
                <Link
                  to="/about-this-site"
                  className="text-sm text-neutral-500 hover:text-accent transition-colors underline decoration-dotted underline-offset-4 hover:decoration-solid"
                >
                  Curious how this site was built?
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Contact;