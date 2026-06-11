import React, { ReactNode } from 'react';
import { DashNavbar } from './DashNavbar';
import { DashFooter } from './DashFooter';

interface DashLayoutProps {
  children: ReactNode;
}

export function DashLayout({ children }: DashLayoutProps) {
  return (
    <div className="min-h-screen bg-dash-beige text-dash-black dark:bg-dash-black dark:text-white transition-colors duration-300">
      <DashNavbar />
      
      <main className="pt-16">
        {children}
      </main>
      
      <DashFooter />
    </div>
  );
} 