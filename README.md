# Survey Form Backend API

## Project Overview

This is the backend part of a MERN stack survey form application. It provides RESTful API endpoints for handling survey form submissions and admin authentication.

## Features

- **Survey Submission API**: Endpoint for storing survey form data
- **Admin Authentication**: JWT-based authentication system with HTTP-only cookies
- **Survey Data Management**: Endpoints for fetching and managing survey submissions
- **MongoDB Integration**: Persistent data storage using MongoDB
- **TypeScript Implementation**: Type-safe server-side codebase

## Tech Stack

- Node.js
- Express 4.21.2
- TypeScript
- MongoDB with Mongoose 8.12.1
- JWT Authentication
- Cookie-parser
- CORS

## Project Structure

```
server/
├── src/
│   ├── config/              # Configuration files
│   │   ├── CookieConfig.ts
│   │   ├── HttpStatusCodes.ts
│   │   └── Roles.ts
│   ├── controllers/         # Request handlers
│   │   ├── adminController.ts
│   │   └── surveyController.ts
│   ├── middlewares/         # Express middlewares
│   │   ├── adminAuthMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── models/              # MongoDB schemas
│   │   └── Survey.ts
│   ├── routes/              # API routes
│   │   ├── adminRoutes.ts
│   │   └── surveyRoutes.ts
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server entry point
├── .env                     # Environment variables
└── tsconfig.json            # TypeScript configuration
```

## API Endpoints

### Survey Endpoints
- `POST /api/surveys` - Submit a new survey

### Admin Endpoints
- `POST /api/admin/login` - Admin login
- `GET /api/admin/logout` - Admin logout
- `GET /api/admin/check-auth` - Verify admin authentication
- `GET /api/admin/surveys` - get survey data

## Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB connection string

### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/ashishalexander/survey-form-backend
   cd survey-form-backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI
   PORT=5000
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=Admin123@
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. The API will be available at `http://localhost:5000/api`

## Build for Production

```bash
npm run build
```

## Deployment

The backend is deployed on Render:
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command to `npm install && npm run build`
4. Set the start command to `npm start`
5. Configure environment variables (MONGO_URI, PORT, ADMIN_EMAIL, ADMIN_PASSWORD)

## Development Approach

The backend follows a simplified MVC architecture without a separate service layer:
- Routes define the API endpoints
- Controllers handle the HTTP requests/responses and business logic
- Models define the database schemas

This approach was chosen to simplify development and avoid unnecessary complexity for a small-scale application.

## Security Features

- JWT authentication for admin access
- HTTP-only cookies for storing access tokens
- Middleware for protected routes
- Environment variables for sensitive information

## Related Repositories

This project is part of a MERN stack application:
- Backend (current repository): API server for the survey form application
- Frontend: [survey-form-client](https://github.com/ashishalexander/survey-form-client) - User interface for collecting survey data

## License

MIT

## Author

Ashish Alexander