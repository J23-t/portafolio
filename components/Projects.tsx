import React, { useState } from 'react';
// Fix for framer-motion variants type error by importing Variants type
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

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
      staggerChildren: 0.15,
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

type ProjectType = typeof projects[0];

const ProjectCard: React.FC<{ project: ProjectType }> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: project.title,
      text: project.description,
      url: project.liveUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error al compartir:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(project.liveUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Error al copiar al portapapeles:", err);
      }
    }
  };

  return (
    <motion.div
      layout
      variants={itemVariants}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20"
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden h-56 cursor-pointer group" onClick={() => window.open(project.liveUrl, '_blank')}>
        <motion.img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
        <motion.div
          className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/20 transition-colors duration-300"
        />
        <div className="absolute bottom-4 left-4">
          <motion.h3 
            className="text-2xl font-bold text-white tracking-tight"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {project.title}
          </motion.h3>
        </div>
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.2, rotate: 45 }}
          transition={{ duration: 0.3 }}
        >
          <ion-icon name="arrow-forward-outline" className="text-white text-xl" />
        </motion.div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow">{project.description}</p>
        
         <div className="py-4 border-t border-b border-slate-200 dark:border-slate-700 my-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">Propósito del Proyecto</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">{project.purpose}</p>
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200 mt-3 mb-2">Tecnología Principal</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">{project.mainTech}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300 text-sm font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="Ver código fuente"
              onClick={(e) => e.stopPropagation()}
            >
              <ion-icon name="logo-github" />
            </a>
            <div className="relative">
              <button
                onClick={handleShare}
                className="text-3xl text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                aria-label="Compartir proyecto"
              >
                <ion-icon name="share-social-outline" />
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded-md shadow-lg"
                  >
                    ¡Copiado!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-sm flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors"
                aria-expanded={isExpanded}
            >
                Detalles
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ion-icon name="chevron-down-outline" />
                </motion.div>
            </button>
          </div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg shadow-sm hover:bg-cyan-600 transition-all duration-300"
          >
            Ver Proyecto
            <ion-icon name="arrow-forward-outline" />
          </a>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="px-6 pb-6 overflow-hidden border-t border-slate-200 dark:border-slate-700"
          >
            <div className="pt-4 space-y-4">
                <div>
                    <h4 className="font-bold text-md text-slate-800 dark:text-slate-200 mb-2">El Problema</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{project.problem}</p>
                </div>
                <div>
                    <h4 className="font-bold text-md text-slate-800 dark:text-slate-200 mb-2">La Solución</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{project.solution}</p>
                </div>
                 <div>
                    <h4 className="font-bold text-md text-slate-800 dark:text-slate-200 mb-2">Retos Técnicos</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{project.challenges}</p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


const Projects: React.FC = () => {
    const [filter, setFilter] = useState('Todos');

    const categories = ['Todos', ...Array.from(new Set(projects.map(p => p.category)))];

    const filteredProjects = filter === 'Todos' ? projects : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="py-20 lg:py-32 bg-slate-100 dark:bg-slate-900 relative overflow-hidden z-10">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 z-0" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl z-0" />
        <motion.div 
            className="container mx-auto px-4 sm:px-6 relative z-20"
            variants={sectionContainerVariants}
        >
            <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-cyan-800 to-slate-900 dark:from-white dark:via-cyan-400 dark:to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              Proyectos Destacados
            </motion.h2>
            <motion.p 
              className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
                Una selección de mis trabajos más recientes y destacados
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            </motion.div>

            <motion.div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-12" variants={itemVariants}>
                {categories.map(category => (
                    <motion.button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-md ${filter === category ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 scale-105' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105'}`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </motion.button>
                ))}
            </motion.div>
            
            <motion.div 
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
        </section>
    );
};

export default Projects;
