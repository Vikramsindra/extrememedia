import api from "../api/axios";

export const login = (username, password, role) => {
  return api.post("/auth/login", { username, password, role });
};
