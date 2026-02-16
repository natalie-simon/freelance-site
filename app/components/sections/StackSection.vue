<script setup lang="ts">
interface StackCategory {
  label: string
  items: string[]
}

const categories: StackCategory[] = [
  {
    label: 'Backend',
    items: ['TypeScript', 'NestJS', 'Laravel', 'PHP'],
  },
  {
    label: 'Base de données',
    items: ['PostgreSQL', 'MySQL', 'Prisma'],
  },
  {
    label: 'Front (complémentaire)',
    items: ['Vue.js 2/3', 'Nuxt'],
  },
  {
    label: 'DevOps & outils',
    items: ['Docker', 'Git', 'GitHub Actions', 'Linux'],
  },
]

// Animation au scroll
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (sectionRef.value) {
    useIntersectionObserver(
      sectionRef.value,
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
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
        title="Stack technique"
        subtitle="Les technologies que je maîtrise au quotidien."
        accent
      />

      <!-- Groupes de badges -->
      <div
        ref="sectionRef"
        :class="[
          'space-y-8 text-center',
          isVisible && 'animate-fade-up',
        ]"
      >
        <div
          v-for="category in categories"
          :key="category.label"
        >
          <!-- Label catégorie -->
          <p class="text-xs text-content-muted uppercase tracking-wider mb-3">
            {{ category.label }}
          </p>

          <!-- Badges -->
          <div class="flex flex-wrap justify-center gap-3">
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
