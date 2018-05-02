var exports = module.exports = {};

let models = require("../../models"),
    Configurations = models.configurations;

exports.displayPrivacyPolicy = function(req, res) {

    Configurations.findById(1).then(function (allConfigurations) {
        res.render('ui/privacyPolicy', {
            configs: allConfigurations
        });
    });
};