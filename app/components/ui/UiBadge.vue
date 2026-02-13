<script setup lang="ts">
interface Props {
  variant?: 'tech' | 'status' | 'accent'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'tech',
})

const variantClasses = {
  tech: 'bg-base-700 text-content-secondary font-mono text-xs',
  status: 'bg-base-700 text-content-secondary font-sans text-sm',
  accent: 'bg-base-800 text-accent border border-accent font-mono text-xs',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full',
      variantClasses[variant],
    ]"
  >
    <slot />
  </span>
</template>
