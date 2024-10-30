function createWordTableForSentence(sentence, tagHeader, featureArray, tagField, lowerCase, wordIfNotFound){
    if (lowerCase){
        words = sentence.toLowerCase().split(' ');
    } else {
        words = sentence.split(' ');
    }
    let display = "<table> <tr> <th>Word</th> <th>" + tagHeader + "</th> </tr>";
    for (let word of words) {
        display = display + "<tr><td>" + word + "</td>"
        let found = false
        for (let i = 0; i < featureArray.length; i++) {
            const wordObject = featureArray[i];
            const wordName = wordObject["word"]
            if (word === wordName){
                found = true
                const wordTag = wordObject[tagField]
                display = display + "<td>" + wordTag + "</td>"
                break;
            }
        }
        if (!found){
            if (wordIfNotFound){
                display = display + "<td>" + word + "</td>"
            } else {
                if (tagField !== "polarity"){
                    display = display + "<td>UNK</td>"
                } else {
                    display = display + "<td>NEUTRAL</td>"
                }
            }
        }
        display = display + "</tr>"
    }
    display = display + "</table>"
    return display
}
