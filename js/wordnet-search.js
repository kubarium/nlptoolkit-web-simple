function createSynonym(display, j, words) {
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

function getSynsetsWithWord(word, wordNet) {
    let result = []
    for (let i = 0; i < wordNet.length; i++) {
        let synset = wordNet[i];
        for (let j = 0; j < synset["words"].length; j++) {
            if (synset["words"][j] === word) {
                result.push(synset)
                break;
            }
        }
    }
    return result
}

function getSynsetWithId(id, wordNet){
    let low = 0, high = wordNet.length - 1;
    while (low < high) {
        let middle = Math.floor((low + high) / 2)
        if (wordNet[middle]["id"] === id){
            return wordNet[middle]
        } else {
            if (wordNet[middle]["id"] < id){
                low = middle + 1
            } else {
                high = middle - 1
            }
        }
    }
    return null
}

function createTableForWordSearch(word, wordNet) {
    let display = "<table> <tr> <th>Id</th> <th>Pos</th> <th>Definition</th> <th>Synonyms</th> </tr>";
    let wordList = getSynsetsWithWord(word, wordNet)
    for (let synset of wordList) {
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

function createTableForSynonymSearch(synonymWord, wordNet) {
    let display = "<table> <tr> <th>Synonym Words</th></tr>";
    let wordList = getSynsetsWithWord(synonymWord, wordNet);
    for (let synset of wordList) {
        if (synset["words"].length !== 1) {
            for (let j = 0; j < synset["words"].length; j++) {
                if (synset["words"][j] === synonymWord) {
                    display = display + "<tr><td>";
                    display = createSynonym(display, j, synset["words"])
                    break;
                }
            }
        }
    }
    display = display + "</table>"
    return display
}

function createTableForIdSearch(synsetId, wordNet) {
    let display = "<table> <tr> <th>Pos</th> <th>Definition</th> <th>Synonyms</th> </tr>";
    let synset = getSynsetWithId(synsetId, wordNet);
    if (synset != null){
        display = display + "<tr><td>" + synset["pos"] + "</td><td>" + synset["definition"] + "</td><td>";
        display = createSynonym(display, -1, synset["words"])
        display = display + "</table>"
    }
    return display
}