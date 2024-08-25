import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD.json');
const CSRD = JSON.parse(CSRDJSON);

const creatures = CSRD.creatures;
const filePath = '../markdown/CSRD/Creatures-NPCs/';
const tagPath = 'Compendium/CSRD/en/Creatures-NPCs'

creatures.forEach(creature =>{
   const aliase = titleCase(creature.name.toLowerCase().trim())
   .split("(").join("")
   .split(")").join("");
   const fileName = aliase.split(' ')
   .join('-').split("/").join("-");
                                                                                               

   let tags = [
     `- ${tagPath}`,
     "- Creature",
   ]
   tags.push(`- Creature/Kind/${creature.kind ?? "NA"}`)
   tags.push(`- Creature/Level/${creature.level}`)
   tags.push(`- Creature/Armor/${creature.armor}`)
   tags.push(`- Creature/Health/${creature.health}`)
   
   let matter = [
    '---',
    'aliases:',
    `- ${aliase}`,
    'tags:',
    tags.join("\n"),
    '---',
  ];

  let content = [`## ${aliase}`];
  content.push(`${creature.description}  \n\n`)
  content.push(`> **Level :** ${creature.level ?? "NA"}`)  
  content.push(`> **Health :** ${creature.health ?? "NA"}`)
  content.push(`> **Damage :** ${creature.damage ?? "NA"}`)
  content.push(`> **Armor :** ${creature.armor ?? "NA"}`)
  content.push(`> **Movement :** ${creature.movement ?? ""}`)
  if(creature.modifications.length > 0) {
    content.push(`> **Modifications**`)
    creature.modifications.forEach((mod)=>{
      content.push(`>- ${mod} >\n>`)
    })
  }
  content.push(`> **Environment: ** ${creature.environment ?? "NA"}`)
  content.push(`> **Interactions: ** ${creature.interactions ?? "NA"}`)
  content.push(`> **Uses: **${creature.uses ?? "NA"}`)
  content.push(`> **Loot: **${creature.loot ?? "NA"}`)
  content.push(`> **GM Intrusion: ** ${creature.uses ?? "NA"}`)
  content.push(`\n> **Combat:** \n> ${creature.combat}  \n`)
  content.push(`\n> **Intrusions: ** \n> ${creature.intrusions ?? "none"}  \n`)

  if (Array.isArray(creature.options) && creature.options.length > 0) {
    creature.options.forEach((option)=>{
    content.push(`\n|  Roll &nbsp; &nbsp; &nbsp; | ${titleCase(option.name.toLowerCase())}  |`)
    content.push(`| ------------- | :----------- |`)
      option.table.forEach((tr)=>{
        const numCol = tr.start === tr.end ? tr.start : `${tr.start}-${tr.end}`
        content.push(`| ${numCol} | ${tr.entry} |`)
      });
    });                                                                                       
  };
  
  
  const fileContent = [`${matter.join("\n")}\n\n`,`${content.join("  \n")}`].join("  \n");
   //console.log(fileContent);
  writeFileSync(`${filePath}${fileName}.md`,fileContent);
});