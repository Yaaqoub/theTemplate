var exports = module.exports = {};

let fs = require('fs');

let models = require("../../models"),
    Content = models.content;

exports.index = function(req, res) {

    Content.findAll().then(function (contents) {
        res.render('admin/index', {
            isAllData: true,
            contents: contents
        });
    });
};

exports.dataDelete = function(req, res) {
    let allSubmit = req.body,
        content_id = allSubmit.content_id,
        facebookImage = allSubmit.content_facebook_image,
        websiteImage = allSubmit.content_website_image;

    let facebookImagePath = 'public/images/facebook_images/' + facebookImage,
        websiteImagePath = 'public/images/card_images/' + websiteImage;


    Content.destroy({
        where: {
            id: content_id
        }
    }).then((rowDeleted) => {
        fs.unlinkSync(facebookImagePath);
        fs.unlinkSync(websiteImagePath);
        if(rowDeleted === 1) {
            res.redirect('/admin/allData');
        }
    });
};

exports.dataEdit = function(req, res) {
    if (!req.files)
        return res.status(400).send('No Image were uploaded.');

    let websiteImage = req.files.webSiteImage;
    let facebookImage = req.files.facebookImage;

    let websiteImageName = websiteImage.name,
        facebookImageName = facebookImage.name;

    let facebookImagePath = 'public/images/facebook_images/' + req.body.content_facebookImage,
        websiteImagePath = 'public/images/card_images/' + req.body.content_websiteImage;

    fs.unlinkSync(facebookImagePath);
    fs.unlinkSync(websiteImagePath);

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

            Content.update(contentData, { where: { id: req.body.content_id } }
            ).then((editedContent) => {
                if (!editedContent) {
                    return res.status(400).send('There is a problem editing content.');
                }

                if (editedContent) {
                    res.redirect('/admin/allData');
                }
            });
        } else {
            return res.status(400).send('Facebook Image Error (Not A good Format) jpeg/jpg only.');
        }

    } else {
        return res.status(400).send('Website Image Error (Not A good Format) jpeg/jpg only.');
    }
};