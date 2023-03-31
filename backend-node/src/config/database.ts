import { Db, MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const url = process.env.MONGO_URI!;
const dbName = process.env.MONGO_DBNAME!;

let db: Db;
let client: MongoClient;

const initDatabase = async () => {
  try {
    client = await MongoClient.connect(url);
    db = client.db(dbName);
    return;
  } catch (err: any) {
    console.log(`Error connecting to database ${err.message}`);
  }
};

export const getDB = async() => {
  if(!db){
    await initDatabase();
  }
  return db;
}

export function closeDB() {
  client.close();
}
