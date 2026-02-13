<script setup lang="ts">
interface Service {
  icon: string
  title: string
  description: string
  tags: string[]
}

const services: Service[] = [
  {
    icon: 'lucide:code-xml',
    title: 'API REST & Architecture',
    description:
      'Design et développement d\'API RESTful, GraphQL, gRPC. Architecture microservices scalable et performante.',
    tags: ['Node.js', 'Php', 'PostgreSQL'],
  },
  {
    icon: 'lucide:refresh-cw',
    title: 'Refonte & Modernisation',
    description:
      'Migration de systèmes legacy vers des architectures modernes. Optimisation des performances et de la scalabilité.',
    tags: ['Docker', 'CI/CD'],
  },
  {
    icon: 'lucide:git-merge',
    title: 'Intégrations & Migrations',
    description:
      'Intégration de services tiers (payment, CRM, analytics). Migration de données sécurisée et sans interruption.',
    tags: [ 'API', 'Database', 'GitHub Actions'],
  },
]

// Animation au scroll pour chaque carte
const cardsRef = ref<HTMLElement[]>([])
const visibleCards = ref<boolean[]>([false, false, false])

onMounted(() => {
  cardsRef.value.forEach((card, index) => {
    if (card) {
      useIntersectionObserver(
        card,
        ([entry]) => {
          if (entry?.isIntersecting) {
            // Délai progressif pour effet stagger
            setTimeout(() => {
              visibleCards.value[index] = true
            }, index * 150) // 150ms de décalage entre chaque carte
          }
        },
        { threshold: 0.1 }
      )
    }
  })
})
</script>

<template>
  <section id="services" class="bg-base-900 py-20 lg:py-32">
    <div class="container-narrow section-padding">
      <!-- Titre de section -->
      <UiSectionTitle
        title="Services"
        subtitle="Solutions backend sur mesure"
        accent
      />

      <!-- Grid de services -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          :ref="(el) => { if (el) cardsRef[index] = el as HTMLElement }"
          :class="[
            visibleCards[index] && 'animate-fade-up',
          ]"
        >
          <UiCard hover>
            <!-- Icon -->
            <div class="mb-4">
              <Icon
                :name="service.icon"
                class="w-12 h-12 text-accent"
              />
            </div>

            <!-- Titre -->
            <h3 class="text-xl font-bold text-content-primary mb-3">
              {{ service.title }}
            </h3>

            <!-- Description -->
            <p class="text-content-secondary mb-4 leading-relaxed">
              {{ service.description }}
            </p>

            <!-- Tags techniques -->
            <div class="flex flex-wrap gap-2">
              <UiBadge
                v-for="tag in service.tags"
                :key="tag"
                variant="tech"
              >
                {{ tag }}
              </UiBadge>
            </div>
          </UiCard>
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
