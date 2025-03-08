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
function searchInWordnet(id, wordNet) {
  return wordNet.find(entry => entry.id == id) || []
}
function getFramesForSynSet(synset, frameNet) {
  let result = []
  for (let i = 0; i < frameNet.length; i++) {
    let frame = frameNet[i];
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
function getFramesForSynSets(synsets, frameNet) {
  let result = []
  for (let synset of synsets) {
    let current = getFramesForSynSet(synset["id"], frameNet);
    for (let frame of current) {
      if (!frameListContains(result, frame)) {
        result.push(frame)
      }
    }
  }
  return result
}


export { getSynsetsWithWord, searchInWordnet, getFramesForSynSet, getFramesForSynSets }
