# 🎬 Full-Stack Movie Management Application

This repository contains a **full-stack** movie management application with:

- **Backend**: Node.js, Express, MongoDB, JWT, role-based authentication (admin & user)
- **Frontend**: React (Vite), Redux Toolkit, React Router v6, Material UI, Tailwind CSS (optional)

You can view, search, filter, paginate, add, edit, and delete movies.

---

## 🚀 Project Structure

```
my-project-repo/
├── backend/                # Backend server code (Node.js + Express)
│   ├── middlewares/
│   ├── models/
│   │   ├── movie.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── movies.route.js
│   ├── utils/
│   │   └── db.js
│   ├── .env.example
│   ├── index.js
│   └── package.json
│
└── frontend/               # Frontend (React + Vite)
    ├── public/
    ├── src/
    │   ├── app/
    │   │   └── store.js
    │   ├── assets/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── authSlice.js
    │   │   │   ├── Login.jsx
    │   │   │   └── Signup.jsx
    │   │   └── movies/
    │   │       ├── movieSlice.js
    │   │       ├── MovieCard.jsx
    │   │       ├── MovieList.jsx
    │   │       └── AdminMovieForm.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Search.jsx
    │   │   └── AdminPanel.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── index.css
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── vite.config.js
    ├── .gitignore
    └── package.json
```

---

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   PORT=5000
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
5. Server runs at `http://localhost:5000/api`

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure you import Tailwind or MUI in `index.css` and `main.jsx`.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. App runs at `http://localhost:5173`

---

## 🔐 Authentication

- **Signup**: `POST /api/auth/signup`
- **Login**: `POST /api/auth/login`
- **Logout**: Client-side token removal

### Roles
- **User**: View/search/filter movies
- **Admin**: Add, update, delete movies

---

## 🎞️ API Endpoints

### Movies
- `GET /api/movie` – List all movies
- `GET /api/movies/sorted?by=<field>` – Sort by name, rating, releaseDate, duration
- `GET /api/movie/search?q=<query>` – Search by title or description
- `POST /api/movies` – Create movie (admin only)
- `PUT /api/movies/:id` – Update movie (admin only)
- `DELETE /api/movies/:id` – Delete movie (admin only)

---

## 📦 Deployment

Deploy backend and frontend separately:

- **Backend**: Heroku, Render, Vercel (Serverless), DigitalOcean
- **Frontend**: Vercel, Netlify, GitHub Pages, Firebase Hosting

Configure environment variables in your platform.

---

## ❓ Troubleshooting

- **404 on `/api`**: Ensure backend is running on correct port.
- **Blank page**: Ensure `<BrowserRouter>` wraps `<App />` without duplicate renders.
- **Missing buttons**: Pass `isAdmin={true}` down to `MovieCard`.

---

## 📝 License

MIT © 2025