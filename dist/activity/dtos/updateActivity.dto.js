"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActivityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createActivity_dto_1 = require("./createActivity.dto");
class UpdateActivityDto extends (0, mapped_types_1.PartialType)(createActivity_dto_1.CreateActivityDto) {
}
exports.UpdateActivityDto = UpdateActivityDto;
//# sourceMappingURL=updateActivity.dto.js.map