var exports = module.exports = {};

let models = require("../../models"),
    Content = models.content,
    Configurations = models.configurations;


exports.index = function(req, res) {

    Content.findAll({ order: models.sequelize.literal('rand()'), limit: 1 }).then(function (contents) {
        Configurations.findById(1).then((allConfigurations) => {
            res.render('ui/index', {
                allContents: JSON.parse(JSON.stringify(contents)),
                configs: allConfigurations
            });
        });
    });
};