// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'qASIC docs',
  url: 'https://qasictools.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://media.qasictools.com/files/qASIC%20logo.png',
  organizationName: 'Dock Frankenstein',
  projectName: 'qASIC',
  titleDelimiter: '-',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          path: "docs",
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      defaultMode: 'light',
      metadata: [
        {name: 'og:image', content: 'https://media.qasictools.com/files/qASIC%20banner-background%20image.png'},
        {name: 'og:image:alt', content: 'qASIC logo'},
        {name: 'og:description', content: 'qASIC is a collection of simple well integrated tools that allow you to make and debug games quicker. It takes care of the basics while you focus on your game.'},
        {name: 'og:type', content: 'website'},
        {name: 'og:site_name', content: 'qASIC'},
        {name: 'og:url', content: 'https://qasictools.com'},
        {name: 'theme-color', content: '#00b3ff'},
        {name: 'og:locale', content: 'en_US'},
    
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:url', content: 'https://qasictools.com'},
        {name: 'twitter:description', content: 'qASIC is a collection of simple well integrated tools that allow you to make and debug games quicker. It takes care of the basics while you focus on your game.'},
        {name: 'twitter:image', content: 'https://media.qasictools.com/files/qASIC%20banner-background%20image.png'},
        
        {name: 'canonical', content: 'https://qasictools.com/'},
      ],
      tableOfContents: {
        maxHeadingLevel: 4,
      },
      navbar: {
        title: 'qASIC',
        logo: {
          alt: 'qASIC logo',
          src: 'https://media.qasictools.com/files/qASIC%20logo.png',
        },
        items: [
          {
            position: 'right',
            className: 'navbar-download-link',
            href: 'https://qasictools.com/download',
          },
          {
            position: 'right',
            className: 'navbar-website-link',
            href: 'https://qasictools.com',
          },
          {
            className: "navbar-github-link",
            "aria-label": "GitHub repository",
            position: 'right',
            href: 'https://github.com/DockFrankenstein/qASIC',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `ferafiks ${new Date().getFullYear()}. Made with Docusaurus`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/okaidia'),
        darkTheme: require('prism-react-renderer/themes/okaidia'),
        additionalLanguages: ['csharp'],
      },
    }),
};

module.exports = config;
