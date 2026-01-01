import api from "../api/axios";

/**
 * Create a new task (Admin only)
 */
export const createTask = (taskData) => {
  return api.post("/task/taskcreate", taskData, {
    withCredentials: true, // 🔐 required for Passport session
  });
};

/**
 * Fetch tasks assigned to logged-in user
 */
export const fetchMyTasks = () => {
  return api.get("/tasks", {
    withCredentials: true,
  });
};
