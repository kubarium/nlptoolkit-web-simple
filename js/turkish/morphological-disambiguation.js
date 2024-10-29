function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('../data/turkish/turkish-morphological-disambiguation.js');

function createMorphologicalDisambiguationTable(sentence){
    let words = sentence.split(' ');
    let display = "<table> <tr> <th>Word</th> <th>Morphological Analysis</th> </tr>";
    for (let word of words) {
        display = display + "<tr><td>" + word + "</td>"
        let found = false
        for (let i = 0; i < turkishMorphologicalDisambiguation.length; i++) {
            const wordObject = turkishMorphologicalDisambiguation[i];
            const wordName = wordObject["word"]
            if (word === wordName){
                found = true
                const morphologicalAnalysis = wordObject["morphologicalAnalysis"]
                display = display + "<td>" + morphologicalAnalysis + "</td>"
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

document.getElementById('morphologicalDisambiguation').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createMorphologicalDisambiguationTable(sentence);
})