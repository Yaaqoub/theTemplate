let addDataController = require('../../controllers/admin/addDataController.js');

module.exports = function(app) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login');
    }

    /**
     * (GET Method)
     */
    app.get('/admin/addData', addDataController.index);

    /**
     * (POST Method)
     */
    app.post('/admin/addData', addDataController.createData);
};