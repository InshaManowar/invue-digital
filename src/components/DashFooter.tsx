import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';

// Contact Popup Component props interface
interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Contact Popup Component
const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div 
            className="relative w-full max-w-2xl mx-auto z-[1001]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.35 }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl border border-dash-purple/20 shadow-xl overflow-hidden relative cursor-auto">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-dash-purple/20 rounded-full blur-2xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl -z-10"></div>
              
              {/* Purple accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dash-purple to-purple-400"></div>
              
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-2">Let's Connect</h3>
                  <div className="w-16 h-1 bg-dash-purple mx-auto rounded-full"></div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-300 mt-4"
                >
                  Reach out directly — I'll get back to you soon
                </motion.p>
              </div>

              {/* Direct contact details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 space-y-4"
              >
                {[
                  { icon: Phone, label: 'Call me', value: '9477281022', href: 'tel:9477281022' },
                  { icon: Mail, label: 'Email me', value: 'inshamanowar22@gmail.com', href: 'mailto:inshamanowar22@gmail.com' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="group relative flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-dash-purple/40 rounded-2xl p-5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-dash-purple to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-400">{label}</p>
                      <p className="text-lg font-medium text-white break-all">{value}</p>
                    </div>
                    <ArrowUpRight className="ml-auto w-5 h-5 text-gray-500 group-hover:text-dash-purple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                ))}

                <Link
                  to="/contact"
                  onClick={onClose}
                  className="block text-center text-sm text-dash-purple hover:text-purple-300 transition-colors duration-200 pt-1"
                >
                  Or visit the contact page →
                </Link>
              </motion.div>
              
              {/* Floating particles */}
              <div className="absolute top-1/4 right-8 w-2 h-2 bg-dash-purple rounded-full animate-ping"></div>
              <div className="absolute bottom-1/3 left-10 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-70"></div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export function DashFooter() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  
  return (
    <footer className="bg-gradient-to-br from-dash-black via-gray-900 to-dash-black text-white py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Background Gradient - Subtle black and blue */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900/90 dark:from-dash-black dark:via-gray-900 dark:to-dash-purple/20 z-0"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dash-purple via-purple-400 to-indigo-500"></div>
        <div className="absolute top-2 left-4 w-12 h-12 bg-dash-purple/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-2 right-4 w-16 h-16 bg-blue-500/10 rounded-full blur-lg"></div>
        
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          {/* Let's Create Together section (moved from DashWork) */}
          <div id="contact" className="scroll-m-24 mb-8">
            <div className="animated-border-card max-w-4xl mx-auto relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="card-content bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-3xl relative overflow-hidden z-10"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-dash-purple/20 rounded-full blur-lg"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-dash-purple/10 rounded-full blur-lg"></div>
                <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-dash-purple/20 rounded-full blur-sm"></div>
                
                <h2 className="text-2xl md:text-3xl font-light font-heading text-white mb-3 relative">
                  Let's Create <span className="text-dash-purple">Together</span>
                </h2>
                <p className="text-base font-light font-dash text-gray-300 mb-4 relative">
                  Have a project in mind? I'd love to help bring your vision to life.
                </p>
                
                <div className="md:flex items-center gap-6">
                  <button 
                    onClick={() => setIsContactPopupOpen(true)}
                    className="inline-block rounded-full bg-dash-purple hover:bg-purple-700 transition-colors px-6 py-2 text-white font-medium mb-3 md:mb-0 cursor-pointer text-sm"
                  >
                    Get in Touch →
                  </button>
                  <div className="text-gray-300">
                    <div className="text-dash-purple font-bold text-lg mb-1">Ready when you are!</div>
                    <p className="text-sm">Available for exciting projects and collaborations.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Main Footer Content - Reordered as requested */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-4">
            {/* Logo and About - Wider on mobile */}
            <div className="md:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-3"
              >
                <h3 className="text-2xl font-bold font-heading text-white flex items-center justify-center md:justify-start">
                  <img 
                    src="/images/logo-dark.png"
                    alt="Invue Logo" 
                    className="h-12 md:h-14" 
                  />
                </h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-dash-purple to-purple-400 mt-1"></div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-300 mb-3"
              >
                <span className="text-justify font-dash text-sm block">
                  Crafting beautiful digital experiences with passion and precision. Each project is a journey toward excellence.
                  Our team of designers and developers is dedicated to creating stunning, functional digital solutions.
                </span>
              </motion.div>
            </div>
            
            {/* Social Media Links - Smaller column */}
            <div className="md:col-span-5">
              <motion.h4 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-base font-light mb-3 text-white"
              >
                Stay Connected
              </motion.h4>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex space-x-3 mb-3"
              >
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-dash-purple hover:bg-dash-purple hover:text-white transition-all duration-300 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-dash-purple hover:bg-dash-purple hover:text-white transition-all duration-300 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-dash-purple hover:bg-dash-purple hover:text-white transition-all duration-300 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-dash-purple hover:bg-dash-purple hover:text-white transition-all duration-300 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
          
          {/* Keywords Section */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-gray-400 text-sm">
                <span className="block text-dash-purple font-medium mb-2">Generative AI Development Agency</span>
              </div>
              <div className="text-gray-400 text-sm">
                <span className="block text-dash-purple font-medium mb-2">Website Development Agency</span>
              </div>
              <div className="text-gray-400 text-sm">
                <span className="block text-dash-purple font-medium mb-2">Custom GPT Integration for Websites</span>
              </div>
              <div className="text-gray-400 text-sm">
                <span className="block text-dash-purple font-medium mb-2">AI-Powered Web Development</span>
              </div>
            </div>
          </div>

          {/* Copyright and Quick Links - Horizontal at bottom */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="pt-3 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <p className="text-gray-400 text-xs">© {currentYear} <span className="text-dash-purple">Invue</span>. All rights reserved.</p>
              
              {/* Quick Links - Horizontal layout */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/" className="text-gray-300 hover:text-dash-purple transition-colors flex items-center text-xs">
                  <span className="w-1 h-1 bg-dash-purple rounded-full mr-1"></span>
                  Home
                </Link>
                <Link to="/#work" className="text-gray-300 hover:text-dash-purple transition-colors flex items-center text-xs">
                  <span className="w-1 h-1 bg-dash-purple rounded-full mr-1"></span>
                  Work
                </Link>
                <Link to="/#about" className="text-gray-300 hover:text-dash-purple transition-colors flex items-center text-xs">
                  <span className="w-1 h-1 bg-dash-purple rounded-full mr-1"></span>
                  About
                </Link>
                <Link to="/contact" className="text-gray-300 hover:text-dash-purple transition-colors flex items-center text-xs">
                  <span className="w-1 h-1 bg-dash-purple rounded-full mr-1"></span>
                  Contact
                </Link>
              </div>
              
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-dash-purple rounded-full animate-pulse mr-1"></span>
                <p className="text-gray-400 text-xs">Designed with ♥ and creativity.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global CSS for animated border */}
        <style dangerouslySetInnerHTML={{ __html: `
          .animated-border-card {
            --border-width: 2px;
            --radius: 24px;
            position: relative;
            border-radius: var(--radius);
            border: var(--border-width) solid transparent;
            isolation: isolate;
          }
          
          .animated-border-card::before {
            content: " ";
            position: absolute;
            inset: calc(var(--border-width) * -1);
            z-index: 0;
            border: inherit;
            border-radius: inherit;
            background-image: conic-gradient(from var(--angle), #381D6A 80%, #E0D1FF 88%, #E0D1FF 92%, #381D6A 100%);
            background-origin: border-box;
            -webkit-mask:
              linear-gradient(black, black) content-box,
              linear-gradient(black, black);  
            mask: linear-gradient(black, black),
                  linear-gradient(black, black);
            -webkit-mask-clip: content-box, border-box;  
            mask-clip: content-box, border-box;
            -webkit-mask-composite: xor;  
            mask-composite: exclude;
            animation: spin 3s linear infinite;
          }

          .card-content {
            height: 100%;
            width: 100%;
          }
          
          @property --angle {
            syntax: "<angle>";
            inherits: true;
            initial-value: 0turn;
          }
          
          @keyframes spin {
            to {
              --angle: 1turn;
            }
          }
        `}} />
      </div>

      {/* Contact Popup */}
      <ContactPopup isOpen={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />
    {/* SEO Keywords for Search Engines */}
      <div className="sr-only">
        Generative AI Development Agency, Website Development Agency, Custom GPT Integration for Websites, AI-Powered Web Development, LLM Fine-Tuning Services
      </div>
    </footer>
  );
} 