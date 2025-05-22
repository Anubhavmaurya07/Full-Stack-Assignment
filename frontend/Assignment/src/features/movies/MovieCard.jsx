import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';

const MovieCard = ({ movie, onEdit, onDelete, isAdmin = false }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        component="img"
        height="180"
        image={movie.image || 'https://via.placeholder.com/300x180?text=No+Image'}
        alt={movie.title}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          {movie.description}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            ⭐ Rating: {movie.rating} / 10
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📅 Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ⏱ Duration: {movie.duration} mins
          </Typography>
        </Box>
      </CardContent>

      {isAdmin && (
        <CardActions sx={{ justifyContent: 'flex-end', mt: 'auto' }}>
          <Button size="small" variant="outlined" onClick={() => onEdit(movie)}>Edit</Button>
          <Button size="small" variant="outlined" color="error" onClick={() => onDelete(movie._id)}>Delete</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default MovieCard;
