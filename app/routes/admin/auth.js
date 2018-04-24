let authController = require('../../controllers/admin/authcontroller.js');

module.exports = function(app, passport) {

    /**
     * SignIn (GET Method)
     */
    app.get('/login', authController.signin);

    /**
     * Logout (GET Method)
     */
    app.get('/logout',authController.logout);

    /**
     * SignIn (POST Method)
     */
    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/administrator',
        failureRedirect: '/login',
        failureFlash: true
    }));
};