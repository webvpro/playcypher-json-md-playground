//sync aw doc
import { readFileSync, writeFileSync } from 'fs'
import {storage,ID, InputFile} from '../../modules/appwrite.js'
const AW_PUBLIC_BUCKET='65a9f066590fe714f6cc'
const AW_CSRD_ID = 'CSRD'



//if CSRD Exists Delete and make new
let haveCSRD = false
try {
  console.log("remove current CSRD")
  await storage.deleteFile(AW_PUBLIC_BUCKET, AW_CSRD_ID)
} catch (error) {
  console.log(error)
} finally {
  await storage.createFile(AW_PUBLIC_BUCKET, AW_CSRD_ID, InputFile.fromPath('../write/CSRD-UPDATE.json', 'CSRD_LATEST.json'));
  console.log('CSRD Uploaded')
}



