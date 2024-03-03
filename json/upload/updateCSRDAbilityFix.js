//sync aw doc
import { readFileSync, writeFileSync } from 'fs'
import {databases,ID} from '../../modules/appwrite.js'
import csrdDB from '../write/csrdCompendium.json' assert { type: 'json' }
const AW_DB='65a751efaaa5493c2e49'
const COMPENDIUMS_COLLECTION = 'PUBLIC_COMPENDIUMS'

const collections = await databases.listCollections(AW_DB)
const compendiums = await databases.listDocuments(AW_DB, COMPENDIUMS_COLLECTION)

//write to db 
//databases.createDocument(AW_DB, COMPENDIUMS_COLLECTION, 'CSRD', JSON.stringify({...csrdDB}));
//console.log('jsonDB',csrdDB)
//console.log('collections',collections)
const compendium = csrdDB
const updateCollectionKeys = ["foci", "flavors", "types"]
const updatedCollections = new Map()
updateCollectionKeys.map(collectionKey => {
        const collectionData = Object.keys(compendium[collectionKey].data)
        console.log(`--${collectionKey}--`)
        collectionData.map(dataKey => {
            const newData = new Map();
            console.log(`--${dataKey}--`)
            if(collectionKey){
                const abilities = compendium[collectionKey].data[dataKey].abilities 
                const newAbility = new Map();
                Object.keys(abilities).forEach(abilityKey => {
                    newAbility.set(abilities[abilityKey].name.replace(/\W/g, '').toUpperCase(),abilities[abilityKey])
                })
                compendium[collectionKey].data[dataKey].abilities = newAbility 
            }
        })
})
console.log("writing")
     writeFileSync('../../json/write/CSRD.json', JSON.stringify(compendium, replacer), 'utf8');

function typeAbilities() {
    const collection = compendium.types.data
    const newData = new Map();
    const newAbilities = new Map()
    Object.keys(collection).map(
        item => {
            const abilities = compendium.types.data[item].abilities;
            Object.keys(abilities).forEach(abilityKey => {
                newAbilities.set(abilities[abilityKey].name.replace(/\W/g, '').toUpperCase(),abilities[abilityKey])
            })
            newData.set(item, newAbilities)
        }
    )

    return newData
}
function replacer(key, value) {
    if(value instanceof Map) {
      return Object.fromEntries(value) // or with spread: value: [...value]
    } else {
      return value;
    }
  }