<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TurkishWordSenseDisambiguation from "@/data/turkish/turkish-word-sense-disambiguation.json"
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "Turkish", toolkit: "Word Sense Disambiguation" } })
const searchTerms = reactive({
  sentence: ""
})
const search = ref("")
const searchResult = ref("")

function disambiguate(sentence) {
  search.value = sentence
  searchTerms.sentence = sentence

  const TWSD = Object.entries(TurkishWordSenseDisambiguation)
  searchResult.value = sentence.split(" ").map(word => {
    const disambiguation = TWSD.filter(entry => entry[1].includes(word))
    return { [word]: disambiguation.length ? disambiguation[0][0] : "" }
  })
}

</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="disambiguate(searchTerms.sentence)" v-model="searchTerms.sentence"
      button-label="Disambiguate">Sentence
    </SearchForm>
  </header>
  <div class="uk-margin uk-text-center uk-h3" v-if="search">
    <div class="uk-text-muted">The disambiguated version of</div>
    <div class="uk-margin-small">{{ search }} </div>
    <div class="uk-text-muted">is</div>
    <template v-for="(word, index) in search.split(' ')" :key="word">
      <hr v-if="index != 0">
      <dl class="uk-description-list">
        <dt>{{ word }}</dt>
        <dd v-if="searchResult[index][word]">{{ searchResult[index][word] }} </dd>
        <dd v-else><span class="uk-label uk-label-danger">UNK</span></dd>
      </dl>
    </template>
  </div>
</template>
