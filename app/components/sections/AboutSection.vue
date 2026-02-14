<script setup lang="ts">
interface TechCategory {
  title: string
  icon: string
  items: string[]
}

const techStack: TechCategory[] = [
  {
    title: 'Langages & Frameworks',
    icon: 'lucide:code-2',
    items: ['PHP', 'Laravel', 'NestJS', 'TypeScript'],
  },
  {
    title: 'Databases',
    icon: 'lucide:database',
    items: ['PostgreSQL', 'MySQL'],
  },
  {
    title: 'Cloud & APIs',
    icon: 'lucide:cloud',
    items: ['REST'],
  },
]

// Animation au scroll pour les colonnes
const leftColRef = ref<HTMLElement | null>(null)
const rightColRef = ref<HTMLElement | null>(null)
const leftVisible = ref(false)
const rightVisible = ref(false)

onMounted(() => {
  // Animation colonne gauche
  if (leftColRef.value) {
    useIntersectionObserver(
      leftColRef.value,
      ([entry]) => {
        if (entry?.isIntersecting) {
          leftVisible.value = true
        }
      },
      { threshold: 0.1 }
    )
  }

  // Animation colonne droite avec délai
  if (rightColRef.value) {
    useIntersectionObserver(
      rightColRef.value,
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => {
            rightVisible.value = true
          }, 150)
        }
      },
      { threshold: 0.1 }
    )
  }
})
</script>

<template>
  <section class="bg-base-900 py-20 lg:py-32">
    <div class="container-narrow section-padding">
      <!-- Titre de section -->
      <UiSectionTitle
        title="Mon parcours"
        subtitle="Développeuse backend passionnée"
        accent
      />

      <!-- Layout 2 colonnes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <!-- Colonne gauche: Bio & Expérience -->
        <div
          ref="leftColRef"
          :class="[
            leftVisible && 'animate-fade-up',
          ]"
        >
          <h3 class="text-2xl font-bold text-content-primary mb-4">
            À propos de moi
          </h3>
          <div class="space-y-4 text-content-secondary text-lg leading-relaxed">
            <p>
              Développeuse backend avec plusieurs années d'expérience, je me spécialise dans la conception d'API robustes et d'architectures scalables.
            </p>
            <p>
              Passionnée par les bonnes pratiques et la qualité du code, j'accompagne les entreprises dans leurs projets de refonte et de modernisation technique.
            </p>
            <p>
              Ma disponibilité flexible (soirs & week-ends) me permet de m'adapter à vos contraintes et d'assurer la continuité de vos projets.
            </p>
          </div>
        </div>

        <!-- Colonne droite: Stack Technique -->
        <div
          ref="rightColRef"
          :class="[
            rightVisible && 'animate-fade-up',
          ]"
        >
          <h3 class="text-2xl font-bold text-content-primary mb-6">
            Stack technique
          </h3>

          <!-- Catégories de technologies -->
          <div class="space-y-6">
            <div
              v-for="category in techStack"
              :key="category.title"
            >
              <!-- Titre catégorie avec icon -->
              <div class="flex items-center gap-2 mb-3">
                <Icon
                  :name="category.icon"
                  class="w-5 h-5 text-accent"
                />
                <h4 class="text-content-primary font-semibold">
                  {{ category.title }}
                </h4>
              </div>

              <!-- Badges technologies -->
              <div class="flex flex-wrap gap-2">
                <UiBadge
                  v-for="item in category.items"
                  :key="item"
                  variant="tech"
                >
                  {{ item }}
                </UiBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Respecter prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-up {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
