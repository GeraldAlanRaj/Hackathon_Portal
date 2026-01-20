export const setAuth = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role);
  localStorage.setItem("teamId", user.teamId);
};

export const logout = () => {
  localStorage.clear();
};

export const getRole = () => localStorage.getItem("role");

export const isAuthenticated = () =>
  Boolean(localStorage.getItem("token"));
