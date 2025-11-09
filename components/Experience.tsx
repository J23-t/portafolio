import React from 'react';
// Fix for framer-motion variants type error by importing Variants type
import { motion, Variants } from 'framer-motion';
import { experience } from '../data/experience';

// Fix for framer-motion variants type error
const sectionContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Fix for framer-motion variants type error
const itemVariants: Variants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Fix for framer-motion variants type error
const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const TimelineItem: React.FC<{ item: any; index: number }> = ({ item, index }) => (
  <motion.div 
    variants={timelineItemVariants} 
    className="relative pl-8 sm:pl-32 py-6 group"
    whileHover={{ x: 5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-gradient-to-b before:from-cyan-500 before:to-blue-500 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-gradient-to-br after:from-cyan-400 after:to-blue-500 after:border-4 after:box-content after:border-slate-100 dark:after:border-slate-900 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5 after:shadow-lg after:shadow-cyan-500/50 group-hover:after:scale-125 after:transition-transform">
      <motion.time 
        className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-bold uppercase w-28 h-7 mb-3 sm:mb-0 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-md"
        whileHover={{ scale: 1.05 }}
      >
        {item.year}
      </motion.time>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 group-hover:shadow-xl group-hover:shadow-cyan-500/20 transition-all duration-300 w-full">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{item.title}</h3>
        <p className="text-cyan-600 dark:text-cyan-400 font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
          {item.company}
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
      </div>
    </div>
  </motion.div>
);

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <motion.div 
        className="container mx-auto px-6"
        variants={sectionContainerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-cyan-800 to-slate-900 dark:from-white dark:via-cyan-400 dark:to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Trayectoria Profesional
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Mi evolución profesional y experiencia en desarrollo
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <motion.div className="max-w-4xl mx-auto" variants={sectionContainerVariants}>
          <motion.div variants={sectionContainerVariants}>
            {experience.map((item, index) => <TimelineItem key={index} item={item} index={index} />)}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
