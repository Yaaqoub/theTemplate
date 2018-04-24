var exports = module.exports = {};

exports.signin = function(req, res) {

    res.render('admin/login/signin', {
        message: req.flash('loginMessage')
    });
};

exports.logout = function(req, res) {

    req.session.destroy(function(err) {
        res.redirect('/login');
    });
};