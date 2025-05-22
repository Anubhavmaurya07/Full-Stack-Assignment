const express = require("express");
const router = express.Router();
const Movie = require("../models/movies.model.js");
const { authenticate } = require("../middlewares/auth.middleware.js");

// Role checker middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// All Movies
router.get("/movie", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies" });
  }
});

// Sorted Movies
// Example: /movies/sorted?by=rating
router.get("/movie/sorted", async (req, res) => {
  const sortBy = req.query.by;
  const validFields = ["title", "rating", "releaseDate", "duration"];
  if (!validFields.includes(sortBy)) {
    return res.status(400).json({ message: "Invalid sort field" });
  }

  try {
    const movies = await Movie.find().sort({ [sortBy]: 1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error sorting movies" });
  }
});

// Search Movies by name or description
// Example: /movie/search?q=batman
router.get("/movie/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: "Search query missing" });
  }

  try {
    const movies = await Movie.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error searching movies" });
  }
});

// POST: Add Movie (admin only)
router.post("/movie", authenticate, isAdmin, async (req, res) => {
    const {title, releaseDate} = req.body;
  try {
    const existingMovie = await Movie.findOne({ title, releaseDate });
    if (existingMovie) {
      return res.status(409).json({ message: "Movie already exists." });
    }
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: "Failed to add movie", error: err.message });
  }
});

// PUT: Edit Movie by ID (admin only)
router.put("/movie/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: "Failed to update movie", error: err.message });
  }
});

// DELETE: Delete Movie by ID (admin only)
router.delete("/movie/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete movie" });
  }
});

module.exports = router;
