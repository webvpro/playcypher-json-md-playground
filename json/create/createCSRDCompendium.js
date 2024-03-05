//createCompendium.js
import { readFileSync, writeFileSync } from 'fs'


const csrdCompendium = JSON.parse(readFileSync('./json/read/CSRD_DB.json'));

//console.log(csrdCompendium.types)

function keyCollectionItems() {
    const collectionKeys = Object.keys(csrdCompendium)
    collectionKeys.map( key => {
        const newItemMap = new Map()
        csrdCompendium[key].data.map(item => {
            const newKeyName = item.name ? item.name.replace(/\W/g, '').toUpperCase() : 'NA'
            newItemMap.set(newKeyName, item)
        })
        csrdCompendium[key].data = newItemMap;
    })
    
    console.log('Keyed Collection Items', csrdCompendium)
    return csrdCompendium
}
function replacer(key, value) {
    if(value instanceof Map) {
      return Object.fromEntries(value) // or with spread: value: [...value]
    } else {
      return value;
    }
  }



writeFileSync('./json/write/csrdCompendium.json', JSON.stringify(keyCollectionItems(), replacer), 'utf8');
