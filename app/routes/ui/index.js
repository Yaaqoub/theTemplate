let indexController = require('../../controllers/ui/indexController.js');

module.exports = function(app) {

    /**
     * (GET Method)
     */
    app.get('/', indexController.index);

};