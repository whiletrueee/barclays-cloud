"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlueStatusUpdate = void 0;
const database_1 = require("../config/database");
const GlueStatusUpdate = async (req, res) => {
    try {
        const db = await (0, database_1.getDB)();
        const filestatusCollection = db.collection('filestatus');
        await filestatusCollection.updateOne({
            pointer: 'statusDisplay',
        }, {
            $set: {
                glue: 'processed',
                store_DB: 'uploading',
            },
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.GlueStatusUpdate = GlueStatusUpdate;
//# sourceMappingURL=glueStatusUpdate.js.map