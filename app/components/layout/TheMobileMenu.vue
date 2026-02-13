<script setup lang="ts">
interface NavLink {
  label: string
  href: string
}

interface Props {
  isOpen: boolean
  navLinks: NavLink[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  navigate: [href: string]
}>()

// Focus trap and keyboard handling
const menuRef = ref<HTMLElement | null>(null)

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeydown)
      nextTick(() => {
        menuRef.value?.focus()
      })
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeydown)
    }
  }
)

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 md:hidden"
        aria-modal="true"
        role="dialog"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-base-950/80 backdrop-blur-sm"
          @click="emit('close')"
        />

        <!-- Menu Panel -->
        <Transition name="slide">
          <div
            v-if="isOpen"
            ref="menuRef"
            tabindex="-1"
            class="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-base-950 flex flex-col"
          >
            <!-- Close Button -->
            <div class="flex justify-end p-6">
              <button
                class="p-2 text-content-primary hover:text-accent transition-colors duration-200"
                aria-label="Fermer le menu"
                @click="emit('close')"
              >
                <Icon name="lucide:x" class="w-6 h-6" />
              </button>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-1 flex flex-col items-center justify-center space-y-8">
              <a
                v-for="link in navLinks"
                :key="link.href"
                :href="link.href"
                class="text-2xl text-content-primary hover:text-accent transition-colors duration-200"
                @click.prevent="emit('navigate', link.href)"
              >
                {{ link.label }}
              </a>
            </nav>

            <!-- CTA Button -->
            <div class="p-6">
              <button
                class="w-full bg-accent text-base-950 font-semibold px-6 py-3 rounded-lg hover:bg-accent-light transition-colors duration-200"
                @click="emit('navigate', '#contact')"
              >
                Me contacter
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
