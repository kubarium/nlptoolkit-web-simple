<script setup>
import turkishFrameNet from "@/data/turkish/turkish-framenet.json"
import turkishWordNet from "@/data/turkish/turkish-wordnet.json"
import { reactive, ref } from "vue"

defineOptions({ metaInfo: { language: "Turkish", toolkit: "FrameNet" } })

const searchTerms = reactive({
  frame: "", verb: "", id: ""
})
const searching = ref("")
const searchResults = ref([])


function findFrame(frame) {
  searching.value = frame
  searchTerms.frame = ""
  const entry = turkishFrameNet.find(entry => entry.frame == frame)
  searchResults.value = [{
    frame,
    lexicalUnits: entry?.lexicalUnits,
    frameElements: entry?.frameElements
  }]
  scrollToTop()
}
function findVerb(word) {
  searching.value = word
  searchTerms.verb = ""
  searchResults.value = getFramesForSynSets(getSynsetsWithWord(word, turkishWordNet))
  scrollToTop()
}
function findSynSetID(word) {
  searching.value = word
  searchTerms.id = ""
  searchResults.value = getFramesForSynSet(word)
  scrollToTop()
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
}

function getSynsetsWithWord(word, wordNet) {
  let result = []
  for (let i = 0; i < wordNet.length; i++) {
    let synset = wordNet[i];
    for (let j = 0; j < synset["words"].length; j++) {
      if (synset["words"][j] === word) {
        result.push(synset)
        break;
      }
    }
  }
  return result
}
function searchInWordnet(id, wordNet) {
  return wordNet.find(entry => entry.id == id) || []
}
function getFramesForSynSet(synset) {
  let result = []
  for (let i = 0; i < turkishFrameNet.length; i++) {
    let frame = turkishFrameNet[i];
    let lexicalUnits = frame["lexicalUnits"];
    for (let lexicalUnit of lexicalUnits) {
      if (lexicalUnit === synset) {
        result.push(frame)
        break;
      }
    }
  }
  return result
}
function frameListContains(frames, frame) {
  for (let current of frames) {
    if (current["frame"] === frame["frame"]) {
      return true
    }
  }
  return false
}
function getFramesForSynSets(synsets) {
  let result = []
  for (let synset of synsets) {
    let current = getFramesForSynSet(synset["id"]);
    for (let frame of current) {
      if (!frameListContains(result, frame)) {
        result.push(frame)
      }
    }
  }
  return result
}
</script>

<template>
  <header class="uk-flex uk-flex-around uk-background-default" uk-sticky>
    <form id="frameSearch" @submit.prevent="findFrame(searchTerms.frame)">
      <fieldset class="uk-flex">
        <legend>Frame name</legend>
        <input class="uk-input" type="text" required v-model="searchTerms.frame" />
        <button class="uk-button uk-button-primary" type="submit">Find</button>
      </fieldset>
    </form>
    <form id="verbSearch" @submit.prevent="findVerb(searchTerms.verb)">
      <fieldset class="uk-flex">
        <legend>Verb</legend>
        <input class="uk-input" type="text" required v-model="searchTerms.verb" />
        <button class="uk-button uk-button-primary" type="submit">Find</button>
      </fieldset>
    </form>
    <form id="idSearch" @submit.prevent="findSynSetID(searchTerms.id)">
      <fieldset class="uk-flex">
        <legend>Verb SynSet Id</legend>
        <input class="uk-input" type="text" required v-model="searchTerms.id" />
        <button class="uk-button uk-button-primary" type="submit">Find</button>
      </fieldset>
    </form>
  </header>
  <template v-if="searching">
    <h2 class="uk-h3 uk-text-muted uk-text-center">
      {{ searchResults.length }} result{{ searchResults.length > 1 ? 's' : searchResults.length == 0 ? 's' : '' }}
      for {{ searching }}
    </h2>
    <hr class="uk-divider-icon" />
  </template>
  <ul uk-accordion class="framenet-verb">
    <li v-for="(result, index) in searchResults" :key="index">
      <a class="uk-accordion-title" href>{{ index + 1 }}. {{ result.frame }}</a>
      <div class="uk-accordion-content">
        <h2 class="uk-h3 uk-text-muted">
          Frame Elements
          <hr />
        </h2>
        <div uk-grid>
          <div class="uk-width-2-3">
            <span class="uk-label uk-margin-xsmall-right" v-for="frame in result.frameElements" :key="frame">{{ frame
              }}</span>
          </div>
          <div class="uk-width-1-3 uk-divider-vertical">
            <button class="uk-button uk-button-secondary uk-width-1-1 uk-height-1-1"
              @click="findFrame(result.frame)">Look
              up {{
                result.frame }}</button>
          </div>
        </div>
        <h2 class="uk-h3 uk-text-muted">
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
                <template v-for="(word, index) in searchInWordnet(unit, turkishWordNet)['words']" :key="word">
                  <span v-if="index > 0">; </span>
                  <a @click="findVerb(word)">{{ word }}</a>
                </template>
              </td>
              <td> {{ searchInWordnet(unit, turkishWordNet)["definition"] }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
  </ul>
</template>
