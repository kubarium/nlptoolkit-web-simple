<script setup>
import SearchForm from '@/components/SearchForm.vue'
import turkishSentiNet from "@/data/turkish/turkish-sentinet.json"
import turkishSentiLiteralNet from "@/data/turkish/turkish-sentiliteralnet.json"
import { reactive, ref, watch } from 'vue'

defineOptions({ meta: { language: "Turkish", toolkit: "SentiNet" } })
const searchTerms = reactive({
  word: "", id: ""
})
const search = ref("")
let searchResult = ref([])

const sentimentScore = ref(0)
const sentiment = ref("")

watch(searchResult, (newResult, oldResult) => {
  if (searchResult.value[0]?.pscore > 0) {
    sentimentScore.value = newResult[0]?.pscore
    sentiment.value = `positive with score ${newResult[0]?.pscore}`
  }
  else if (searchResult.value[0]?.nscore > 0) {
    sentimentScore.value = -searchResult.value[0]?.nscore
    sentiment.value = `negative with score -${newResult[0]?.nscore}`
  }
  else {
    sentimentScore.value = 0
    sentiment.value = `neutral`
  }
}, { deep: true })

function findWord(word) {
  search.value = word
  searchTerms.word = ""
  searchResult.value = turkishSentiLiteralNet.filter(sentiNetObject => sentiNetObject["word"] === word) || null
}
function findSynSetID(id) {
  search.value = id
  searchTerms.id = ""
  searchResult.value = turkishSentiNet.filter(sentiNetObject => sentiNetObject["id"] === id) || null
}
</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="findWord(searchTerms.word)" v-model="searchTerms.word">Word</SearchForm>
    <SearchForm @submit.prevent="findSynSetID(searchTerms.id)" v-model="searchTerms.id">SynSet Id</SearchForm>
  </header>
  <div v-if="searchResult.length" class="uk-margin uk-text-center">
    <h2 class="uk-h3 uk-text-muted">
      Sentiment for {{ search }} is {{ sentiment }}
    </h2>
    <div></div>
  </div>
  <div class="uk-flex uk-flex-around uk-flex-middle uk-margin" uk-grid v-if="searchResult.length">
    <div class="uk-text-danger uk-margin-xsmall-right uk-text-bold">-1.0</div>
    <div class="uk-width-expand">
      <form>
        <input disabled class="uk-range" type="range" :value="sentimentScore" min="-1.0" max="1.0" step="0.001" />
      </form>
    </div>
    <div class="uk-text-success uk-margin-xsmall-left uk-text-bold">1.0</div>
  </div>
</template>
