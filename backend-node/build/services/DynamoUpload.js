"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamoUpload = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const client = new client_dynamodb_1.DynamoDB({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIAR3FILEQWNUUYJC7O',
        secretAccessKey: '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',
    },
});
const dynamoUpload = async (req, res) => {
    const dataArray = req.body;
    console.log(dataArray);
    if (!dataArray) {
        res.status(400).send('No data found');
    }
    const params = {
        RequestItems: {
            userTable: dataArray.map((item) => {
                return {
                    PutRequest: {
                        Item: (0, util_dynamodb_1.marshall)(item),
                    },
                };
            }),
        },
    };
    try {
        const results = await client.batchWriteItem(params);
        res.status(200).send(results);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.dynamoUpload = dynamoUpload;
//# sourceMappingURL=DynamoUpload.js.map