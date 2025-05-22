import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Typography,
  Dialog,
  Snackbar,
  Alert,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import MovieList from '../features/movies/MovieList';
import AdminMovieForm from '../features/movies/AdminMovieForm';
import { clearMovieStatus, deleteMovie } from '../features/movies/movieSlice';

const AdminPanel = () => {
  const [openForm, setOpenForm] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.movies);

  const handleAddNew = () => {
    setMovieToEdit(null);
    setOpenForm(true);
  };

  const handleEdit = (movie) => {
    setMovieToEdit(movie);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await dispatch(deleteMovie(id));
        setDeleteAlertOpen(true);
      } catch (error) {
        console.error('Failed to delete movie:', error);
      }
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setMovieToEdit(null);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearMovieStatus());
    }
  }, [isSuccess, dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Admin Panel - Manage Movies
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddNew} sx={{ mb: 3 }}>
        Add New Movie
      </Button>

      <MovieList isAdmin={true} onEdit={handleEdit} onDelete={handleDelete} />

      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <AdminMovieForm
          editMovie={movieToEdit}
          onSubmitSuccess={() => {
            setOpenForm(false);
            setMovieToEdit(null);
            setOpenAlert(true);
          }}
        />
      </Dialog>
          // Addition and Updation
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
          Movie {movieToEdit ? 'updated' : 'added'} successfully!
        </Alert>
      </Snackbar>

          // Delete
      <Snackbar
        open={deleteAlertOpen}
        autoHideDuration={3000}
        onClose={() => setDeleteAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setDeleteAlertOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Movie deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;
