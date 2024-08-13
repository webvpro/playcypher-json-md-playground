import { readFileSync, writeFileSync } from 'fs'

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD_LATEST.json')
const CSRD = JSON.parse(CSRDJSON);

const foci = Object.keys(CSRD.foci.data)
const filePath = '../markdown/CSRD/Foci/'

foci.forEach(fKey =>{
   const focus =  CSRD.foci.data[fKey]
   let matter = [
    '---',
    `aliases:`,
    `- ${focus.name}`,
    `tags:`,
    '- Compendium/CSRD/en/Foci',
    '---',
  ];
  let content = `${focus.description}\n ### Intrusion\n${focus.intrusion}`
  
  //console.log(matter.join("\n"))
   const abilities = Object.keys(focus.abilities)
  //console.log(abilities)
  let tierAbilities = ['#### Tier 1']
  let tCount = 1  
  
   abilities.forEach(aKey =>{
    const ability = focus.abilities[aKey]
    if (tCount < ability.tier) {
        tCount = ability.tier
        tierAbilities.push(`#### Tier ${tCount}`)
    } 
    const choiceText = ability.preselected ? `` : `-or-`
    let abilityStr = `[[${ability.name}]]${choiceText}`
    tierAbilities.push(abilityStr)
  })
  const fileName = focus.name.trim().split(' ').join('-')
  const fileContent = [`${matter}\n`,`${content}\n`,`${tierAbilities.join("\n")}\n`].join("\n")
  
  console.log(fileContent)
  writeFileSync(`${filePath}${fileName}.md`,fileContent);
});