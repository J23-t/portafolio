import React from 'react';
// Fix for framer-motion variants type error by importing Variants type
import { motion, Variants } from 'framer-motion';
import { skills } from '../data/skills';

// FIX: To resolve 'ion-icon' type errors, the namespace for JSX intrinsic elements was updated to `React.JSX`.
// This is necessary for modern React projects using the automatic JSX runtime.
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name?: string;
      };
    }
  }
}

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

const SkillCategory: React.FC<{ title: string; skills: { name: string; icon: string }[] }> = ({ title, skills }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 h-full hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h3 
        className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 gap-6"
        variants={sectionContainerVariants}
      >
        {skills.map((skill) => (
          <motion.div 
              key={skill.name} 
              variants={itemVariants}
              className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer"
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
          >
            {/* FIX: Replaced `class` with `className` to align with React standards for JSX. */}
            {/* FIX: Changed to self-closing tag for ion-icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <ion-icon name={skill.icon} className="text-5xl text-slate-500 dark:text-slate-400 group-hover:text-cyan-500 transition-colors duration-300 mb-2" />
            </motion.div>
            <span className="font-medium group-hover:text-cyan-500 transition-colors duration-300">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 lg:py-32 bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <motion.div 
        className="container mx-auto px-4 sm:px-6"
        variants={sectionContainerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-cyan-800 to-slate-900 dark:from-white dark:via-cyan-400 dark:to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            Habilidades Técnicas
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Tecnologías y herramientas que domino para crear soluciones excepcionales
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
          variants={sectionContainerVariants}
        >
          <motion.div variants={itemVariants}>
            <SkillCategory title="Frontend" skills={skills.frontend} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SkillCategory title="Backend" skills={skills.backend} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;