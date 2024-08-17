import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD.json');
const CSRD = JSON.parse(CSRDJSON);

const flavors = CSRD.flavors;
const filePath = '../markdown/CSRD/Flavors/';
const tagPath = 'Compendium/CSRD/en/Flavors'

flavors.forEach(flavor =>{
  
   const aliase = titleCase(flavor.name.toLowerCase()).trim();
   const fileName = aliase.split(' ').join('-').split("/").join("-");
                                                                                               

   let tags = [
     `- ${tagPath}`,
     `- Flavor/${fileName}`,
   ]
  
   
    
   
   let matter = [
    '---',
    'aliases:',
    `- ${aliase}`,
    'tags:',
    tags.join("\n"),
    '---',
  ];

  
  let content = [`## ${aliase}`];
  content.push(flavor.description)
  let tCount = 0
  let tierAbilities = []
  flavor.abilities.forEach(ability =>{
    const abilityAliase = titleCase(ability.name.trim());
    const abilityFileName = abilityAliase.split(' ').join('-');
    if (tCount < ability.tier) {
        tCount = ability.tier;
        tierAbilities.push(`\n>[!tip]- Tier ${tCount} Abilities`);
    } 
    let abilityLink = `>[[${abilityFileName}|${abilityAliase}]]`;
      tierAbilities.push(abilityLink);
  });
  content.push(`${tierAbilities.join("\n")}\n`)
  
  
  const fileContent = [`${matter.join("\n")}\n\n`,`${content.join("  \n")}`].join("  \n");
   //console.log(fileContent);
  writeFileSync(`${filePath}${fileName}.md`,fileContent);
});