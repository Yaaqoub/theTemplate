var exports = module.exports = {};

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

exports.allData = function(req, res) {
    let allSubmit = req.body,
        buttonName = Object.keys(allSubmit)[0],
        content_id = allSubmit.content_id;

    if (buttonName === 'delete') {
        Content.destroy({
            where: {
                id: content_id
            }
        }).then((rowDeleted) => {
            if(rowDeleted === 1) {
                res.redirect('/admin/allData');
            }
        });
    }

    if (buttonName === 'edit') {
        console.log("Yaaaay Edit");
    }
};