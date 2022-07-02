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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const register_user_dto_1 = require("../user/dtos/register-user.dto");
const ethers_1 = require("ethers");
const resetToken_schema_1 = require("./schemas/resetToken.schema");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const config_1 = require("@nestjs/config");
const update_user_dto_1 = require("../user/dtos/update-user.dto");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, tokenModel) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.tokenModel = tokenModel;
    }
    async credentialByPassword(username, password) {
        const user = await this.usersService.findOneByUsername(username);
        if (!user)
            throw new common_1.HttpException('User not found, please register', common_1.HttpStatus.NOT_FOUND);
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new common_1.HttpException('password is not correct', common_1.HttpStatus.UNAUTHORIZED);
        return user;
    }
    async genTokenFromUsername(username) {
        const user = await this.usersService.findOneByUsername(username);
        const payload = {
            username: user.username,
            id: user.id,
            address: user.address,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async genTokenFromSign(address, sign) {
        const user = await this.usersService.findByAddress(address);
        if (!user)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        const addressFromSign = ethers_1.ethers.utils.verifyMessage(user.nonce, sign);
        if (addressFromSign !== address)
            throw new common_1.HttpException('Invalid sign', common_1.HttpStatus.BAD_REQUEST);
        const payload = {
            username: user.username,
            id: user.id,
            address,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(registerUser) {
        return this.usersService.create(registerUser);
    }
    async getUserFromJwtPayload({ id }) {
        const user = await this.usersService.findOne(id);
        if (!user)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async resetRequest(email) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user)
            throw new common_1.HttpException('User does not exist', common_1.HttpStatus.NOT_FOUND);
        const token = await this.tokenModel.findOne({ userId: user.id });
        if (token)
            await token.deleteOne();
        const resetToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const hash = await bcrypt.hash(resetToken, 10);
        await new this.tokenModel({
            userId: user.id,
            token: hash,
            createdAt: Date.now(),
        }).save();
        const domain = this.configService.get('FRONTEND_URL');
        const link = `${domain}/passwordReset?token=${resetToken}&id=${user.id}`;
    }
    async resetPassword(payload) {
        const token = await this.tokenModel.findOne({ userId: payload.userId });
        if (!token) {
            throw new common_1.HttpException('Invalid or expired password reset token', common_1.HttpStatus.NOT_FOUND);
        }
        const isValid = await bcrypt.compare(payload.token, token.token);
        if (!isValid) {
            throw new common_1.HttpException('Invalid or expired password reset token', common_1.HttpStatus.NOT_FOUND);
        }
        await this.usersService.update(payload.userId, {
            password: payload.password,
        });
        await token.deleteOne();
        return true;
    }
    async updateProfile(id, payload) {
        return this.usersService.update(id, payload);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, nestjs_typegoose_1.InjectModel)(resetToken_schema_1.ResetToken)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map