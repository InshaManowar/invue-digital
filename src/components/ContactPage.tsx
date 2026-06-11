import React from 'react';
import { Phone, Mail, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashLayout } from './DashLayout';
import { SEO } from './SEO';

export function ContactPage() {
  return (
    <>
      <SEO />
      <DashLayout>
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-dash-beige via-dash-beige to-dash-beige-dark dark:from-dash-black dark:via-gray-900 dark:to-dash-black">
          {/* Ambient glow */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-dash-purple/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-dash-purple-light/10 rounded-full blur-3xl" />

          {/* Floating geometric shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20 pointer-events-none"
              style={{ top: `${15 + i * 10}%`, left: `${8 + i * 11}%` }}
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

          <div className="container mx-auto px-6 py-20 md:py-28 relative">
            <div className="max-w-3xl mx-auto">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center mb-6"
              >
                <span className="inline-flex items-center gap-2 bg-dash-purple/10 dark:bg-dash-purple/20 border border-dash-purple/20 rounded-full px-4 py-2 text-sm font-medium text-dash-purple dark:text-dash-purple-light">
                  <Sparkles className="w-4 h-4" />
                  A little about me
                </span>
              </motion.div>

              {/* About story — editorial layout */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start mb-16 md:mb-20"
              >
                {/* Big stat */}
                <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-1 md:pt-2">
                  <span className="text-7xl md:text-8xl font-light font-heading leading-none bg-gradient-to-br from-dash-purple to-dash-purple-light bg-clip-text text-transparent">
                    4
                  </span>
                  <span className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 md:pl-1">
                    years
                    <br className="hidden md:block" /> crafting
                    <br className="hidden md:block" /> the web
                  </span>
                </div>

                {/* Prose with accent line */}
                <div className="relative md:border-l border-dash-purple/20 md:pl-10">
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-dash-black dark:text-white mb-6">
                    I've been crafting websites for a{' '}
                    <span className="text-dash-purple dark:text-dash-purple-light">hand-picked group</span> of
                    companies — not a crowd, just a carefully chosen few I get to know deeply.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                    What I love most is that no two are ever alike. Every company carries its own voice,
                    its own quirks, its own story to tell — and getting to translate each of those into
                    something living on the web never stops feeling new.{' '}
                    <span className="text-dash-black dark:text-white font-medium">
                      That difference is the whole joy of it.
                    </span>
                  </p>
                </div>
              </motion.div>

              {/* Get in touch */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-light font-heading text-dash-black dark:text-white mb-3">
                  Get in touch
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Have a project with a story worth telling? Let's talk.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: Phone,
                    label: 'Call me',
                    value: '9477281022',
                    href: 'tel:9477281022',
                    delay: 0.5,
                  },
                  {
                    icon: Mail,
                    label: 'Email me',
                    value: 'inshamanowar22@gmail.com',
                    href: 'mailto:inshamanowar22@gmail.com',
                    delay: 0.6,
                  },
                ].map(({ icon: Icon, label, value, href, delay }) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
                    whileHover={{ y: -4 }}
                    className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 dark:border-gray-700/40 hover:border-dash-purple/40 shadow-lg hover:shadow-xl hover:shadow-dash-purple/10 transition-all duration-300 overflow-hidden"
                  >
                    <ArrowUpRight className="absolute top-5 right-5 w-5 h-5 text-gray-400 group-hover:text-dash-purple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dash-purple to-dash-purple-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                    <p className="text-lg font-medium text-dash-black dark:text-white break-all">{value}</p>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
}
