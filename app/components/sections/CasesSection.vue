<script setup lang="ts">
const { data: cases } = await useAsyncData('cases', () =>
  queryCollection('cases').all()
)

// --- Animations ---
const cardsRef = ref<HTMLElement | null>(null)
const cardsVisible = ref(false)

onMounted(() => {
  if (cardsRef.value) {
    useIntersectionObserver(
      cardsRef.value,
      ([entry]) => {
        if (entry?.isIntersecting) {
          cardsVisible.value = true
        }
      },
      { threshold: 0.1 }
    )
  }
})
</script>

<template>
  <section id="cases" class="bg-base-900 py-20 lg:py-32">
    <div class="container-narrow section-padding">
      <!-- Titre de section -->
      <UiSectionTitle
        title="Réalisations"
        subtitle="Quelques exemples concrets de missions réalisées."
      />

      <!-- Grille des cartes -->
      <div
        ref="cardsRef"
        class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
      >
        <div
          v-for="(caseStudy, index) in cases"
          :key="caseStudy.title"
          :class="[cardsVisible && 'animate-fade-up']"
          :style="cardsVisible ? { animationDelay: `${index * 150}ms` } : {}"
          class="opacity-0"
        >
          <CaseStudyCard
            :title="caseStudy.title"
            :context="caseStudy.context"
            :problem="caseStudy.problem"
            :approach="caseStudy.approach"
            :result="caseStudy.result"
            :stack="caseStudy.stack"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .animate-fade-up {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
