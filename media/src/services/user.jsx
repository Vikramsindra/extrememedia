import api from "../api/axios";

/**
 * Login user
 */
export const loginUser = (credentials) => {
  return api.post("/auth/login", credentials, {
    withCredentials: true, // 🔐 required for session-based auth
  });
};

/**
 * Get currently logged-in user
 */
export const fetchCurrentUser = () => {
  return api.get("/auth/me", {
    withCredentials: true,
  });
};

/**
 * Logout user
 */
export const logoutUser = () => {
  return api.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
};
