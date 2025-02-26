<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main class="main uk-container" uk-height-viewport="expand: true">
    <!-- <iframe src="" class="uk-width-1-1" /> -->
    <RouterView />
  </main>
</template>

<style scoped></style>
