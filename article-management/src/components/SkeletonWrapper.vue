<template>
  <el-skeleton>
    <template #template>
      <el-skeleton-item :variant="props.variant"/>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>
<script setup lang="ts">
  const props = defineProps(['variant'])
</script>
<style scoped lang="scss"></style>