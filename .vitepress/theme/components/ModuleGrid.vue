<script setup>
import ModuleCard from './ModuleCard.vue'

defineProps({
  modules: { type: Array, required: true }
})
</script>

<template>
  <div class="module-grid">
    <ModuleCard
      v-for="mod in modules"
      :key="mod.slug"
      :name="mod.name"
      :slug="mod.slug"
      :summary="mod.summary"
      :install="mod.install"
      :tags="mod.tags"
    />
  </div>
</template>

<style scoped>
.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin: 24px 0 48px;
}
</style>
