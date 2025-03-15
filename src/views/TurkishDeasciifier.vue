<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TurkishDeasciifier from "@/data/turkish/turkish-deasciified.json"
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "Turkish", toolkit: "Deasciifier" } })
const searchTerms = reactive({
  sentence: ""
})
const search = ref("")
const searchResult = ref("")

function asciify(sentence) {
  search.value = sentence
  searchTerms.sentence = sentence

  searchResult.value = sentence.split(" ").map(word => TurkishDeasciifier[word] || "")
}

</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="asciify(searchTerms.sentence)" v-model="searchTerms.sentence" button-label="Asciify">
      Sentence
    </SearchForm>
  </header>
  <div class="uk-margin uk-text-center uk-h3" v-if="search">
    <div class="uk-text-muted">Deasciified version of</div>
    <div class="uk-margin-small">{{ search }} </div>
    <div class="uk-text-muted">is</div>
    <div>{{ searchResult.join(" ") }}</div>
  </div>
</template>
