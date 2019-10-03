// MIDDLEWARE
// check if user is logged in
let isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

// check if user is logged out
let notLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = {isLoggedIn, notLoggedIn};