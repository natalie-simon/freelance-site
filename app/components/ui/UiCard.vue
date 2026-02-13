<script setup lang="ts">
interface Props {
  variant?: 'default' | 'accent-border'
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hover: false,
})

const borderClasses = {
  default: 'border-border hover:border-border-hover',
  'accent-border': 'border-accent',
}
</script>

<template>
  <div
    :class="[
      'bg-base-800 border rounded-lg p-6',
      'transition-colors duration-200',
      borderClasses[variant],
      hover && 'hover:border-accent',
    ]"
  >
    <slot />
  </div>
</template>
