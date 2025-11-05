function EnsureAdmin(req,res,next) {
    if (req.isAuthenticated() && (req.user.role === 'manager' || req.user.role === 'admin')) {
    return next();
  }
  res.status(403).json({ error: 'Access denied. Manager or Admin only.' })
    
}

module.exports={EnsureAdmin};