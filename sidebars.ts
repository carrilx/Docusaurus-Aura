import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: '1 · Análisis',
      collapsed: false,
      items: ['análisis/requisitos'],
    },
    {
      type: 'category',
      label: '2 · Diseño',
      collapsed: false,
      items: ['diseño/diagrama_clases'],
    },
    {
      type: 'category',
      label: '3 · Implementación',
      collapsed: false,
      items: ['implementación/estructura_proyecto'],
    },
    {
      type: 'category',
      label: '4 · Pruebas',
      collapsed: false,
      items: ['pruebas/analisis_caja_blanca'],
    },
    {
      type: 'category',
      label: '5 · Despliegue',
      collapsed: false,
      items: ['despliegue/github_pages'],
    },
  ],
};

export default sidebars;
