"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMessageThreadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_message_thread_dto_1 = require("./create-message-thread.dto");
class UpdateMessageThreadDto extends (0, swagger_1.PartialType)(create_message_thread_dto_1.CreateMessageThreadDto) {
}
exports.UpdateMessageThreadDto = UpdateMessageThreadDto;
//# sourceMappingURL=update-message-thread.dto.js.map