/**
 * Middleware.js
 * Centralized role-based access control
 */

const IS_DEV = process.env.NODE_ENV === "development";

/**
 * ==============================
 * ADMIN / MANAGER ONLY
 * ==============================
 */
function EnsureAdmin(req, res, next) {
  // ✅ DEV MODE BYPASS (UI + dummy data work)
  if (IS_DEV) {
    req.user = req.user || { role: "admin", name: "Dev Admin" };
    return next();
  }

  // 🔐 PRODUCTION AUTH
  if (
    req.isAuthenticated &&
    req.isAuthenticated() &&
    req.user &&
    (req.user.role === "admin" || req.user.role === "manager")
  ) {
    return next();
  }

  return res.status(403).json({
    error: "Access denied. Manager or Admin only.",
  });
}

/**
 * ==============================
 * FLEXIBLE ROLE CHECK
 * ==============================
 * Usage:
 * allowRoles("admin", "manager")
 * allowRoles("technician")
 */
function allowRoles(...roles) {
  return (req, res, next) => {
    // ✅ DEV MODE BYPASS
    if (IS_DEV) {
      req.user = req.user || { role: roles[0] || "admin" };
      return next();
    }

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Access denied",
      });
    }

    next();
  };
}

/**
 * ==============================
 * EXPORTS (IMPORTANT)
 * ==============================
 */
module.exports = {
  EnsureAdmin,
  allowRoles,
};

