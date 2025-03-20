# Blog API Project 🚀

## 📝 Description

A RESTful API for a blog platform built with Node.js, Express, and MongoDB. The API supports user authentication, post management, and commenting system with proper authorization controls.

## ✨ Features

### 👤 User Management

- User registration and authentication
- JWT-based authentication
- Role-based authorization (admin, user)

### 📚 Post Management

- CRUD operations for blog posts
- Author-only post updates
- Admin privileges for post deletion
- Input validation

### 💬 Comment System

- Comment creation and deletion
- Comments linked to posts and users
- Populated responses with comment details

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Express-validator for input validation

## 🔄 API Endpoints

### 🔐 Authentication

```http
POST /api/auth/register  # Register new user
POST /api/auth/login     # Login user
```

### 📝 Posts

```http
GET    /api/posts        # Get all posts
GET    /api/posts/:id    # Get single post
POST   /api/posts        # Create new post (auth required)
PUT    /api/posts/:id    # Update post (author only)
DELETE /api/posts/:id    # Delete post (author/admin only)
```

### 💬 Comments

```http
GET    /api/posts/:postId/comments  # Get post comments
POST   /api/posts/:postId/comments  # Add comment (auth required)
DELETE /api/comments/:id            # Delete comment (author only)
```

## 🚀 Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Create .env file
echo "" > .env
```

## ⚙️ Environment Variables

Create a `.env` file with:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## 🏃‍♂️ Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📁 Project Structure

```
Blog_API/
├── Controllers/
│   ├── authController.js
│   ├── postController.js
│   └── commentController.js
├── Models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── Middlewares/
│   └── validators/
│       ├── postValidator.js
│       └── commentValidator.js
├── Routes/
│   ├── authRoutes.js
│   ├── postRoutes.js
│   └── commentRoutes.js
└── server.js
```

## 🔧 Error Handling

- ✅ Proper HTTP status codes
- ✅ Validation error messages
- ✅ MongoDB error handling
- ✅ Authentication/Authorization errors

## 🔒 Security Features

- Password hashing
- JWT authentication
- Input validation
- Role-based access control

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by AIT EL KADI Mohamed
