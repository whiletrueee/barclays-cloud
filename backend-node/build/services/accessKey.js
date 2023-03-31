"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessKey = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../utils/schema");
const crypto_1 = require("crypto");
const accessKey = async (req, res) => {
    const orgUser = schema_1.orgUserSchema.safeParse(req.body);
    if (!orgUser.success) {
        res.status(400).send('Invalid data');
    }
    try {
        const db = await (0, database_1.getDB)();
        const collection = db.collection('orgUserData');
        const data = orgUser.data;
        const alreadyRegisterd = await collection.findOne({
            email: data.email,
        });
        if (alreadyRegisterd) {
            const apiKey = await collection.findOne({
                email: data.email,
            });
            res.status(200).send({ apiKey: apiKey.apiKey });
        }
        else {
            const apiKey = (0, crypto_1.randomUUID)();
            const result = await collection.insertOne({
                name: data.name,
                email: data.email,
                organisation: data.organisation,
                apiKey: apiKey,
            });
            if (result.acknowledged) {
                res.status(200).send({ apiKey: apiKey });
            }
            else {
                res.status(500).send('Something went wrong');
            }
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.accessKey = accessKey;
//# sourceMappingURL=accessKey.js.map