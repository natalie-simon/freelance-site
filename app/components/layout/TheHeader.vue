<script setup lang="ts">
import TheMobileMenu from './TheMobileMenu.vue';

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#about' },
  { label: 'Réalisations', href: '#cases' },
  { label: 'Contact', href: '#contact' },
]

function scrollToSection(href: string) {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleNavClick(href: string) {
  scrollToSection(href)
  isMobileMenuOpen.value = false
}

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScroll)
  handleScroll()

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-base-950/90 backdrop-blur-md border-b border-border'
        : 'bg-transparent',
    ]"
  >
    <div class="container-narrow section-padding py-4">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex flex-col">
          <span class="font-sans font-bold text-content-primary text-lg">
            Natalie Simon
          </span>
          <span class="text-xs text-content-muted">Backend / API</span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-sm text-content-secondary hover:text-accent transition-colors duration-200"
            @click.prevent="scrollToSection(link.href)"
          >
            {{ link.label }}
          </a>
          <button
            class="bg-accent text-base-950 font-semibold px-4 py-2 text-sm rounded-lg hover:bg-accent-light transition-colors duration-200"
            @click="scrollToSection('#contact')"
          >
            Me contacter
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2"
          aria-label="Ouvrir le menu"
          @click="isMobileMenuOpen = true"
        >
          <Icon name="lucide:menu" class="w-6 h-6 text-content-primary" />
        </button>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <TheMobileMenu
      :is-open="isMobileMenuOpen"
      :nav-links="navLinks"
      @close="isMobileMenuOpen = false"
      @navigate="handleNavClick"
    />
  </header>
</template>
