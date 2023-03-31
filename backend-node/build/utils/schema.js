"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orgUserSchema = void 0;
const zod_1 = require("zod");
exports.orgUserSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    organisation: zod_1.z.string(),
});
//# sourceMappingURL=schema.js.map