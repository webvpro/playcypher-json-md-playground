import turndownService from 'turndown';
import * as cheerio from 'cheerio';
import fs from 'fs';
const ogHtml = {
    filePath: './CSRD-SRCS/html/og-csrd.html',
    options: { encoding: 'utf8', flag: 'r' },
}


const csrdHtml = fs.readFileSync(ogHtml.filePath,ogHtml.options)

let $ = cheerio.load(csrdHtml);

const docQ = {
    chapters: {
        container: "part0",
        toc: "ul.og-csrd-toc > ul>li"
    }
}

const toc = $("#part0 ul.og-csrd-toc").children('li');
toc.each((i, ele)=>{
   console.log($(ele).html())
})






