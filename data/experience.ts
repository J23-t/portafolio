const currentYear = new Date().getFullYear();

export interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    year: `${currentYear} - Presente`,
    title: 'Soporte de TI — Prácticas Pre Profesionales',
    company: 'Instituto Superior Tecnológico Público Simón Bolívar',
    location: 'Bellavista, Callao',
    description:
      'Soporte técnico de infraestructura TI para una institución educativa: mantenimiento preventivo y correctivo de equipos, resolución de incidencias de red y atención directa a usuarios.',
    highlights: [
      'Mantenimiento preventivo y correctivo de equipos y redes institucionales',
      'Resolución rápida y efectiva de incidencias técnicas para usuarios',
      'Administración de sistemas y soporte de herramientas Windows Server',
    ],
    tags: ['Soporte TI', 'Redes', 'Mantenimiento', 'Windows Server'],
  },
  {
    year: '2024 - Presente',
    title: 'Desarrollador Web Full Stack · Sistemas Empresariales',
    company: 'Proyectos para clientes reales',
    location: 'Lima, Perú · Remoto',
    description:
      'Desarrollo de aplicaciones web y sistemas a medida para empresas: desde el análisis del problema del negocio hasta el diseño, desarrollo, integración, pruebas y mejora. Uso inteligencia artificial como apoyo para investigar, analizar problemas y acelerar el desarrollo, manteniendo el control y criterio de cada proyecto.',
    highlights: [
      '+10 proyectos web entregados de punta a punta para clientes reales',
      'Sistema de gestión empresarial con ventas, inventario, productos, clientes, visitadores, catálogos, gestión por tiendas, notificaciones y roles de usuario',
      'Soluciones para restaurantes: gestión de mesas, pedidos, cocina, menú, reservas, inventario, personal, dashboard y portal para clientes',
      'E-commerce con catálogo, carrito e inventario en tiempo real (Ferrefast)',
      'Sistema de reservas online en funcionamiento para barbería (DraxBarber)',
      'Marketplace de mobiliario con +30 productos listados (AmoblarQ)',
      'Optimización SEO para posicionar a clientes en Google',
    ],
    tags: ['Next.js', 'React', 'Node.js', 'Firebase', 'MongoDB', 'APIs', 'TypeScript'],
  },
];