import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ProjectModal } from './ProjectModal';
import { FAQSection } from './FAQSection';

interface CollageItemProps {
  src: string;
  alt: string;
  delay: number;
  className?: string;
  liveUrl?: string;
  type: string;
  description: string;
  technologies: string[];
}

const CollageItem: React.FC<CollageItemProps> = ({ src, alt, delay, className, liveUrl, type, description, technologies }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isFullStack = type.toUpperCase().includes('FULL');
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl group cursor-pointer h-full ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      viewport={{ once: true, amount: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Enhanced Card Container */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-700 h-full flex flex-col">
        {/* Image Container with enhanced effects */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img 
              src={src} 
              alt={alt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Enhanced Gradient Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Floating Action Button */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </motion.div>

          {/* Project Type Badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -20
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-dash-purple/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
              {isFullStack ? 'FULL-STACK' : 'LANDING PAGE'}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-medium font-heading text-dash-black dark:text-white group-hover:text-dash-purple transition-colors duration-300">
              {alt}
            </h3>
            <motion.div
              className="text-dash-purple"
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.div>
          </div>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-dash-purple/10 text-dash-purple text-xs rounded-md font-medium">
                {tech}
              </span>
            ))}
          </div>

          {/* Project Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Action Buttons - Fixed height container */}
          <div className="space-y-3 mt-auto">
            {/* View Live Project Button - Only show if liveUrl exists */}
            {liveUrl ? (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-dash-purple text-white font-medium text-sm py-2 px-4 rounded-lg hover:bg-dash-purple-light transition-colors duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Live Project</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            ) : (
              /* Placeholder div to maintain consistent spacing when no live URL */
              <div className="h-10"></div>
            )}
            
            {/* View Details Button */}
            <motion.div
              className="flex items-center text-dash-purple font-medium text-sm group-hover:text-dash-purple-light transition-colors cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span>View Details</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent group-hover:border-dash-purple/30 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const WebsiteInfoModal: React.FC<{ isOpen: boolean; onClose: () => void; buttonRef?: React.RefObject<HTMLButtonElement> }> = ({ isOpen, onClose, buttonRef }) => {
  const [modalPosition, setModalPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (isOpen && buttonRef?.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Set the position relative to the button
      setModalPosition({
        top: window.scrollY + rect.bottom + 10,
        left: window.scrollX + rect.left - 200 + (rect.width / 2)
      });
    }
  }, [isOpen, buttonRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.5 }}
            style={{
              position: 'absolute',
              top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`,
              maxWidth: '500px',
              width: 'calc(100% - 32px)',
              zIndex: 60,
              transformOrigin: 'top center'
            }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="overflow-auto max-h-[80vh] pr-2 -mr-2">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full p-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-light font-heading text-dash-purple mb-2">✨ Welcome to Our Web Studio! ✨</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-light font-dash">Where creativity meets functionality with a sprinkle of magic ✨</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <h4 className="font-light font-heading text-dash-black dark:text-white">Design That Speaks</h4>
                      <p className="text-gray-600 dark:text-gray-300 font-light font-dash">We create websites that don't just look pretty – they tell your story! Every pixel is placed with love and purpose.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h4 className="font-light font-heading text-dash-black dark:text-white">Lightning Fast</h4>
                      <p className="text-gray-600 dark:text-gray-300 font-light font-dash">Our websites zoom! We optimize everything to make sure your site loads faster than a bunny hopping through a field! 🐰</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">💝</span>
                    <div>
                      <h4 className="font-light font-heading text-dash-black dark:text-white">Made with Love</h4>
                      <p className="text-gray-600 dark:text-gray-300 font-light font-dash">We're not just developers – we're your digital friends! We listen, understand, and pour our hearts into every project.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🌈</span>
                    <div>
                      <h4 className="font-light font-heading text-dash-black dark:text-white">For Everyone</h4>
                      <p className="text-gray-600 dark:text-gray-300 font-light font-dash">Accessibility isn't just a feature – it's our promise! We make sure everyone can enjoy your website, no matter what! ♿</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <p className="text-dash-purple font-medium">Let's create something amazing together! ✨</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const AIInfoModal: React.FC<{ isOpen: boolean; onClose: () => void; buttonRef?: React.RefObject<HTMLButtonElement> }> = ({ isOpen, onClose, buttonRef }) => {
  const [modalPosition, setModalPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (isOpen && buttonRef?.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Set the position relative to the button
      setModalPosition({
        top: window.scrollY + rect.bottom + 10,
        left: window.scrollX + rect.left - 200 + (rect.width / 2)
      });
    }
  }, [isOpen, buttonRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.5 }}
            style={{
              position: 'absolute',
              top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`,
              maxWidth: '500px',
              width: 'calc(100% - 32px)',
              zIndex: 60,
              transformOrigin: 'top center'
            }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="overflow-auto max-h-[80vh] pr-2 -mr-2">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full p-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold font-heading text-dash-purple mb-2">🤖 AI Innovation Hub! 🚀</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-dash">Pushing the boundaries of what's possible with AI ✨</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <h4 className="font-light font-heading text-dash-black dark:text-white">Custom LLM Solutions</h4>
                      <p className="text-gray-600 dark:text-gray-300 font-light font-dash">We fine-tune and optimize large language models to perfectly match your needs! Each model is crafted with care. 🎯</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h4 className="font-light font-heading text-dash-black dark:text-white">Blazing Fast Inference</h4>
                      <p className="text-gray-600 dark:text-gray-300 font-light font-dash">Our optimized infrastructure ensures your AI models run at lightning speed! No more waiting around! 🚄</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="font-light font-heading text-dash-black dark:text-white">Precision Engineering</h4>
                      <p className="text-gray-600 dark:text-gray-300 font-light font-dash">From prompt engineering to model deployment, we ensure every detail is perfect! Quality is our middle name! ✨</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🌟</span>
                    <div>
                      <h4 className="font-light font-heading text-dash-black dark:text-white">Future-Ready Solutions</h4>
                      <p className="text-gray-600 dark:text-gray-300 font-light font-dash">Stay ahead of the curve with our cutting-edge AI implementations! The future is now! 🚀</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <p className="text-dash-purple font-medium">Ready to revolutionize your AI journey? Let's make it happen! 🌟</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

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

export function DashWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "STUDIO RIVE",
      type: "FULL-STACK APPLICATION",
      description: "An elegant e-commerce experience for a design-forward furniture and interiors brand.",
      technologies: ["React", "Node.js", "MongoDB"],
      intention: "To showcase the furniture collection and make great design accessible to shop online.",
      screenshots: [
        "/images/websites/studio-rive-1.webp",
        "/images/websites/studio-rive-2.webp",
        "/images/websites/studio-rive-3.webp",
        "/images/websites/studio-rive-4.webp",
      ],
      features: [
        "Furniture catalog with product pages",
        "Interiors gallery",
        "Search and cart",
        "Mission & vision storytelling"
      ],
      liveUrl: "https://studiorive.in/"
    },
    {
      title: "BEYOND BORDER TOURISM",
      type: "FULL-STACK APPLICATION",
      description: "A refined visa and travel platform for Indian passport holders, with curated country itineraries.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      intention: "To help travellers check visa requirements and plan seamless, curated journeys.",
      screenshots: [
        "/images/websites/beyond-border-1.webp",
        "/images/websites/beyond-border-2.webp",
        "/images/websites/beyond-border-3.webp",
        "/images/websites/beyond-border-4.webp",
      ],
      features: [
        "Interactive globe destination explorer",
        "Visa-free / visa-required country grid",
        "Day-by-day curated itineraries",
        "24/7 dedicated support"
      ],
      liveUrl: "https://beyondbordertourism.com/"
    },
    {
      title: "PMV ELECTRIC",
      type: "LANDING PAGE",
      description: "Featured in Shark Tank, this landing page highlights the innovative features of PMV's electric car models.",
      technologies: ["React", "Vite"],
      intention: "To showcase the cutting-edge features of PMV's electric vehicles.",
      screenshots: [
        "/images/websites/pmv-3.webp",
        "/images/websites/pmv-1.webp",
        "/images/websites/pmv-2.webp",
      ],
      features: [
        "Interactive 3D car model viewer",
        "Feature showcase with animations",
        "Performance specifications section",
        "Sustainability impact calculator",
        "Test drive booking system"
      ],
      liveUrl: "https://pmvelectric.com/"
    },
    {
      title: "FEYNLAB",
      type: "LANDING PAGE",
      description: "A sleek landing page for a premium auto coating and protection company.",
      technologies: ["React", "Vite"],
      intention: "To showcase the company's innovative coating solutions and services.",
      screenshots: [
        "/images/websites/feynlab-1.webp",
        "/images/websites/feynlab-2.webp",
        "/images/websites/feynlab-3.webp",
        "/images/websites/feynlab-4.webp"
      ],
      features: [
        "Product showcase",
        "Service details",
        "Before/after gallery",
        "Booking system"
      ],
      liveUrl: "https://www.feynlab.com/?srsltid=AfmBOoo5KePkvR9c2__0vrR_MN0CXPCnaI1h3iiqfAlZrANgj9iuFl2m"
    },
    {
      title: "AMBIENCE SALON",
      type: "LANDING PAGE",
      description: "A clean landing page for a premium salon in the USA.",
      technologies: ["React", "Vite"],
      intention: "To list services and help customers contact the salon.",
      screenshots: [
        "/images/websites/salon-5.webp",
        "/images/websites/salon-2.webp",
        "/images/websites/salon-1.webp",
        "/images/websites/salon-4.webp"
      ],
      features: [
        "Service catalog",
        "Stylist profiles",
        "Appointment booking form",
        "Gallery section"
      ],
      liveUrl: "https://ambiencesalonandspa.com/"
    },
    {
      title: "SOCIIO ICHOR",
      type: "FULL-STACK APPLICATION",
      description: "A platform for a blood donation organization in Manipal.",
      technologies: ["Django", "React", "Python"],
      intention: "To connect blood donors with those in need with AI chatbot assistance.",
      screenshots: [
        "/images/websites/sociio-4.webp",
        "/images/websites/sociio-2.webp",
        "/images/websites/sociio-3.webp",
        "/images/websites/sociio-1.webp",
        "/images/websites/sociio-5.webp"
      ],
      features: [
        "Donor-recipient matching",
        "AI chatbot with RAG",
        "Vector embeddings",
        "Cosine similarity",
        "BM25 ranking"
      ]
    },
    {
      title: "WEDDING WEBSITE",
      type: "LANDING PAGE",
      description: "A beautiful and elegant wedding website showcasing the couple's special day.",
      technologies: ["React", "Vite"],
      intention: "To create a memorable digital experience for the wedding celebration.",
      screenshots: [
        "/images/websites/wedding-3.webp",
        "/images/websites/wedding-1.webp",
        "/images/websites/wedding-2.webp",
        "/images/websites/wedding-4.webp"
      ],
      features: [
        "Elegant design showcase",
        "Wedding details and timeline",
        "Photo gallery",
        "RSVP functionality",
        "Location and venue information"
      ],
      liveUrl: "https://rajgotmaryed.com/"
    }
  ];


  return (
    <div id="work" className="scroll-m-24 py-12 md:py-20 px-6 md:px-16 relative overflow-hidden bg-gradient-to-br from-dash-beige via-dash-beige to-dash-beige-dark dark:from-dash-black dark:via-gray-900 dark:to-dash-black">
      {/* Main Title */}
      <div className="scroll-m-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-24"
        >
          <span className="block text-sm md:text-base font-medium uppercase tracking-[0.25em] text-dash-purple mb-4">
            Selected Works
          </span>
          <h2 className="relative text-4xl md:text-6xl lg:text-7xl font-thin font-heading text-dash-black dark:text-white tracking-tight leading-tight text-center">
            <span className="relative inline-block">
              <span className="absolute -inset-1 w-full h-full bg-dash-purple/20 blur-2xl rounded-full"></span>
              <span className="relative">Web Projects</span>
              <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-dash-purple/60 to-transparent"></span>
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Enhanced Web Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-32"
      >
        {/* Enhanced Projects Grid - removed filter buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="relative h-full"
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <CollageItem
                src={project.screenshots[0]}
                alt={project.title}
                delay={0.15 * index}
                liveUrl={project.liveUrl}
                type={project.type}
                description={project.description}
                technologies={project.technologies}
              />
              
              {/* Enhanced Shadow Effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  boxShadow: '0 25px 50px rgba(93, 95, 239, 0.15)',
                  transform: 'translateY(5px)'
                }}
              />
            </motion.div>
          ))}
        </div>

      </motion.div>

      {/* FAQ Section */}
      <motion.div
        id="faq"
        className="scroll-m-24 mb-20 md:mb-32"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-0">
          <FAQSection />
        </div>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject!}
      />
    </div>
  );
}

// Add these styles to your global CSS or Tailwind config
const styles = `
  .text-glow {
    text-shadow: 0 0 15px rgba(93, 95, 239, 0.5);
  }
  
  .shadow-glow {
    box-shadow: 0 0 15px rgba(93, 95, 239, 0.3);
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes pulse-shadow {
    0%, 100% { box-shadow: 0 0 0 rgba(93, 95, 239, 0.5); }
    50% { box-shadow: 0 0 15px rgba(93, 95, 239, 0.8); }
  }
  
  .pulse-shadow {
    animation: pulse-shadow 2s ease-in-out infinite;
  }
`;