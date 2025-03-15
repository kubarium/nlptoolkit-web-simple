<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TurkishSpellChecker from "@/data/turkish/turkish-spell-dictionary.json"
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "Turkish", toolkit: "Spell Checker" } })
const searchTerms = reactive({
  sentence: ""
})
const search = ref("")
const searchResult = ref("")

function correctSentence(sentence) {
  search.value = sentence
  searchTerms.sentence = sentence

  searchResult.value = sentence.toLowerCase().split(" ").map(word => TurkishSpellChecker[word] || word).join(" ")
}

</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="correctSentence(searchTerms.sentence)" v-model="searchTerms.sentence"
      button-label="Spell Check">Spell Checker
    </SearchForm>
  </header>
  <div class="uk-margin uk-text-center uk-h3" v-if="search">
    <div class="uk-text-muted">The correct spelling for</div>
    <div class="uk-margin-small">{{ search }} </div>
    <div class="uk-text-muted">is</div>
    <div class="uk-margin-small" v-html="searchResult"></div>
  </div>
</template>
