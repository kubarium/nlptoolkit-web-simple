function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('../data/turkish/morphological-dictionary.js');

document.getElementById('morphologySearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    for (let i = 0; i < morphologicalDictionary.length; i++) {
        const wordObject = morphologicalDictionary[i];
        const wordName = wordObject["word"]
        const morphology = wordObject["morphology"]
        if (wordName === word) {
            document.getElementById("result").innerHTML = morphology;
            return;
        }
    }
    document.getElementById("result").innerHTML = word;
});
