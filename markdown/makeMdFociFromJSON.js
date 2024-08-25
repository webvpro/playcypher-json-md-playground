import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD.json');
const CSRD = JSON.parse(CSRDJSON);

const foci = CSRD.foci;
const filePath = '../markdown/CSRD/Foci/';

const getAbilitiesByTier = (tier, abilityAry) => {
  const tierAbilityObj = {granted:[],selections:[]}
  abilityAry.filter( ability => {
      return ability.tier === tier
  }).forEach( tierAbility =>{
      const abilityKey = titleCase(tierAbility.name.trim().toLowerCase()).split(' ').join('-')
      tierAbility.preselected ? tierAbilityObj.granted.push(abilityKey) : tierAbilityObj.selections.push(abilityKey)
  })
  return  tierAbilityObj 
}



foci.forEach(focus =>{
    const aliase = titleCase(focus.name.toLowerCase());
    const fileName = aliase.split(' ').join('-');
  
    let matter = [
    '---',
    `aliases:`,
    `- ${aliase}`,
    `tags:`,
    '- Foci',
    '---',
    ];
    let content = [`## ${aliase}`];
    content.push(`${focus.description}`)
    if (focus.note) {
      content.push(`\n>[!note] Note  \n>${focus.note} \n`)
    }

    if (focus.connections.length > 0) {
      content.push("\n>[!info]- Connections  \n>Choose one of the following, or choose one of the Focus Connections in the Cypher System Rulebook.");
      focus.connections.forEach((connection)=>{
       content.push(`>- ${connection}`)
      })
    }

    if (focus.intrusions) {
      content.push(`\n>[!info] Intrusions`)
      focus.intrusions.split(".").forEach((intrusion) => {
        if (intrusion.trim().length > 0) {
          content.push(`>- ${intrusion.trim()}.`)
        }
      })
    }

    if (focus.minor_effect) {
      content.push(`\n>[!info] Effects  \n>**Minor,** ${focus.minor_effect}`)
      content.push(`>**Major,** ${focus.major_effect}`)
    }
    
    if (focus.additional_equipment) {
      content.push(`\n>[!info] Additional Equipment  \n>${focus.additional_equipment}`)
    }

    const abilities = focus.abilities;
    const tierLimit = 6;
    if (abilities.length > 0) {
      for (let t = 0; t < tierLimit; t++) {
        content.push(`\n\n>[!tip]- Tier ${t+1} Abilities`)
        const {granted, selections} = getAbilitiesByTier(t+1, abilities)
        
        if (granted.length > 0) {
        granted.forEach((ability)=> {
          const abilityName = titleCase(ability.toLowerCase());
          content.push(`> [[${abilityName}\|${abilityName.split("-").join(" ")}]]`)
        })
        }
        if (selections.length > 0) {
          content.push(`> **Choose One**`)
          selections.forEach((choice) => {
            const abilityName = titleCase(choice);
            content.push(`>- [[${abilityName.split(" ").join("-")}\|${abilityName.split("-").join(" ")}]]`)
          })
        }
      }
    }
    
    
    
    

   
  //console.log(content.join("  \n"))
  const fileContent = [`${matter.join("\n")}\n\n`,`${content.join("  \n")}`].join("  \n");
  
  writeFileSync(`${filePath}${fileName}.md`,fileContent);
});