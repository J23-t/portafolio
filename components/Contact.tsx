import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { SITE } from '../config/site';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (name: string, value: string) => {
    if (name === 'name') return value.trim() ? '' : 'El nombre es obligatorio.';
    if (name === 'email') {
      if (!value.trim()) return 'El email es obligatorio.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Introduce un email válido.';
      return '';
    }
    if (name === 'message') return value.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name as keyof typeof errors]) setErrors(p => ({ ...p, [name]: validate(name, value) }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrors(p => ({ ...p, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      name: validate('name', formData.name),
      email: validate('email', formData.email),
      message: validate('message', formData.message),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/mknllbka', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success('¡Mensaje enviado! Te contactaré pronto.', {
          style: { background: 'var(--dark-card)', border: '1px solid rgba(0,245,255,0.3)', color: '#fff' }
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Error al enviar. Intenta de nuevo.', {
          style: { background: 'var(--dark-card)', border: '1px solid rgba(255,50,50,0.3)', color: '#fff' }
        });
      }
    } catch {
      toast.error('Error de conexión.', { style: { background: 'var(--dark-card)', border: '1px solid rgba(255,50,50,0.3)', color: '#fff' } });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: 'mail-outline', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, color: 'var(--neon-cyan)' },
    { icon: 'logo-whatsapp', label: 'WhatsApp / Llamadas', value: SITE.phone, href: SITE.whatsapp, color: 'var(--neon-green)' },
    { icon: 'logo-github', label: 'GitHub', value: 'github.com/J23-t', href: SITE.github, color: 'rgba(255,255,255,0.7)' },
  ];

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: "'Space Grotesk', sans-serif",
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(6,13,20,0.8)',
    border: '1px solid rgba(0,245,255,0.15)',
    color: '#fff',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'var(--dark-surface)' }}>
      <Toaster position="top-right" />
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-14">
          <p className="section-label mb-3">// CONTACTO</p>
          <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-white">HABLEMOS<span className="neon-text">.</span></h2>
          <div className="mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, var(--neon-cyan), transparent)' }} />
          <p className="mt-4 text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
            ¿Tienes un proyecto en mente? Escríbeme y hablamos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: info de contacto */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="space-y-4">
            {contactItems.map(({ icon, label, value, href, color }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                aria-label={`Contactar por ${label}`}
                className="flex items-center gap-4 p-5 glass-card rounded-xl group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{ border: `1px solid ${color}40`, background: `${color}12`, color }}>
                  <ion-icon name={icon} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Grotesk', sans-serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                  <p className="font-mono-jb text-sm truncate group-hover:neon-text transition-colors" style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</p>
                </div>
                <ion-icon name="chevron-forward-outline" style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.2)', flexShrink: 0 } as React.CSSProperties} />
              </motion.a>
            ))}

            {/* Tiempo de respuesta */}
            <div className="glass-card rounded-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                style={{ border: '1px solid rgba(0,245,255,0.2)', background: 'rgba(0,245,255,0.06)', color: 'var(--neon-cyan)' }}>
                <ion-icon name="time-outline" />
              </div>
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Space Grotesk', sans-serif" }}>Tiempo de respuesta</p>
                <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>Menos de 24 horas</p>
              </div>
            </div>
          </motion.div>

          {/* Right: formulario */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} noValidate className="glass-card rounded-xl p-8 space-y-6">
              <div>
                <label htmlFor="name" style={labelStyle}>Nombre completo</label>
                <input
                  id="name" name="name" type="text"
                  value={formData.name} onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tu nombre"
                  style={{ ...inputStyle, borderColor: errors.name ? 'rgba(255,80,80,0.5)' : undefined }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,245,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.06)'; }}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <p id="name-error" className="mt-2 text-sm" style={{ color: 'rgba(255,100,100,0.9)' }}>{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  id="email" name="email" type="email"
                  value={formData.email} onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="tu@email.com"
                  style={{ ...inputStyle, borderColor: errors.email ? 'rgba(255,80,80,0.5)' : undefined }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,245,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.06)'; }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <p id="email-error" className="mt-2 text-sm" style={{ color: 'rgba(255,100,100,0.9)' }}>{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>Mensaje</label>
                <textarea
                  id="message" name="message" rows={5}
                  value={formData.message} onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Cuéntame sobre tu proyecto, presupuesto y plazos..."
                  style={{ ...inputStyle, resize: 'none', borderColor: errors.message ? 'rgba(255,80,80,0.5)' : undefined }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,245,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.06)'; }}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <p id="message-error" className="mt-2 text-sm" style={{ color: 'rgba(255,100,100,0.9)' }}>{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="cyber-btn w-full"
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                style={{ opacity: isSubmitting ? 0.65 : 1 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    ENVIANDO...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ion-icon name="send-outline" />
                    ENVIAR MENSAJE
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
