export interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  sourceUrl: string;
  tags: string[];
  category: string;
  impact: string;
  purpose: string;
  mainTech: string;
  problem: string;
  solution: string;
  challenges: string;
}

export const projects: Project[] = [
  {
    title: 'AmoblarQ',
    description:
      'Sistema integral de gestión empresarial con arquitectura modular: clientes, inventario, ventas con contratos, citas, proformas en PDF, visitadores, herramientas y requerimientos.',
    image: '/foto/amoblarq.png',
    liveUrl: 'https://amoblarq.vercel.app/',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['Next.js 15', 'TypeScript', 'MongoDB', 'NextAuth'],
    category: 'Sistema Empresarial',
    impact: '9 módulos de gestión integrados',
    purpose: 'Centralizar la operación completa de Amoblarq en un solo sistema modular y escalable.',
    mainTech: 'Next.js 15 + MongoDB',
    problem: 'La operación dependía de procesos dispersos: clientes, stock, ventas y citas sin un sistema unificado.',
    solution:
      'Sistema modular con Next.js 15, TypeScript, MongoDB y NextAuth: clientes, inventario, ventas con contratos y reportes, citas, proformas en PDF, visitadores, herramientas y requerimientos.',
    challenges:
      'Diseñar una arquitectura modular extensible e integrar alertas de stock, estadísticas de compra y reportes de vendedores.',
  },
  {
    title: 'Ferrefast',
    description:
      'E-commerce de ferretería digital con pasarela de pagos, catálogos, personalización de atención al cliente y consulta en tiempo real para el cliente.',
    image: '/foto/ferrefast.png',
    liveUrl: 'https://ferrefastoficial.vercel.app/',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['Next.js 15', 'NestJS', 'MongoDB', 'Pagos'],
    category: 'E-commerce',
    impact: 'Ferretería digital con pagos y catálogo',
    purpose: 'Digitalizar una ferretería con tienda online completa, pagos integrados y atención personalizada.',
    mainTech: 'Next.js + NestJS + MongoDB',
    problem: 'La ferretería no vendía online: sus clientes no podían consultar catálogo, stock ni pagar desde fuera del local.',
    solution:
      'Tienda online con pasarela de pagos, catálogos de productos, consulta en tiempo real para el cliente y personalización de la atención, con backend NestJS y MongoDB Atlas.',
    challenges:
      'Integrar la pasarela de pagos y mantener el stock sincronizado en tiempo real durante la consulta del cliente.',
  },
  {
    title: 'SisRestaurante',
    description:
      'Sistema de restaurante con login por roles (mozo, administrador, cajero, cocinero), carta digital para clientes y dashboard con tiempos de pedido en tiempo real.',
    image: '/foto/sisresturant.png',
    liveUrl: 'https://sisresturant.vercel.app/',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['TypeScript', 'Next.js', 'MongoDB', 'Realtime'],
    category: 'Restaurante',
    impact: '4 roles + carta para clientes',
    purpose: 'Digitalizar el restaurante: pedidos con roles de equipo y tiempos medidos en tiempo real.',
    mainTech: 'Next.js + MongoDB',
    problem: 'Pedidos en papel hacia la cocina, sin control de roles ni visibilidad del tiempo real.',
    solution:
      'Aplicación con autenticación por roles (mozo, cajero, cocinero, admin), carta digital para clientes y dashboard de administración con tiempos de pedido en tiempo real.',
    challenges: 'Sincronizar los estados del pedido entre cocina, caja y salón con tiempos en vivo.',
  },
  {
    title: 'J.A.R.V.I.S. AI',
    description:
      'Asistente personal de voz con IA para Windows: te escucha y responde por voz, ve tu pantalla o cámara, controla la PC y resuelve tareas complejas con memoria persistente local.',
    image: '/foto/jarvis.png',
    liveUrl: '',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['Python', 'IA', 'Voz', 'Automatización'],
    category: 'IA',
    impact: 'Asistente con voz, visión y memoria local',
    purpose: 'Asistente de IA que opera sobre Windows: voz, visión y control del sistema sin salir de tu PC.',
    mainTech: 'Python + LLMs',
    problem: 'Las herramientas asistente no integran voz, visión y automatización de sistema en un solo lugar.',
    solution:
      'Asistente con respuesta por voz en tiempo real en varios idiomas, visión (pantalla/cámara), control de apps y archivos, alarmas, web y automatizaciones, con memoria persistente local.',
    challenges:
      'Procesar voz, visión y archivos (PDF, imágenes, audio, video) manteniendo las claves de API seguras y fuera del repositorio.',
  },
  {
    title: 'PDM',
    description:
      'Sistema de captura de datos de mueblería con jerarquías para mayor detalle de producto, carga de imágenes y control de precios.',
    image: '/foto/pdm.png',
    liveUrl: 'https://pdh-tau.vercel.app/',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['Next.js 15', 'NestJS', 'MongoDB', 'JWT'],
    category: 'Gestión',
    impact: 'Catálogo jerárquico con precios e imágenes',
    purpose: 'Recolectar y organizar los datos de muebles por jerarquías con imágenes y precios.',
    mainTech: 'Next.js + NestJS + MongoDB',
    problem: 'Los datos de producto y precios estaban desordenados, sin estructura jerárquica ni imágenes.',
    solution:
      'Sistema con jerarquías de producto, carga de imágenes y control de precios, con backend NestJS y MongoDB Atlas protegido por JWT.',
    challenges:
      'Modelar la jerarquía de productos y coordinar el despliegue entre frontend (Vercel) y backend (Railway).',
  },
  {
    title: 'AsisTrack',
    description:
      'Sistema de gestión de personal y control de asistencia con paneles de administrador y trabajador: asistencia en vivo, nómina PDF/Excel, turnos, adelantos y permisos.',
    image: '/foto/asistrack.png',
    liveUrl: 'https://asistrack.vercel.app/',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    category: 'RRHH',
    impact: 'Asistencia en vivo + nómina automatizada',
    purpose: 'Digitalizar la gestión de personal: asistencia, nómina, turnos y solicitudes en una sola plataforma.',
    mainTech: 'React + Node.js + MongoDB',
    problem: 'El control de asistencia era manual y las nóminas se calculaban a mano, con errores y pérdida de tiempo.',
    solution:
      'Sistema con rol administrador (dashboard en vivo, empleados, nómina PDF/Excel, turnos, evaluaciones) y rol trabajador (registro de entrada/descanso/salida, adelantos, permisos y vacaciones).',
    challenges:
      'Cálculo de nómina con exportación, reportes individuales y grupales, e integración contable.',
  },
  {
    title: 'DraxBarber',
    description:
      'Sitio web de barbería con panel de administración, dashboard de clientes, reservas con MongoDB y autenticación JWT.',
    image: '/foto/draxbarber.png',
    liveUrl: 'https://draxbarber.vercel.app/',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['Next.js 15', 'NestJS', 'MongoDB', 'Tailwind'],
    category: 'Servicios',
    impact: 'Reservas online con panel de administración',
    purpose: 'Presencia digital y gestión de citas para la barbería.',
    mainTech: 'Next.js + NestJS + MongoDB',
    problem: 'La barbería gestionaba las citas manualmente y no tenía una web con panel de administración.',
    solution:
      'Web con catálogo de servicios, reservas en MongoDB y dashboard para administrar clientes y citas, todo protegido con JWT.',
    challenges: 'Flujo completo de reserva y autenticación segura con rutas públicas y privadas.',
  },
  {
    title: 'Inventario Genéricos',
    description:
      'Sistema web de inventario con registro de camiones por placa, escaneo de productos, asignación de ubicación de almacenamiento y stock en tiempo real.',
    image: '/foto/inventario.png',
    liveUrl: 'https://inventario-rust.vercel.app/',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['Next.js 15', 'NestJS', 'MongoDB', 'Scanner'],
    category: 'Inventario',
    impact: 'Escaneo de productos y stock en tiempo real',
    purpose: 'Trazar inventario por camión (placa) con escaneo y ubicación de almacenamiento.',
    mainTech: 'Next.js + NestJS + MongoDB',
    problem: 'No había trazabilidad de qué camión trae qué productos ni dónde se almacenan.',
    solution:
      'Inventario con registro de camiones por placa, escaneo de productos y dirección de almacenamiento, con stock actualizado en tiempo real.',
    challenges: 'Escaneo de productos y consistencia de stock ante actualizaciones concurrentes desde varios puntos.',
  },
  {
    title: 'Toretto Distribuidora',
    description:
      'Carta digital de licorería por mayor: catálogo de productos, precios y consulta directa desde el celular.',
    image: '/foto/toretto.png',
    liveUrl: 'https://torettobardistribuidora.vercel.app/',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['TypeScript', 'Next.js', 'Carta digital', 'Responsive'],
    category: 'E-commerce',
    impact: 'Carta digital para venta mayorista',
    purpose: 'Carta digital para que los clientes mayoristas consulten catálogo y precios.',
    mainTech: 'Next.js + TypeScript',
    problem: 'La distribuidora enviaba listas por imágenes/WhatsApp, sin orden y sin presencia web.',
    solution:
      'Carta digital responsive con catálogo, precios y contacto directo para pedidos mayoristas.',
    challenges: 'Catálogo claro y carga rápida desde el celular de los clientes.',
  },
  {
    title: '3D View',
    description:
      'Configurador de ensamblaje 3D en el navegador: sube modelos GLB/FBX/OBJ, muévelos, rótalos y encájalos con snap automático. Guarda en la nube y compártelo con un link.',
    image: '/foto/3dview.png',
    liveUrl: 'https://3dview-omega.vercel.app/',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['Three.js', 'React Three Fiber', 'Supabase', '3D'],
    category: '3D',
    impact: 'Configurador 3D con snap y guardado en la nube',
    purpose: 'Configurador de ensamblajes 3D en el navegador con guardado, exportación y API.',
    mainTech: 'Next.js + Three.js + Supabase',
    problem: 'Armar y compartir ensamblajes 3D requería software pesado o herramientas de escritorio.',
    solution:
      'Visor 3D con gizmos, snap automático entre piezas, separación de piezas, guardado en Supabase con link para compartir, BOM exportable en JSON/CSV y API REST.',
    challenges: 'Rendimiento del visor, snap de piezas y seguridad de los ensamblajes (cubierto con Vitest).',
  },
  {
    title: 'Fotógrafo Joseph H.',
    description:
      'Portafolio de fotografía para captar clientes: galería de trabajos, servicios y contacto directo para cerrar compras por WhatsApp.',
    image: '/foto/portafoliofotografia.png',
    liveUrl: 'https://fotografojosephhinostroza.vercel.app/',
    sourceUrl: 'https://github.com/J23-t',
    tags: ['Vue.js', 'TypeScript', 'Galería', 'WhatsApp'],
    category: 'Portafolio',
    impact: 'Galería + contacto directo por WhatsApp',
    purpose: 'Exhibir el trabajo del fotógrafo y convertir visitas en pedidos.',
    mainTech: 'Vue.js + NestJS + MongoDB',
    problem: 'El fotógrafo necesitaba mostrar su portafolio de forma atractiva y recibir pedidos de clientes.',
    solution:
      'Web con galería optimizada y botón de WhatsApp para que el cliente cierre la compra directamente.',
    challenges: 'Rendimiento de la galería y UX orientada a conversión por WhatsApp.',
  },
];