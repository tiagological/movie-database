import React, { useEffect, useState } from 'react';
import { Layout, MovieList } from '../components';
import axios from 'axios';

export const Home = () => {
  const [config, setConfig] = useState(null);
  const [initialMovies, setInitialMovies] = useState(null);

  useEffect(() => {
    async function getConfig() {
      const response = await axios.get('/api/configuration');
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
    <div>
      <Layout>
        {config?.secure_base_url && initialMovies && (
          <MovieList
            movies={initialMovies}
            secure_base_url={config.secure_base_url}
          />
        )}
      </Layout>
    </div>
  );
};
