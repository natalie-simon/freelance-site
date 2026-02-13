<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  description?: string
  showCta?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: undefined,
  description: undefined,
  showCta: true,
})

// Animation au scroll avec VueUse
const heroRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  heroRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true
      stop() // Arrêter l'observation après la première apparition
    }
  },
  { threshold: 0.1 }
)

function scrollToSection(href: string) {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section
    ref="heroRef"
    class="min-h-screen flex items-center justify-center"
  >
    <div
      :class="[
        'text-center max-w-4xl mx-auto px-6',
        isVisible && 'animate-fade-up',
      ]"
    >
      <!-- Titre principal -->
      <h1
        class="font-bold text-content-primary mb-4 text-4xl md:text-5xl lg:text-6xl"
      >
        {{ title }}
      </h1>

      <!-- Sous-titre / Tagline -->
      <p
        v-if="subtitle"
        class="text-accent mb-4 text-xl md:text-2xl lg:text-3xl"
      >
        {{ subtitle }}
      </p>

      <!-- Description -->
      <p
        v-if="description"
        class="text-content-secondary text-base md:text-lg max-w-2xl mx-auto mb-8"
      >
        {{ description }}
      </p>

      <!-- CTA Buttons -->
      <div
        v-if="showCta"
        class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
      >
        <UiButton
          variant="primary"
          @click="scrollToSection('#contact')"
        >
          Me contacter
        </UiButton>
        <UiButton
          variant="ghost"
          @click="scrollToSection('#cases')"
        >
          Voir mes réalisations
        </UiButton>
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
