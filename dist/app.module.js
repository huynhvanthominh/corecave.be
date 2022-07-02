"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const upload_module_1 = require("./upload/upload.module");
const nft_module_1 = require("./nft/nft.module");
const event_module_1 = require("./event/event.module");
const category_module_1 = require("./category/category.module");
const collection_module_1 = require("./collection/collection.module");
const activity_module_1 = require("./activity/activity.module");
const schedule_1 = require("@nestjs/schedule");
const comment_module_1 = require("./comment/comment.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            nestjs_typegoose_1.TypegooseModule.forRoot(process.env.MONGO),
            schedule_1.ScheduleModule.forRoot(),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            upload_module_1.UploadModule,
            nft_module_1.NftModule,
            event_module_1.EventModule,
            category_module_1.CategoryModule,
            collection_module_1.CollectionModule,
            activity_module_1.ActivityModule,
            comment_module_1.CommentModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map