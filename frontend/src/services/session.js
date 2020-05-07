import * as apiUtil from '../util/session';

export const login = async (user, setErrors, setSession) => {
  const response = await apiUtil.login(user);
  const data = await response.json();
  if (response.ok) {
    setErrors('');
    setSession(data);
    return;
  }
  setErrors(data.message);
};

export const signup = async (user, setErrors, setSession) => {
  const response = await apiUtil.signup(user);
  const data = await response.json();

  if (response.ok) {
    setErrors('');
    setSession(data);
    return;
  }
  setErrors(data.message);
};
export const logout = async () => {
  const response = await apiUtil.logout();
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  return data;
};
