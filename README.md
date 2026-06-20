# Notes App Backend

Backend API for a full-stack Notes Management Application built with Node.js, Express, MongoDB, and JWT Authentication.

The API provides secure user authentication and complete CRUD functionality for managing notes.

## Live API

https://your-render-url.onrender.com

## Features

* User Registration
* User Login
* JWT Authentication
* Password Hashing using Bcrypt
* Create Notes
* Read Notes
* Update Notes
* Delete Notes
* Pin/Unpin Notes
* Tag Management
* MongoDB Integration
* RESTful API Architecture

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* Bcrypt
* CORS
* Dotenv

## Project Structure

```bash
backend/
├── users/
├── tasks/
├── middleware/
├── index.js
├── package.json
└── .env
```

## Installation

Clone the repository:

```bash
git clone <backend-repository-url>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_CONNECTION=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm run dev
```

For production:

```bash
npm start
```

## API Endpoints

### Authentication

```http
POST /register
POST /login
```

### Notes

```http
GET    /notes
POST   /notes
PUT    /notes/:id
DELETE /notes/:id
PATCH  /notes/:id/pin
```

## Security

* JWT Authentication
* Password Hashing with Bcrypt
* Protected Routes
* Environment Variables
* CORS Configuration

## Database Schema

### User

```js
{
  username: String,
  email: String,
  password: String
}
```

### Note

```js
{
  title: String,
  description: String,
  content: String,
  tags: [String],
  pinned: Boolean,
  createdAt: Date
}
```

## Frontend Repository

https://github.com/yourusername/notes-frontend

## Deployment

* Backend Hosted on Render
* Database Hosted on MongoDB Atlas

## Author

Nikhil Kumar
