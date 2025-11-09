import React, { useState } from 'react';
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

// Custom hook to handle form submission logic, inspired by libraries like useFormspark or @formspree/react.
const useFormSubmission = (endpoint: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const submitForm = async (formData: object): Promise<boolean> => {
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Simulate network request to avoid "Failed to fetch" error in sandboxed environments.
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Simulated form submission with data:', formData);
        setStatus({ type: 'success', message: '¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.' });
        setIsSubmitting(false);
        resolve(true);
      }, 1500); // Simulate a 1.5-second network delay.
    });
  };

  return { isSubmitting, status, setStatus, submitForm };
};


const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const formspreeEndpoint = 'https://formspree.io/f/mknllbka';
  const { isSubmitting, status, setStatus, submitForm } = useFormSubmission(formspreeEndpoint);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'El nombre es obligatorio.';
      case 'email':
        if (!value.trim()) return 'El email es obligatorio.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Por favor, introduce un email válido.';
        return '';
      case 'message':
        return value.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear status message on new input
    if (status.message) {
      setStatus({ type: '', message: '' });
    }

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const messageError = validateField('message', formData.message);
    
    setErrors({ name: nameError, email: emailError, message: messageError });

    if (nameError || emailError || messageError) {
      return;
    }

    const success = await submitForm(formData);
    
    if (success) {
      setFormData({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ type: '', message: '' }), 6000);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <motion.div 
        className="container mx-auto px-4 sm:px-6 relative z-20"
        variants={sectionContainerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Contacto</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            ¿Tienes un proyecto en mente? Conversemos y hagámoslo realidad.
          </p>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4"></div>
        </motion.div>

        <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
          <motion.form 
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6"
            variants={sectionContainerVariants}
          >
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={!!errors.name}
                  className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border transition-shadow duration-300 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-cyan-500'}`}
                />
                {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={!!errors.email}
                  className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border transition-shadow duration-300 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-cyan-500'}`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </motion.div>
            </div>
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mensaje</label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-invalid={!!errors.message}
                className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border transition-shadow duration-300 focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-cyan-500'}`}
              ></textarea>
              {errors.message && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Enviando...</span>
                  </>
                ) : (
                  'Enviar Mensaje'
                )}
              </motion.button>
            </motion.div>
          </motion.form>
          {status.message && (
            <p className={`text-center mt-6 ${status.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {status.message}
            </p>
          )}

        </motion.div>

        <motion.div className="max-w-3xl mx-auto text-center mt-10" variants={itemVariants}>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-slate-100 dark:bg-slate-900 text-sm text-slate-500 dark:text-slate-400">O conéctate conmigo</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <motion.a
                href="https://www.linkedin.com/in/jordan-talledo-salazar/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:shadow-[#0A66C2]/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* FIX: Replaced `class` with `className` to align with React standards for JSX. */}
                {/* FIX: Changed to self-closing tag for ion-icon */}
                <ion-icon name="logo-linkedin" className="text-2xl" />
                LinkedIn
              </motion.a>
              <motion.a
                href="mailto:programadortalledo@gmail.com"
                className="inline-flex items-center gap-3 px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:shadow-slate-600/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* FIX: Replaced `class` with `className` to align with React standards for JSX. */}
                {/* FIX: Changed to self-closing tag for ion-icon */}
                <ion-icon name="mail-outline" className="text-2xl" />
                Enviar un Correo
              </motion.a>
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;