<script setup>
import SearchForm from "@/components/SearchForm.vue"
import SearchResultsCounter from "@/components/SearchResultsCounter.vue"
import turkishFrameNet from "@/data/turkish/turkish-framenet.json"
import turkishWordNet from "@/data/turkish/turkish-wordnet.json"
import { reactive, ref } from "vue"
import * as utils from "@/utils/nlp"
import { scrollToTop } from "@/utils/scrollToTop"

defineOptions({ meta: { language: "Turkish", toolkit: "FrameNet" } })

const searchTerms = reactive({
  frame: "", verb: "", id: ""
})
const search = ref("")
const searchResults = ref([])

function findFrame(frame) {
  search.value = frame
  searchTerms.frame = ""
  const entry = turkishFrameNet.find(entry => entry.frame == frame)
  if (entry) {
    searchResults.value = [{
      frame,
      lexicalUnits: entry?.lexicalUnits,
      frameElements: entry?.frameElements
    }]
  }
  else searchResults.value = []
  scrollToTop()
}
function findVerb(word) {
  search.value = word
  searchTerms.verb = ""
  searchResults.value = utils.getFramesForSynSets(utils.getSynsetsWithWord(word, turkishWordNet), turkishFrameNet)
  scrollToTop()
}
function findSynSetID(id) {
  search.value = id
  searchTerms.id = ""
  searchResults.value = utils.getFramesForSynSet(id, turkishFrameNet)
  scrollToTop()
}

</script>

<template>
  <header class="uk-flex uk-flex-around uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="findFrame(searchTerms.frame)" v-model="searchTerms.frame">Frame Name</SearchForm>
    <SearchForm @submit.prevent="findVerb(searchTerms.verb)" v-model="searchTerms.verb">Verb</SearchForm>
    <SearchForm @submit.prevent="findSynSetID(searchTerms.id)" v-model="searchTerms.id">Verb SynSet Id</SearchForm>
  </header>
  <template v-if="search">
    <SearchResultsCounter :searchResults="searchResults.length" :for="search" />
  </template>
  <ul uk-accordion>
    <li v-for="(result, index) in searchResults" :key="index">
      <a class="uk-accordion-title" href>{{ index + 1 }}. {{ result.frame }}</a>
      <div class="uk-accordion-content">
        <h2 class="uk-h3 uk-text-muted">
          Frame Elements
          <hr />
        </h2>
        <div uk-grid>
          <div class="uk-width-2-3">
            <span class="uk-label uk-margin-xsmall-right" v-for="frame in result.frameElements" :key="frame">
              {{ frame }}
            </span>
          </div>
          <div class="uk-width-1-3 uk-divider-vertical">
            <button class="uk-button uk-button-secondary uk-width-1-1 uk-height-1-1" @click="findFrame(result.frame)">
              Look up {{ result.frame }}
            </button>
          </div>
        </div>
        <h2 class="uk-h3 uk-text-muted uk-margin-small">
          Lexical Units
          <hr />
        </h2>
        <table class="uk-table uk-table-striped uk-table-hover uk-table-small">
          <thead>
            <tr>
              <th class="uk-width-1-5">Id</th>
              <th class="uk-width-2-5">Words</th>
              <th class="uk-width-2-5">Definition</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="unit in result.lexicalUnits" :key="unit">
              <td> <a @click="findSynSetID(unit)"> {{ unit }} </a> </td>
              <td>
                <template v-for="(word, index) in utils.searchInWordnet(unit, turkishWordNet)['words']" :key="word">
                  <span v-if="index > 0">; </span>
                  <a @click="findVerb(word)">{{ word }}</a>
                </template>
              </td>
              <td> {{ utils.searchInWordnet(unit, turkishWordNet)["definition"] }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
  </ul>
</template>
