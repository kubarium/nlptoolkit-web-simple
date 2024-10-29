function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('../data/turkish/turkish-asciified.js');

function createAsciifierTable(sentence){
    let words = sentence.split(' ');
    let display = "<table> <tr> <th>Word</th> <th>Asciified</th> </tr>";
    for (let word of words) {
        display = display + "<tr><td>" + word + "</td>"
        let found = false
        for (let i = 0; i < turkishAsciified.length; i++) {
            const wordObject = turkishAsciified[i];
            const wordName = wordObject["word"]
            if (word === wordName){
                found = true
                const asciified = wordObject["asciified"]
                display = display + "<td>" + asciified + "</td>"
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

document.getElementById('asciifier').addEventListener('submit', function (event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;
    document.getElementById("result").innerHTML = createAsciifierTable(sentence);
})