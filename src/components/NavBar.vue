<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
const isRouteActive = (targetPath) => {
  return route.path === targetPath.replaceAll(" ", "");
};
const menu = {
  Turkish: {
    Resources: ['FrameNet', 'PropBank', 'WordNet', 'SentiNet', 'Dictionary', 'Morphological Lexicon'],
    Processing: ['Spell Checker', 'Morphological Analysis', 'Morphological Disambiguation', 'Asciifier', 'Deasciifier', 'Word Sense Disambiguation', 'Sentiment Analysis', 'Named Entity Recognition']
  },
  English: {
    Resources: ['PropBank', 'WordNet'],
    Processing: ['Pos Tagger']
  }
}
</script>
<template>
  <header class="uk-container uk-padding-small uk-flex uk-flex-between uk-flex-middle">
    <router-link class="uk-link-reset " to="/">NLP Toolkit</router-link>
    <ul class="uk-breadcrumb uk-margin-remove uk-visible@s" aria-label="Breadcrumb" v-if="route.meta.language">
      <li><span>{{ route.meta.language }}</span></li>
      <li><span>{{ route.meta.toolkit }}</span></li>
    </ul>
    <nav class="uk-navbar-container uk-navbar-transparent uk-padding-remove uk-margin-remove">
      <div class="uk-container">
        <div uk-navbar>
          <ul class="uk-navbar-nav">
            <li>
              <a>Turkish <span uk-drop-parent-icon></span></a>
              <div class="uk-navbar-dropdown uk-navbar-dropdown-width-3">
                <div class="uk-drop-grid uk-child-width-1-2" uk-grid>
                  <div>
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                      <li class="uk-text-bold">Resources</li>
                      <li class="uk-nav-divider"></li>
                      <template v-for="path in menu.Turkish.Resources" :key="path">
                        <li :class="{ 'uk-active': isRouteActive(`/Turkish${path}`) }">
                          <router-link :to="`/Turkish${path.replaceAll(' ', '')}`">{{ path }}</router-link>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <div>
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                      <li class="uk-text-bold">Processing</li>
                      <li class="uk-nav-divider"></li>
                      <template v-for="path in menu.Turkish.Processing" :key="path">
                        <li :class="{ 'uk-active': isRouteActive(`/Turkish${path}`) }">
                          <router-link :to="`/Turkish${path.replaceAll(' ', '')}`">{{ path }}</router-link>
                        </li>
                      </template>
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
                      <template v-for="path in menu.English.Resources" :key="path">
                        <li :class="{ 'uk-active': isRouteActive(`/English${path}`) }">
                          <router-link :to="`/English${path.replaceAll(' ', '')}`">{{ path }}</router-link>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <div>
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                      <li class="uk-text-bold">Processing</li>
                      <li class="uk-nav-divider"></li>
                      <template v-for="path in menu.English.Processing" :key="path">
                        <li :class="{ 'uk-active': isRouteActive(`/English${path}`) }">
                          <router-link :to="`/English${path.replaceAll(' ', '')}`">{{ path }}</router-link>
                        </li>
                      </template>
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
  <div class="uk-container uk-padding uk-padding-remove-top uk-hidden@s uk-text-center">
    <ul class="uk-breadcrumb uk-margin-remove" aria-label="Breadcrumb" v-if="route.meta.language">
      <li><span class="uk-text-default">{{ route.meta.language }}</span></li>
      <li><span class="uk-text-default">{{ route.meta.toolkit }}</span></li>
    </ul>
  </div>
</template>
