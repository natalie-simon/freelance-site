<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      title="Natalie Simon"
      subtitle="Consultante Backend Freelance"
      description="Conception d'API REST, refonte de systèmes existants, intégrations. Disponible soirs & week-ends."
      :show-cta="true"
    />

    <!-- Services Section -->
    <ServicesSection />

    <!-- About / Why Me Section -->
    <WhyMeSection />

    <!-- About / Bio Section -->
    <AboutSection />

    <!-- Cases Section -->
    <section id="cases" class="min-h-screen flex items-center justify-center bg-base-900">
      <div class="container-narrow section-padding">
        <UiSectionTitle
          title="Réalisations"
          subtitle="Projets et études de cas"
          accent
        />
        <p class="text-content-secondary">Contenu à venir...</p>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="min-h-screen flex items-center justify-center bg-base-950">
      <div class="container-narrow section-padding">
        <UiSectionTitle
          title="Contact"
          subtitle="Discutons de votre projet"
          accent
        />
        <p class="text-content-secondary">Contenu à venir...</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import WhyMeSection from '@/components/sections/WhyMeSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import UiSectionTitle from '@/components/ui/UiSectionTitle.vue'

useSeoMeta({
  title: 'Natalie Simon — Consultante Backend / API & Architecture',
  description:
    "Développeuse backend senior freelance. Conception d'API REST, refonte de systèmes existants, intégrations. Disponible soirs & week-ends.",
})
</script>
