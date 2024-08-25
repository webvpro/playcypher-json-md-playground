import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD.json');
const CSRD = JSON.parse(CSRDJSON);

const artifacts = CSRD.artifacts;
const filePath = '../markdown/CSRD/Artifacts/';
const tagPath = 'Compendium/CSRD/en/Artifacts'

artifacts.forEach(artifact =>{
  
   const aliase = titleCase(artifact.name.toLowerCase()).trim();
   const fileName = aliase.split(' ').join('-').split("/").join("-");
                                                                                               

   let tags = [
     `- ${tagPath}`,
     "- Artifact",
   ]
   if (Array.isArray(artifact.tags)) {
    artifact.tags.forEach((tag)=>{
        tags.push(`- Artifact/${titleCase(tag.toLowerCase().trim()).split(" ").join("-")}`)
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
  const artifactStats = []
  const artifactLevelDice = artifact.level_dice ? `${artifact.level_dice}` : "";
  const artifactLevelMod = artifact.level_mod > 0 ? `+${artifact.level_mod}` : "";
  const artifactLevel = `${artifactLevelDice}${artifactLevelMod}`;
    
  artifactStats.push(`>[!info] Stats`) 
  if (artifactLevel.trim()) {
    artifactStats.push(`> **Level:** ${artifactLevel}`)
  }                  
  if (artifact.form) {
    artifactStats.push(`> **Form:** ${titleCase(artifact.form.toLowerCase())}`)
  }
  if (artifact.depletion) {
    artifactStats.push(`> **Depletion:** ${titleCase(artifact.form.toLowerCase())}`)
  }

  if (artifact.tags.length > 0) {
    artifactStats.push(`> **Kind:** ${titleCase(artifact.tags.join(" ,").toLowerCase())}`)  
  }  
  if(artifactStats.length > 1) {
    content.push(`${artifactStats.join("  \n")}\n`)
  }
  content.push(`${artifact.effect}`);

  if (Array.isArray(artifact.options) && artifact.options.length > 0) {
    artifact.options.forEach((option)=>{
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