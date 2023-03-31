"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDB = exports.getDB = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const url = process.env.MONGO_URI;
const dbName = process.env.MONGO_DBNAME;
let db;
let client;
const initDatabase = async () => {
    try {
        client = await mongodb_1.MongoClient.connect(url);
        db = client.db(dbName);
        return;
    }
    catch (err) {
        console.log(`Error connecting to database ${err.message}`);
    }
};
const getDB = async () => {
    if (!db) {
        await initDatabase();
    }
    return db;
};
exports.getDB = getDB;
function closeDB() {
    client.close();
}
exports.closeDB = closeDB;
//# sourceMappingURL=database.js.map