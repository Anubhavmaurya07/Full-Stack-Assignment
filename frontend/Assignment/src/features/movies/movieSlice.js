import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/api';

// Fetch all movies
export const fetchMovies = createAsyncThunk('movies/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/movie');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch movies');
  }
});

// Search movies by name or description
export const searchMovies = createAsyncThunk('movies/search', async (query, thunkAPI) => {
  try {
    const res = await axios.get(`/movie/search?q=${query}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Search failed');
  }
});

// Add a new movie (Admin only)
export const addMovie = createAsyncThunk('movies/add', async (movieData, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    const res = await axios.post('/movie', movieData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Add movie failed');
  }
});

// Update a movie by ID (Admin only)
export const updateMovie = createAsyncThunk('movies/update', async ({ id, data }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    const res = await axios.put(`/movie/${id}`, data, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Update failed');
  }
});

// Delete a movie by ID (Admin only)
export const deleteMovie = createAsyncThunk('movies/delete', async (id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    await axios.delete(`/movie/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Delete failed');
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
  },
  reducers: {
      clearMovieStatus: (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
      },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Search
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })

      // Add
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })

      // Update
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex((m) => m._id === action.payload._id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((m) => m._id !== action.payload);
      });
  },
});

export const { clearMovieStatus } = moviesSlice.actions
export default moviesSlice.reducer;
