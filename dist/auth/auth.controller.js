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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const register_user_dto_1 = require("../user/dtos/register-user.dto");
const login_user_dto_1 = require("../user/dtos/login-user.dto");
const reset_request_dto_1 = require("../user/dtos/reset-request.dto");
const auth_service_1 = require("./auth.service");
const local_guard_1 = require("./guard/local.guard");
const jwt_guard_1 = require("./guard/jwt.guard");
const auth_decorator_1 = require("./decorator/auth.decorator");
const reset_password_dto_1 = require("../user/dtos/reset-password.dto");
const update_user_dto_1 = require("../user/dtos/update-user.dto");
const login_wallet_dto_1 = require("../user/dtos/login-wallet.dto");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    async register(registerUser) {
        return await this.service.register(registerUser);
    }
    async login(loginDto) {
        return await this.service.genTokenFromUsername(loginDto.username);
    }
    async loginByWallet(loginDto) {
        return await this.service.genTokenFromSign(loginDto.address, loginDto.sign);
    }
    async me(auth) {
        return await this.service.getUserFromJwtPayload(auth);
    }
    async updateProfile(auth, profile) {
        return await this.service.updateProfile(auth.id, profile);
    }
    async requestReset(payload) {
        await this.service.resetRequest(payload.email);
        return 'Email was sent';
    }
    async resetPassword(payload) {
        await this.service.resetPassword(payload);
        return 'Reset password successfully';
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(local_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('wallet_login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_wallet_dto_1.LoginWalletDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginByWallet", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('me'),
    __param(0, (0, auth_decorator_1.Auth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('profile'),
    __param(0, (0, auth_decorator_1.Auth)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('reset_request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_request_dto_1.ResetRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestReset", null);
__decorate([
    (0, common_1.Post)('reset_password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map