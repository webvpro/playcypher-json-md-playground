//createCSRDCyphers.js
import { readFileSync, writeFileSync } from 'fs'
import { getEnabledCategories } from 'trace_events'

const CSRD_JSON = readFileSync('./json/read/CSRD.json')
const CSRD = JSON.parse(CSRD_JSON)

const cyphers = new Map()




// loop types
const formatOptions = (optAry) => {
    if (!optAry)
    return []

    const opts = []
    optAry.forEach(option => {
    const opt = {
        range: {},
        description: option.entry
    }
    if (option.start && option.end){
        opt.range.start = option.start,
        opt.range.end = option.end
    }
    opts.push(opt)
    })
    return opts
}

CSRD.cyphers.forEach(cypher => {
    let cypherKey = cypher.name.trim().toLowerCase().split(' ').join('_')
    let formattedCypher = {
        name: cypher.name.trim().toLowerCase(),
        level: {dice: cypher.level_dice, mod:cypher.level_mod},
        effect: cypher.effect,
        options: formatOptions(cypher.options),
        categories: cypher.kinds
    }
    cyphers.set(cypherKey,formattedCypher)
});

function replacer(key, value) {
    if(value instanceof Map) {
      return Object.fromEntries(value) // or with spread: value: [...value]
    } else {
      return value;
    }
  }



writeFileSync('./json/write/csrdCyphers.json', JSON.stringify(Object.fromEntries(cyphers), replacer), 'utf8');