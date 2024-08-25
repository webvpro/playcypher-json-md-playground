import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD.json');
const CSRD = JSON.parse(CSRDJSON);

const equipment = CSRD.equipment;
const filePath = '../markdown/CSRD/Equipment/';
const tagPath = 'Compendium/CSRD/en/Equipment'

function setEqKindTag(note) {
  const feature = note.trim().split(" ")
  if(feature.includes("armor")) {
    return `- Equipment/Armor/${feature[0]}`
  }
  if(feature.includes("range")) {
    const rngIdx = feature.indexOf("range")
    feature.splice(rngIdx, 1)
    const rngTag = titleCase(feature.join(" ")).split(" ").join("-")
    return `- Equipment/Range/${rngTag}`
  }
  if(feature.includes("thrown")) {
    return `- Equipment/Weapon/Thrown`
  }
  if(feature.includes("weapon")) {
    return `- Equipment/Weapon/${titleCase(feature[0].trim())}`
  }
  if(feature.includes("Asset")) {
    return `- Equipment/Asset`
  }
   
} 

equipment.forEach(item =>{
   const aliase = titleCase(item.name.trim());
   const fileName = aliase.replace(/[()]/g, "").split(",").join("").split(" ").join("-");
   let tags = [
    `- ${tagPath}`,
    ]
   

   let content = [`## ${aliase}`];
   item.variants.forEach(variant=>{
      content.push(`  \n>${variant.description}`)
      if(variant.tags.length > 0) {
        content.push(`> **Options :** ${titleCase(variant.tags.join(", ").toLowerCase())}`)
        variant.tags.forEach( tag=> {
          tags.push(`- Equipment/${titleCase(tag.toLowerCase().replace(/[()]/g, "").split("&").join("And").trim().split(" ").join("-"))}`)
        }) 
      }
      if(variant.levels.length > 0) {
        content.push(`> **Level :** ${variant.levels.join(", ")}`)
        variant.levels.forEach( level => {
          tags.push(`- Equipment/Level/${level}`)
        }) 
      }
      if(variant.value.length > 0) {
        content.push(`> **Value :** ${titleCase(variant.value.join(", ").toLowerCase())}`)
        variant.value.forEach( val => {
          tags.push(`- Equipment/Value/${titleCase(val.toLowerCase().trim().split(" ").join("-"))}`)
        }) 
      }
      if(variant.notes.length > 0) {
        content.push(`>>[!note] Features`)
        variant.notes.forEach(note => {
          tags.push(setEqKindTag(note))
          content.push(`>> - ${note}`)
        })
      }
      
   })

   
   
   
   let matter = [
    '---',
    'aliases:',
    `- "${aliase}"`,
    'tags:',
    tags.join("\n"),
    '---',
  ];
  
  const fileContent = [`${matter.join("\n")}\n\n`,`${content.join("  \n")}`].join("  \n");
   console.log(fileContent);
  writeFileSync(`${filePath}${fileName}.md`,fileContent);
});