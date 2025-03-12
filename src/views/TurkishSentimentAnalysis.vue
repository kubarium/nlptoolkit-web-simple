<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TurkishSentimentAnalysis from "@/data/turkish/turkish-sentiment-analysis.json"
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "Turkish", toolkit: "Sentiment Analysis" } })
const searchTerms = reactive({
  sentence: ""
})
const search = ref("")
const searchResult = ref("")

function analyze(sentence) {
  search.value = sentence
  searchTerms.sentence = sentence

  searchResult.value = sentence.split(" ").map(word => TurkishSentimentAnalysis[word] || "NEUTRAL")
}

</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="analyze(searchTerms.sentence)" v-model="searchTerms.sentence" button-label="Analyze">
      Sentence
    </SearchForm>
  </header>
  <div class="uk-margin uk-text-center uk-h3" v-if="search">
    <div class="uk-text-muted">The sentiment analysis of</div>
    <div class="uk-margin-small">{{ search }} </div>
    <div class="uk-text-muted">is</div>
    <template v-for="(word, index) in search.split(' ')" :key="word">
      <span v-if="index > 0"> / </span>
      <span class="uk-text-muted uk-margin-small-right">{{ word }}</span>
      <span class="uk-label"
        :class="{ 'uk-label-success': searchResult[index] == 'POSITIVE', 'uk-label-danger': searchResult[index] == 'NEGATIVE' }">
        {{ searchResult[index] }}
      </span>
    </template>
  </div>
</template>
