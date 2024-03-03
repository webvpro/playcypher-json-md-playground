//createCSRDAbilities.js
import { readFileSync, writeFileSync } from 'fs'

const CSRDJSON = readFileSync('./json/write/CSRD.json')
const CSRD = JSON.parse(CSRDJSON)



// loop abilities
const abilityKeys = Object.keys(CSRD.abilities.data)
abilityKeys.forEach(key => {
    const lastWord = CSRD.abilities.data[key].description.toLowerCase().split('.').map(item => item.trim())
    const wIdx = lastWord.indexOf('action') > 0 ? lastWord.indexOf('action') : lastWord.indexOf('enabler')
    if (lastWord.indexOf('action') > 0) {
        CSRD.abilities.data[key]['kind'] = "ACTION"
    } else if(lastWord.indexOf('enabler') > 0){
        CSRD.abilities.data[key]['kind'] = "ENABLER"
    } else if (lastWord.indexOf('action to initiate')) {
        CSRD.abilities.data[key]['kind'] = "ACTION"
    } else {
        console.log("nope", key)
        CSRD.abilities.data[key]['kind'] = "ENABLER"
    }
} )
console.log('done')
writeFileSync('./json/write/CSRD-Temp.json', JSON.stringify(CSRD), 'utf8');