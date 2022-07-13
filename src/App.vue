<template>
  <h1>App</h1>
  <div>{{ count }}</div>
  <button @click="increament">increament</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0)

function increament() {
  count.value++
}
</script>

<style lang="less">
@import "./styles/common.less";
</style>