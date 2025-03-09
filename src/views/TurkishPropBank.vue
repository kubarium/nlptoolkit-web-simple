<script setup>
import SearchForm from '@/components/SearchForm.vue'
import SearchResultsCounter from '@/components/SearchResultsCounter.vue'
import turkishPropbank from "@/data/turkish/turkish-propbank.json"
import turkishWordNet from "@/data/turkish/turkish-wordnet.json"
import { getPropsForSynSets, getSynsetsWithWord } from '@/utils/nlp'
import { scrollToTop } from '@/utils/scrollToTop'
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "Turkish", toolkit: "PropBank" } })
const searchTerms = reactive({
  frame: "", verb: "", id: ""
})
const search = ref("")
const searchResults = ref()



function findVerb(word) {
  search.value = word
  searchTerms.verb = ""
  searchResults.value = getPropsForSynSets(getSynsetsWithWord(word, turkishWordNet), turkishPropbank)
  scrollToTop()
}
function findSynSetID(id) {
  search.value = id
  searchTerms.id = ""
  let synSet = turkishPropbank.find(entry => entry.id == id)
  if(synSet) {
    searchResults.value = {
      [id]: {
        definition: "",
        args: synSet.args
      }
    }
  } else {
    searchResults.value = []
  }
  scrollToTop()
}
</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="findVerb(searchTerms.verb)" v-model="searchTerms.verb">Verb</SearchForm>
    <SearchForm @submit.prevent="findSynSetID(searchTerms.id)" v-model="searchTerms.id">Verb SynSet Id</SearchForm>
  </header>
  <template v-if="search">
    <SearchResultsCounter :searchResults="Object.entries(searchResults).length" :for="search" />
  </template>
  <ul uk-accordion>
    <li v-for="(result, id, index) of searchResults" :key="id">
      <a class="uk-accordion-title" href>{{ index + 1 }}. {{ id }}</a>
      <div class="uk-accordion-content">
        <div uk-grid v-if="result.definition">
          <div class="uk-width-2-3">
            <h2 class="uk-h3 uk-text-muted">
              {{ result["definition"] }}
            </h2>
          </div>
          <div class="uk-width-1-3 uk-divider-vertical">
            <button class="uk-button uk-button-secondary uk-width-1-1 uk-height-1-1"
              @click="findSynSetID(id)">Look
              up {{ id }}</button>
          </div>
        </div>
        <table class="uk-table uk-table-striped uk-table-hover uk-table-small" v-if="result.args">
          <thead>
            <tr>
              <th class="uk-width-1-5">Arg</th>
              <th class="uk-width-1-5">Function</th>
              <th class="uk-width-3-5">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="unit in result.args" :key="unit">
              <td> {{ unit["arg"] }} </td>
              <td> {{ unit["function"] }} </td>
              <td> {{ unit["description"] }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
  </ul>

</template>

<style></style>
