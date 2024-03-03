//createCSRDArtifacts.js
import { readFileSync, writeFileSync } from 'fs'


const CSRD_JSON = readFileSync('./json/read/CSRD.json')
const CSRD = JSON.parse(CSRD_JSON)

const artifacts = new Map()




// loop types

CSRD.artifacts.forEach(artifact => {
    let artifactKey = artifact.name.trim().toLowerCase().split(' ').join('_')
    let formattedArtifact = {
        name: artifact.name.trim().toLowerCase(),
        level: {dice: artifact.level_dice, mod:artifact.level_mod},
        effect: artifact.effect,
        description: artifact.form,
        depletion: artifact.depletion
    }
    artifacts.set(artifactKey,formattedArtifact)
});

function replacer(key, value) {
    if(value instanceof Map) {
      return Object.fromEntries(value) // or with spread: value: [...value]
    } else {
      return value;
    }
  }



writeFileSync('./json/write/csrdArtifacts.json', JSON.stringify(Object.fromEntries(artifacts), replacer), 'utf8');