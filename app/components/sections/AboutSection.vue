<script setup lang="ts">
interface InfoItem {
  icon: string
  text: string
}

const infoItems: InfoItem[] = [
  { icon: 'lucide:map-pin', text: 'Hyères (83) — Full remote' },
  { icon: 'lucide:clock', text: 'Soirs & week-ends' },
  { icon: 'lucide:rocket', text: 'Démarrage rapide' },
  { icon: 'lucide:mail', text: 'natalie.simon2201@gmail.com' },
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
  <section id="about" class="bg-base-950 py-20 lg:py-32">
    <div class="container-narrow section-padding">
      <!-- Titre de section -->
      <UiSectionTitle
        title="À propos"
        accent
      />

      <!-- Layout 2 colonnes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <!-- Colonne gauche: Texte bio -->
        <div
          ref="leftColRef"
          :class="[
            leftVisible && 'animate-fade-up',
          ]"
        >
          <div class="space-y-4 text-content-secondary leading-relaxed">
            <p>
              Développeuse backend depuis plus de 8 ans, j'ai travaillé sur des projets allant de la GMAO multi-bases au logiciel métier pour le secteur médical.
            </p>
            <p>
              Aujourd'hui consultante freelance, j'interviens en renfort sur des projets existants : reprise de code, conception d'API, refactoring, intégrations. Mon approche est simple — je comprends vite, je livre vite, et je m'assure que ce que je livre est maintenable.
            </p>
            <p>
              Disponible en soirs et week-ends, je travaille en full remote et je suis opérationnelle immédiatement.
            </p>
          </div>

          <!-- Lien téléchargement CV -->
          <div class="mt-8">
            <UiButton
              variant="ghost"
              as="a"
              href="/project/NatalieCV.pdf"
              download
            >
              <span class="inline-flex items-center gap-2">
                <Icon name="lucide:download" class="w-4 h-4" />
                Télécharger mon CV (PDF)
              </span>
            </UiButton>
          </div>
        </div>

        <!-- Colonne droite: Infos clés -->
        <div
          ref="rightColRef"
          :class="[
            rightVisible && 'animate-fade-up',
          ]"
        >
          <div class="bg-base-800 rounded-xl p-6">
            <div class="space-y-4">
              <div
                v-for="item in infoItems"
                :key="item.text"
                class="flex items-center gap-3"
              >
                <Icon
                  :name="item.icon"
                  class="w-5 h-5 text-accent flex-shrink-0"
                />
                <span class="text-content-secondary text-sm">
                  {{ item.text }}
                </span>
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
