import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Movie, SignUp, Login, Dashboard } from './screens';
import { AuthRoute, ProtectedRoute } from './util/routes';
import { checkLoggedIn } from './util/session';
import GlobalContext from './context';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState('');
  const [session, setSession] = useState({ userId: null, username: null });

  useEffect(() => {
    const checkLoggedInState = async () => {
      const preLoadedState = await checkLoggedIn();
      if (Object.keys(preLoadedState).length > 0) {
        setSession(preLoadedState);
      }
      setIsLoading(false);
    };
    checkLoggedInState();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <GlobalContext.Provider
      value={{
        errors,
        setErrors,
        session,
        setSession,
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
    margin: 0;
    height: 100vh;
    width: 100%;
    
    box-sizing: border-box;
	  font-family: 'Montserrat', sans-serif;
    background: #fafafa;
  }
  *, *:before, *:after {
  box-sizing: inherit;
    }
  #root {
    height: 100%;
    width: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  `;

export default App;
