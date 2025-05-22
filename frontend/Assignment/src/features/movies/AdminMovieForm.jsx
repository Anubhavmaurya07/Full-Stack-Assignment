import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMovie,
  updateMovie,
  clearMovieStatus,
} from './movieSlice';

const AdminMovieForm = ({ editMovie = null, onSubmitSuccess }) => {
  const dispatch = useDispatch();
  const { isError, errorMessage } = useSelector((state) => state.movies);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: '',
    image: '',
    director: '',
    genre: '',
  });

  useEffect(() => {
    if (editMovie) {
      setFormData(editMovie);
    }
  }, [editMovie]);

  useEffect(() => {
    return () => {
      dispatch(clearMovieStatus());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMovie) {
      await dispatch(updateMovie({ id: editMovie._id, data: formData }));
    } else {
      await dispatch(addMovie(formData));
    }

    setFormData({
      title: '',
      description: '',
      rating: '',
      releaseDate: '',
      duration: '',
      image: '',
      director: '',
      genre: '',
    });

    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          {editMovie ? 'Edit Movie' : 'Add New Movie'}
        </Typography>

        {isError && <Alert severity="error">{errorMessage}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth required margin="normal" />
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth required multiline rows={3} margin="normal" />
          <TextField label="Rating" name="rating" type="number" inputProps={{ min: 0, max: 10, step: 0.1 }} value={formData.rating} onChange={handleChange} fullWidth required margin="normal" />
          <TextField label="Release Date" name="releaseDate" type="date" value={formData.releaseDate} onChange={handleChange} fullWidth required margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField label="Duration (in minutes)" name="duration" type="number" value={formData.duration} onChange={handleChange} fullWidth required margin="normal" />
          <TextField label="Image URL" name="image" value={formData.image} onChange={handleChange} fullWidth required margin="normal" />
          <TextField label="Director" name="director" value={formData.director} onChange={handleChange} fullWidth required margin="normal" />
          <TextField label="Genre" name="genre" value={formData.genre} onChange={handleChange} fullWidth required margin="normal" />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
            {editMovie ? 'Update Movie' : 'Add Movie'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminMovieForm;
