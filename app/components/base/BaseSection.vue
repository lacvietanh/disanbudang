<template>
  <section :class="['section', { 'section-sm': compact }]" v-bind="$attrs">
    <div :class="narrow ? 'container-narrow' : 'container-heritage'">
      <!-- Section header -->
      <div
        v-if="label || title || description"
        class="mb-12 lg:mb-16"
        :class="centered ? 'text-center' : ''"
      >
        <span v-if="label" class="section-label">{{ label }}</span>
        <h2 v-if="title" class="section-title">{{ title }}</h2>
        <p v-if="description" class="section-desc" :class="centered ? 'mx-auto' : ''">
          {{ description }}
        </p>
      </div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  title?: string
  description?: string
  centered?: boolean
  compact?: boolean
  narrow?: boolean
}>()
</script>
