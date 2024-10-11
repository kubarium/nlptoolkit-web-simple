function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('../data/english/english-tags.js');

function createPosTableForSentence(sentence){
    let words = sentence.toLowerCase().split(' ');
    let display = "<table> <tr> <th>Word</th> <th>Tag(s)</th> </tr>";
    for (let word of words) {
        display = display + "<tr><td>" + word + "</td>"
        let found = false
        for (let i = 0; i < englishTags.length; i++) {
            const wordObject = englishTags[i];
            const wordName = wordObject["word"]
            const wordTags = wordObject["tagSet"]
            if (word === wordName){
                found = true
                display = display + "<td>" + wordTags + "</td>"
                break;
            }
        }
        if (!found){
            display = display + "<td>UNK</td>"
        }
        display = display + "</tr>"
    }
    display = display + "</table>"
    return display
}

document.getElementById('posTag').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createPosTableForSentence(sentence);
})