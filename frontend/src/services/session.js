import * as apiUtil from '../util/session';

export const login = async (user) => {
  const response = await apiUtil.login(user);
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  return data;
};
export const signup = async (user, setErrors) => {
  const response = await apiUtil.signup(user);
  const data = await response.json();

  if (response.ok) {
    setErrors('');
    return data;
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
