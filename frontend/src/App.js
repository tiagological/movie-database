import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Movie, SignUp, Login, Dashboard } from './screens';
import { AuthRoute, ProtectedRoute } from './util/routes';
import { checkLoggedIn } from './util/session';
import { fetchWatchList } from './services/session';
import GlobalContext from './context';
import axios from 'axios';
import MoonLoader from 'react-spinners/MoonLoader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState({ userId: null, username: null });
  const [watchList, setWatchList] = useState([]);
  const [movieBaseURL, setMovieBaseURL] = useState(null);
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    const checkLoggedInState = async () => {
      const preLoadedState = await checkLoggedIn();
      if (Object.keys(preLoadedState).length > 0) {
        setSession(preLoadedState.session);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    const getConfig = async () => {
      const response = await axios.get('/api/movies/configuration');
      const {
        data: {
          images: { base_url },
        },
      } = response;

      if (base_url) {
        setMovieBaseURL(base_url);
      }
    };

    checkLoggedInState();
    getConfig();
  }, []);

  useEffect(() => {
    if (session.userId && session.username) {
      const handleFetchWatchList = async () => {
        await fetchWatchList(setWatchList).catch((err) => console.log(err));
        setIsLoading(false);
      };
      handleFetchWatchList();
    }
  }, [session]);

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
    <GlobalContext.Provider
      value={{
        errors,
        setErrors,
        isLoggedIn,
        setIsLoggedIn,
        session,
        setSession,
        watchList,
        setWatchList,
        movieBaseURL,
        isMenuActive,
        setIsMenuActive,
      }}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/movie/:movieId' component={Movie} />
          <AuthRoute path='/signup' component={SignUp} />
          <AuthRoute path='/login' component={Login} />
          <ProtectedRoute path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body {
    font-size: 62.5%;
    margin: 0;
    height: 100vh;
    width: 100%;
    
    box-sizing: border-box;
	  font-family: 'Montserrat', sans-serif;
  }
  *, *:before, *:after {
  box-sizing: inherit;
    }

  #root {
    height: 100%;
    width: 100%;
  }

  h1 {
    font-size: 3.2rem;
  }

  h2 {
    font-size: 2.4rem;
  }

  h3 {
    font-size: 2.08rem;
  }

  p, span, a {
    font-size: 1.6rem;
  }

  input, label {
    font-size: 2rem
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  `;

export default App;
