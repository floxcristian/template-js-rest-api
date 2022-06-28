require('dotenv').config();

const config = {
  API: {
    HTTP_PORT: process.env.HTTP_PORT || 3000,
    PREFIX: process.env.API_PREFIX || 'api',
    TIMEOUT_RESPONSE: +process.env.API_TIMEOUT_RESPONSE || 1500
  },
  LOG: {
    LEVEL: process.env.LOG_LEVEL || 'silly',
    FILE_ENABLED: process.env.LOG_FILE_ENABLED || true,
    CONSOLE_ENABLED: process.env.LOG_CONSOLE_ENABLED || true
  },
  HTTP_PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.AUTH_JWT_SECRET,
  MONGODB: {
    USERNAME: process.env.MONGODB_USERNAME,
    PASSWORD: process.env.MONGODB_PASSWORD,
    HOST: process.env.MONGODB_HOST,
    PORT: process.env.MONGODB_PORT || 27017,
    DATABASE: process.env.MONGODB_DATABASE
  }
};

module.exports = config;
