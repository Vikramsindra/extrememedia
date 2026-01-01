
exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy(() => {
            res.clearCookie("connect.sid"); // optional but recommended
            res.json({ message: "Logout successful" });
        });
    });
};


exports.reloadLogin = (req, res) => {

    // 🔐 PROD MODE
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ user: req.user });
}