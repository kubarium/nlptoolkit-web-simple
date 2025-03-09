<script setup>
import SearchForm from '@/components/SearchForm.vue'
import SearchResultsCounter from '@/components/SearchResultsCounter.vue'
import turkishFrameNet from "@/data/turkish/turkish-framenet.json"
import turkishPropbank from "@/data/turkish/turkish-propbank.json"
import turkishWordNet from "@/data/turkish/turkish-wordnet.json"
import { getFramesForSynSet, getPropsForSynSets, getSynsetsWithWord, searchInWordnet } from '@/utils/nlp'
import { scrollToTop } from '@/utils/scrollToTop'
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "Turkish", toolkit: "PropBank" } })
const searchTerms = reactive({
  frame: "", verb: "", id: ""
})
const search = ref("")
const searchResults = ref([])



function findVerb(word) {
  search.value = word
  searchTerms.verb = ""
  // searchResults.value = getSynsetsWithWord(word, turkishWordNet)
  searchResults.value = getPropsForSynSets(getSynsetsWithWord(word, turkishWordNet), turkishPropbank)
  scrollToTop()
}
function findSynSetID(word) {
  search.value = word
  searchTerms.id = ""
  searchResults.value = getFramesForSynSet(word, turkishPropbank)
  scrollToTop()
}
</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="findVerb(searchTerms.verb)" v-model="searchTerms.verb">Verb</SearchForm>
    <SearchForm @submit.prevent="findSynSetID(searchTerms.id)" v-model="searchTerms.id">Verb SynSet Id</SearchForm>
  </header>
  <template v-if="search">
    <SearchResultsCounter :searchResults="searchResults" :for="search" />
  </template>
  <table class="uk-table uk-table-striped uk-table-hover uk-table-small" v-if="searchResults.length > 0">
    <thead>
      <tr>
        <th class="uk-width-1-5">Id</th>
        <th class="uk-width-2-5">Definition</th>
        <th class="uk-width-1-5">Arg</th>
        <th class="uk-width-1-5">Function</th>
        <th class="uk-width-1-5">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="unit in searchResults" :key="unit">
        <td> <a @click="findSynSetID(unit.id)"> {{ unit.id }} </a> </td>
        <td> {{ unit["definition"] }} </td>
        <td>
          <!-- <template v-for="(word, index) in searchInWordnet(unit, turkishWordNet)['words']" :key="word">
            <span v-if="index > 0">; </span>
            <a @click="findVerb(word)">{{ word }}</a>
          </template> -->
          {{ unit["arg"] }}
        </td>
        <td> {{ unit["function"] }} </td>
        <td> {{ unit["description"] }} </td>
      </tr>
    </tbody>
  </table>
</template>

<style></style>
