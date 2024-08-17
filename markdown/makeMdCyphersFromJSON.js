import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD.json');
const CSRD = JSON.parse(CSRDJSON);

const cyphers = CSRD.cyphers;
const filePath = '../markdown/CSRD/Cyphers/';
const tagPath = 'Compendium/CSRD/en/Cyphers'

cyphers.forEach(cypher =>{
  
   const aliase = titleCase(cypher.name.toLowerCase()).trim();
   const fileName = aliase.split(' ').join('-').split("/").join("-");
                                                                                               

   let tags = [
     `- ${tagPath}`,
     "- Cypher",
   ]
  
   if (Array.isArray(cypher.tags)) {
      cypher.tags.forEach((tag)=>{
        tags.push(`- Cypher/${titleCase(tag.toLowerCase().trim()).split(" ").join("-")}`)
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

  
  let content = [`## ${aliase}`];
  const cypherLevelDice = cypher.level_dice ? `Level: ${cypher.level_dice}` : "";
  const cypherLevelMod = cypher.level_mod > 0 ? `+${cypher.level_mod}` : "";
  const cypherLevel = `${cypherLevelDice}${cypherLevelMod}`;
  if (cypherLevel.trim()) {
     content.push(`>${cypherLevel}  \n`)
  }
  if (cypher.form) {
    content.push(`>[!info] Form  \n>${titleCase(cypher.form.toLowerCase().trim())}\n`)                                                                                       
}
  content.push(`${cypher.effect}`);

  if (Array.isArray(cypher.options) && cypher.options.length > 0) {
    content.push(`\n|  Roll &nbsp; &nbsp; &nbsp; | ${aliase}  |`)
    content.push(`| ------------- | :----------- |`)
    cypher.options.forEach((option)=>{
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