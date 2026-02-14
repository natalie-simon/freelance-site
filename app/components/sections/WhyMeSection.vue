<script setup lang="ts">
interface Benefit {
  icon: string
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: 'lucide:clock',
    title: 'Disponible soirs & week-ends',
    description:
      'Je m\'adapte à vos contraintes horaires pour assurer la continuité de vos projets, même en dehors des heures de bureau.',
  },
  {
    icon: 'lucide:code-2',
    title: 'Expertise backend solide',
    description:
      'Plusieurs années d\'expérience en conception d\'API, architecture microservices et optimisation de performances.',
  },
  {
    icon: 'lucide:target',
    title: 'Solutions pragmatiques',
    description:
      'Je privilégie les solutions simples et maintenables plutôt que la sur-ingénierie. Livraison rapide et itérative.',
  },
  {
    icon: 'lucide:message-square',
    title: 'Communication transparente',
    description:
      'Points réguliers, documentation claire et transparence totale sur l\'avancement de vos projets.',
  },
]

// Animation au scroll pour chaque élément
const itemsRef = ref<HTMLElement[]>([])
const visibleItems = ref<boolean[]>([false, false, false, false])

onMounted(() => {
  itemsRef.value.forEach((item, index) => {
    if (item) {
      useIntersectionObserver(
        item,
        ([entry]) => {
          if (entry?.isIntersecting) {
            // Délai progressif pour effet stagger
            setTimeout(() => {
              visibleItems.value[index] = true
            }, index * 150) // 150ms de décalage entre chaque élément
          }
        },
        { threshold: 0.1 }
      )
    }
  })
})
</script>

<template>
  <section id="about" class="bg-base-950 py-20 lg:py-32">
    <div class="container-narrow section-padding">
      <!-- Titre de section -->
      <UiSectionTitle
        title="Pourquoi me choisir ?"
        subtitle="Une expertise backend au service de vos projets"
        accent
      />

      <!-- Grid de points forts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          :ref="(el) => { if (el) itemsRef[index] = el as HTMLElement }"
          :class="[
            'flex gap-4',
            visibleItems[index] && 'animate-fade-up',
          ]"
        >
          <!-- Icon -->
          <div class="flex-shrink-0">
            <Icon
              :name="benefit.icon"
              class="w-10 h-10 text-accent"
            />
          </div>

          <!-- Contenu -->
          <div>
            <h3 class="text-xl font-bold text-content-primary mb-2">
              {{ benefit.title }}
            </h3>
            <p class="text-content-secondary leading-relaxed">
              {{ benefit.description }}
            </p>
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
