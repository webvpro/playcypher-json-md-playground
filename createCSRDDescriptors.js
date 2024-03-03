//createCSRDDescriptos.js
import { readFileSync, writeFileSync } from 'fs'

const CSRD_JSON = readFileSync('./json/read/rawCSRD.json')
const CSRD = JSON.parse(CSRD_JSON)

const descriptors = new Map()




// loop types
CSRD.descriptors.forEach(descriptor => {
    let descriptorKey = descriptor.name.trim().toLowerCase().split(' ').join('').toUpperCase()
    let formattedDescriptor = {
        name: descriptor.name.trim().toLowerCase(),
        description: descriptor.description.trim(),
        characteristics: descriptor.characteristics,
        links: descriptor.links,
    }
    descriptors.set(descriptorKey,formattedDescriptor)
});

function replacer(key, value) {
    if(value instanceof Map) {
      return Object.fromEntries(value) // or with spread: value: [...value]
    } else {
      return value;
    }
  }



writeFileSync('./json/write/csrdDescriptors.json', JSON.stringify(Object.fromEntries(descriptors), replacer), 'utf8');