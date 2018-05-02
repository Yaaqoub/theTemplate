let configurationsController = require('../../controllers/admin/configurationsController.js');

module.exports = function(app) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login');
    }

    /**
     * (GET Method)
     */
    app.get('/admin/configurations', isLoggedIn, configurationsController.index);

    /**
     * (POST Method)
     */
    app.post('/admin/configurations/change', isLoggedIn, configurationsController.ChangeConfigs);
};