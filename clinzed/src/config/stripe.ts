export const stripeConfig = async (configService) => {
  const apiKey = {
    apiKey: configService.get('STRIPE_SECRET_KEY'),
    apiVersion: configService.get('STRIPE_API_VERSION'),
  };
  return apiKey;
};
