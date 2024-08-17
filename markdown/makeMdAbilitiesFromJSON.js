import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD_LATEST.json');
const CSRD = JSON.parse(CSRDJSON);

const abilities = Object.keys(CSRD.abilities.data);
const filePath = '../markdown/CSRD/Abilities/';
const tagPath = 'Compendium/CSRD/en/Rules/Abilities'

abilities.forEach(aKey =>{
   const ability =  CSRD.abilities.data[aKey];
   const aliase = titleCase(ability.name.trim());
   const fileName = aliase.split(' ').join('-');
   const cost = ability.cost ?  ability.cost : 0;
   const tier = ability.tier ?  ability.tier : "NA";
   let tags = [
     `- ${tagPath}`,
     "- Ability",
     `- Ability/${titleCase(ability.kind.toLowerCase())}`,
     `- Ability/Cost/${cost}`,
     `- Ability/Tier/${tier}`,
   ]
   let pools = []
   if (Array.isArray(ability.pool)) {
        ability.pool.forEach((pi)=>{
          tags.push(`- Ability/Pool/${titleCase(pi)}`)
          pools.push(`${titleCase(pi)}`)
        })
                                                                                                   
   }

   if (Array.isArray(ability.category)) {
    ability.category.forEach((ac)=>{
      tags.push(`- Ability/Categories/${titleCase(ac.toLowerCase().trim()).split(" ").join("-")}`)
    })                                                                                        
}
   
   let matter = [
    '---',
    'aliases:',
    `- ${aliase}`,
    'tags:',
    tags.join("\n"),
    '---',
  ];
  const enablerPointAdd = ability.kind === "ENABLER" ? "+ ": " ";
  const poolCost = ability.cost ? `>${ability.kind} ${ability.cost}${enablerPointAdd} ${pools.join(", ")}  \n` : ""
  let content = [`## ${aliase}`];
  if(poolCost) {
    content.push(poolCost)
  }
  content.push(`${ability.description}`);
  
  
  const fileContent = [`${matter.join("\n")}\n\n`,`${content.join("  \n")}`].join("  \n");
   //console.log(fileContent);
  writeFileSync(`${filePath}${fileName}.md`,fileContent);
});