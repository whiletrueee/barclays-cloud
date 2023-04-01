"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DynamoUpload_1 = require("../services/DynamoUpload");
const accessKey_1 = require("../services/accessKey");
const s3Upload_1 = require("../services/s3Upload");
const multer_1 = __importDefault(require("multer"));
const glueStatusUpdate_1 = require("../services/glueStatusUpdate");
const dbStore_1 = require("../services/dbStore");
const status_1 = require("../services/status");
exports.default = () => {
    const app = (0, express_1.Router)();
    const upload = (0, multer_1.default)({ dest: 'uploads/' });
    app.post('/dynamoUpload', DynamoUpload_1.dynamoUpload);
    app.post('/accessKey', accessKey_1.accessKey);
    app.post('/bucketUpload', upload.single('file'), s3Upload_1.s3Upload);
    app.get('/glueStatusUpdate', glueStatusUpdate_1.GlueStatusUpdate);
    app.get('/dbStoreUpdate', dbStore_1.DBStore);
    app.get('/status', status_1.status);
    return app;
};
//# sourceMappingURL=index.js.map