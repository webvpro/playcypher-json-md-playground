import { readFileSync, writeFileSync } from 'fs'
import { titleCase } from "title-case";

const CSRDJSON = readFileSync('../CSRD-SRCS/json/CSRD_LATEST.json');
const CSRD = JSON.parse(CSRDJSON);

const foci = Object.keys(CSRD.foci.data);
const filePath = '../markdown/CSRD/Foci/';

foci.forEach(fKey =>{
   const focus =  CSRD.foci.data[fKey];
   const aliase = titleCase(focus.name.trim());
   const fileName = aliase.split(' ').join('-');
  
   let matter = [
    '---',
    `aliases:`,
    `- ${aliase}`,
    `tags:`,
    '- Foci',
    '---',
  ];
  let content = `${focus.description}  \n ### Intrusion  \n${focus.intrusion}`;
  
  //console.log(matter.join("\n"))
   const abilities = Object.keys(focus.abilities);
  //console.log(abilities)
  let tierAbilities = ['#### Tier 1  '];
  let tCount = 1;
  
   abilities.forEach(aKey =>{
    const ability = focus.abilities[aKey]
    const abilityAliase = titleCase(ability.name.trim());
    const abilityFileName = abilityAliase.split(' ').join('-');
    if (tCount < ability.tier) {
        tCount = ability.tier;
        tierAbilities.push(`#### Tier ${tCount}  `);
    } 
    let orString = ability.preselected ? "* " : "  - "
    let abilityLink = `${orString}[[${abilityFileName}|${abilityAliase}]]`;
      tierAbilities.push(abilityLink);
  });
  const fileContent = [`${matter.join("\n")}\n\n`,`## ${aliase}`,`${content} `,`${tierAbilities.join("  \n")}`].join("  \n");
  console.log(tierAbilities);
  writeFileSync(`${filePath}${fileName}.md`,fileContent);
});