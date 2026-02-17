<script setup lang="ts">
const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#about' },
  { label: 'Réalisations', href: '#cases' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/natalie-simon2201',
    icon: 'lucide:linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/natalie-simon',
    icon: 'lucide:github',
  },
]

function scrollToSection(href: string) {
  if (href.startsWith('#')) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <footer class="bg-base-900 border-t border-border">
    <div class="container-narrow section-padding py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Left Column - Info -->
        <div class="space-y-4">
          <div>
            <h3 class="font-bold text-content-primary text-lg">Natalie Simon</h3>
            <p class="text-content-muted text-sm">Consultante Backend</p>
            <p class="text-content-muted text-sm">API & Architecture</p>
          </div>
          <div class="space-y-2 text-content-secondary text-sm">
            <a
              href="mailto:natalie.simon2201@gmail.com"
              class="block hover:text-accent transition-colors duration-200"
            >
              natalie.simon2201@gmail.com
            </a>
            <a
              href="tel:+33749634923"
              class="block hover:text-accent transition-colors duration-200"
            >
              07 49 63 49 23
            </a>
          </div>
        </div>

        <!-- Right Column - Links -->
        <div class="grid grid-cols-2 gap-8">
          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold text-content-primary text-sm mb-4">
              Liens rapides
            </h4>
            <nav class="space-y-2">
              <a
                v-for="link in quickLinks"
                :key="link.href"
                :href="link.href"
                class="block text-content-secondary text-sm hover:text-accent transition-colors duration-200"
                @click.prevent="scrollToSection(link.href)"
              >
                {{ link.label }}
              </a>
            </nav>
          </div>

          <!-- Social -->
          <div>
            <h4 class="font-semibold text-content-primary text-sm mb-4">
              Suivez-moi
            </h4>
            <div class="flex gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.href"
                :href="social.href"
                :aria-label="social.label"
                target="_blank"
                rel="noopener noreferrer"
                class="text-content-secondary hover:text-accent transition-colors duration-200"
              >
                <Icon :name="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Separator -->
      <hr class="border-border my-8" />

      <!-- Bottom Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-content-muted text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Natalie Simon</p>
        <!--<NuxtLink
          to="/mentions-legales"
          class="hover:text-accent transition-colors duration-200"
        >
          Mentions légales
        </NuxtLink>-->
      </div>
    </div>
  </footer>
</template>
