<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TurkishMorphologicalLexicon from "@/data/turkish/turkish-morphological-lexicon.json"
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "Turkish", toolkit: "Morphological Lexicon" } })
const searchTerms = reactive({
  word: ""
})
const search = ref("")
const searchResult = ref("")

function findWord(word) {
  search.value = word
  searchTerms.word = ""

  if (TurkishMorphologicalLexicon[word])
    searchResult.value = TurkishMorphologicalLexicon[word].replace(/\+/g, `<strong> + </strong>`)
  else searchResult.value = word
}

</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="findWord(searchTerms.word)" v-model="searchTerms.word">Morphology</SearchForm>
  </header>
  <div class="uk-margin uk-text-center" v-if="search">
    <h2 class="uk-h3 uk-text-muted">Morphology for {{ search }} is <span v-html="searchResult"></span> </h2>
  </div>
</template>
