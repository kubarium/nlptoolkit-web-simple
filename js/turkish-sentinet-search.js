function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('../data/turkish-sentinet.js');
include('../data/turkish-sentiliteralnet.js');

function displaySentiment(sentiNetObject){
    if (sentiNetObject["pscore"] > sentiNetObject["nscore"]){
        return "Positive with score " + sentiNetObject["pscore"]
    } else {
        if (sentiNetObject["pscore"] < sentiNetObject["nscore"]){
            return "Negative with score " + sentiNetObject["nscore"]
        } else {
            return "Neutral"
        }
    }
}

document.getElementById('wordSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    for (let i = 0; i < turkishSentiLiteralNet.length; i++) {
        const sentiNetObject = turkishSentiLiteralNet[i];
        if (sentiNetObject["word"] === word) {
            document.getElementById("result").innerHTML = displaySentiment(sentiNetObject);
            break;
        }
    }
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const synsetId = document.getElementById('synset_id').value;
    for (let i = 0; i < turkishSentiNet.length; i++) {
        const sentiNetObject = turkishSentiNet[i];
        if (turkishSentiNet["id"] === synsetId) {
            document.getElementById("result").innerHTML = displaySentiment(sentiNetObject);
            break;
        }
    }
})
