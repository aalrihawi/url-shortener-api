const ENV = process.env.NODE_ENV;

export default {
  envFilePath: !ENV ? '.env/.env' : `.env/.env.${ENV}`,
};
