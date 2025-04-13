<script setup></script>
<template>
  <h1 class="uk-heading-divider">Motivation</h1>
  <p>The original project, called <a href="https://starlangsoftware.github.io/nlptoolkit-web-simple/"
      target="_blank">NLP Toolkit</a>, was a great idea, but it did not have the greatest user experience, nor was it
    easy for a
    developer to maintain. The codebase was full of duplicate efforts. The UI, most of all, could have used a thick coat
    of paint.</p>
  <div uk-grid class="uk-grid-large">
    <div class="uk-width-2-5@s">
      <h2>Existing Material</h2>
      <p>The toolkit is designed to help you analyze and understand the
        structure of natural
        language. It provides a set
        of tools for part-of-speech tagging, tokenization, lemmatization, and dependency parsing. The study is done in
        two languages, Turkish and English. Most pages consist of a few search fields to look up information in relevant
        datasets. Then, the results are displayed in a table.</p>
    </div>
    <div class="uk-width-3-5@s ">
      <h2>Suggested Improvements</h2>
      <p>The most important thing is to make the UI more user-friendly. The search fields should be more intuitive and
        easier to use. Here are other suggested improvements:</p>
      <ul class="uk-list uk-list-square">
        <li>Improve the overall layout and design of the UI to make it more visually appealing.</li>
        <li>Reduce the amount of duplicate code in the codebase to make it easier to maintain and extend.</li>
        <li>Increase page load time ideally by improving file size in data files.</li>
      </ul>
    </div>
  </div>
  <h2 class="uk-heading-divider">Method</h2>
  <div uk-grid>
    <div class="uk-width-1-4@s">
      <p>In order to improve the project, we have taken many interim steps:</p>
      <div uk-sticky class="uk-background-default">
        <ul class="uk-nav uk-nav-default tm-nav" uk-scrollspy-nav="closest: li; scroll: true; offset: 40">
          <li class="uk-active"><a href="#design">Design</a></li>
          <li><a href="#framework">Framework</a></li>
          <li><a href="#implementation">Implementation</a></li>
          <li><a href="#file-size">File Size</a></li>
        </ul>
      </div>
    </div>
    <div class="uk-width-expand">
      <h3 id="design">Design</h3>
      <p>The <a href="https://getuikit.com/" target="_blank"> UIKit</a> was chosen for the visual uplifting part of the
        project because it is a simple and easy-to-use UI framework.
        In fact, the earliest iteration of modernization started off with just including the UIKit over the existing
        codebase. First order of business was to construct a navigation and give the homepage a more welcoming look.
      </p>
      <p>Next was to change how the search results looked in tables. However, it became clear that sprinkling UIKit's
        parts over the original code wasn't going to improve much in terms of developer experience. This was due to the
        fact that the original codebase had visual and code concerns
        mixed all together. Function calls that should return just the data were returning HTML as well. Thus, while
        keeping UIKit still an option, we moved on to selecting a
        framework.</p>
      <h3 id="framework">Framework</h3>
      <p>The next decision was to choose a framework for the project. The most popular frameworks are React, Vue, and
        Angular. Among these options, Vue was chosen because it is lightweight, easy to learn, and has a large
        community.
        Vue is also a good choice for this project because it is somewhat similar to jQuery as a progressive framework.
        Future developers can easily adapt to it as opposed to Angular or React, which has a steeper learning curve.
      </p>
      <h3 id="implementation">Implementation</h3>
      <p>One of the improvements we have made is to reduce the amount of duplicate code in the codebase. This was done
        by
        creating a new component for the search fields that are used in most pages. can be reused in all pages.</p>
      <p>Similarly, a search results component was created since this sort of feedback was missing from the original.
      </p>
      <h3 id="file-size">File Size</h3>
      <p>The original project had a large number of data files. These files, typically a JSON file but structured as a
        piece
        of Javasript code, were used to store the data that a user might search. A quick decision was made to convert
        these
        files into pure JSON files.</p>
      <p>Furthermore, in some files, the data structure was completely altered. For example, if a dataset consisted of a
        array of objects, each object representing a word, the new structure would be a single object with the word as
        the
        key and the data as the value:</p>
      <pre> [..., {"word": "Aaliyah", "ner": "PERSON"}, ...]</pre> became
      <pre>{..., "Aaliyah": "PERSON", ...}</pre>
      <p>As a result, we have managed to reduce the file size by 50% on a lot of files. Overall, we have saved 50 MB.
      </p>
    </div>
  </div>
  <h2 class="uk-heading-divider">Future Considerations</h2>
  <p>Although the project looks day and night different from its initial version, there are a few things that we would
    like to improve in the future. </p>
  <ul class="uk-list uk-list-square uk-margin-large-bottom">
    <li>The most important thing is to offload the datasets from front-end to a back-end solution. As it is, data files
      are still part of the front-end. This was due to the natural progression of the project. In each iteration, we
      have improved a big aspect of it, and this remains to be the most important item still deserving our attention. To
      that end, we envision that there will be a Node server via which we can do lookups in datasets on the server side.
    </li>
    <li>Enhance the documentation to make it easier for new developers to understand the codebase and contribute to the
      project.</li>
    <li>Implement unit tests to ensure the reliability and stability of the application.</li>
    <li>Improve accessibility to ensure the application is usable by people with disabilities.</li>
  </ul>
</template>
