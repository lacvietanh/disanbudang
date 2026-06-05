<template>
  <span :class="['tag', variantClass, sizeClass]">
    <Icon v-if="icon" :name="icon" class="w-3 h-3" />
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'gold' | 'earth' | 'forest' | 'brick' | 'copper' | 'glass'
  size?: 'sm' | 'md'
  icon?: string
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'gold',
  size: 'md',
})

const variantClass = computed(() => ({
  gold: 'tag-gold',
  earth: 'tag-earth',
  forest: 'tag-forest',
  brick: 'tag-brick',
  copper: 'bg-copper-500/15 text-copper-600 border border-copper-500/25',
  glass: 'glass text-charcoal-700 border-charcoal-200/40',
})[props.variant])

const sizeClass = computed(() => ({
  sm: '!px-2 !py-0.5 !text-2xs',
  md: '',
})[props.size])
</script>
