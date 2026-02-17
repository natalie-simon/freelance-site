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

    <!-- Stack Section -->
    <StackSection />

    <!-- Cases Section -->
    <CasesSection />

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import WhyMeSection from '@/components/sections/WhyMeSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import StackSection from '@/components/sections/StackSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import CasesSection from '@/components/sections/CasesSection.vue'

useSeoMeta({
  title: 'Natalie Simon — Consultante Backend / API & Architecture',
  description:
    "Développeuse backend senior freelance. Conception d'API REST, refonte de systèmes existants, intégrations. Disponible soirs & week-ends.",
})
</script>
