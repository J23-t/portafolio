import { Helmet } from 'react-helmet-async';
import { SITE } from '../config/site';
import { projects } from '../data/projects';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path = '',
  image = '/foto/perfil.png',
  type = 'website',
}) => {
  const fullTitle = title
    ? `${title} | ${SITE.name} — Desarrollo Web`
    : `${SITE.name} | Desarrollador Web Full Stack en Lima | Sistemas Empresariales`;

  const fullDescription = description || SITE.tagline;
  const url = `${SITE.url}${path}`;
  const imageUrl = `${SITE.url}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;

// --- Structured Data generators ---

export const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Portafolio de Proyectos — Jordan Talledo',
  description: 'Proyectos de desarrollo web full stack realizados por Jordan Talledo: sistemas empresariales, e-commerce, restaurantes y más.',
  url: `${SITE.url}#projects`,
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: p.title,
      description: p.description,
      applicationCategory: 'WebApplication',
      url: p.liveUrl || SITE.url,
      image: p.image.startsWith('http') ? p.image : `${SITE.url}${p.image}`,
      author: {
        '@type': 'Person',
        name: SITE.fullName,
        url: SITE.url,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  })),
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Sobre mí', item: `${SITE.url}#about` },
    { '@type': 'ListItem', position: 3, name: 'Proyectos', item: `${SITE.url}#projects` },
    { '@type': 'ListItem', position: 4, name: 'Servicios', item: `${SITE.url}#services` },
    { '@type': 'ListItem', position: 5, name: 'Habilidades', item: `${SITE.url}#skills` },
    { '@type': 'ListItem', position: 6, name: 'Experiencia', item: `${SITE.url}#experience` },
    { '@type': 'ListItem', position: 7, name: 'Preguntas frecuentes', item: `${SITE.url}#faq` },
    { '@type': 'ListItem', position: 8, name: 'Contacto', item: `${SITE.url}#contact` },
  ],
};