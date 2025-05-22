# 🎬 Movie Management Backend API

A Node.js backend built with Express, MongoDB, and JWT that supports viewing, adding, editing, deleting, and searching for movies. Role-based authentication is implemented for users and admins.

---

## 🚀 Features

- User authentication (Signup, Login, Logout)
- Role-based access control (Admin & User)
- Movie CRUD functionality
- Search movies by name or description
- Sort movies by name, rating, release date, or duration
- MongoDB with Mongoose for data storage
- JWT-based secure authentication

---

## 🧑‍💻 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv (for env config)
- bcryptjs (for password hashing)

---

## 📁 Project Structure

```
backend/
├── controllers/
├── middlewares/
├── models/
│   ├── Movie.js
│   └── User.js
├── routes/
│   ├── auth.route.js
│   └── movies.route.js
├── utils/
│   └── db.js
├── .env
├── server.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/movie-backend.git
cd movie-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file at the root and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the Server

```bash
npm run start  # For development (with nodemon)
```

Server will start on:  
```
http://localhost:5000
```

---

## 🔐 Authentication Routes

| Method | Route              | Description             |
|--------|-------------------|-------------------------|
| POST   | /api/auth/signup   | Register a new user     |
| POST   | /api/auth/login    | Login and get token     |
| POST   | /api/auth/logout   | Logout (client-side)    |

---

## 🎞️ Movie Routes

| Method | Route                                 | Access     | Description                    |
|--------|----------------------------------------|------------|--------------------------------|
| GET    | /api/movie                            | Public     | Get all movies                 |
| GET    | /api/movie/sorted?by=name|rating|...  | Public     | Get sorted movies              |
| GET    | /api/movie/search?query=...           | Public     | Search movies                  |
| POST   | /api/movie                            | Admin Only | Add a new movie                |
| PUT    | /api/movie/:id                        | Admin Only | Update a movie                 |
| DELETE | /api/movie/:id                        | Admin Only | Delete a movie                 |

---

## 🔑 Role-Based Access

- `user` → Can view and search movies
- `admin` → Can also add, update, delete movies

---

## 🔄 Sample Movie Object

```json
{
  "name": "Inception",
  "rating": 8.8,
  "releaseDate": "2010-07-16",
  "duration": "2h 28m",
  "description": "A thief who steals corporate secrets through the use of dream-sharing technology...",
  "image": "https://image-url.com/inception.jpg"
}
```

---

## 🧪 Postman Testing Tips

1. First **signup** or **login** to get a token.
2. Use the token in `Authorization` header as:

```
Authorization: Bearer <your_token>
```

3. Then call `/api/movie` routes with proper access.

---

## 📝 License

MIT License © 2025

---

## 🙋‍♂️ Need Help?

If you run into issues, feel free to raise an issue or ask for help.