import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, isActive = false, to }) => {
  const location = useLocation();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to.startsWith('/#')) {
      e.preventDefault();
      const targetId = to.substring(2);
      
      // If we're not on the homepage, navigate there first
      if (location.pathname !== '/') {
        window.location.href = to;
      } else {
        // If we're already on homepage, just scroll to section
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (to === '/contact') {
      // Scroll to top when navigating to contact page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'text-dash-purple' 
          : 'text-dash-black dark:text-white hover:text-dash-purple dark:hover:text-dash-purple'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-dash-purple"></span>
      )}
    </Link>
  );
};

export function DashNavbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('nav') && !target.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isDarkMode = theme === 'dark';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/95 dark:bg-dash-black/95 backdrop-blur-sm shadow-md'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-2xl font-bold font-heading text-dash-black dark:text-white">
              <a href="#" onClick={closeMenu} className="flex items-center">
                <img
                  src={isDarkMode ? "/images/logo-dark.png" : "/images/logo.png"}
                  alt="Invue Logo"
                  className="h-10 mr-2"
                />
              </a>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            className="hidden md:flex items-center space-x-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
            }}
          >
            {[
              { label: 'HOME', to: '/', isActive: location.pathname === '/' },
              { label: 'WORK', to: '/#work' },
              { label: 'ABOUT', to: '/#about' },
              { label: 'CONTACT', to: '/contact' },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: -12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <NavItem label={item.label} isActive={item.isActive} to={item.to} />
              </motion.div>
            ))}
          </motion.div>

          {/* Theme Toggle & Mobile Menu Button */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-dash-black dark:text-white" />
              ) : (
                <Moon className="w-5 h-5 text-dash-black dark:text-white" />
              )}
            </button>
            
            <button 
              className="ml-2 p-2 md:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-dash-black dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-dash-black dark:text-white" />
              )}
            </button>
          </motion.div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white dark:bg-dash-black transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } mobile-menu`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col p-8 pt-24">
          <Link 
            to="/" 
            className="py-3 text-xl font-medium text-dash-purple border-b border-gray-100 dark:border-gray-800"
            onClick={closeMenu}
          >
            HOME
          </Link>
          <Link 
            to="/#work" 
            className="py-3 text-xl font-medium text-dash-black dark:text-white border-b border-gray-100 dark:border-gray-800"
            onClick={() => {
              closeMenu();
              if (location.pathname !== '/') {
                window.location.href = '/#work';
              } else {
                const targetElement = document.getElementById('work');
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          >
            WORK
          </Link>
          <Link 
            to="/#about" 
            className="py-3 text-xl font-medium text-dash-black dark:text-white border-b border-gray-100 dark:border-gray-800"
            onClick={() => {
              closeMenu();
              if (location.pathname !== '/') {
                window.location.href = '/#about';
              } else {
                const targetElement = document.getElementById('about');
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          >
            ABOUT
          </Link>
          <Link 
            to="/contact" 
            className="py-3 text-xl font-medium text-dash-black dark:text-white"
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </>
  );
} 