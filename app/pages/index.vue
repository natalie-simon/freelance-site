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
    <section id="services" class="min-h-screen flex items-center justify-center bg-base-900">
      <div class="container-narrow section-padding">
        <UiSectionTitle
          title="Services"
          subtitle="Solutions backend sur mesure"
          accent
        />
        <p class="text-content-secondary">Contenu à venir...</p>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="min-h-screen flex items-center justify-center bg-base-950">
      <div class="container-narrow section-padding">
        <UiSectionTitle
          title="À propos"
          subtitle="Expérience et expertise"
          accent
        />
        <p class="text-content-secondary">Contenu à venir...</p>
      </div>
    </section>

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
useSeoMeta({
  title: 'Natalie Simon — Consultante Backend / API & Architecture',
  description:
    "Développeuse backend senior freelance. Conception d'API REST, refonte de systèmes existants, intégrations. Disponible soirs & week-ends.",
})
</script>
