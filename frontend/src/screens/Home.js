import React, { useEffect, useContext } from 'react';
import GlobalContext from '../context';
import styled from 'styled-components/macro';
import { Layout, MovieList } from '../components';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import MoonLoader from 'react-spinners/MoonLoader';
import Helmet from 'react-helmet';

export const Home = () => {
  const { setCurrentScreen, movieBaseURL } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentScreen('home');
  }, []);

  const getMovies = async (key, pageNum = 1) => {
    const response = await axios.get(`/api/movies?page=${pageNum}`);
    return response.data;
  };

  const {
    status: moviesStatus,
    data: moviesData,
    isFetching: isFetchingMovies,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery('movies', getMovies, {
    getFetchMore: (lastGroup, allGroups) => lastGroup.page + 1,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  if (moviesStatus === 'loading') {
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
      <Helmet>
        <title>Home | Movie DB</title>
        <meta
          name='description'
          content='Explore the most popular movies right now. Create an account to add your favourites to your watchlist.'
        />
      </Helmet>
      <Layout>
        {movieBaseURL && moviesData && (
          <MovieList movieGroups={moviesData} secure_base_url={movieBaseURL} />
        )}
        <ButtonContainer>
          <Button
            onClick={() => fetchMore()}
            disabled={isFetchingMore}
            isVisible={!!moviesData}
          >
            Load More
          </Button>
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 100%;
  margin: 2rem;
  padding: 1.5rem;
  font-size: 2rem;
  background: transparent;
  color: #fff;
  border: 1px solid white;
  border-radius: 8px;
  opacity: ${({ isFetchingMore, isVisible }) =>
    !isVisible ? 0 : isFetchingMore && isVisible ? 0.5 : 1};

  :hover {
    cursor: ${({ isFetchingMore }) =>
      isFetchingMore ? 'not-allowed' : 'pointer'};
  }

  :focus {
    outline: 3px solid turquoise;
  }
`;
