export default defineNuxtConfig({
  // ── Mode de rendu ────────────────────────────────
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // ── Modules ──────────────────────────────────────
  modules: [
    '@nuxtjs/tailwindcss',
    //'@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/icon',
    '@vueuse/nuxt',
  ],

  // ── SEO global ───────────────────────────────────
  site: {
    url: 'https://nataliesimon.fr',
    name: 'Natalie Simon — Consultante Backend / API & Architecture',
    description:
      'Développeuse backend senior freelance. Conception d\'API REST, refonte de systèmes existants, intégrations. Disponible soirs & week-ends.',
    defaultLocale: 'fr',
  },

  // ── Tailwind ─────────────────────────────────────
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
  },

  // ── Content (markdown) ───────────────────────────
 /* content: {
    highlight: {
      theme: 'github-dark',
    },
    markdown: {
      anchorLinks: false,
    },
  },*/

  // ── Image ────────────────────────────────────────
  image: {
    format: ['webp', 'png'],
    quality: 80,
  },

  // ── App config ───────────────────────────────────
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  // ── TypeScript ───────────────────────────────────
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // ── Dev tools ────────────────────────────────────
  devtools: { enabled: true },

  // ── Compatibilité ────────────────────────────────
  compatibilityDate: '2025-01-01',
})