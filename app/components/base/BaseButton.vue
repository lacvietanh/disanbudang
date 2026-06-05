<template>
  <component
    :is="tag"
    :class="[
      'btn',
      variantClasses,
      sizeClasses,
      { 'opacity-60 pointer-events-none': disabled },
      { 'animate-pulse': loading },
    ]"
    :disabled="tag === 'button' && (disabled || loading)"
    v-bind="$attrs"
  >
    <Icon v-if="loading" name="mdi:loading" class="w-4 h-4 animate-spin" />
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'outline-gold'
  size?: 'sm' | 'md' | 'lg'
  tag?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  tag: 'button',
  disabled: false,
  loading: false,
})

const variantClasses = computed(() => ({
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  dark: 'btn-dark',
  'outline-gold': 'btn-outline-gold',
})[props.variant])

const sizeClasses = computed(() => ({
  sm: '!px-4 !py-2 !text-xs',
  md: '',
  lg: '!px-8 !py-4 !text-base',
})[props.size])
</script>
