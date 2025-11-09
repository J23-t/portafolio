import React from 'react';
// Fix for framer-motion variants type error by importing Variants type
import { motion, Variants } from 'framer-motion';
import { testimonials } from '../data/testimonials';

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

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-transparent to-blue-50/50 dark:from-cyan-950/20 dark:via-transparent dark:to-blue-950/20" />
      <motion.div 
        className="container mx-auto px-6"
        variants={sectionContainerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-cyan-800 to-slate-900 dark:from-white dark:via-cyan-400 dark:to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Testimonios
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Lo que mis clientes, colaboradores y supervisores dicen de mi trabajo
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
          variants={sectionContainerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="relative bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center max-w-3xl group overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Quote icon background */}
              <div className="absolute top-6 left-6 text-8xl text-cyan-500/10 dark:text-cyan-400/10 font-serif leading-none">"“"</div>
              <div className="absolute bottom-6 right-6 text-8xl text-cyan-500/10 dark:text-cyan-400/10 font-serif leading-none rotate-180">"“"</div>
              
              {/* Avatar with gradient border */}
              <motion.div 
                className="relative w-28 h-28 rounded-full mb-8 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 p-1 shadow-xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                  <span className="text-4xl font-bold bg-gradient-to-br from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                    {getInitials(testimonial.name)}
                  </span>
                </div>
              </motion.div>
              
              {/* Quote text */}
              <p className="relative z-10 text-lg text-slate-700 dark:text-slate-300 mb-8 italic leading-relaxed font-medium">
                "{testimonial.quote}"
              </p>
              
              {/* Author info with divider */}
              <div className="relative z-10 mt-auto pt-6 border-t-2 border-gradient-to-r from-transparent via-cyan-500 to-transparent w-full">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{testimonial.name}</h3>
                <p className="text-sm font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {testimonial.title}
                </p>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
