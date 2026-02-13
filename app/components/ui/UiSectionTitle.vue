<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  accent?: boolean
  level?: 'h1' | 'h2' | 'h3'
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: undefined,
  accent: false,
  level: 'h2',
})

const headingClasses = {
  h1: 'text-4xl lg:text-5xl',
  h2: 'text-3xl lg:text-4xl',
  h3: 'text-2xl lg:text-3xl',
}
</script>

<template>
  <div class="mb-12">
    <!-- Ligne décorative avec accent -->
    <div v-if="accent" class="w-12 h-1 bg-accent mb-4" />

    <!-- Titre principal -->
    <component
      :is="level"
      :class="[
        'font-bold text-content-primary mb-3',
        headingClasses[level],
      ]"
    >
      {{ title }}
    </component>

    <!-- Sous-titre optionnel -->
    <p v-if="subtitle" class="text-lg text-content-secondary max-w-2xl">
      {{ subtitle }}
    </p>
  </div>
</template>
