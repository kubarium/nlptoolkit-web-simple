<script setup>
import SearchForm from "@/components/SearchForm.vue"
import SearchResultsCounter from "@/components/SearchResultsCounter.vue"
import EnglishWordNet from "@/data/english/english-wordnet.json"
import { reactive, ref } from "vue"
import * as utils from "@/utils/nlp"
import { scrollToTop } from "@/utils/scrollToTop"

defineOptions({ meta: { language: "English", toolkit: "WordNet" } })

const searchTerms = reactive({
  word: "", synonym: "", id: ""
})
const search = ref("")
const searchResults = ref({})

function findWord(word) {
  search.value = word
  searchTerms.word = ""
  searchResults.value = utils.getSynsetsWithWord(search.value, EnglishWordNet)

  scrollToTop()
}
function findSynonym(synonym) {
  search.value = synonym
  searchTerms.synonym = ""
  searchResults.value = utils.getSynsetsWithWord(search.value, EnglishWordNet)

  scrollToTop()
}
function findSynSetID(id) {
  search.value = id
  searchTerms.id = ""
  searchResults.value = [utils.searchInWordnet(search.value, EnglishWordNet)]

  scrollToTop()
}

</script>

<template>
  <header class="uk-flex uk-flex-around uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="findWord(searchTerms.word)" v-model="searchTerms.word">Word</SearchForm>
    <SearchForm @submit.prevent="findSynonym(searchTerms.synonym)" v-model="searchTerms.synonym">Synonym</SearchForm>
    <SearchForm @submit.prevent="findSynSetID(searchTerms.id)" v-model="searchTerms.id">SynSet Id</SearchForm>
  </header>
  <SearchResultsCounter :searchResults="searchResults.length" :for="search" v-if="search && searchResults" />
  <table class="uk-table uk-table-striped uk-table-hover uk-table-small" v-if="searchResults.length">
    <thead>
      <tr>
        <th class="uk-width-1-5">Id</th>
        <th class="uk-width-1-5">Pos</th>
        <th class="uk-width-2-5">Definition</th>
        <th class="uk-width-1-5">Synonyms</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in searchResults" :key="result.id">
        <td> <a @click="findSynSetID(result.id)"> {{ result.id }} </a> </td>
        <td> {{ result.pos }} </td>
        <td> {{ result.definition }} </td>
        <td>
          <template v-for="(word, index) in result.words.filter(word => word != search)" :key="word">
            <span v-if="index > 0">; </span>
            <a @click="findSynonym(word)">{{ word }}</a>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
