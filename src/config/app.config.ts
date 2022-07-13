export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  title: 'API Gateway',
  description: 'Main Connection Point',
  version: '1.0',
  swaggerRoute: '',
  globalPrefix: 'v1',
});
