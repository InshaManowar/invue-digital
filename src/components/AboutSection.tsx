import React, { useEffect, useRef, useState } from 'react';
import { Heart, Award, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { value: '2023', label: 'The year it began' },
    { value: '100%', label: 'Bespoke builds' },
    { value: '1:1', label: 'Personal attention' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passionate',
      description: 'We love what we do and it shows in every pixel.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'No compromises on quality, ever.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: "Always pushing the boundaries of what's possible.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-m-24 py-16 md:py-28 px-6 md:px-16 relative overflow-hidden bg-gradient-to-br from-dash-beige via-dash-beige to-dash-beige-dark dark:from-dash-black dark:via-gray-900 dark:to-dash-black"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-dash-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-dash-purple-light/10 rounded-full blur-3xl" />

      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20 pointer-events-none"
          style={{ top: `${20 + i * 10}%`, left: `${10 + i * 11}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8 + i, ease: 'easeInOut', repeat: Infinity, delay: i * 0.8 }}
        >
          <div
            className={`w-6 h-6 ${i % 2 ? 'bg-dash-purple/20' : 'bg-dash-purple-light/20'} ${
              i % 3 ? 'rounded-full' : 'rounded-lg rotate-45'
            }`}
          />
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto relative">
        {/* Floating bee logo */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -40 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8 relative z-20"
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
            className="w-20 h-20 md:w-28 md:h-28 relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dash-purple/30"
              animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/images/logo-bee.png"
                alt="Invue Bee Logo"
                className="w-3/4 h-3/4 object-contain drop-shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-radial from-dash-purple/20 via-dash-purple/10 to-transparent rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </motion.div>

        {/* Eyebrow + title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-sm font-medium uppercase tracking-[0.25em] text-dash-purple dark:text-dash-purple-light mb-5">
            About Us
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light font-heading text-dash-black dark:text-white tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Not just another agency —{' '}
            <span className="bg-gradient-to-r from-dash-purple to-dash-purple-light bg-clip-text text-transparent">
              your creative partners.
            </span>
          </h2>
        </motion.div>

        {/* Story — editorial split */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="grid md:grid-cols-[1.5fr_1fr] gap-12 md:gap-16 items-center mb-24 md:mb-32"
        >
          {/* Prose */}
          <div className="relative md:pr-8">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6 block">
              Our Story
            </span>
            <p className="text-2xl md:text-3xl font-light leading-snug text-dash-black dark:text-white mb-6">
              At <span className="text-dash-purple dark:text-dash-purple-light">Invue</span>, we're a
              boutique team of digital specialists crafting exceptional experiences since 2023.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 mb-6">
              We believe in quality over quantity. By working with a select number of clients, every
              project gets the attention, craft, and expertise it truly deserves.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 mb-8">
              We're <span className="font-medium text-dash-purple dark:text-dash-purple-light">AI-friendly in
              development</span> too — weaving modern AI tooling into our workflow to build faster, smarter,
              and with fewer compromises.
            </p>
            <div className="inline-flex items-center gap-3 text-sm font-medium text-dash-purple dark:text-dash-purple-light">
              <span className="w-8 h-px bg-dash-purple/40" />
              Boutique • AI-Friendly Development • Personal Touch
            </div>
          </div>

          {/* Stats column */}
          <div className="md:border-l border-dash-purple/15 md:pl-12 space-y-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                className="flex items-baseline gap-4"
              >
                <span className="text-5xl md:text-6xl font-light font-heading leading-none bg-gradient-to-br from-dash-purple to-dash-purple-light bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values — premium numbered cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-24"
        >
          <div className="flex items-end justify-between mb-10">
            <h3 className="text-3xl md:text-4xl font-light font-heading text-dash-black dark:text-white">
              What drives us
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                className="group relative h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/40 hover:border-dash-purple/40 hover:shadow-xl hover:shadow-dash-purple/10 transition-all duration-500 overflow-hidden"
              >
                {/* Ghost index number */}
                <span className="absolute top-6 right-7 text-6xl font-light font-heading text-dash-purple/10 dark:text-dash-purple/15 group-hover:text-dash-purple/25 transition-colors duration-500 select-none leading-none">
                  0{index + 1}
                </span>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-dash-purple to-dash-purple-light flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-medium font-heading text-dash-black dark:text-white mb-2 relative z-10">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                  {value.description}
                </p>

                {/* Bottom accent sweep */}
                <span className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-dash-purple to-dash-purple-light transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="bg-gradient-to-r from-dash-purple to-dash-purple-light p-10 md:p-14 rounded-[2rem] shadow-2xl shadow-dash-purple/20 relative overflow-hidden text-center">
            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)',
                backgroundSize: '26px 26px',
              }}
            />
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-light font-heading text-white mb-4">
                Ready to create something amazing?
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Let's build something remarkable together. Your vision, our expertise.
              </p>
              <motion.a
                href="#work"
                className="inline-flex items-center justify-center bg-white text-dash-purple font-bold py-4 px-8 rounded-xl hover:bg-white/90 transition-all duration-300 text-lg group shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                CHECK OUT OUR WORK
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ArrowRightProps {
  className?: string;
}

function ArrowRight({ className }: ArrowRightProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
