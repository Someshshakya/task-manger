# Task Management API

A RESTful API for task management with user authentication built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Task CRUD operations
- JWT token-based authentication
- MongoDB database integration
- Input validation with Joi
- Error handling middleware

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Password Hashing**: bcrypt
- **CORS**: Enabled for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd task-mangement
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=3000
NODE_ENV=development
VERSION=v1
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /v1/api/users/register` - Register a new user
- `POST /v1/api/users/login` - Login user

### Tasks
- `GET /v1/api/tasks` - Get all tasks (requires authentication)
- `POST /v1/api/tasks` - Create a new task (requires authentication)
- `PUT /v1/api/tasks/:id` - Update a task (requires authentication)
- `DELETE /v1/api/tasks/:id` - Delete a task (requires authentication)

## Deployment to Heroku

### Prerequisites
- Heroku CLI installed
- Heroku account
- MongoDB Atlas account (for cloud database)

### Steps

1. **Install Heroku CLI** (if not already installed):
```bash
# Windows
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login to Heroku**:
```bash
heroku login
```

3. **Create a new Heroku app**:
```bash
heroku create your-app-name
```

4. **Set up MongoDB Atlas**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Get your connection string
   - Replace `<password>` with your database password

5. **Configure environment variables on Heroku**:
```bash
heroku config:set NODE_ENV=production
heroku config:set VERSION=v1
heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
heroku config:set JWT_SECRET="your_secure_jwt_secret"
heroku config:set JWT_EXPIRES_IN=7d
```

6. **Deploy to Heroku**:
```bash
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

7. **Open your app**:
```bash
heroku open
```

### Environment Variables for Production

Make sure to set these in Heroku:
- `NODE_ENV=production`
- `VERSION=v1`
- `MONGODB_URI` (your MongoDB Atlas connection string)
- `JWT_SECRET` (a secure random string)
- `JWT_EXPIRES_IN=7d`

## Project Structure

```
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── Procfile              # Heroku deployment file
├── env.example           # Environment variables template
├── middleware/           # Custom middleware
├── models/              # Database models
├── routes/              # API routes
├── controllers/         # Route controllers
├── validations/         # Input validation schemas
└── library/            # Utility functions (MongoDB connection)
```

## Development

- **Start development server**: `npm run dev`
- **Start production server**: `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC 