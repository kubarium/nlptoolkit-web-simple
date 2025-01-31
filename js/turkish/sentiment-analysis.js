function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('/data/turkish/turkish-sentiment-analysis.js');
include('/js/word-table.js');

document.getElementById('sentimentAnalysis').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createWordTableForSentence(sentence, "Sentiment Analysis", sentimentAnalysis, "polarity", true, false);
})