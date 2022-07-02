"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModule = void 0;
const common_1 = require("@nestjs/common");
const activity_schema_1 = require("./schemas/activity.schema");
const activity_controller_1 = require("./activity.controller");
const activity_service_1 = require("./activity.service");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_service_1 = require("../user/user.service");
const user_schema_1 = require("../user/schemas/user.schema");
let ActivityModule = class ActivityModule {
};
ActivityModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_typegoose_1.TypegooseModule.forFeature([activity_schema_1.Activity, user_schema_1.User])],
        controllers: [activity_controller_1.ActivityController],
        providers: [activity_service_1.ActivityService, user_service_1.UserService],
        exports: [activity_service_1.ActivityService],
    })
], ActivityModule);
exports.ActivityModule = ActivityModule;
//# sourceMappingURL=activity.module.js.map