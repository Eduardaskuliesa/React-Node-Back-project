import * as dotenv from 'dotenv'

dotenv.config();

const {
    SERVER_PORT,
    SERVER_DOMAIN,
    MONGO_KEY,
} = process.env;

if(!SERVER_PORT    
 || !SERVER_DOMAIN
 || !MONGO_KEY
 ){
    throw new Error("Please define constant in '.env' file")
 }
 const config = { 
    server: {
        domain : SERVER_DOMAIN,
        port: SERVER_PORT,
    },

    mongo: {
        key: MONGO_KEY
    }
}
export default config
