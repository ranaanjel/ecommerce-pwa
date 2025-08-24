// only the connection for the database - 4 document in case of mongodb
import { MongoClient, ServerApiVersion } from "mongodb"

const MONGO_URL = process.env.DATABASE_URL;
if (!MONGO_URL) {
    process.exit(1) 
}

declare global {
   var _mongoClient : MongoClient | null;
}
let mongoClientPromise = Promise<MongoClient>

if(process.env.NODE_ENV == "development") {
    if(!global._mongoClient) {
        global._mongoClient = null
    }
}

async function getMongoClient() {
    if(process.env.NODE_ENV == "development" && global._mongoClient) {
        return global._mongoClient;
    }
    const client =new MongoClient(MONGO_URL!, {
        serverApi :{
            version:ServerApiVersion.v1,
            strict:true,
            deprecationErrors:true
        }
    })
    await client.connect();

    if(process.env.NODE_ENV == "development") {
        global._mongoClient = client;
    }

    return client;
}

export const client = getMongoClient()