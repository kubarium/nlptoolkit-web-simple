<script setup>
import SearchForm from '@/components/SearchForm.vue'
import SearchResultsCounter from '@/components/SearchResultsCounter.vue'
import englishPropbank from "@/data/english/english-propbank.json"
import { scrollToTop } from '@/utils/scrollToTop'
import { reactive, ref } from 'vue'

defineOptions({ meta: { language: "English", toolkit: "PropBank" } })
const searchTerms = reactive({
  predicate: "", id: ""
})
const search = ref("")
const searchResults = ref([])

function findPredicate(predicate) {
  search.value = predicate
  searchTerms.predicate = ""
  searchResults.value = englishPropbank.find(entry => entry.lemma == predicate)?.rolesets || []
  scrollToTop()
}
function findRolesetID(id) {
  search.value = id
  searchTerms.id = ""
  const lemma = id.replace(RegExp(/\.\d+/), "")
  const predicate = englishPropbank.find(entry => entry.lemma == lemma)
  if (predicate) {
    const roleset = predicate.rolesets.find(entry => entry.id == id)
    searchResults.value = [{ id: id, name: roleset.name, roles: roleset.roles }]
  }
  else searchResults.value = []
  scrollToTop()
}
</script>

<template>
  <header class="uk-flex uk-flex-between uk-background-default" uk-sticky uk-grid>
    <SearchForm @submit.prevent="findPredicate(searchTerms.predicate)" v-model="searchTerms.predicate">Predicate
    </SearchForm>
    <SearchForm @submit.prevent="findRolesetID(searchTerms.id)" v-model="searchTerms.id">Roleset Id</SearchForm>
  </header>
  <template v-if="search">
    <SearchResultsCounter :searchResults="searchResults.length" :for="search" />
  </template>
  <ul uk-accordion>
    <li v-for="(roleset, index) of searchResults" :key="index">
      <a class="uk-accordion-title" href>{{ index + 1 }}. {{ roleset.id }}</a>
      <div class="uk-accordion-content">
        <div uk-grid v-if="roleset.name">
          <div class="uk-width-2-3">
            <h2 class="uk-h3 uk-text-muted">
              {{ roleset["name"] }}
            </h2>
          </div>
          <div class="uk-width-1-3 uk-divider-vertical">
            <button class="uk-button uk-button-secondary uk-width-1-1 uk-height-1-1" @click="findRolesetID(roleset.id)">
              Look up {{ roleset.id }}
            </button>
          </div>
        </div>
        <table class="uk-table uk-table-striped uk-table-hover uk-table-small">
          <thead>
            <tr>
              <th class="uk-width-2-4">Description</th>
              <th class="uk-width-1-4">f</th>
              <th class="uk-width-1-4">n</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(role, index) in roleset.roles" :key="`role-${index}`">
              <td> {{ role["descr"] }} </td>
              <td> {{ role["f"] }} </td>
              <td> {{ role["n"] }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
  </ul>
</template>
