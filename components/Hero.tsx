import React, { useEffect, useState } from 'react';
// Fix for framer-motion variants type error by importing Variants type
import { motion, Variants } from 'framer-motion';

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

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const roles = [
    'Desarrollador Full Stack',
    'Diseñador UX/UI',
    'Creador de Soluciones Web',
    'Arquitecto de Software'
  ];
  
  useEffect(() => {
    const handleType = () => {
      const current = loopNum % roles.length;
      const fullText = roles[current];
      
      setTypedText(
        isDeleting
          ? fullText.substring(0, typedText.length - 1)
          : fullText.substring(0, typedText.length + 1)
      );
      
      setTypingSpeed(isDeleting ? 75 : 150);
      
      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);
  
  // Fix for framer-motion variants type error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Fix for framer-motion variants type error
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  // Fix for framer-motion variants type error
  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.07,
      },
    },
  };
  
  // Fix for framer-motion variants type error
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12
      }
    },
  };

  const title = "Jordan Talledo.";

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen py-16 sm:py-20 lg:py-32 text-center bg-slate-50 dark:bg-[#0a192f] overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.p variants={itemVariants} className="text-base sm:text-lg text-cyan-500 dark:text-cyan-400 font-medium mb-3 sm:mb-4">
            Hola, mi nombre es
          </motion.p>
          <motion.h1 
            variants={titleContainerVariants} 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3 sm:mb-4"
          >
            {title.split('').map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h2 
            variants={itemVariants} 
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-600 dark:text-slate-400 mb-3 sm:mb-4"
          >
            <span className="inline-block">{typedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block ml-1 w-1 h-12 bg-cyan-500 align-middle"
            />
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-2xl text-slate-500 dark:text-slate-300 max-w-3xl mx-auto mb-2 sm:mb-3 font-medium px-4">
            Construyo soluciones para la web.
          </motion.p>
          <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4">
            Soy un desarrollador Full Stack especializado en crear experiencias digitales excepcionales. Actualmente, estoy enfocado en construir productos accesibles y centrados en el usuario.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4">
            <motion.a
              href="#projects"
              className="group relative inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg overflow-hidden w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Ver mis Proyectos</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#contact"
              className="relative inline-block px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-500 font-semibold rounded-lg overflow-hidden w-full sm:w-auto group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Contáctame</span>
              <motion.div
                className="absolute inset-0 bg-cyan-500"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a href="#about" aria-label="Scroll down">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="text-3xl text-slate-400 hover:text-cyan-400 transition-colors"
          >
            {/* FIX: Changed to self-closing tag for ion-icon */}
            <ion-icon name="chevron-down-outline" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;