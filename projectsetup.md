# Project Setup — nataliesimon.fr

> Guide de paramétrage initial du projet Nuxt 4.
> Ce document est conçu pour être donné tel quel à Claude Code comme premier prompt d'initialisation.
> Pré-requis : Node.js 20+, npm/pnpm, Git.

---

## ⚠️ IMPORTANT — Convention Nuxt 4

Ce projet utilise **Nuxt 4**. La différence majeure avec Nuxt 3 :

**Tout le code applicatif vit dans `app/`** (components, pages, layouts, composables, assets, app.vue).
**Le reste (server, content, public, configs) reste à la racine.**

Ne JAMAIS placer de composants, pages ou layouts à la racine. Toujours dans `app/`.

---

## 1. Initialisation du projet

```bash
# Créer le projet Nuxt 4
npx nuxi@latest init nataliesimon.fr
cd nataliesimon.fr

# Gestionnaire de paquets recommandé
corepack enable
corepack prepare pnpm@latest --activate
```

---

## 2. Dépendances à installer

### Modules Nuxt (core)

```bash
# Tailwind CSS
pnpm add -D @nuxtjs/tailwindcss

# Contenu markdown (blog / études de cas)
pnpm add -D @nuxt/content

# Optimisation images
pnpm add -D @nuxt/image

# SEO (meta, sitemap, OG, robots.txt)
pnpm add -D @nuxtjs/seo

# Icônes (compatible Nuxt 4)
pnpm add -D @nuxt/icon
```

### Polices (auto-hébergées, pas de CDN Google)

```bash
pnpm add -D @fontsource/inter @fontsource-variable/inter
pnpm add -D @fontsource/jetbrains-mono
```

### Utilitaires

```bash
# Animations au scroll
pnpm add -D @vueuse/core @vueuse/nuxt

# Formulaire de contact (envoi email)
# Option A : Resend (gratuit jusqu'à 100 emails/mois)
pnpm add resend

# Option B : Formspree (zéro code back, formulaire hébergé)
# → Pas de dépendance, juste un endpoint HTML
```

### Dépendances de dev

```bash
# Linting & formatage
pnpm add -D eslint @nuxt/eslint-config prettier eslint-config-prettier

# TypeScript strict
pnpm add -D vue-tsc typescript
```

---

## 3. Configuration Nuxt (`nuxt.config.ts`)

```ts
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
    '@nuxt/content',
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
  content: {
    highlight: {
      theme: 'github-dark',
    },
    markdown: {
      anchorLinks: false,
    },
  },

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
```

---

## 4. Configuration Tailwind (`tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.vue',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
    './content/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0B0F1A',
          900: '#111827',
          800: '#1E293B',
          700: '#334155',
        },
        content: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
        accent: {
          DEFAULT: '#2DD4BF',
          light: '#5EEAD4',
          dark: '#0D9488',
        },
        border: {
          DEFAULT: '#1E293B',
          hover: '#334155',
          accent: '#2DD4BF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
```

> **Note Nuxt 4** : les paths `content` pointent vers `./app/` pour les fichiers Vue. Les fichiers markdown restent dans `./content/` à la racine.

---

## 5. CSS global (`app/assets/css/tailwind.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Polices auto-hébergées ──────────────────────── */
@import '@fontsource-variable/inter';
@import '@fontsource/jetbrains-mono';

/* ── Base globale ────────────────────────────────── */
@layer base {
  body {
    @apply bg-base-950 text-content-secondary font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply text-content-primary font-bold;
  }

  a {
    @apply text-accent transition-colors duration-200;
  }

  a:hover {
    @apply text-accent-light;
  }

  ::selection {
    @apply bg-accent/20 text-content-primary;
  }

  /* Respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* ── Utilitaires custom ──────────────────────────── */
@layer utilities {
  .section-padding {
    @apply py-24 px-6;
  }

  .container-narrow {
    @apply max-w-6xl mx-auto;
  }

  .text-gradient {
    @apply bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent;
  }
}
```

---

## 6. Arborescence complète du projet (Nuxt 4)

```
nataliesimon.fr/
│
├── app/                                 # ← TOUT le code applicatif ici
│   ├── assets/
│   │   └── css/
│   │       └── tailwind.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TheHeader.vue
│   │   │   ├── TheFooter.vue
│   │   │   └── TheMobileMenu.vue
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.vue
│   │   │   ├── ServicesSection.vue
│   │   │   ├── WhyMeSection.vue
│   │   │   ├── AboutSection.vue
│   │   │   ├── StackSection.vue
│   │   │   ├── CasesSection.vue
│   │   │   └── ContactSection.vue
│   │   │
│   │   ├── ui/
│   │   │   ├── UiButton.vue
│   │   │   ├── UiCard.vue
│   │   │   ├── UiBadge.vue
│   │   │   ├── UiSectionTitle.vue
│   │   │   └── UiAnimateOnScroll.vue
│   │   │
│   │   └── content/
│   │       └── CaseStudyCard.vue
│   │
│   ├── composables/
│   │   ├── useScrollAnimation.ts
│   │   └── useContactForm.ts
│   │
│   ├── layouts/
│   │   └── default.vue
│   │
│   ├── pages/
│   │   ├── index.vue
│   │   └── mentions-legales.vue
│   │
│   └── app.vue
│
├── content/                             # ← Markdown (reste à la racine)
│   └── cases/
│       ├── 1.refonte-api.md
│       └── 2.integration-tiers.md
│
├── public/                              # ← Fichiers statiques (reste à la racine)
│   ├── favicon.svg
│   ├── og-image.png
│   └── cv-natalie-simon.pdf
│
├── server/                              # ← API server (reste à la racine)
│   └── api/
│       └── contact.post.ts
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 7. Layout par défaut (`app/layouts/default.vue`)

```vue
<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-1">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
```

---

## 8. Point d'entrée (`app/app.vue`)

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

---

## 9. Page d'accueil (`app/pages/index.vue`)

```vue
<template>
  <div>
    <HeroSection />
    <ServicesSection />
    <WhyMeSection />
    <AboutSection />
    <StackSection />
    <CasesSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Natalie Simon — Consultante Backend / API & Architecture',
  description:
    'Développeuse backend senior freelance. Conception d\'API REST, refonte de systèmes existants, intégrations. Disponible soirs & week-ends pour démarrage rapide.',
})
</script>
```

---

## 10. Endpoint contact (`server/api/contact.post.ts`)

```ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, email, message } = body
  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      message: 'Tous les champs sont requis.',
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'Email invalide.',
    })
  }

  try {
    await resend.emails.send({
      from: 'Site nataliesimon.fr <contact@nataliesimon.fr>',
      to: 'natalie.simon2201@gmail.com',
      replyTo: email,
      subject: `[Site] Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message depuis nataliesimon.fr</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de l\'envoi. Réessayez ou contactez-moi directement par email.',
    })
  }
})
```

---

## 11. Variables d'environnement (`.env`)

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
NUXT_SITE_URL=https://nataliesimon.fr
```

### `.env.example` (à committer)

```env
RESEND_API_KEY=re_your_api_key_here
NUXT_SITE_URL=https://nataliesimon.fr
```

---

## 12. Git & .gitignore

```gitignore
# Nuxt
.nuxt/
.output/
dist/

# Node
node_modules/

# Env
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Misc
*.log
```

---

## 13. Scripts npm (`package.json`)

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt generate",
    "preview": "nuxt preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "typecheck": "vue-tsc --noEmit"
  }
}
```

---

## 14. Checklist de validation post-setup

- [ ] `pnpm dev` démarre sans erreur
- [ ] La page affiche un fond `#0B0F1A` (base-950)
- [ ] Le texte par défaut est en Inter
- [ ] Tailwind fonctionne (tester une classe `text-accent`)
- [ ] `pnpm run build` génère le dossier `.output/public/`
- [ ] TypeScript strict activé, pas d'erreurs
- [ ] Le repo Git est initialisé avec le `.gitignore` correct
- [ ] `.env` n'est PAS commité
- [ ] Les composants sont bien dans `app/components/` (pas à la racine)

---

## 15. Ordre d'implémentation recommandé

```
Étape 1  → Setup projet (ce document)
Étape 2  → Layout (Header + Footer + default.vue)
Étape 3  → Composants UI de base (UiButton, UiCard, UiBadge, UiSectionTitle)
Étape 4  → HeroSection
Étape 5  → ServicesSection
Étape 6  → WhyMeSection
Étape 7  → AboutSection
Étape 8  → StackSection
Étape 9  → ContactSection (formulaire + endpoint)
Étape 10 → CasesSection (+ contenu markdown)
Étape 11 → Animations (UiAnimateOnScroll + scroll effects)
Étape 12 → SEO final (meta, OG image, sitemap, robots)
Étape 13 → Mentions légales
Étape 14 → Responsive polish + tests cross-browser
Étape 15 → Déploiement
```

---

## 16. Différences Nuxt 4 vs Nuxt 3 — Aide-mémoire

| Aspect | Nuxt 3 | Nuxt 4 |
|---|---|---|
| Composants | `./components/` | `./app/components/` |
| Pages | `./pages/` | `./app/pages/` |
| Layouts | `./layouts/` | `./app/layouts/` |
| Composables | `./composables/` | `./app/composables/` |
| Assets | `./assets/` | `./app/assets/` |
| app.vue | `./app.vue` | `./app/app.vue` |
| Server | `./server/` | `./server/` (inchangé) |
| Content | `./content/` | `./content/` (inchangé) |
| Public | `./public/` | `./public/` (inchangé) |
| Alias `~` / `@` | pointe vers racine | pointe vers `app/` |
| Module icônes | `nuxt-icon` | `@nuxt/icon` |

---

*Document de référence — à utiliser conjointement avec `DesignSystem.md` et `ComponentBriefs.md`.*
*Dernière mise à jour : 13 février 2026 — Adapté Nuxt 4*