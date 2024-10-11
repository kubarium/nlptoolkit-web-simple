function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('../data/turkish/spell-dictionary.js');

function createSpellCheckTable(sentence){
    let words = sentence.toLowerCase().split(' ');
    let display = "<table> <tr> <th>Word</th> <th>Correct</th> </tr>";
    for (let word of words) {
        display = display + "<tr><td>" + word + "</td>"
        let found = false
        for (let i = 0; i < spellDictionary.length; i++) {
            const wordObject = spellDictionary[i];
            const wrong = wordObject["wrong"]
            const correct = wordObject["correct"]
            if (word === wrong){
                found = true
                display = display + "<td style=\"color:Red;\">" + correct + "</td>"
                break;
            }
        }
        if (!found){
            display = display + "<td>" + word + "</td>"
        }
        display = display + "</tr>"
    }
    display = display + "</table>"
    return display
}

document.getElementById('spellCheck').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createSpellCheckTable(sentence);
})