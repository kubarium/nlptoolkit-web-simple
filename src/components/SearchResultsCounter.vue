<script setup>
const props = defineProps({
  searchResults: Number,
  for: String
})
</script>

<template>
  <h2 class="uk-h3 uk-text-muted uk-text-center">
    {{ props.searchResults }} result{{ props.searchResults > 1 ? 's' : props.searchResults == 0 ?
      's' : '' }}
    for {{ props.for }}
  </h2>
  <hr class="uk-divider-icon" />
</template>
