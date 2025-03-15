<script setup>
import SearchForm from '@/components/SearchForm.vue'
import TurkishNamedEntityRecognition from "@/data/turkish/turkish-ner.json"
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "Turkish", toolkit: "Named Entity Recognition" } })
const searchTerms = reactive({
  sentence: ""
})
const search = ref("")
const searchResult = ref("")

function recognized(sentence) {
  search.value = sentence
  searchTerms.sentence = sentence

  searchResult.value = sentence.split(" ").map(word => TurkishNamedEntityRecognition[word] || "")
}

</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="recognized(searchTerms.sentence)" v-model="searchTerms.sentence"
      button-label="Recognize">Sentence
    </SearchForm>
  </header>
  <div class="uk-margin uk-text-center uk-h3" v-if="search">
    <div class="uk-text-muted">Recognized entries for</div>
    <div class="uk-margin-small">{{ search }} </div>
    <div class="uk-text-muted">is</div>
    <template v-for="(word, index) in search.split(' ')" :key="word">
      <hr v-if="index != 0">
      <dl class="uk-description-list">
        <dt>{{ word }}</dt>
        <dd v-if="searchResult[index]">{{ searchResult[index] }} </dd>
        <dd v-else><span class="uk-label uk-label-danger">NONE</span></dd>
      </dl>
    </template>
  </div>
</template>
