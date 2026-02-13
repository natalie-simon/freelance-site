# Component Briefs — nataliesimon.fr

> Brief détaillé pour chaque composant du site.
> Chaque section = un prompt Claude Code distinct.
> Stack : **Nuxt 4** | Référence design : `DesignSystem.md` | Référence projet : `ProjectSetup.md`

---

## ⚠️ Convention Nuxt 4

- Tous les composants sont dans **`app/components/`**
- Les pages dans **`app/pages/`**, les layouts dans **`app/layouts/`**
- Les icônes utilisent `@nuxt/icon` : **`<Icon name="lucide:code" />`**
- L'alias `~` pointe vers `app/`

---

## ÉTAPE 2 — Layout

---

### app/components/layout/TheHeader.vue

**Rôle** : Navigation fixe en haut de page. Doit rester visible au scroll.

**Comportement** :
- Position `fixed` top, full width, z-50
- Fond transparent au top de page → devient `bg-base-950/90 backdrop-blur-md` après 50px de scroll
- Transition douce entre les deux états (300ms)

**Contenu desktop (≥ md)** :

```
[Logo/Nom]                    [Services] [À propos] [Réalisations] [Contact] [CTA]
```

- **Logo** : Texte "Natalie Simon" en `font-sans font-bold text-content-primary text-lg`. Pas de logo image en V1 — le nom suffit. Sous-texte optionnel : "Backend / API" en `text-xs text-content-muted` sous le nom.
- **Liens nav** : `text-sm text-content-secondary hover:text-accent`. Scroll smooth vers la section correspondante (ancres `#services`, `#about`, `#cases`, `#contact`).
- **CTA** : Bouton `UiButton` variant `primary`, taille `sm`, texte "Me contacter", scroll vers `#contact`.

**Contenu mobile (< md)** :
- Logo à gauche
- Icône hamburger à droite : `<Icon name="lucide:menu" class="w-6 h-6 text-content-primary" />`
- Au clic → ouvre `TheMobileMenu`

---

### app/components/layout/TheMobileMenu.vue

**Rôle** : Menu plein écran sur mobile.

**Comportement** :
- Panneau slide-in depuis la droite, fond `bg-base-950`
- Overlay sombre semi-transparent derrière
- Fermeture : bouton croix `<Icon name="lucide:x" />` + clic overlay + touche Escape
- Focus trap actif quand ouvert (accessibilité)

**Contenu** :
```
                                          [X]

              Services
              À propos
              Réalisations
              Contact

          [ Me contacter ]  ← CTA primary full-width
```

- Liens centrés, `text-2xl text-content-primary`, espacement `space-y-8`
- Chaque clic ferme le menu + scroll vers la section

---

### app/components/layout/TheFooter.vue

**Rôle** : Pied de page sobre.

**Fond** : `bg-base-900`, bordure top `border-t border-border`

**Structure** :
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Natalie Simon                    Liens rapides             │
│  Consultante Backend              Services                  │
│  API & Architecture               À propos                  │
│                                   Réalisations              │
│  natalie.simon@gmail.com          Contact                   │
│  07 49 63 49 23                                             │
│                                   Suivez-moi                │
│                                   [LinkedIn] [GitHub]       │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  © 2026 Natalie Simon · Mentions légales                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- Layout : 2 colonnes desktop, 1 colonne mobile
- Texte en `content-muted` sauf liens en `content-secondary hover:text-accent`
- Icônes : `<Icon name="lucide:linkedin" />` et `<Icon name="lucide:github" />` en `w-5 h-5`
- Lien "Mentions légales" vers `/mentions-legales`

---

## ÉTAPE 3 — Composants UI de base

---

### app/components/ui/UiButton.vue

**Props** :
```ts
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'  // default: 'primary'
  size?: 'sm' | 'md' | 'lg'                     // default: 'md'
  href?: string                                  // Si défini → <a>, sinon <button>
  external?: boolean                             // target="_blank" si true
  fullWidth?: boolean                            // w-full
}
```

**Styles par variant** :

| Variant | Classes |
|---|---|
| `primary` | `bg-accent text-base-950 font-semibold hover:bg-accent-light` |
| `secondary` | `border border-accent text-accent font-medium hover:bg-accent/10` |
| `ghost` | `text-accent hover:text-accent-light underline-offset-4 hover:underline` |

**Tailles** :

| Size | Classes |
|---|---|
| `sm` | `px-4 py-2 text-sm rounded-lg` |
| `md` | `px-6 py-3 text-base rounded-lg` |
| `lg` | `px-8 py-4 text-lg rounded-lg` |

**Transition** : `transition-colors duration-200` sur tous.

---

### app/components/ui/UiCard.vue

**Props** :
```ts
interface Props {
  hoverable?: boolean  // default: true
}
```

**Template** :
```html
<div class="bg-base-800 border border-border rounded-xl p-6"
     :class="{ 'hover:border-border-hover transition-colors duration-200': hoverable }">
  <slot />
</div>
```

---

### app/components/ui/UiBadge.vue

**Props** :
```ts
interface Props {
  label: string
}
```

**Template** :
```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
             bg-accent/10 text-accent border border-accent/20">
  {{ label }}
</span>
```

---

### app/components/ui/UiSectionTitle.vue

**Props** :
```ts
interface Props {
  title: string
  subtitle?: string
  centered?: boolean  // default: true
}
```

**Template** :
```html
<div :class="{ 'text-center': centered }">
  <h2 class="text-4xl font-bold text-content-primary">{{ title }}</h2>
  <p v-if="subtitle" class="mt-4 text-lg text-content-secondary max-w-2xl"
     :class="{ 'mx-auto': centered }">
    {{ subtitle }}
  </p>
</div>
```

---

### app/components/ui/UiAnimateOnScroll.vue

**Rôle** : Wrapper qui déclenche un fade-up quand l'élément entre dans le viewport.

**Props** :
```ts
interface Props {
  delay?: number   // délai en ms avant l'animation (pour stagger)
  once?: boolean   // default: true — animer une seule fois
}
```

**Logique** : Utiliser `useIntersectionObserver` de `@vueuse/core`. Quand visible → ajouter la classe `animate-fade-up`. Avant visible → `opacity-0 translate-y-5`.

**Respecter `prefers-reduced-motion`** : si activé, rendre l'élément visible immédiatement sans animation.

---

## ÉTAPE 4 — HeroSection

---

### app/components/sections/HeroSection.vue

**Rôle** : Première chose que le visiteur voit. Doit communiquer en 3 secondes : qui tu es, ce que tu fais, pourquoi te contacter.

**Layout** : Pleine hauteur viewport (`min-h-screen`), contenu centré verticalement.

**Fond** : `bg-base-950` avec un léger gradient radial subtil en haut à droite :
```css
background: radial-gradient(ellipse at 80% 20%, rgba(45, 212, 191, 0.05) 0%, transparent 60%);
```

**Contenu** :

```
                        Natalie Simon
              Consultante Backend Freelance

        Je conçois des API fiables, je reprends
      vos systèmes existants, et je livre — vite.

        8+ ans d'expérience · NestJS · Laravel · TypeScript

          [ Me contacter ]    [ Voir mes services ↓ ]
```

**Détail typographique** :
- "Natalie Simon" : `text-5xl md:text-6xl font-bold text-content-primary`
- "Consultante Backend Freelance" : `text-xl md:text-2xl text-accent font-medium mt-2`
- Phrase d'accroche : `text-lg md:text-xl text-content-secondary mt-6 max-w-2xl`
- Ligne stack : `text-sm text-content-muted mt-4` — séparateurs · entre chaque techno
- CTA gauche : `UiButton` variant `primary`, taille `lg`, texte "Me contacter", scroll vers `#contact`
- CTA droite : `UiButton` variant `secondary`, taille `lg`, texte "Voir mes services", scroll vers `#services`

**Animation d'entrée** :
- Les éléments apparaissent en cascade (stagger 100ms) de haut en bas
- Fade-up classique (opacity 0→1, translateY 20px→0)

**Indicateur scroll** : `<Icon name="lucide:chevron-down" />` animé en bas de la section, `text-content-muted`, animation bounce subtile. Optionnel.

---

## ÉTAPE 5 — ServicesSection

---

### app/components/sections/ServicesSection.vue

**Ancre** : `id="services"`

**Titre** : "Mes interventions"
**Sous-titre** : "Des missions concrètes, des résultats mesurables."

**Layout** : Grille 2×2 desktop (`md:grid-cols-2`), 1 colonne mobile. `gap-8`.

**4 cartes** (chacune dans un `UiCard`) :

---

**Carte 1 — Création ou évolution d'API REST**
- **Icône** : `<Icon name="lucide:code" class="w-10 h-10 text-accent" />`
- **Titre** : "Création ou évolution d'API REST"
- **Description** : "Conception, documentation et implémentation d'endpoints performants. Du cadrage fonctionnel à la mise en production."
- **Tags** : `NestJS` `Laravel` `REST` `OpenAPI`

---

**Carte 2 — Refonte & structuration de backend**
- **Icône** : `<Icon name="lucide:refresh-cw" class="w-10 h-10 text-accent" />`
- **Titre** : "Refonte & structuration de backend"
- **Description** : "Migration, refactoring et modernisation de bases de code existantes. J'identifie les dettes techniques et je les résous."
- **Tags** : `Refactoring` `Migration` `Architecture`

---

**Carte 3 — Connexion de services tiers**
- **Icône** : `<Icon name="lucide:plug" class="w-10 h-10 text-accent" />`
- **Titre** : "Connexion de services tiers"
- **Description** : "Intégration d'API externes, webhooks, synchronisation de données entre systèmes. Je fais communiquer vos outils."
- **Tags** : `Webhooks` `API tierces` `Sync`

---

**Carte 4 — Résolution de problèmes complexes**
- **Icône** : `<Icon name="lucide:bug" class="w-10 h-10 text-accent" />`
- **Titre** : "Résolution de problèmes complexes"
- **Description** : "Diagnostic, debugging et correction de bugs critiques en autonomie. Quand votre équipe est bloquée, j'interviens."
- **Tags** : `Debug` `Diagnostic` `Autonomie`

---

**Structure HTML d'une carte** :
```
┌────────────────────────────────────┐
│  [Icon]                            │
│                                    │
│  Titre de la carte                 │
│                                    │
│  Description sur 2-3 lignes        │
│  qui parle du bénéfice client.     │
│                                    │
│  [Tag] [Tag] [Tag]                 │
└────────────────────────────────────┘
```

- Icône : `mb-4`
- Titre carte : `text-xl font-semibold text-content-primary mb-3`
- Description : `text-content-secondary text-sm leading-relaxed mb-4`
- Tags : rangée de `UiBadge`, `flex flex-wrap gap-2`

---

## ÉTAPE 6 — WhyMeSection

---

### app/components/sections/WhyMeSection.vue

**Fond** : `bg-base-900` (alternance visuelle)

**Titre** : "Pourquoi me choisir"
**Sous-titre** : "Ce que mes clients apprécient le plus."

**Layout** : 3 colonnes desktop (`md:grid-cols-3`), 1 colonne mobile. `gap-8`.

**3 colonnes** :

| # | Icône | Titre | Description |
|---|---|---|---|
| 1 | `lucide:zap` | "Impact dès les premiers jours" | "Je prends en main n'importe quel projet existant rapidement. Pas besoin de semaines d'onboarding — j'analyse le code, j'identifie les risques, et je produis." |
| 2 | `lucide:shield` | "Culture qualité" | "Code maintenable, testé, documenté. Je ne livre pas du code qui marche « pour l'instant » — je livre du code qui tient dans le temps." |
| 3 | `lucide:message-square` | "Communication claire" | "Reporting régulier, décisions d'architecture validées avec vous. Pas de mauvaises surprises — vous savez exactement où on en est à tout moment." |

- Contenu centré (`text-center`)
- Icône : `w-12 h-12 text-accent mx-auto mb-4`
- Titre : `text-lg font-semibold text-content-primary mb-3`
- Description : `text-content-secondary text-sm leading-relaxed`

---

## ÉTAPE 7 — AboutSection

---

### app/components/sections/AboutSection.vue

**Ancre** : `id="about"`

**Titre** : "À propos"

**Layout** : 2 colonnes desktop. Gauche : texte bio. Droite : infos condensées.

**Colonne gauche — Texte bio** :

> Développeuse backend depuis plus de 8 ans, j'ai travaillé sur des projets allant de la GMAO multi-bases au logiciel métier pour le secteur médical.
>
> Aujourd'hui consultante freelance, j'interviens en renfort sur des projets existants : reprise de code, conception d'API, refactoring, intégrations. Mon approche est simple — je comprends vite, je livre vite, et je m'assure que ce que je livre est maintenable.
>
> Disponible en soirs et week-ends, je travaille en full remote et je suis opérationnelle immédiatement.

- Texte en `text-content-secondary leading-relaxed`, paragraphes séparés par `mb-4`

**Colonne droite — Infos clés** (fond `bg-base-800 rounded-xl p-6`) :

| Icône | Texte |
|---|---|
| `lucide:map-pin` | Hyères (83) — Full remote |
| `lucide:clock` | Soirs & week-ends |
| `lucide:rocket` | Démarrage rapide |
| `lucide:mail` | natalie.simon@gmail.com |

- Icônes `text-accent w-5 h-5`, texte `text-content-secondary text-sm`
- Espacement `space-y-4`

**Sous la bio** : Lien "Télécharger mon CV (PDF)" → `UiButton` variant `ghost`, `<Icon name="lucide:download" />`. Pointe vers `/cv-natalie-simon.pdf`, attribut `download`.

---

## ÉTAPE 8 — StackSection

---

### app/components/sections/StackSection.vue

**Fond** : `bg-base-900`

**Titre** : "Stack technique"
**Sous-titre** : "Les technologies que je maîtrise au quotidien."

**Layout** : Badges groupés par catégorie, centrés. `flex flex-wrap justify-center gap-3` par groupe.

**Badges par catégorie** :

```
              Backend
  [TypeScript] [NestJS] [Node.js] [Laravel] [PHP]

            Base de données
       [PostgreSQL] [MySQL] [Prisma]

         Front (complémentaire)
           [Vue.js 2/3] [Nuxt]

            DevOps & outils
    [Docker] [Git] [GitHub Actions] [Linux]
```

- Label catégorie : `text-xs text-content-muted uppercase tracking-wider mb-2`
- Badges : `UiBadge` standard
- Espacement entre groupes : `space-y-8`

---

## ÉTAPE 9 — ContactSection

---

### app/components/sections/ContactSection.vue

**Ancre** : `id="contact"`

**Titre** : "Parlons de votre projet"
**Sous-titre** : "Un besoin backend ? Un projet à reprendre ? Contactez-moi."

**Layout** : 2 colonnes desktop. Gauche : formulaire. Droite : infos + CTA alternatifs.

**Colonne gauche — Formulaire** :

Champs : Nom*, Email*, Message* (textarea min 150px).

**Styles des champs** :
- Labels : `text-sm font-medium text-content-primary mb-1.5`
- Inputs : `w-full bg-base-800 border border-border rounded-lg px-4 py-3 text-content-primary placeholder:text-content-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors`
- Bouton submit : `UiButton` variant `primary`, full width, texte "Envoyer le message"

**États** :
- Envoi en cours : bouton désactivé, texte "Envoi en cours..."
- Succès : message vert "Message envoyé ! Je vous réponds sous 48h."
- Erreur : message rouge sous le formulaire

**Validation front** : Nom min 2 chars, email format valide, message min 10 chars. Au blur + submit.

**Colonne droite** (fond `bg-base-800 rounded-xl p-8`) :

- **Contact direct** : email (`lucide:mail`), téléphone (`lucide:phone`), LinkedIn (`lucide:linkedin`)
- **Prise de RDV** : `UiButton` variant `secondary`, lien Cal.com (`lucide:calendar`)
- **Disponibilité** : "Soirs & week-ends · Réponse sous 48h · Démarrage rapide" (`lucide:clock`)

---

## ÉTAPE 10 — CasesSection

---

### app/components/sections/CasesSection.vue

**Ancre** : `id="cases"`
**Fond** : `bg-base-900`

**Titre** : "Réalisations"
**Sous-titre** : "Quelques exemples concrets de missions réalisées."

**Layout** : Grille `md:grid-cols-2`, `gap-8`.
**Source** : `queryContent('/cases')` depuis Nuxt Content.

---

### app/components/content/CaseStudyCard.vue

**Props** (via frontmatter markdown) :
```ts
interface CaseStudy {
  title: string
  context: string
  problem: string
  approach: string
  result: string
  stack: string[]
}
```

**Structure** :
```
┌──────────────────────────────────────────┐
│  📂  Context                             │  ← text-content-muted text-sm
│  Titre                                   │  ← text-xl font-semibold
│                                          │
│  Problème                                │  ← label accent uppercase
│  Description...                          │
│                                          │
│  Approche                                │  ← label accent uppercase
│  Description...                          │
│                                          │
│  Résultat                                │  ← label accent uppercase
│  Description...                          │
│                                          │
│  [Tag] [Tag] [Tag]                       │
└──────────────────────────────────────────┘
```

Labels "Problème", "Approche", "Résultat" : `text-xs uppercase tracking-wider text-accent font-semibold mb-1`

### Fichiers markdown

**`content/cases/1.refonte-api.md`** :
```yaml
---
title: "Refonte d'une API legacy"
context: "Startup SaaS — secteur e-commerce"
problem: "L'API existante, développée en PHP procédural, ne tenait pas la montée en charge. Temps de réponse dégradés, erreurs 500 fréquentes en pic de trafic, code non testé et difficilement maintenable."
approach: "Audit complet du code existant. Refonte progressive en NestJS avec architecture modulaire. Migration de la base MySQL vers PostgreSQL. Mise en place de tests d'intégration et d'un pipeline CI/CD."
result: "Temps de réponse divisé par 4. Zéro erreur 500 en production depuis la mise en ligne. Base de code testée à 80% et documentée."
stack: ["NestJS", "TypeScript", "PostgreSQL", "Docker", "GitHub Actions"]
---
```

**`content/cases/2.integration-tiers.md`** :
```yaml
---
title: "Interconnexion de 3 systèmes métier"
context: "PME — secteur logistique"
problem: "Trois outils métier (ERP, CRM, plateforme logistique) fonctionnaient en silos. Double saisie systématique, données incohérentes entre les systèmes, processus manuels chronophages."
approach: "Conception d'une couche d'API intermédiaire servant de hub. Intégration des webhooks de chaque système. Synchronisation bidirectionnelle des données avec gestion des conflits."
result: "Suppression de 100% de la double saisie. Synchronisation temps réel entre les 3 outils. Gain estimé de 15h/semaine pour l'équipe opérationnelle."
stack: ["Laravel", "PHP", "MySQL", "Webhooks", "REST API"]
---
```

> **Note** : Études de cas fictives. Remplace par tes vraies missions anonymisées.

---

## ÉTAPE 13 — Mentions légales

---

### app/pages/mentions-legales.vue

**Contenu minimum obligatoire (loi française)** :

```
Mentions légales

Éditrice du site
Natalie Simon — Micro-entreprise
SIRET : (à compléter)
Hyères (83)
natalie.simon@gmail.com · 07 49 63 49 23

Hébergement
(à compléter)

Propriété intellectuelle
L'ensemble du contenu de ce site est la propriété de Natalie Simon.
Toute reproduction est interdite sans autorisation préalable.

Données personnelles
Ce site ne collecte aucune donnée en dehors du formulaire de contact.
Les informations transmises sont utilisées uniquement pour répondre
à votre demande. Pas de cookies de tracking.
```

- Style sobre, `container-narrow section-padding`
- Lien retour accueil

---

## Résumé de l'ordre d'implémentation

| Étape | Composant(s) | Fichiers (Nuxt 4) |
|---|---|---|
| 2 | Layout | `app/components/layout/`, `app/layouts/default.vue` |
| 3 | UI de base | `app/components/ui/` |
| 4 | HeroSection | `app/components/sections/HeroSection.vue` |
| 5 | ServicesSection | `app/components/sections/ServicesSection.vue` |
| 6 | WhyMeSection | `app/components/sections/WhyMeSection.vue` |
| 7 | AboutSection | `app/components/sections/AboutSection.vue` |
| 8 | StackSection | `app/components/sections/StackSection.vue` |
| 9 | ContactSection | `app/components/sections/ContactSection.vue` + `server/api/contact.post.ts` |
| 10 | CasesSection | `app/components/sections/` + `app/components/content/` + `content/cases/` |
| 11 | Animations | `app/components/ui/UiAnimateOnScroll.vue` + `app/composables/` |
| 12 | SEO | `nuxt.config.ts`, OG image, sitemap |
| 13 | Mentions légales | `app/pages/mentions-legales.vue` |
| 14 | Responsive | Polish cross-device |
| 15 | Déploiement | Build SSG + upload |

---

*Document de référence — à utiliser conjointement avec `DesignSystem.md` et `ProjectSetup.md`.*
*Dernière mise à jour : 13 février 2026 — Adapté Nuxt 4