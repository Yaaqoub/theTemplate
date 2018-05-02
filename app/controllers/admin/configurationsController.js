var exports = module.exports = {};

let models = require("../../models"),
    Configurations = models.configurations;

exports.index = function(req, res) {

    Configurations.findById(1).then(function (configs) {
        res.render('admin/index', {
            isConfigurations: true,
            configs: configs
        });
    });
};

exports.ChangeConfigs = function(req, res) {
    let allSubmit = req.body;

    let dataConfig = {
        website_name: allSubmit.website_name,
        website_title: allSubmit.website_title,
        website_email: allSubmit.website_email,
        website_description: allSubmit.website_description,
        website_keywords: allSubmit.website_keywords,
        Copyright: allSubmit.Copyright,
        city_country: allSubmit.city_country
    };

    Configurations.update(dataConfig, { where: { id: 1 } }
    ).then((editedConfig) => {
        if (!editedConfig) {
            return res.status(400).send('There is a problem editing Configs.');
        }

        if (editedConfig) {
            res.redirect('/admin/configurations');
        }
    });
};