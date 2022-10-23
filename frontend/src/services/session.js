import * as apiUtil from '../util/session';

export const login = async (user, setErrors, setSession, setLoggedIn) => {
  const response = await apiUtil.login(user);
  const data = await response.json();

  if (response.ok) {
    setErrors('');
    setSession(data);
    setLoggedIn(true);
    return;
  }
  setErrors(data.message);
};

export const signup = async (user, setErrors, setSession, setIsLoggedIn) => {
  const response = await apiUtil.signup(user);
  const data = await response.json();

  if (response.ok) {
    setErrors('');
    setSession(data);
    setIsLoggedIn(true);
    return;
  }
  setErrors(data.message);
};

export const logout = async (
  setSession,
  setErrors,
  setIsLoggedIn,
  setToastStatus
) => {
  const response = await apiUtil.logout();
  const data = await response.json();
  if (response.ok) {
    setSession({ userId: null, username: null });
    setIsLoggedIn(false);
    setToastStatus({
      isActive: true,
      type: 'success',
      message: 'You have successfully logged out!',
    });
    return;
  }
  setErrors(data.message);
};

export const fetchWatchList = async (setWatchList) => {
  try {
    const response = await apiUtil.fetchWatchList().catch((err) => {
      throw err;
    });
    const data = await response.json();

    if (response.ok) {
      setWatchList(data);
    }
  } catch (err) {
    throw err;
  }
};
