let indexController = require('../../controllers/admin/indexController.js');

module.exports = function(app) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login');
    }

    /**
     * (GET Method)
     */
    app.get('/administrator', isLoggedIn, indexController.index);

};