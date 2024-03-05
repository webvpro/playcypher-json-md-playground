//createCompendium.js
import { writeFileSync } from 'fs'

import baseCollections from './collections.js'
import csrdTypesJSON from './json/write/csrdTypes.json' assert { type: "json" };
import csrdAbilitiesJSON from './json/write/csrdAbilities.json' assert { type: "json" };
import csrdFociJSON from './json/write/csrdFoci.json' assert { type: "json" };
import csrdDescriptorsJSON from './json/write/csrdDescriptors.json' assert { type: "json" };
import csrdFlavorsJSON from './json/write/csrdFlavors.json' assert { type: "json" };
import csrdCyphersJSON from './json/write/csrdCyphers.json' assert { type: "json" };
import csrdArtifactsJSON from './json/write/csrdArtifacts.json' assert { type: "json" };
import csrdCreaturesJSON from './json/write/csrdCreatures.json' assert { type: "json" };

baseCollections.collections.abilities.items = csrdAbilitiesJSON
baseCollections.collections.types.items = csrdTypesJSON
baseCollections.collections.foci.items = csrdFociJSON
baseCollections.collections.descriptors.items = csrdDescriptorsJSON
baseCollections.collections.flavors.items = csrdFlavorsJSON
baseCollections.collections.cyphers.items = csrdCyphersJSON
baseCollections.collections.artifacts.items = csrdArtifactsJSON
baseCollections.collections.creatures.items = csrdCreaturesJSON


console.log(baseCollections.collections.creatures.items)

function replacer(key, value) {
    if(value instanceof Map) {
      return Object.fromEntries(value) // or with spread: value: [...value]
    } else {
      return value;
    }
  }



writeFileSync('./json/write/csrdCompendium.json', JSON.stringify(baseCollections, replacer), 'utf8');
