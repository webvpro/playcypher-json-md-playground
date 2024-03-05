import { readFileSync, writeFileSync } from 'fs'

const CSRD_JSON = readFileSync('../../Cypher-System-JSON-DB/CSRD.json')
const CSRD = JSON.parse(CSRD_JSON)
const compendium = new Object()

const META_KEYS= []
 const {cypher_tables}  = CSRD
 //pull some stuff for later
 const cypherKinds =  Object.entries(cypher_tables).map(kind => ({ key: kind[1].name.replace(/[\W_]+/g,"").toUpperCase(), label: kind[1].name.toLowerCase() }))

 
 const  { abilities } = CSRD

 console.log('make abilities' )

 

console.log('final', cypherKinds)