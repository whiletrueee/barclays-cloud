"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DynamoUpload_1 = require("../services/DynamoUpload");
const accessKey_1 = require("../services/accessKey");
exports.default = () => {
    const app = (0, express_1.Router)();
    app.post('/dynamoUpload', DynamoUpload_1.dynamoUpload);
    app.post('/accessKey', accessKey_1.accessKey);
    return app;
};
//# sourceMappingURL=index.js.map