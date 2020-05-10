export const signup = (user) =>
  fetch('api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const login = (user) =>
  fetch('api/session', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const logout = () => fetch('api/session', { method: 'DELETE' });

export const checkLoggedIn = async () => {
  const response = await fetch('/api/session');
  const { user } = await response.json();
  let preloadedState = {};
  if (user) {
    preloadedState = {
      session: user,
    };
  }
  return preloadedState;
};

export const addToWatchList = (movie) =>
  fetch(window.location.origin + '/api/watchlist/add', {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const fetchWatchList = () =>
  fetch(window.location.origin + '/api/watchlist/fetch');
