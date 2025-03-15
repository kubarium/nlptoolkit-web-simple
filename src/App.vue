<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main class="main uk-container" uk-height-viewport="expand: true">
    <RouterView />
  </main>
</template>

<style scoped></style>
