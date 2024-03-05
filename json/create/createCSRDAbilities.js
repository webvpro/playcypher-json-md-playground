//createCSRDAbilities.js
import { readFileSync, writeFileSync } from 'fs'

const CSRDJSON = readFileSync('./json/read/CSRD.json')
const CSRD = JSON.parse(CSRDJSON)

const abilities = new Map()

const catsFix = function(catsAry){
    let newCats = []
    catsAry.forEach(cat => {
        newCats.push(cat.trim().toLowerCase().split(' ').join('_'))
    })
    return newCats
}
// loop abilities
CSRD.abilities.forEach(ability => {
    console.log(ability.name)
    let abilityKey = ability.name.trim().toLowerCase().split(' ').join('_')
    let formattedAbility = {
        name: ability.name.trim(),
        description: ability.description.trim(),
        tier: ability.tier ? ability.tier.trim().toLowerCase() : 'low',
        cost: ability.cost,
        pool: ability.pool.length > 0 ? ability.pool[0].trim().toLowerCase() : null,
        categories: ability.category.length > 0 ? catsFix(ability.category) : null
    }
    abilities.set(abilityKey,formattedAbility)
});

console.log('done')
writeFileSync('./json/write/csrdAbilities.json', JSON.stringify(Object.fromEntries(abilities)), 'utf8');