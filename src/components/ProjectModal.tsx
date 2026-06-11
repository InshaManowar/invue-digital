import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  type: string;
  description: string;
  technologies: string[];
  intention: string;
  screenshots: string[];
  features: string[];
  liveUrl?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
  };

  const getProjectDescription = (title: string) => {
    switch (title) {
      case "PMV ELECTRIC":
        return "An innovative electric vehicle showcase that captured Shark Tank's attention. Interactive 3D models and performance specs bring the future of transportation to life.";
      case "FEYNLAB":
        return "Premium auto coating solutions presented through sleek design. Features advanced coating technologies with stunning before/after galleries.";
      case "ZAIKA RESTAURANT":
        return "Authentic Thai dining experience in Pattaya's heart. Vibrant visuals showcase traditional flavors and warm hospitality.";
      case "AMBIENCE SALON":
        return "Luxury salon experience redefined for the American market. Clean aesthetics meet comprehensive service catalogs and seamless booking.";
      case "VISA CONNECT":
        return "Streamlined visa application process for modern travelers. Professional guidance meets user-friendly design for hassle-free applications.";
      case "SOCIIO ICHOR":
        return "AI-powered blood donation platform revolutionizing healthcare in Manipal. Smart matching algorithms connect donors with recipients while an intelligent chatbot provides 24/7 assistance.";
      default:
        return project.description;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Carousel */}
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={project.screenshots[currentImageIndex]}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {project.screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {project.screenshots.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {project.screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Project Type Badge */}
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md ${
                  project.type === 'FULL-STACK APPLICATION'
                    ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/30'
                    : 'bg-dash-purple/20 text-purple-100 border border-dash-purple/30'
                }`}>
                  {project.type}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-light font-heading text-dash-black dark:text-white mb-2">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-dash-purple/10 text-dash-purple text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Description */}
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-light">
                {getProjectDescription(project.title)}
              </p>

              {/* Goal + Key Features */}
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {project.intention && (
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-dash-purple mb-3">
                      The Goal
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                      {project.intention}
                    </p>
                  </div>
                )}
                {project.features?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-dash-purple mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start text-gray-600 dark:text-gray-300 font-light">
                          <svg className="w-5 h-5 text-dash-purple mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* View Live Button - only when a live URL exists */}
              {project.liveUrl && (
                <div className="mt-8 flex justify-center">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-dash-purple hover:bg-dash-purple-light text-white rounded-full font-medium transition-all duration-300 overflow-hidden inline-flex"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center">
                      View Live Project
                      <motion.svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </motion.svg>
                    </span>
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}; 