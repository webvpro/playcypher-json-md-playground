//createCSRDFoci.js
import { readFileSync, writeFileSync } from 'fs'

const CSRD_JSON = readFileSync('./json/read/rawCSRD.json')
const CSRD = JSON.parse(CSRD_JSON)

const foci = new Map()

const getAbilitiesByTier = (tier, abilityAry) => {
    const tierAbilityObj = {granted:[],select:[]}
    abilityAry.filter( ability => {
        return ability.tier === tier
    }).forEach( tierAbility =>{
        const abilityKey = tierAbility.name.trim().toLowerCase().split(' ').join('_')
        tierAbility.preselected ? tierAbilityObj.granted.push(abilityKey) : tierAbilityObj.select.push(abilityKey)
    })
    return  tierAbilityObj 


}
const getTierAbilities = (tiers, tierFocusAbilities) => {
    const tierMap = new Map()
    //console.log(abilityAry)
    
    tiers.forEach(tier => {

        tierMap.set(`tier_${tier}`,{ 
            abilities: getAbilitiesByTier(tier, tierFocusAbilities) 
        })
    })
    return tierMap
}

// loop types
CSRD.foci.forEach(focus => {
    let focusKey = focus.name.trim().toLowerCase().split(' ').join('').toUpperCase();
    let formattedFocus = {
        name: focus.name.trim().toLowerCase(),
        description: focus.description.trim(),
        intrusion: focus.intrusions,
        abilities: focus.abilities
    }
    foci.set(focusKey,formattedFocus)
});

function replacer(key, value) {
    if(value instanceof Map) {
      return Object.fromEntries(value) // or with spread: value: [...value]
    } else {
      return value;
    }
  }



writeFileSync('./json/write/csrdFoci.json', JSON.stringify(Object.fromEntries(foci), replacer), 'utf8');