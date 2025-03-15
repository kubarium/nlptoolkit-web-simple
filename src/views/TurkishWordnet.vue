<script setup>
import SearchForm from "@/components/SearchForm.vue"
import SearchResultsCounter from "@/components/SearchResultsCounter.vue"
import turkishWordNet from "@/data/turkish/turkish-wordnet.json"
import turkishWordNet1901 from "@/data/turkish/turkish-wordnet-1901.json"
import turkishWordNet1944 from "@/data/turkish/turkish-wordnet-1944.json"
import turkishWordNet1955 from "@/data/turkish/turkish-wordnet-1955.json"
import turkishWordNet1959 from "@/data/turkish/turkish-wordnet-1959.json"
import turkishWordNet1966 from "@/data/turkish/turkish-wordnet-1966.json"
import turkishWordNet1969 from "@/data/turkish/turkish-wordnet-1969.json"
import turkishWordNet1974 from "@/data/turkish/turkish-wordnet-1974.json"
import turkishWordNet1983 from "@/data/turkish/turkish-wordnet-1983.json"
import turkishWordNet1988 from "@/data/turkish/turkish-wordnet-1988.json"
import turkishWordNet1998 from "@/data/turkish/turkish-wordnet-1998.json"
import { reactive, ref } from "vue"
import * as utils from "@/utils/nlp"
import { scrollToTop } from "@/utils/scrollToTop"

defineOptions({ meta: { language: "Turkish", toolkit: "WordNet" } })

const turkishWordNets = {
  1901: turkishWordNet1901,
  1944: turkishWordNet1944,
  1955: turkishWordNet1955,
  1959: turkishWordNet1959,
  1966: turkishWordNet1966,
  1969: turkishWordNet1969,
  1974: turkishWordNet1974,
  1983: turkishWordNet1983,
  1988: turkishWordNet1988,
  1998: turkishWordNet1998,
  2020: turkishWordNet
}

const years = [2020, 1998, 1988, 1983, 1974, 1969, 1966, 1959, 1955, 1944, 1901]

const searchTerms = reactive({
  word: "", synonym: "", id: ""
})
const search = ref("")
const searchResults = ref({})

function findWord(word) {
  search.value = word
  searchTerms.word = ""
  Object.entries(turkishWordNets).forEach(([year]) => {
    searchResults.value[year] = utils.getSynsetsWithWord(search.value, turkishWordNets[year])
  })
  scrollToTop()
}
function findSynonym(synonym) {
  search.value = synonym
  searchTerms.synonym = ""
  Object.entries(turkishWordNets).forEach(([year]) => {
    searchResults.value[year] = utils.getSynsetsWithWord(search.value, turkishWordNets[year])
  })
  scrollToTop()
}
function findSynSetID(id) {
  search.value = id
  searchTerms.id = ""
  Object.entries(turkishWordNets).forEach(([year]) => {
    searchResults.value[year] = [utils.searchInWordnet(search.value, turkishWordNets[year])]
  })
  scrollToTop()
}

</script>

<template>
  <header class="uk-flex uk-flex-around uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="findWord(searchTerms.word)" v-model="searchTerms.word">Word</SearchForm>
    <SearchForm @submit.prevent="findSynonym(searchTerms.synonym)" v-model="searchTerms.synonym">Synonym</SearchForm>
    <SearchForm @submit.prevent="findSynSetID(searchTerms.id)" v-model="searchTerms.id">SynSet Id</SearchForm>
  </header>
  <template v-if="search">
    <ul class="uk-child-width-expand" uk-tab>
      <li v-for="year in years" :key="year">
        <a href>{{ year }}</a>
      </li>
    </ul>
    <div class="uk-switcher">
      <div v-for="year in years" :key="year">
        <SearchResultsCounter :searchResults="searchResults[year].length" :for="search" />
        <table class="uk-table uk-table-striped uk-table-hover uk-table-small" v-if="searchResults[year].length">
          <thead>
            <tr>
              <th class="uk-width-1-5">Id</th>
              <th class="uk-width-1-5">Pos</th>
              <th class="uk-width-2-5">Definition</th>
              <th class="uk-width-1-5">Synonyms</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in searchResults[year]" :key="result.id">
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

      </div>
    </div>
  </template>
</template>
