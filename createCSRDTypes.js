//createCSRDTypes.js
import { readFileSync, writeFileSync } from 'fs'

const CSRD_JSON = readFileSync('./json/read/CSRD.json')
const CSRD = JSON.parse(CSRD_JSON)

const pcTypes = new Map()

const typesFix = function(typesAry){
    let newTypes = []
    typesAry.forEach(pcType => {
        newTypes.push(pcType.trim().toLowerCase().split(' ').join('_'))
    })
    return newTypes
}

// format helpers
const getAbilitiesByTier = (tier, abilityAry) => {
    const tierAbilityArray = []
    const tierAbilities = abilityAry.filter( ability => {
        return ability.tier === tier
    })
    tierAbilities.forEach( tierAbility => {
        tierAbilityArray.push(tierAbility.name.trim().toLowerCase().split(' ').join('_'))
    })
    return tierAbilityArray
}
const getTierAbilities = (tiers, abilityAry) => {
    const tierMap = new Map()
    tiers.forEach(tier => {
        tierMap.set(`tier_${tier.tier}`,{ 
            number: tier.tier, 
            limit: tier.special_abilities,
            abilities: getAbilitiesByTier(tier.tier, abilityAry) 
        })
    })
    return tierMap
}

// loop types
CSRD.types.forEach(pcType => {
    let typeKey = pcType.name.trim().toLowerCase().split(' ').join('_')
    let formattedType = {
        name: pcType.name.trim(),
        descriptions: [],
        intrusions: pcType.intrusions,
        starting_pools: pcType.stat_pool,
        starting_features: pcType.abilities,
        tier_abilities: getTierAbilities(pcType.special_abilities_per_tier, pcType.special_abilities),
    }
    pcTypes.set(typeKey,formattedType)
});

function replacer(key, value) {
    if(value instanceof Map) {
      return Object.fromEntries(value) // or with spread: value: [...value]
    } else {
      return value;
    }
  }

console.log(pcTypes.get('warrior').tier_abilities)



//console.log(JSON.stringify(Object.fromEntries(pcTypes)))
writeFileSync('./json/write/csrdTypes.json', JSON.stringify(Object.fromEntries(pcTypes), replacer), 'utf8');