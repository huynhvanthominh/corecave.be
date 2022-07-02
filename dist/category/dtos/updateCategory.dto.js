"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createCategory_dto_1 = require("./createCategory.dto");
class UpdateCategoryDto extends (0, mapped_types_1.PartialType)(createCategory_dto_1.CreateCategoryDto) {
}
exports.UpdateCategoryDto = UpdateCategoryDto;
//# sourceMappingURL=updateCategory.dto.js.map