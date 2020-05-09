import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components/macro';
import { Layout } from '../components';
import { addToWatchList } from '../util/session';

export const Movie = () => {
  const { movieId } = useParams();
  const {
    state: { base_url },
  } = useLocation();

  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    const getMovieInfo = async (movie_id) => {
      const response = await axios.get(`/api/movies/movie/${movie_id}`);

      const { data } = response;
      setMovieInfo(data);
    };

    getMovieInfo(movieId);
  }, [movieId]);

  const handleAddToWatchList = async () => {
    const { id, title, poster_path, runtime, release_date } = movieInfo;
    const movie = {
      id,
      title,
      poster_path,
      runtime,
      release_date,
    };
    const response = await addToWatchList(movie);
    const data = await response.json();
    if (response.ok) {
      return alert('Successfully added to watch list');
    }
    return alert(data.message);
  };

  const moviePoster = movieInfo && (
    <ImageWrapper>
      <OuterContainer>
        <InnerContainer>
          <Image src={`${base_url}w342${movieInfo?.poster_path}`} />
        </InnerContainer>
      </OuterContainer>
    </ImageWrapper>
  );

  const formattedDuration =
    movieInfo &&
    `${Math.floor(movieInfo.runtime / 60)}${
      movieInfo.runtime / 60 > 1 ? 'hrs' : 'hr'
    } ${movieInfo.runtime % 60} mins`;

  const MovieData = movieInfo && (
    <MovieInfoContainer>
      <Title>{movieInfo.title}</Title>
      <Duration>{formattedDuration}</Duration>
      <Description>{movieInfo.overview}</Description>
    </MovieInfoContainer>
  );

  return (
    <Container>
      <Layout>
        {moviePoster}
        {MovieData}
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ImageWrapper = styled.div`
  position: relative;
  padding: 1rem 0;
  margin: 0 2rem;
`;

const OuterContainer = styled.div`
  height: 0px;
  width: 100%;
  padding-bottom: 150%;
  position: relative;
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const MovieInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin: 0 2rem;
`;

const Title = styled.h2``;

const Description = styled.p``;

const Duration = styled.span``;
