<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TurkishMorphologicalAnalysis from "@/data/turkish/turkish-morphological-analysis.json"
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "Turkish", toolkit: "Morphological Analysis" } })
const searchTerms = reactive({
  sentence: ""
})
const search = ref("")
const searchResult = ref("")

function analyze(sentence) {
  search.value = sentence
  searchTerms.sentence = sentence

  searchResult.value = sentence.toLowerCase().split(" ").map(word => TurkishMorphologicalAnalysis[word] || [])
}

</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="analyze(searchTerms.sentence)" v-model="searchTerms.sentence"
      button-label="Morphologically Analyze">Sentence
    </SearchForm>
  </header>
  <div class="uk-margin uk-text-center uk-h3" v-if="search">
    <div class="uk-text-muted">Morphological Analysis of</div>
    <div class="uk-margin-small">{{ search }} </div>
    <div class="uk-text-muted">is</div>
    <template v-for="(word, index) in search.split(' ')" :key="word">
      <hr v-if="index != 0">
      <dl class="uk-description-list">
        <dt>{{ word }}</dt>
        <dd v-for="(analysis) in searchResult[index]" :key="analysis">
          <template v-for="(chunk, index) in analysis.split('+')" :key="index">
            <span v-if="index != 0">+</span>
            <span class="uk-label" :class="{ 'uk-label-warning': index == 0 }">
              {{ chunk }}
            </span>
          </template>
        </dd>
        <dd v-if="searchResult[index].length == 0"><span class="uk-label uk-label-danger">UNK</span></dd>
      </dl>
    </template>
  </div>
</template>
