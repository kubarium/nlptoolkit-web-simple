function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('data/turkish/turkish-framenet.js');
include('data/turkish/turkish-wordnet.js');
include('js/wordnet-search.js');

function createFrameTable(frameName) {
    let lexicalUnitsTableBody = ``;
    let frameElementsList = ``;

    for (let i = 0; i < turkishFrameNet.length; i++) {
        let frame = turkishFrameNet[i];
        if (frame["frame"] === frameName) {
            let lexicalUnits = frame["lexicalUnits"];
            for (let lexicalUnit of lexicalUnits) {
                let synset = getSynsetWithIdBinarySearch(lexicalUnit, turkishWordNet)
                if (synset != null) {
                    lexicalUnitsTableBody += `
                    <tr>
                        <td> ${synset["id"]} </td>
                        <td> ${createSynonym(" ", -1, synset["words"])} </td>
                        <td> ${synset["definition"]} </td>
                    </tr>`;
                }
            }
            let frameElements = frame["frameElements"];
            for (let frameElement of frameElements) {
                frameElementsList += `<span class="uk-label">${frameElement}</span> `;
            }
            break;
        }
    }

    return `
        <h2 class="uk-h3 uk-text-primary">Lexical Units for ${frameName}</h2>
        <table class="uk-table uk-table-striped uk-table-hover uk-table-small">
            <thead>
                <tr>
                    <th class="uk-width-1-5">Id</th>
                    <th class="uk-width-2-5">Words</th>
                    <th class="uk-width-2-5">Definition</th>
                </tr>
            </thead>
            <tbody>
                ${lexicalUnitsTableBody}
            </tbody>
        </table>
        <h2 class="uk-h3 uk-text-primary">Frame Elements for ${frameName}</h2>
        <div class="uk-margin">${frameElementsList}</div>
    `;

}

function createTableOfFrames(frames) {

    let display = `
        <table class="uk-table uk-table-small ">
            <thead>
                <tr>
                    <th>Frame</th>
                    <th>Lexical Units</th>
                    <th>Frame Elements</th>
                </tr>
            </thead>`;
    for (let frame of frames) {
        display = display + `<tr>
            <td class="uk-text-bolder border-bottom"> ${frame["frame"]} </td>
            <td class="uk-padding-remove border-bottom">
                <table class="uk-table uk-table-striped uk-table-hover uk-table-small ">
                    <thead>
                        <tr>
                            <th class="uk-width-1-5">Id</th>
                            <th class="uk-width-2-5">Words</th>
                            <th class="uk-width-2-5">Definition</th>
                        </tr>
                    </thead>
                    <tbody>`;
        let lexicalUnits = frame["lexicalUnits"];
        for (let lexicalUnit of lexicalUnits) {
            let synset = getSynsetWithIdBinarySearch(lexicalUnit, turkishWordNet)
            if (synset != null) {
                display = display + "<tr><td>" + synset["id"] + "</td><td>";
                display = createSynonym(display, -1, synset["words"]) + "</td><td>" + synset["definition"] + "</td></tr>"
            }
        }
        display = display + `</tbody></table></td><td class="border-bottom uk-table-shrink">`
        let frameElements = frame["frameElements"];
        for (let frameElement of frameElements) {
            display = `${display} <span class="uk-label">${frameElement}</span>`;
        }
        display = display + "</td></tr>"
    }
    display = display + "</table>"
    return display
}

function getFramesForSynSet(synset) {
    let result = []
    for (let i = 0; i < turkishFrameNet.length; i++) {
        let frame = turkishFrameNet[i];
        let lexicalUnits = frame["lexicalUnits"];
        for (let lexicalUnit of lexicalUnits) {
            if (lexicalUnit === synset) {
                result.push(frame)
                break;
            }
        }
    }
    return result
}

function frameListContains(frames, frame) {
    for (let current of frames) {
        if (current["frame"] === frame["frame"]) {
            return true
        }
    }
    return false
}

function getFramesForSynSets(synsets) {
    let result = []
    for (let synset of synsets) {
        let current = getFramesForSynSet(synset["id"]);
        for (let frame of current) {
            if (!frameListContains(result, frame)) {
                result.push(frame)
            }
        }
    }
    return result
}

document.getElementById('frameSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const frameName = document.getElementById('frame_name').value;
    document.getElementById("result").innerHTML = createFrameTable(frameName);
})

document.getElementById('verbSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbName = document.getElementById('verb_name').value;
    let synsets = getSynsetsWithWord(verbName, turkishWordNet)
    let frames = getFramesForSynSets(synsets)
    document.getElementById("result").innerHTML = createTableOfFrames(frames)
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbId = document.getElementById('verb_id').value;
    let frames = getFramesForSynSet(verbId)
    document.getElementById("result").innerHTML = createTableOfFrames(frames)
})
