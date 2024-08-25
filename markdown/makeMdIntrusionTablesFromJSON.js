import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD.json');
const CSRD = JSON.parse(CSRDJSON);

const tables = CSRD.intrusion_tables;
const filePath = '../markdown/CSRD/Tables/';
const tagPath = 'Compendiums/CSRD/en/Tables'

tables.forEach(table =>{
   
   const aliase = titleCase(table.name.toLowerCase().trim());
   const fileName = aliase.split(' ').join('-');
   let tags = [
     `- ${tagPath}`,
     `- Table/Intrusion/${fileName}`,
   ]
   
   let matter = [
    '---',
    'aliases:',
    `- ${aliase}`,
    'tags:',
    tags.join("\n"),
    '---',
  ];

  const content = [`## ${aliase} Table`];
  if(Array.isArray(table.table)) {
    content.push(`|  Roll &nbsp; &nbsp; | ${aliase}  |`)
    content.push(`| ------------- | :----------- |`)

    table.table.forEach((tr)=> {
     const numCol = tr.start === tr.end ? tr.start : `${tr.start}-${tr.end}`
     content.push(`| ${numCol} | ${tr.entry} |`)
    })
  }
  
  const fileContent = [`${matter.join("\n")}\n\n`,`${content.join("\n")}`].join("");
   console.log(fileContent);
  writeFileSync(`${filePath}${fileName}.md`,fileContent);
});