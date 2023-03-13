"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fields = void 0;
const common_1 = require("@nestjs/common");
const Fields = (...fields) => (0, common_1.SetMetadata)('fields', fields);
exports.Fields = Fields;
//# sourceMappingURL=fields.decorator.js.map