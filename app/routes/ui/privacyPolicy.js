let privacyPolicyController = require('../../controllers/ui/privacyPolicyController.js');

module.exports = function(app) {

    /**
     * (GET Method)
     */
    app.get('/privacy_policy', privacyPolicyController.displayPrivacyPolicy);

};