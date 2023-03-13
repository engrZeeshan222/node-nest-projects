"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharpPipe = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const sharp = require("sharp");
let SharpPipe = class SharpPipe {
    async transform(image) {
        const originalName = path.parse(image === null || image === void 0 ? void 0 : image.originalname).name;
        const name = Date.now() + '-' + originalName;
        const smallFilename = name + '-small.png';
        const largeFilename = name + '-large.png';
        const mediumFilename = name + '-medium.png';
        await sharp(image.buffer)
            .resize(500)
            .png({ effort: 3 })
            .toFile(path.join('uploads', smallFilename));
        await sharp(image.buffer)
            .resize(1000)
            .png({ effort: 3 })
            .toFile(path.join('uploads', largeFilename));
        await sharp(image.buffer)
            .resize(1000)
            .png({ effort: 3 })
            .toFile(path.join('uploads', mediumFilename));
        return { mediumFilename, largeFilename, smallFilename, key: name };
    }
};
SharpPipe = __decorate([
    (0, common_1.Injectable)()
], SharpPipe);
exports.SharpPipe = SharpPipe;
//# sourceMappingURL=sharp.pipe.js.map