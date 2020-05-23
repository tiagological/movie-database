import React, { useEffect, useState, useContext, useRef } from 'react';
import GlobalContext from '../context';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components/macro';
import { Layout } from '../components';
import { addToWatchList, removeFromWatchList } from '../util/session';
import MoonLoader from 'react-spinners/MoonLoader';
import { usePalette } from 'react-palette';

export const Movie = () => {
  const { movieId } = useParams();
  const {
    movieBaseURL,
    isLoggedIn,
    watchList,
    setWatchList,
    setToastStatus,
    setCurrentScreen,
  } = useContext(GlobalContext);

  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movieIsInWatchList, setMovieIsInWatchList] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    setCurrentScreen('movie');
  }, []);

  // get movie info

  useEffect(() => {
    const getMovieInfo = async (movie_id) => {
      const response = await axios.get(`/api/movies/movie/${movie_id}`);

      const { data } = response;
      setMovieInfo(data);
    };

    getMovieInfo(movieId);
  }, [movieId]);

  useEffect(() => {
    if (movieBaseURL && movieInfo) {
      setImageURL(`${movieBaseURL}w342${movieInfo.poster_path}`);
      setIsLoading(false);
    }
  }, [movieBaseURL, movieInfo]);

  const { data: colorData, loading, error: colorError } = usePalette(imageURL);

  // check if movie is on user watch list

  useEffect(() => {
    if (isLoggedIn && watchList.length > 0) {
      const filteredMovies = watchList.filter((movie) => movie.id == movieId);

      if (filteredMovies.length > 0) {
        setMovieIsInWatchList(true);
      } else {
        setMovieIsInWatchList(false);
      }
    }
  }, [watchList]);

  const handleAddToWatchList = async () => {
    if (!isLoggedIn) {
      return setToastStatus({
        isActive: true,
        type: 'error',
        message: 'Please log in to add to your watch list',
      });
    }
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
      setToastStatus({
        isActive: true,
        type: 'success',
        message: 'Added to watch list!',
      });
      setWatchList([...watchList, data]);
      return;
    }
    return setToastStatus({
      isActive: true,
      type: 'error',
      message: data.message,
    });
  };

  const handleRemoveFromWatchList = async () => {
    if (!isLoggedIn) {
      return setToastStatus({
        isActive: true,
        type: 'error',
        message: 'Please log in to remove from your watch list',
      });
    }
    const { id } = movieInfo;
    const response = await removeFromWatchList(id);
    const data = await response.json();
    if (response.ok) {
      setToastStatus({
        isActive: true,
        type: 'success',
        message: 'Removed from watch list',
      });
      const updatedWatchList = watchList.filter((movie) => movie.id !== id);
      setWatchList(updatedWatchList);
      return;
    }
    return setToastStatus({
      isActive: true,
      type: 'error',
      message: data.message,
    });
  };

  const handleMovieOperation = () => {
    if (movieIsInWatchList) {
      handleRemoveFromWatchList();
    } else {
      handleAddToWatchList();
    }
  };

  const moviePoster = movieInfo && (
    <ImageWrapper>
      <OuterContainer>
        <InnerContainer>
          <Image src={`${movieBaseURL}w342${movieInfo?.poster_path}`} />
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
      <ButtonContainer>
        <Button onClick={handleMovieOperation}>{`${
          movieIsInWatchList ? 'Remove from' : 'Add to'
        } watchlist`}</Button>
      </ButtonContainer>
    </MovieInfoContainer>
  );

  if (isLoading) {
    return (
      <Container>
        <LoaderContainer>
          <MoonLoader color='#fff' css='opacity: 1;' />
        </LoaderContainer>
      </Container>
    );
  }

  return (
    <Container colorData={colorData} colorError={colorError}>
      <Layout>
        <MovieDataContainer>
          {moviePoster}
          {MovieData}
        </MovieDataContainer>
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
  background: ${({ colorData, colorError }) =>
    colorData && !colorError
      ? `linear-gradient(0deg,#000, ${colorData.lightVibrant})`
      : `linear-gradient(0deg, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 1) 75%,rgba(98, 98, 98, 1) 100%)`};
  background-repeat: no-repeat;
  overflow: auto;
`;

const MovieDataContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #fff;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    padding: 0 5rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem;
  margin: 0 2rem;

  @media screen and (min-width: 1024px) {
    width: auto;
    flex-shrink: 0;
  }
`;

const OuterContainer = styled.div`
  height: 0px;
  width: 100%;
  padding-bottom: 150%;
  position: relative;

  @media screen and (min-width: 1024px) {
    width: 300px;
  }
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
  border-radius: 8px;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Button = styled.button`
  margin: 1rem 0;
  padding: 1.5rem 0;
  font-size: 20px;
  background: transparent;
  color: #fff;
  border: 1px solid white;
  border-radius: 8px;
  outline: none;

  :hover {
    cursor: pointer;
  }

  @media only screen and (min-width: 1024px) {
    max-width: 400px;
  }
`;

const LoaderContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  justify-content: center;
`;
