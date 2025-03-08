<script setup>
const props = defineProps({
  searchResults: Array,
  for: String
})
</script>

<template>
  <h2 class="uk-h3 uk-text-muted uk-text-center">
    {{ props.searchResults.length }} result{{ props.searchResults.length > 1 ? 's' : props.searchResults.length == 0 ?
      's' : '' }}
    for {{ props.for }}
  </h2>
  <hr class="uk-divider-icon" />
</template>
