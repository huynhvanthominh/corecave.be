"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCollectionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createCollection_dto_1 = require("./createCollection.dto");
class UpdateCollectionDto extends (0, mapped_types_1.PartialType)(createCollection_dto_1.CreateCollectionDto) {
}
exports.UpdateCollectionDto = UpdateCollectionDto;
//# sourceMappingURL=updateCollection.dto.js.map