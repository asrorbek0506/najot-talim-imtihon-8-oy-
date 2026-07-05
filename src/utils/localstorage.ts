export const setItem = (token: string) => {
  return localStorage.setItem("token", token);
};

export const getItem = () => {
  return localStorage.getItem("token");
};

export const removeItem = () => {
  return localStorage.removeItem("token");
};

export const setRefreshToken = (token: string) => {
  return localStorage.setItem("refreshToken", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const removeRefreshToken = () => {
  return localStorage.removeItem("refreshToken");
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  setItem(accessToken);
  setRefreshToken(refreshToken);
};

export const clearTokens = () => {
  removeItem();
  removeRefreshToken();
};
