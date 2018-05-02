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
    app.get('/admin/allData', isLoggedIn, allDataController.index);

    /**
     * (POST Method)
     */
    app.post('/admin/allData/delete', isLoggedIn, allDataController.dataDelete);

    app.post('/admin/allData/edit', isLoggedIn, allDataController.dataEdit);
};