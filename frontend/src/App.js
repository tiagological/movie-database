import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Movie } from './screens';

function App() {
  return (
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
  );
}

export default App;
