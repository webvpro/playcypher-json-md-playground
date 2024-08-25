import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD.json');
const CSRD = JSON.parse(CSRDJSON);

const abilities = CSRD.abilities;
const filePath = '../markdown/CSRD/Abilities/';
const tagPath = 'Compendium/CSRD/en/Abilities'

abilities.forEach(ability =>{
   const aliase = titleCase(ability.name.trim());
   const fileName = aliase.split(' ').join('-');
   const cost = ability.cost ?  ability.cost : "NA";
   const tier = ability.tier ?  ability.tier : "NA";
   const descriptionAry = ability.description.split(".")
   const kind = descriptionAry[descriptionAry.length -2].trim() === "Enabler" ? "Enabler" : "Action"
   

   let tags = [
     `- ${tagPath}`,
     "- Ability",
     `- Ability/${titleCase(kind.toLowerCase())}`,
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

   if (Array.isArray(ability.category) && ability.category.length > 0) {
      ability.category.forEach((ac)=>{
        tags.push(`- Ability/Categories/${titleCase(ac.toLowerCase().trim()).split(" ").join("-")}`)
      })                                                                                        
   } else {
    tags.push(`- Ability/Categories/NA`)
   }
   
   let matter = [
    '---',
    'aliases:',
    `- "${aliase}"`,
    'tags:',
    tags.join("\n"),
    '---',
  ];
  let content = [`## ${aliase}`];
  const stats = []
  if(kind){
    stats.push(`>**${kind}**`)
  }
  if(ability.cost_rendered){
    stats.push(`>${ability.cost_rendered}`)
  }
  if(stats.length > 0){
    content.push(`${stats.join("  \n")}\n`)
  }
  

  content.push(`${ability.description}`);
   
  const fileContent = [`${matter.join("\n")}\n\n`,`${content.join("  \n")}`].join("  \n");
   console.log(fileContent);
  writeFileSync(`${filePath}${fileName}.md`,fileContent);
});