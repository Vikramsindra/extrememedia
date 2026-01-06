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
export const getTasks = async (status) => {
  const res = await api.get(`/task?status=${status}`, {
    withCredentials: true,
  });
  return res.data;
};

/**
 * Verify a submitted task
 */
export const verifyTask = async (taskId) => {
  const res = await api.put(
    `/task/${taskId}/verify`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

/**
 * Reject a submitted task
 * @param {number} taskId - ID of the task to reject
 * @param {string} reason - Reason for rejection
 */
export const rejectTask = async (taskId, reason) => {
  const res = await api.put(
    `/task/${taskId}/reject`,
    { rejectionReason: reason },
    { withCredentials: true }
  );
  return res.data;
};
