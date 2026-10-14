import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const GITHUB_USER = 'carrilx'; // 
const REPO_NAME = 'Docusaurus-Aura'; //

// En Vercel se publica en la raíz del dominio; en GitHub Pages bajo /<repo>/.
// Vercel define la variable de entorno VERCEL=1 durante el build, así que
// la misma configuración sirve para las dos plataformas.
const isVercel = !!process.env.VERCEL;

const config: Config = {
  title: 'Aura · Documentación',
  tagline: 'App de bienestar emocional: documentación técnica y demo interactiva',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: isVercel
    ? `https://${REPO_NAME}.vercel.app`
    : `https://${GITHUB_USER}.github.io`,
  baseUrl: isVercel ? '/' : `/${REPO_NAME}/`,

  organizationName: GITHUB_USER,
  projectName: REPO_NAME,
  trailingSlash: false,

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: `https://github.com/${GITHUB_USER}/${REPO_NAME}/tree/main/`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Aura',
      logo: {alt: 'Logo de Aura', src: 'img/favicon.svg'},
      items: [
        {type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Documentación'},
        {to: '/demo', label: 'Demo interactiva', position: 'left'},
        {
          href: `https://github.com/${GITHUB_USER}/${REPO_NAME}`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentación',
          items: [
            {label: 'Introducción', to: '/docs/intro'},
            {label: 'Requisitos', to: '/docs/análisis/requisitos'},
            {label: 'Diagrama de clases', to: '/docs/diseño/diagrama_clases'},
          ],
        },
        {
          title: 'Ayuda inmediata (España)',
          items: [
            {label: '024 · Línea de atención a la conducta suicida', href: 'tel:024'},
            {label: '112 · Emergencias', href: 'tel:112'},
          ],
        },
      ],
      copyright: `Proyecto ficticio con fines educativos · DAW · Aura no sustituye a un profesional de la salud.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'json'],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
