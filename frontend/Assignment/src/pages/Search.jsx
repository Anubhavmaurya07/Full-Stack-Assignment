import React from 'react';
import MovieList from '../features/movies/MovieList';

const Search = () => {
  return (
    <div>
      <MovieList isAdmin={false} />
    </div>
  );
};

export default Search;
