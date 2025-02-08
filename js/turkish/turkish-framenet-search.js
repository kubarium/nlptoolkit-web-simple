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

let searchTerm = "";

/**
 * It returns the HTML string that is the results, ie. its elements and lexical units, for a particular frame
 *
 * @param {string} frame
 * @returns {string}
 */
function displayFrame(frame) {
    let frameAnalysis = analyzeFrame(frame);

    return `
        <h2 class="uk-h3 uk-text-muted">
            Frame Elements for <a href="#" onclick="findFrame('${frame}')"> ${frame} </a>
        </h2>
        <div class="uk-margin">${frameAnalysis.frameElementsList}</div>
        <h2 class="uk-h3 uk-text-muted">
            Lexical Units for <a href="#" onclick="findFrame('${frame}')"> ${frame} </a>
        </h2>
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
    return `
        <h2 class="uk-h3 uk-text-muted uk-text-center">
            ${frames.length} result${frames.length > 1 ? 's' : frames.length == 0 ? 's' : ''} for ${searchTerm}
        </h2>
        <hr class="uk-divider-icon"/>
        <ul uk-accordion class="framenet-verb">
            ${frames.map((frame, index) => {
        return `
                <li>
                    <a class="uk-accordion-title" href>${index + 1}. ${frame["frame"]}</a>
                    <div class="uk-accordion-content">
                    ${displayFrame(frame["frame"])}
                    </div>
                </li>`
    }).join('')}
        </ul>
    `;
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
                    let synonyms = synset["words"].map(word => `<a href="#" onclick="findVerb('${word}')">${word}</a>`)

                    lexicalUnitsTableBody += `
                    <tr>
                        <td> <a href="#" onclick="findSynSetID('${synset["id"]}')"> ${synset["id"]} </a> </td>
                        <td> ${synonyms.join("; ")} </td>
                        <td> ${synset["definition"]} </td>
                    </tr>`;
                }
            }
            //${createSynonym(" ", -1, synset["words"])}
            let frameElements = frame["frameElements"];
            for (let frameElement of frameElements) {
                frameElementsList += `<span class="uk-label">${frameElement}</span> `;
            }
            break;
        }
    }

    return { lexicalUnitsTableBody, frameElementsList };
}

function findFrame(frame) {
    document.getElementById('frame_name').value = frame;
    document.getElementById('frameSearch').requestSubmit();
}
function findVerb(verb) {
    document.getElementById('verb_name').value = verb;
    document.getElementById('verbSearch').requestSubmit();
}
function findSynSetID(id) {
    document.getElementById('verb_id').value = id;
    document.getElementById('idSearch').requestSubmit();
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
    searchTerm = verbName

    document.getElementById("result").innerHTML = displayFrames(frames)
    document.querySelector(".uk-accordion-title").parentNode.classList.add("uk-open")
})

document.getElementById('idSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const verbId = document.getElementById('verb_id').value;
    let frames = getFramesForSynSet(verbId)
    searchTerm = verbId

    document.getElementById("result").innerHTML = displayFrames(frames)
    document.querySelector(".uk-accordion-title").parentNode.classList.add("uk-open")
})
