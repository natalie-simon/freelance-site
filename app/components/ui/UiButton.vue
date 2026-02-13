<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  as?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  as: 'button',
  disabled: false,
})

const variantClasses = {
  primary: 'bg-accent hover:bg-accent-dark text-base-950 font-medium',
  secondary: 'bg-base-800 hover:bg-base-700 text-content-primary border border-border hover:border-border-hover',
  ghost: 'bg-transparent hover:bg-base-800 text-content-primary',
}
</script>

<template>
  <component
    :is="as"
    :disabled="disabled"
    :class="[
      'px-6 py-3 rounded-lg transition-colors duration-200',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[variant],
    ]"
  >
    <slot />
  </component>
</template>
