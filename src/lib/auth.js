module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },
    alredyLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    },

    isAdminLoggedIn(req, res, next) {
        const userconnected = req.user.type;
        if (userconnected == "admin") {
            return next();
        }
        return res.redirect('/profile');
    }
};