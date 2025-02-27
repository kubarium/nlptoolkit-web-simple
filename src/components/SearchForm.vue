<script setup>
const model = defineModel()
</script>

<template>
  <form>
    <fieldset class="uk-flex">
      <legend><slot></slot></legend>
      <input class="uk-input" type="text" required v-model="model" />
      <button class="uk-button uk-button-primary" type="submit">Find</button>
    </fieldset>
  </form>
</template>
