import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD.json');
const CSRD = JSON.parse(CSRDJSON);

const descriptors = CSRD.descriptors;
const filePath = '../markdown/CSRD/Descriptors/';
const tagPath = 'Compendiums/CSRD/en/Descriptors'

descriptors.forEach(descriptor =>{
   const aliase = titleCase(descriptor.name.toLowerCase().trim());
   const fileName = aliase.split(' ').join('-');
   let tags = [
     `- ${tagPath}`,
     "- Descriptor",
   ]
   
   let matter = [
    '---',
    'aliases:',
    `- ${aliase}`,
    'tags:',
    tags.join("\n"),
    '---',
  ];

  const content = [`## ${aliase}  \n${descriptor.description}`];
  if (Array.isArray(descriptor.characteristics)) {
    content.push('### You gain the following characteristics  ')           
    descriptor.characteristics.forEach((ci)=>{
      content.push(`> #### ${titleCase(ci.name)}\n> ${ci.description}  \n`);
    })
  }
  
  if (Array.isArray(descriptor.links)) {
    content.push('### Initial Link to the Starting Adventure  ')
    content.push('From the following list of options, choose how you became involved in the first adventure.  ')             
    descriptor.links.forEach((li)=>{
    content.push(`- ${li}  `);
  })  
}
  
  const fileContent = [`${matter.join("\n")}\n\n`,`${content.join("\n")}`].join("");
   console.log(fileContent);
  writeFileSync(`${filePath}${fileName}.md`,fileContent);
});