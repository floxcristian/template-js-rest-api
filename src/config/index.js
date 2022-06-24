require("dotenv").config();

const config = {
  HTTP_PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.AUTH_JWT_SECRET,
  MONGODB: {
    USERNAME: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASS,
    HOST: process.env.MONGODB_HOST,
    PORT: process.env.MONGODB_PORT || 27017,
    DATABASE: process.env.MONGODB_NAME,
  },
};

module.exports = config;
