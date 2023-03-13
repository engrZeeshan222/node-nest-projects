"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeConfig = void 0;
const stripeConfig = async (configService) => {
    const apiKey = {
        apiKey: configService.get('STRIPE_SECRET_KEY'),
        apiVersion: configService.get('STRIPE_API_VERSION'),
    };
    return apiKey;
};
exports.stripeConfig = stripeConfig;
//# sourceMappingURL=stripe.js.map