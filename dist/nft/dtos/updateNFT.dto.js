"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNFTDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createNFT_dto_1 = require("./createNFT.dto");
class UpdateNFTDto extends (0, mapped_types_1.PartialType)(createNFT_dto_1.CreateNFTDto) {
}
exports.UpdateNFTDto = UpdateNFTDto;
//# sourceMappingURL=updateNFT.dto.js.map