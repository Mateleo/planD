<script setup lang="ts">
const props = withDefaults(defineProps<{ id?: number; dateRange?: any }>(), {
  id: 1,
  dateRange: [],
});
</script>

<template>
  <main
    :class="
      props.dateRange?.includes(props.id) ? 'bg-blue-700' : '',
      props.id == props.dateRange[0] ? 'rounded-l-full' : '',
      props.id == props.dateRange[props.dateRange.length-1] ? 'rounded-r-full' : ''
    "
    class="w-full h-full"
  ></main>
</template>

<style scoped>
</style>
