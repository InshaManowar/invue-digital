import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "Web development, full-stack applications, AI integration, and digital design — from clean landing pages to complex, data-driven platforms.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Landing pages usually take 2–4 weeks; full-stack apps run 2–4 months. You'll get a clear, detailed timeline after our first conversation.",
  },
  {
    question: "Are you AI-friendly in development?",
    answer:
      "Absolutely. We weave modern AI tooling into our workflow to build faster and smarter, and we can integrate practical, privacy-focused AI into your product.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes — maintenance, security updates, and performance tuning are available after launch so your site keeps running smoothly.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Transparent, project-based pricing with no hidden costs, and flexible payment schedules that work within your budget.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
      {/* Left — intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="md:sticky md:top-28"
      >
        <span className="inline-block text-sm font-medium uppercase tracking-[0.25em] text-dash-purple mb-5">
          FAQ
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light font-heading text-dash-black dark:text-white tracking-tight leading-[1.05] mb-6">
          Questions?{' '}
          <span className="bg-gradient-to-r from-dash-purple to-dash-purple-light bg-clip-text text-transparent">
            Answered.
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-md">
          A few of the things people ask most. Can't find what you're looking for? Reach out
          and we'll get back to you.
        </p>
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 bg-dash-purple text-white font-medium py-3.5 px-7 rounded-xl hover:bg-dash-purple-light transition-colors duration-300 shadow-lg hover:shadow-xl hover:shadow-dash-purple/25"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Get in touch
          <span aria-hidden>→</span>
        </motion.a>
      </motion.div>

      {/* Right — accordion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        viewport={{ once: true }}
        className="divide-y divide-gray-200 dark:divide-gray-700/70 border-t border-gray-200 dark:border-gray-700/70"
      >
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question}>
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 text-left py-6 group focus:outline-none"
              >
                <h3
                  className={`text-lg md:text-xl font-medium font-heading transition-colors duration-300 ${
                    isOpen
                      ? 'text-dash-purple'
                      : 'text-dash-black dark:text-white group-hover:text-dash-purple'
                  }`}
                >
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                    isOpen
                      ? 'bg-dash-purple border-dash-purple text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-500 group-hover:border-dash-purple group-hover:text-dash-purple'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed pb-6 pr-12 -mt-1">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
