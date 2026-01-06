import api from "../api/axios";

export const registerUser = (data) => {
  return api
    .post("/user/register", data, { withCredentials: true })
    .then((res) => res.data);
};

/**
 * Login user
 * Cookie-based JWT will be set automatically
 */
export const loginUser = async (credentials) => {
  const response = await api.post("user/auth/login", credentials, {
    withCredentials: true, // ✅ REQUIRED
  });

  return response.data; // contains user info only
};

/**
 * Get currently logged-in user
 */
export const fetchCurrentUser = async () => {
  const response = await api.get("user/auth/me", {
    withCredentials: true, // ✅ REQUIRED
  });

  return response.data;
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  const response = await api.post(
    "/user/logout",
    {},
    { withCredentials: true } // ✅ REQUIRED
  );

  return response.data;
};
