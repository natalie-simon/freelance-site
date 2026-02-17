<script setup lang="ts">
// --- Types & State ---
interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const form = reactive<FormData>({
  name: '',
  email: '',
  message: '',
})

const errors = reactive<FormErrors>({})
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMessage = ref('')

// --- Validation ---
function validateField(field: keyof FormData): boolean {
  switch (field) {
    case 'name':
      if (form.name.trim().length < 2) {
        errors.name = 'Le nom doit contenir au moins 2 caractères.'
        return false
      }
      errors.name = undefined
      return true

    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email)) {
        errors.email = 'Veuillez saisir un email valide.'
        return false
      }
      errors.email = undefined
      return true
    }

    case 'message':
      if (form.message.trim().length < 10) {
        errors.message = 'Le message doit contenir au moins 10 caractères.'
        return false
      }
      errors.message = undefined
      return true
  }
}

function validateAll(): boolean {
  const nameValid = validateField('name')
  const emailValid = validateField('email')
  const messageValid = validateField('message')
  return nameValid && emailValid && messageValid
}

// --- Submit ---
async function handleSubmit() {
  if (!validateAll()) return

  status.value = 'sending'
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      },
    })

    status.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch {
    status.value = 'error'
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.'
  }
}

// --- Contact info ---
interface ContactInfo {
  icon: string
  label: string
  href?: string
  external?: boolean
}

const contactItems: ContactInfo[] = [
  {
    icon: 'lucide:mail',
    label: 'natalie.simon2201@gmail.com',
    href: 'mailto:natalie.simon2201@gmail.com',
  },
  {
    icon: 'lucide:phone',
    label: '07 49 63 49 23',
    href: 'tel:+33749634923',
  },
  {
    icon: 'lucide:linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/natalie-simon',
    external: true,
  },
]

// --- Animations ---
const leftColRef = ref<HTMLElement | null>(null)
const rightColRef = ref<HTMLElement | null>(null)
const leftVisible = ref(false)
const rightVisible = ref(false)

onMounted(() => {
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
  <section id="contact" class="bg-base-950 py-20 lg:py-32">
    <div class="container-narrow section-padding">
      <!-- Titre de section -->
      <UiSectionTitle
        title="Parlons de votre projet"
        subtitle="Un besoin backend ? Un projet à reprendre ? Contactez-moi."
        accent
      />

      <!-- Layout 2 colonnes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <!-- Colonne gauche: Formulaire -->
        <div
          ref="leftColRef"
          :class="[leftVisible && 'animate-fade-up']"
        >
          <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
            <!-- Nom -->
            <div>
              <label for="contact-name" class="block text-sm font-medium text-content-primary mb-1.5">
                Nom *
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                placeholder="Votre nom"
                class="w-full bg-base-800 border border-border rounded-lg px-4 py-3 text-content-primary placeholder:text-content-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                :class="{ 'border-red-500': errors.name }"
                @blur="validateField('name')"
              />
              <p v-if="errors.name" class="mt-1.5 text-sm text-red-400">
                {{ errors.name }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label for="contact-email" class="block text-sm font-medium text-content-primary mb-1.5">
                Email *
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                placeholder="votre@email.com"
                class="w-full bg-base-800 border border-border rounded-lg px-4 py-3 text-content-primary placeholder:text-content-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                :class="{ 'border-red-500': errors.email }"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" class="mt-1.5 text-sm text-red-400">
                {{ errors.email }}
              </p>
            </div>

            <!-- Message -->
            <div>
              <label for="contact-message" class="block text-sm font-medium text-content-primary mb-1.5">
                Message *
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                placeholder="Décrivez votre projet ou besoin..."
                class="w-full bg-base-800 border border-border rounded-lg px-4 py-3 text-content-primary placeholder:text-content-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-y"
                :class="{ 'border-red-500': errors.message }"
                style="min-height: 150px"
                @blur="validateField('message')"
              />
              <p v-if="errors.message" class="mt-1.5 text-sm text-red-400">
                {{ errors.message }}
              </p>
            </div>

            <!-- Bouton submit -->
            <UiButton
              variant="primary"
              type="submit"
              :disabled="status === 'sending'"
              class="w-full"
            >
              {{ status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message' }}
            </UiButton>

            <!-- Message succès -->
            <p v-if="status === 'success'" class="text-sm text-green-400 text-center">
              ✓ Message envoyé ! Je vous réponds sous 48h.
            </p>

            <!-- Message erreur -->
            <p v-if="status === 'error'" class="text-sm text-red-400 text-center">
              {{ errorMessage }}
            </p>
          </form>
        </div>

        <!-- Colonne droite: Infos de contact -->
        <div
          ref="rightColRef"
          :class="[rightVisible && 'animate-fade-up']"
        >
          <div class="bg-base-800 rounded-xl p-8 space-y-8">
            <!-- Contact direct -->
            <div>
              <h3 class="text-lg font-semibold text-content-primary mb-4">
                Contact direct
              </h3>
              <div class="space-y-3">
                <a
                  v-for="item in contactItems"
                  :key="item.label"
                  :href="item.href"
                  :target="item.external ? '_blank' : undefined"
                  :rel="item.external ? 'noopener noreferrer' : undefined"
                  class="flex items-center gap-3 text-content-secondary hover:text-accent transition-colors"
                >
                  <Icon :name="item.icon" class="w-5 h-5 text-accent flex-shrink-0" />
                  <span class="text-sm">{{ item.label }}</span>
                </a>
              </div>
            </div>

            <!-- Prise de RDV -->
            <div>
              <h3 class="text-lg font-semibold text-content-primary mb-4">
                Prendre rendez-vous
              </h3>
              <UiButton
                variant="secondary"
                as="a"
                href="https://cal.com/natalie-simon"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2"
              >
                <Icon name="lucide:calendar" class="w-4 h-4" />
                Réserver un créneau
              </UiButton>
            </div>

            <!-- Disponibilité -->
            <div class="flex items-start gap-3">
              <Icon name="lucide:clock" class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p class="text-sm text-content-secondary leading-relaxed">
                Soirs &amp; week-ends · Réponse sous 48h · Démarrage rapide
              </p>
            </div>
          </div>
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
