function createSynonym(display, j, words){
    let t = 0
    for (let k = 0; k < words.length; k++) {
        if (k !== j) {
            if (t === 0) {
                display = display + words[k];
            } else {
                display = display + "; " + words[k];
            }
            t++;
        }
    }
    display = display + "</td></tr>"
    return display
}

function createTableForWordSearch(word, wordNet){
    let display = "<table> <tr> <th>Id</th> <th>Pos</th> <th>Definition</th> <th>Synonyms</th> </tr>";
    for (let i = 0; i < wordNet.length; i++) {
        let synset = wordNet[i];
        for (let j = 0; j < synset["words"].length; j++) {
            if (synset["words"][j] === word) {
                display = display + "<tr><td>" + synset["id"] + "</td><td>" + synset["pos"] + "</td><td>" + synset["definition"] + "</td><td>"
                display = createSynonym(display, j, synset["words"])
                break;
            }
        }
    }
    display = display + "</table>"
    return display
}

function createTableForSynonymSearch(synonymWord, wordNet){
    let display = "<table> <tr> <th>Synonym Words</th></tr>";
    for (let i = 0; i < wordNet.length; i++) {
        let synset = wordNet[i];
        for (let j = 0; j < synset["words"].length; j++) {
            if (synset["words"][j] === synonymWord && synset["words"].length !== 1) {
                display = display + "<tr><td>";
                display = createSynonym(display, j, synset["words"])
                break;
            }
        }
    }
    display = display + "</table>"
    return display
}

function createTableForIdSearch(synsetId, wordNet){
    let display = "<table> <tr> <th>Pos</th> <th>Definition</th> <th>Synonyms</th> </tr>";
    for (let i = 0; i < wordNet.length; i++) {
        let synset = wordNet[i];
        if (synset["id"] === synsetId) {
            display = display + "<tr><td>" + synset["pos"] + "</td><td>" + synset["definition"] + "</td><td>";
            display = createSynonym(display, -1, synset["words"])
            break;
        }
    }
    display = display + "</table>"
    return display
}