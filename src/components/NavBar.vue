<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>
<template>
  <header class="uk-container uk-padding-small uk-flex uk-flex-between uk-flex-middle">
    <span class="uk-logo">NLP Toolkit</span>
    <ul class="uk-breadcrumb uk-margin-remove" aria-label="Breadcrumb">
      <li><span id="language">{{ route.meta.language }}</span></li>
      <li><span id="toolkit">{{ route.meta.toolkit }}</span></li>
    </ul>
    <nav class="uk-navbar-container uk-navbar-transparent uk-padding-remove uk-margin-remove">
      <div class="uk-container">
        <div uk-navbar>
          <ul class="uk-navbar-nav">
            <li>
              <a>Turkish <span uk-drop-parent-icon></span></a>
              <div class="uk-navbar-dropdown uk-navbar-dropdown-width-2">
                <div class="uk-drop-grid uk-child-width-1-2" uk-grid>
                  <div>
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                      <li class="uk-text-bold">Resources</li>
                      <li class="uk-nav-divider"></li>
                      <li>
                        <a href="turkish-framenet.html">FrameNet</a>
                      </li>
                      <li>
                        <a href="turkish-propbank.html">PropBank</a>
                      </li>
                      <li>
                        <a href="turkish-wordnet.html">WordNet</a>
                      </li>
                      <li>
                        <a href="turkish-sentinet.html">SentiNet</a>
                      </li>
                      <li>
                        <a href="turkish-dictionary.html">Dictionary</a>
                      </li>
                      <li>
                        <a href="turkish-morphological-lexicon.html">Morphological Lexicon</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                      <li class="uk-text-bold">Processing</li>
                      <li class="uk-nav-divider"></li>
                      <li>
                        <a href="turkish-spell-checker.html">Spell Checker</a>
                      </li>
                      <li>
                        <a href="turkish-morphological-analysis.html">Morphological Analysis</a>
                      </li>
                      <li>
                        <a href="turkish-morphological-disambiguation.html">Morphological Disambiguation</a>
                      </li>
                      <li>
                        <a href="turkish-asciifier.html">Asciifier</a>
                      </li>
                      <li>
                        <a href="turkish-deasciifier.html">Deasciifier</a>
                      </li>
                      <li>
                        <a href="turkish-word-sense-disambiguation.html">Word Sense Disambiguation</a>
                      </li>
                      <li>
                        <a href="turkish-sentiment-analysis.html">Sentiment Analysis</a>
                      </li>
                      <li>
                        <a href="turkish-named-entity-recognition.html">Named Entity Recognition</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a>English <span uk-drop-parent-icon></span></a>
              <div class="uk-navbar-dropdown uk-navbar-dropdown-width-2">
                <div class="uk-drop-grid uk-child-width-1-2" uk-grid>
                  <div>
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                      <li class="uk-text-bold">Resources</li>
                      <li class="uk-nav-divider"></li>
                      <li>
                        <a href="english-propbank.html">PropBank</a>
                      </li>
                      <li>
                        <a href="english-wordnet.html">WordNet</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                      <li class="uk-text-bold">Processing</li>
                      <li class="uk-nav-divider"></li>
                      <li>
                        <a href="english-pos-tagger.html">Pos Tagger</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
