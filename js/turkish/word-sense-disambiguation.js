function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('/data/turkish/turkish-word-sense-disambiguation.js');
include('/js/word-table.js');

document.getElementById('wordSenseDisambiguation').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createWordTableForSentence(sentence, "Word Sense Disambiguation", wordSenseDisambiguation, "sense", true, false);
})