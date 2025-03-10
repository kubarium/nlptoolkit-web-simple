<script setup>
const model = defineModel()
const props = defineProps(["buttonLabel"])
</script>

<template>
  <form class="uk-width-expand" uk-margin>
    <fieldset class="uk-flex">
      <legend>
        <slot></slot>
      </legend>
      <input class="uk-input uk-width-expand" type="text" required v-model.trim="model" />
      <button class="uk-button uk-button-primary" type="submit">{{props.buttonLabel || "Find"}}</button>
    </fieldset>
  </form>
</template>
