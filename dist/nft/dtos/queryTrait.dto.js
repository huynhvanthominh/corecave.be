"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryTraitDto = void 0;
const query_dto_1 = require("../../global/dtos/query.dto");
const class_validator_1 = require("class-validator");
const traitType_enum_1 = require("../interfaces/traitType.enum");
class QueryTraitDto extends query_dto_1.QueryDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryTraitDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryTraitDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryTraitDto.prototype, "group", void 0);
exports.QueryTraitDto = QueryTraitDto;
//# sourceMappingURL=queryTrait.dto.js.map