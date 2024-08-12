import turndownService from 'turndown';
import * as cheerio from 'cheerio';
import fs from 'fs';
const csrdRaw = {
    filePath: './CSRD-SRCS/html/formattedCSRD.html',
    options: { encoding: 'utf8', flag: 'r' },
}


const csrdHtml = fs.readFileSync(csrdRaw.filePath,csrdRaw.options)

let $ = cheerio.load(csrdHtml);

console.log($('p:contains("How to Play the Cypher System")').html());

