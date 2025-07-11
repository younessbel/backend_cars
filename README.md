# Mechanic Backend

A Node.js + Express.js + MySQL backend for a mechanics app. Supports user authentication, car part browsing, purchases, and saved parts.

## Features
- User signup/login (JWT)
- Browse car brands and parts
- Buy serial number info for car models
- Save favorite parts
- Admin CRUD for car parts
- **CORS enabled for web app integration**

## Tech Stack
- Node.js, Express.js
- MySQL (via Sequelize ORM)
- JWT Auth, bcrypt
- Input validation (express-validator)
- CORS for cross-origin requests

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=mechanic
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=1d
   MAX_FILE_SIZE=50MB
   CORS_ORIGINS=http://localhost:3000,http://localhost:3001
   ```
4. Set up the MySQL database and run migrations (see `prisma/schema.prisma` or Sequelize models)
5. Start the server:
   ```bash
   npm run dev
   ```

## Web App Integration

### CORS Configuration
The backend is configured to accept requests from common web app ports:
- `http://localhost:3000` (React default)
- `http://localhost:3001` (React alternative)
- `http://localhost:8080` (Vue.js default)
- `http://127.0.0.1:3000` and `http://127.0.0.1:3001`

### Frontend Example (JavaScript)
```javascript
// Login example
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Protected request example
const getProfile = async (token) => {
  const response = await fetch('http://localhost:5000/api/users/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
  return response.json();
};
```

### Health Check
Test if the server is running:
```bash
curl http://localhost:5000/health
```

## API Endpoints

- `POST /api/auth/signup` — Register
- `POST /api/auth/login` — Login
- `GET /api/users/me` — Get profile
- `PUT /api/users/me` — Update profile
- `GET /api/car-parts` — List parts
- `GET /api/car-parts/:id` — Part details
- `POST /api/car-parts` — Add part (admin)
- `PUT /api/car-parts/:id` — Update part (admin)
- `DELETE /api/car-parts/:id` — Delete part (admin)
- `POST /api/purchases` — Buy part
- `GET /api/purchases` — My purchases
- `GET /api/purchases/:id` — Purchase details
- `POST /api/saved-parts` — Save part
- `GET /api/saved-parts` — List saved
- `DELETE /api/saved-parts/:id` — Unsave part

## Notes
- Protect endpoints with `Authorization: Bearer <token>`
- See `prisma/schema.prisma` for DB schema
- CORS is enabled for web app integration
- Health check available at `/health` 