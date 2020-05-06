import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, MovieList } from '../components';
import axios from 'axios';

export const Home = () => {
  const [config, setConfig] = useState(null);
  const [initialMovies, setInitialMovies] = useState(null);

  useEffect(() => {
    async function getConfig() {
      const response = await axios.get('/api/movies/configuration');
      const {
        data: { images },
      } = response;
      setConfig(images);
    }

    getConfig();
  }, []);

  useEffect(() => {
    async function getPopularMovies() {
      const response = await axios.get('/api/movies');
      const {
        data: { results },
      } = response;
      setInitialMovies(results);
    }

    getPopularMovies();
  }, []);

  return (
    <Container>
      <Layout>
        {config?.secure_base_url && initialMovies && (
          <>
            <LinkContainer>
              <StyledLink to='/login'>Log in</StyledLink>
              <StyledLink to='/signup'>Sign Up</StyledLink>
            </LinkContainer>
            <MovieList
              movies={initialMovies}
              secure_base_url={config.secure_base_url}
            />
          </>
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
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledLink = styled(Link)`
  padding: 10px;
  background-color: buttonface;
`;
