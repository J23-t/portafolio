import React from 'react';
// Fix for framer-motion variants type error by importing Variants type
import { motion, Variants } from 'framer-motion';
import { certifications } from '../data/certifications';

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

const Certifications: React.FC = () => {
  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <section id="certifications" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
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
            Certificaciones
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Mi compromiso con el aprendizaje continuo y la especialización profesional
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto"
          variants={sectionContainerVariants}
        >
          {certifications.map((cert, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              onClick={() => handleCardClick(cert.url)}
              className="group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col text-center transition-all duration-500 cursor-pointer overflow-hidden"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <motion.div 
                className="relative z-10 text-cyan-500 text-7xl mb-6 mx-auto"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                {/* FIX: Changed to self-closing tag for ion-icon */}
                <ion-icon name={cert.icon} />
              </motion.div>
              
              <h3 className="relative z-10 text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {cert.title}
              </h3>
              <p className="relative z-10 text-md text-slate-500 dark:text-slate-400 mb-6 font-medium">{cert.issuer}</p>
              
              <motion.a 
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="relative z-10 mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Certificado {/* FIX: Changed to self-closing tag for ion-icon */}
                <ion-icon name="arrow-forward-outline" />
              </motion.a>
              
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Certifications;