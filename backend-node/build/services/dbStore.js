"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBStore = void 0;
const database_1 = require("../config/database");
const DBStore = async (req, res) => {
    try {
        const db = await (0, database_1.getDB)();
        const filestatusCollection = db.collection('filestatus');
        await filestatusCollection.updateOne({
            pointer: 'statusDisplay',
        }, {
            $set: {
                store_DB: 'uploaded',
            }
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.DBStore = DBStore;
//# sourceMappingURL=dbStore.js.map