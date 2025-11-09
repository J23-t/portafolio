import React from 'react';
// Fix for framer-motion variants type error by importing Variants type
import { motion, Variants } from 'framer-motion';

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
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

// Fix for framer-motion variants type error
const imageVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delay: 0.2,
    },
  },
};


const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <motion.div 
        className="container mx-auto px-4 sm:px-6"
        variants={sectionContainerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-cyan-800 to-slate-900 dark:from-white dark:via-cyan-400 dark:to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sobre Mí
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 sm:gap-12 items-center">
          <motion.div className="md:col-span-3 text-lg text-slate-600 dark:text-slate-400 space-y-6 leading-relaxed" variants={itemVariants}>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              ¡Hola! Soy <span className="font-bold text-cyan-600 dark:text-cyan-400">Jordan</span>, un desarrollador web apasionado por crear soluciones digitales que sean tanto funcionales como estéticamente atractivas. Mi viaje en el mundo de la programación comenzó con un profundo interés por entender cómo la tecnología puede resolver problemas del mundo real y mejorar la vida de las personas.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Disfruto trabajando en todo el stack de desarrollo, desde la conceptualización de una idea hasta su implementación final. Me especializo en el ecosistema de <span className="font-semibold text-slate-800 dark:text-slate-200">JavaScript</span>, utilizando herramientas modernas como <span className="font-semibold text-cyan-600 dark:text-cyan-400">React</span> y <span className="font-semibold text-cyan-600 dark:text-cyan-400">Node.js</span> para construir aplicaciones rápidas, escalables y fáciles de usar.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Fuera del código, me encanta mantenerme actualizado sobre las últimas tendencias tecnológicas, contribuir a proyectos de código abierto y explorar nuevas herramientas que puedan mejorar mi flujo de trabajo. Siempre estoy buscando nuevos desafíos que me permitan crecer como profesional y como persona.
            </motion.p>
          </motion.div>
          <motion.div className="md:col-span-2 flex justify-center" variants={imageVariants}>
            <div className="relative group w-64 h-64 sm:w-80 sm:h-80">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* AQUÍ PUEDES CAMBIAR LA IMAGEN DE PERFIL */}
              <motion.img
                src="foto/perfil.png"
                alt="Jordan Talledo - Desarrollador Full Stack"
                className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-slate-50 dark:border-slate-800 group-hover:border-cyan-500/50 transition-all duration-500"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-2xl">✨</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;