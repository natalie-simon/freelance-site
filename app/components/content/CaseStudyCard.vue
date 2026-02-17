<script setup lang="ts">
interface Props {
  title: string
  context: string
  problem: string
  approach: string
  result: string
  stack: string[]
}

defineProps<Props>()
</script>

<template>
  <UiCard class="flex flex-col gap-5">
    <!-- Context -->
    <div class="flex items-center gap-2 text-content-muted text-sm">
      <Icon name="lucide:folder-open" class="w-4 h-4 flex-shrink-0" />
      <span>{{ context }}</span>
    </div>

    <!-- Titre -->
    <h3 class="text-xl font-semibold text-content-primary leading-snug">
      {{ title }}
    </h3>

    <!-- Problème -->
    <div>
      <p class="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
        Problème
      </p>
      <p class="text-content-secondary text-sm leading-relaxed">
        {{ problem }}
      </p>
    </div>

    <!-- Approche -->
    <div>
      <p class="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
        Approche
      </p>
      <p class="text-content-secondary text-sm leading-relaxed">
        {{ approach }}
      </p>
    </div>

    <!-- Résultat -->
    <div>
      <p class="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
        Résultat
      </p>
      <p class="text-content-secondary text-sm leading-relaxed">
        {{ result }}
      </p>
    </div>

    <!-- Stack -->
    <div class="flex flex-wrap gap-2 pt-1">
      <UiBadge v-for="tag in stack" :key="tag">{{ tag }}</UiBadge>
    </div>
  </UiCard>
</template>
