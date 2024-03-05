//createCSRDFoci.js
import { readFileSync, writeFileSync } from 'fs'

const CSRD_JSON = readFileSync('./json/read/CSRD.json')
const CSRD = JSON.parse(CSRD_JSON)

const flavors = new Map()

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
const getTierAbilities = (tiers, tierFlavorAbilities) => {
    const tierMap = new Map()
    //console.log(abilityAry)
    
    tiers.forEach(tier => {

        tierMap.set(`tier_${tier}`,{ 
            abilities: getAbilitiesByTier(tier, tierFlavorAbilities) 
        })
    })
    return tierMap
}

// loop types
CSRD.flavors.forEach(flavor => {
    let flavorKey = flavor.name.trim().toLowerCase().split(' ').join('_')
    let formattedFlavor = {
        name: flavor.name.trim().toLowerCase(),
        description: '',
        tier_abilities: getTierAbilities([1,2,3,4,5,6], flavor.abilities)
    }
    flavors.set(flavorKey,formattedFlavor)
});

function replacer(key, value) {
    if(value instanceof Map) {
      return Object.fromEntries(value) // or with spread: value: [...value]
    } else {
      return value;
    }
  }



writeFileSync('./json/write/csrdFlavors.json', JSON.stringify(Object.fromEntries(flavors), replacer), 'utf8');