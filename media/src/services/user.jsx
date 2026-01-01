import api from "../api/axios";

/**
 * Login user
 * Cookie-based JWT will be set automatically
 */
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials, {
    withCredentials: true, // ✅ REQUIRED
  });

  return response.data; // contains user info only
};

/**
 * Get currently logged-in user
 */
export const fetchCurrentUser = async () => {
  const response = await api.get("/auth/me", {
    withCredentials: true, // ✅ REQUIRED
  });

  return response.data;
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout",
    {},
    { withCredentials: true } // ✅ REQUIRED
  );

  return response.data;
};
