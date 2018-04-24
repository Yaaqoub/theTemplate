var exports = module.exports = {};

let models = require("../../models"),
    Content = models.content;

exports.index = function(req, res) {

    res.render('admin/index', {
        isAddData: true
    });
};

exports.createData = function(req, res) {
    if (!req.files)
        return res.status(400).send('No Image were uploaded.');

    let websiteImage = req.files.webSiteImage;
    let facebookImage = req.files.facebookImage;

    let websiteImageName = websiteImage.name,
        facebookImageName = facebookImage.name;

    let data_name = req.body.data_name,
        data_description = req.body.data_description;

    let contentData = {
        data_name: data_name,
        data_description: data_description,
        website_image: websiteImageName,
        facebook_image: facebookImageName
    };

    if (websiteImage.mimetype === "image/jpeg" || websiteImage.mimetype === "image/jpg" || websiteImage.mimetype === "image/png") {
        websiteImage.mv('public/images/card_images/' + websiteImageName, function(err) {});

        if (facebookImage.mimetype === "image/jpeg" || facebookImage.mimetype === "image/jpg" || facebookImage.mimetype === "image/png") {
            facebookImage.mv('public/images/facebook_images/' + facebookImageName, function(err) {});

            Content.create(contentData).then(function(newContent) {

                if (!newContent) {
                    return res.status(400).send('There is a problem adding new content.');
                }
                
                if (newContent) {
                    res.redirect('/admin/addData');
                }
            });
        } else {
            return res.status(400).send('Facebook Image Error (Not A good Format) jpeg/jpg only.');
        }
    } else {
        return res.status(400).send('Website Image Error (Not A good Format) jpeg/jpg only.');
    }
};