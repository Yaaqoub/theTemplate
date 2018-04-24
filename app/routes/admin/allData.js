let allDataController = require('../../controllers/admin/allDataController.js');

module.exports = function(app) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login');
    }

    /**
     * (GET Method)
     */
    app.get('/admin/allData', allDataController.index);

    /**
     * (POST Method)
     */
    app.post('/admin/allData', allDataController.allData);
};