import React from 'react';
import { motion } from 'framer-motion';

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

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-50 dark:bg-[#0a192f] text-slate-500 dark:text-slate-400 py-12 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="flex justify-center gap-6 mb-6">
          <motion.a 
            href="https://github.com/J23-t" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="GitHub"
          >
            {/* FIX: Changed to self-closing tag for ion-icon */}
            <ion-icon name="logo-github" />
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/jordan-talledo-salazar/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="LinkedIn"
          >
            {/* FIX: Changed to self-closing tag for ion-icon */}
            <ion-icon name="logo-linkedin" />
          </motion.a>
          <motion.a 
            href="https://api.whatsapp.com/send?phone=51977479152" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="WhatsApp"
          >
            {/* FIX: Changed to self-closing tag for ion-icon */}
            <ion-icon name="logo-whatsapp" />
          </motion.a>
          <motion.a 
            href="mailto:programadortalledo@gmail.com" 
            className="text-3xl hover:text-cyan-400 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Email"
          >
            {/* FIX: Changed to self-closing tag for ion-icon */}
            <ion-icon name="mail-outline" />
          </motion.a>
        </div>
        <p className="font-medium">&copy; {new Date().getFullYear()} Jordan Enrique Talledo Salazar. Todos los derechos reservados.</p>
        <p className="text-sm mt-2 flex items-center justify-center gap-2">
          Diseñado y desarrollado con <span className="text-red-500 animate-pulse">❤️</span> y <span className="text-cyan-500">React</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;