import { writeFileSync } from 'fs'
import mammoth from "mammoth";


const options = {
    styleMap: [
        "p[style-name='A12'] => p.twelve",
        "p[style-name='Default'] => p",
        "p[style-name='H2-Wrap'] => h2.wrap",
        "p[style-name='H3-Wrap'] => h3.wrap",
        "p[style-name='Normal (Web)'] => section:fresh",
        
    ]
};
mammoth.convertToHtml({path: "./CSRD-SRCS/docs/Cypher-System-Reference-Document-2024-07-03.docx"}, options)
.then((result)=>{
    const html = result.value;
    const msgs = result.messages;
    console.log(msgs)
    console.log('writing/formatting html')
   writeFileSync('./CSRD-SRCS/html/formattedCSRD.html', html, 'utf8')               
}).catch((error)=>{
    console.error(error);
});