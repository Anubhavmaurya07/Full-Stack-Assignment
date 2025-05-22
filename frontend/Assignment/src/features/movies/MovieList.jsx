import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from './movieSlice'; // adjust path
import MovieCard from './MovieCard';
import {
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';

const MovieList = ({onEdit, onDelete, isAdmin}) => {
  const dispatch = useDispatch();
  const { movies = [], isLoading, isError, errorMessage } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const moviesPerPage = 10;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Filter by search
  const filteredMovies = movies.filter((movie) => {
    const term = searchTerm.toLowerCase();
    return (
      movie.title.toLowerCase().includes(term) ||
      movie.description.toLowerCase().includes(term)
    );
  });

  // Sort logic
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'rating') {
      return a.rating - b.rating;
    } else if (sortBy === 'releaseDate') {
      return new Date(a.releaseDate) - new Date(b.releaseDate);
    } else if (sortBy === 'duration') {
      return a.duration - b.duration;
    }
    return 0;
  });

  // Pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  if (isLoading) return <Typography>Loading movies...</Typography>;
  if (isError) return <Typography color="error">{errorMessage}</Typography>;

  return (
    <Box p={4}>
      {/* Search & Filter */}
      <Box mb={4} display="flex" flexWrap="wrap" gap={2}>
        <TextField
          label="Search by title or description"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <TextField
          label="Sort by"
          select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{ minWidth: 200, '& .MuiSelect-icon': { fontSize: 30 } }}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
        </TextField>
      </Box>

      {/* Movie List */}
      <Grid container spacing={3}>
        {currentMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
            <MovieCard movie={movie} onEdit={onEdit} onDelete={onDelete} isAdmin={isAdmin} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button variant="contained" onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button variant="contained" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default MovieList;
