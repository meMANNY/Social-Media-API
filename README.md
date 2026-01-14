# Social Media REST API

A RESTful API for a social media application built with Node.js, Express, and MongoDB.

## Features

- 🔐 **Authentication** - Register & Login with JWT tokens
- 👤 **User Management** - CRUD operations, follow/unfollow users
- 📝 **Posts** - Create, read, update, delete posts
- ❤️ **Likes** - Like/unlike posts
- 📰 **Timeline** - Get personalized feed from followed users

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt

## Project Structure

```
Social Media API/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── userController.js  # User logic
│   └── postController.js  # Post logic
├── middleware/
│   └── auth.js            # JWT verification
├── models/
│   ├── User.js            # User schema
│   └── Post.js            # Post schema
├── routes/
│   ├── auth.js            # Auth routes
│   ├── users.js           # User routes
│   └── posts.js           # Post routes
├── .env                   # Environment variables
├── .gitignore
├── package.json
└── index.js               # Entry point
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/social-media-api.git
   cd social-media-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. **Run the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| PUT | `/api/users/:id/follow` | Follow user |
| PUT | `/api/users/:id/unfollow` | Unfollow user |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts` | Create post |
| GET | `/api/posts/:id` | Get post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |
| PUT | `/api/posts/:id/like` | Like/unlike post |
| GET | `/api/posts/timeline/all` | Get timeline |

## Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "email": "john@example.com", "password": "123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "123456"}'
```

### Create Post (with token)
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"desc": "My first post!"}'
```

## License

MIT
