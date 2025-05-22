import React from 'react';
import MovieList from '../features/movies/MovieList';

const Home = () => {
  return (
    <div>
      <MovieList isAdmin={false} />
    </div>
  );
};

export default Home;
