"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Upload = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = __importDefault(require("fs"));
const database_1 = require("../config/database");
const s3Client = new client_s3_1.S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIAR3FILEQWNUUYJC7O',
        secretAccessKey: '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',
    },
});
const s3Upload = async (req, res) => {
    const apiKey = req.headers['api-key'];
    if (!apiKey) {
        res.status(401).send('Missing API Key in header');
    }
    const file = req.file;
    if (!file) {
        res.status(400).send('No data found');
    }
    try {
        const db = await (0, database_1.getDB)();
        const collection = db.collection('orgUserData');
        const validate = await collection.findOne({
            apiKey,
        });
        if (validate) {
            const data = fs_1.default.readFileSync(file.path);
            fs_1.default.unlink(file.path, err => {
                if (err) {
                    console.error(err);
                    return;
                }
                //file removed
            });
            const params = {
                Bucket: 'csvbarclay',
                Key: file.originalname,
                Body: data,
            };
            const command = new client_s3_1.PutObjectCommand(params);
            const result = await s3Client.send(command);
            console.log(`File uploaded successfully. ${result}`);
            res.send('File uploaded successfully to S3');
        }
        else {
            throw { message: 'Invalid API Key' };
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.s3Upload = s3Upload;
//# sourceMappingURL=s3Upload.js.map