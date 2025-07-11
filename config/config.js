const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
  },
  cors: {
    origins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001'
    ],
    credentials: true,
  },
  file: {
    maxFileSize: process.env.MAX_FILE_SIZE || '50MB',
  },
}; 