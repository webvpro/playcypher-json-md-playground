//createCSRDCreatures.js
import { readFileSync, writeFileSync } from 'fs'


const CSRD_JSON = readFileSync('./json/read/rawCSRD.json')
const CSRD = JSON.parse(CSRD_JSON)

const creatures = new Map()




// loop types 


CSRD.creatures.forEach(creature => {
    let creatureKey = creature.name.trim().toLowerCase().split(' ').join('_').toUpperCase()
    let formattedCreature = {
        name: creature.name.trim().toLowerCase(),
        level: creature.level,
        kind: creature.kind ?? 'creature',
        description: creature.description ?? 'N/A',
        combat: creature.combat ? creature.combat.split('\n') : null ,
        motive: creature.motive ?? null,
        environment: creature.environment ?? null,
        health: creature.health ?? 0,
        damage: creature.damage ?? 0,
        armor: creature.armor ?? 0,
        movement: creature.movement ?? null,
        modifications: creature.modifications ?? null,
        interactions: creature.interactions ?? null,
        use: creature.uses ?? null,
        loot: creature.loot ?? null,
        intrusions: creature.intrusions ? creature.intrusions.split('\n') : null
    
    }
    creatures.set(creatureKey,formattedCreature)
});

function replacer(key, value) {
    if(value instanceof Map) {
      return Object.fromEntries(value) // or with spread: value: [...value]
    } else {
      return value;
    }
  }



writeFileSync('./json/write/csrdCreatures.json', JSON.stringify(Object.fromEntries(creatures), replacer), 'utf8');