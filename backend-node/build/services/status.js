"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = void 0;
const database_1 = require("../config/database");
const status = async (req, res) => {
    try {
        const db = await (0, database_1.getDB)();
        const filestatusCollection = db.collection('filestatus');
        const statusdata = await filestatusCollection.findOne({
            pointer: 'statusDisplay',
        });
        res.status(200).send(statusdata);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.status = status;
//# sourceMappingURL=status.js.map