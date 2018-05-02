let termsOfUseController = require('../../controllers/ui/termsOfUseController.js');

module.exports = function(app) {

    /**
     * (GET Method)
     */
    app.get('/terms_of_use', termsOfUseController.displayTermsOfUse);

};