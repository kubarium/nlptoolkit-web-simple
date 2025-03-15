<script setup>
import SearchForm from '@/components/SearchForm.vue'
import englishTags from "@/data/english/english-tags.json"
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "English", toolkit: "Pos Tagger" } })
const searchTerms = reactive({
  tag: ""
})
const search = ref("")
const searchResult = ref("")

function findTags(tag) {
  search.value = tag
  searchTerms.tag = ""
  searchResult.value = englishTags[tag]?.split("\t") || []
}
</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="findTags(searchTerms.tag)" v-model="searchTerms.tag">Tag</SearchForm>
  </header>
  <div class="uk-margin uk-text-center">
    <h2 class="uk-h3 uk-text-muted" v-if="searchResult">
      Tags for {{ search }}
    </h2>
    <template v-for="(result, index) in searchResult" :key="index">
      <span class="uk-label uk-margin-small-right">{{ result }}</span>
    </template>
    <span class="uk-label uk-label-danger" v-if="searchResult.length == 0">UNK</span>
  </div>
</template>
