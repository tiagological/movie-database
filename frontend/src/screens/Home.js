import React, { useEffect, useContext } from 'react';
import GlobalContext from '../context';
import styled from 'styled-components/macro';
import { Layout, MovieList } from '../components';
import axios from 'axios';
import { useQuery } from 'react-query';
import MoonLoader from 'react-spinners/MoonLoader';

export const Home = () => {
  const { setCurrentScreen } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentScreen('home');
  }, []);

  const getConfig = async () => {
    const response = await axios.get('/api/movies/configuration');
    const {
      data: { images }
    } = response;
    return images;
  };

  const getPopularMovies = async () => {
    const response = await axios.get('/api/movies');
    const {
      data: { results }
    } = response;
    return results;
  };

  const {
    status: configStatus,
    data: configData,
    error: configError
  } = useQuery('movie-config', getConfig, {
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false
  });

  const {
    status: initialMoviesStatus,
    data: initialMoviesData,
    error: initialMoviesError
  } = useQuery('initial-movies', getPopularMovies, {
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false
  });

  if (initialMoviesStatus === 'loading') {
    return (
      <Container>
        <LoaderContainer>
          <MoonLoader color='#fff' css='opacity: 1;' />
        </LoaderContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Layout>
        {configData?.secure_base_url && initialMoviesData && (
          <MovieList
            movies={initialMoviesData}
            secure_base_url={configData.secure_base_url}
          />
        )}
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
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 75%,
    rgba(98, 98, 98, 1) 100%
  );
  background-repeat: no-repeat;
  overflow: auto;
`;

const LoaderContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  justify-content: center;
`;
