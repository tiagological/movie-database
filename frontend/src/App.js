import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Movie } from './screens';
import GlobalContext from './context';

function App() {
  const [errors, setErrors] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        errors,
        setErrors,
      }}>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/movie/:movieId'>
          <Movie />
        </Route>
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
