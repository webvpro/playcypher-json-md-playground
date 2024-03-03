import {Client, Storage, Databases, ID, InputFile} from "node-appwrite"

const config = {
    AW_API_KEY: '8ee2610bf5e2d61536c0083649a4d63879f2b8df6361032ea1ff63a12459a5f2a027b00f9b99d815557da195d71bcf3275759462b55006c3383ec11b5ef62eb605a6669ad8ea16d0009f64b67a481335f12e554bbf63ffd23bc2858b271fa0ebc57c271e0302cc8fed4394a71045f4015c334eb42f5b4696e5ad318ec903b693',
    AW_ENDPOINT: 'https://cloud.appwrite.io/v1',
    AW_PROJECT: '65a74e2e2c1c96f03f87',
    AW_DB: '65a751efaaa5493c2e49',
    AW_COLLECTION: 'PUBLIC_COMPENDIUMS'
}

export const client = new Client()
    .setEndpoint(config.AW_ENDPOINT)
    .setProject(config.AW_PROJECT)
    .setKey(config.AW_API_KEY)

export const storage = new Storage(client)
export {ID}
export {InputFile}
export const databases = new Databases(client)
