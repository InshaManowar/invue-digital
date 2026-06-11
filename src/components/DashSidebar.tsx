import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  href?: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, isActive = false, href = '#' }) => {
  return (
    <a 
      href={href} 
      className={`block py-2 px-4 mb-1 relative ${
        isActive 
          ? 'text-dash-purple font-medium' 
          : 'text-dash-black dark:text-white hover:bg-dash-beige dark:hover:bg-dash-black hover:bg-opacity-50'
      }`}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-dash-purple"></span>
      )}
      {label}
    </a>
  );
};

export function DashSidebar() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="fixed h-screen w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-dash-black py-8 px-4 flex flex-col">
      <div className="mb-12">
        <div className="text-3xl font-bold font-heading text-dash-black dark:text-white">
          <div className="bg-dash-black dark:bg-white text-white dark:text-dash-black inline-block p-2">
           IN
            <br />
            SH
          </div>
        </div>
      </div>
      
      <div className="text-xl font-medium font-heading mb-4 text-dash-black dark:text-white">DASHBOARD</div>
      
      <nav className="flex-1 mb-8">
        <NavItem label="HOME" isActive={true} />
        <NavItem label="ABOUT" />
        <NavItem label="WORK" />
        <NavItem label="CREW" />
        <NavItem label="CAREERS" />
        <NavItem label="STORIES" />
        <NavItem label="CONTACT" />
      </nav>
      
      <div className="mt-auto">
        <div className="flex flex-col gap-2 mb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
          <label className="flex items-center cursor-pointer">
            <input 
              type="radio" 
              name="theme" 
              className="sr-only" 
              checked={theme === 'light'} 
              onChange={toggleTheme}
            />
            <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${theme === 'light' ? 'border-dash-purple' : 'border-gray-400'}`}>
              {theme === 'light' && <div className="w-2 h-2 rounded-full bg-dash-purple"></div>}
            </div>
            <span className="text-sm">LIGHT</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input 
              type="radio" 
              name="theme" 
              className="sr-only" 
              checked={theme === 'dark'} 
              onChange={toggleTheme}
            />
            <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${theme === 'dark' ? 'border-dash-purple' : 'border-gray-400'}`}>
              {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-dash-purple"></div>}
            </div>
            <span className="text-sm">DARK</span>
          </label>
        </div>
      </div>
    </div>
  );
} 