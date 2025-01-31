function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('data/turkish/turkish-morphological-disambiguation.js');
include('js/word-table.js');

document.getElementById('morphologicalDisambiguation').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createWordTableForSentence(sentence, "Morphological Analysis", turkishMorphologicalDisambiguation, "morphologicalAnalysis", false, false);
})