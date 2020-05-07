import React from 'react';
import { MovieCard } from './MovieCard';
import styled from 'styled-components/macro';

export const MovieList = ({ movies, secure_base_url }) => {
  const renderedList = movies.map((movie) => {
    const { id, title, poster_path } = movie;
    const base_url = secure_base_url;

    return (
      <MovieCard
        key={id}
        title={title}
        poster_path={poster_path}
        base_url={base_url}
        id={id}
      />
    );
  });

  return <Container>{renderedList}</Container>;
};

const Container = styled.div`
  padding: 0.75rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45vw, 45vw));
  justify-content: space-evenly;
  gap: 0.25rem;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(15vw, 15vw));
  }
`;
