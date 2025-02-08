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


/**
 * It returns the HTML string that is the results, ie. its elements and lexical units, for a particular frame
 *
 * @param {string} frame
 * @returns {string}
 */
function displayFrame(frame) {
    let frameAnalysis = analyzeFrame(frame);

    return `
        <h2 class="uk-h3 uk-text-primary">Frame Elements for ${frame}</h2>
        <div class="uk-margin">${frameAnalysis.frameElementsList}</div>
        <h2 class="uk-h3 uk-text-primary">Lexical Units for ${frame}</h2>
        <table class="uk-table uk-table-striped uk-table-hover uk-table-small">
            <thead>
                <tr>
                    <th class="uk-width-1-5">Id</th>
                    <th class="uk-width-2-5">Words</th>
                    <th class="uk-width-2-5">Definition</th>
                </tr>
            </thead>
            <tbody>
                ${frameAnalysis.lexicalUnitsTableBody}
            </tbody>
        </table>
    `;
}

/**
 * It returns the result of multiple frames in an accordion component
 *
 * @param {string} frame
 * @returns {string}
 */
function displayFrames(frames) {
    let display = `<ul uk-accordion class="framenet-verb">`;

    for (let frame of frames) {
        display += `
            <li>
                <a class="uk-accordion-title" href>${frame["frame"]}</a>
                <div class="uk-accordion-content">
                    ${displayFrame(frame["frame"])}
                </div>
            </li>
        `;
    }

    display += `</ul>`;
    return display;
}

/**
 * After validitading a frame name, it returns a frame's lexical units and elements as an object
 *
 * @param {string} frameName The name of the frame to look up
 * @returns {{ lexicalUnitsTableBody: string; frameElementsList: string; }} An object of HTML strings
 */
function analyzeFrame(frameName) {
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

    return { lexicalUnitsTableBody, frameElementsList };
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
    document.getElementById("result").innerHTML = displayFrame(frameName);
})

document.getElementById('verbSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbName = document.getElementById('verb_name').value;
    let synsets = getSynsetsWithWord(verbName, turkishWordNet)
    let frames = getFramesForSynSets(synsets)
    document.getElementById("result").innerHTML = displayFrames(frames)
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbId = document.getElementById('verb_id').value;
    let frames = getFramesForSynSet(verbId)
    document.getElementById("result").innerHTML = displayFrames(frames)
})
