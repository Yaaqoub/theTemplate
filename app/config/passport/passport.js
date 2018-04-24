let bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {

    let User = user;
    let LocalStrategy = require('passport-local').Strategy;

    /**
     * Local SignIn
     */
    passport.use('local-signin', new LocalStrategy({

            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, function(req, username, password, done) {

            let User = user;
            let isValidPassword = function(userpass, password) {

                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {

                if (!user) {

                    return done(null, false, req.flash('loginMessage', 'Username does not exist !'));
                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, req.flash('loginMessage', 'Incorrect password !'));
                }

                let userinfo = user.get();
                return done(null, userinfo);

            }).catch(function(err) {

                console.log("Error:", err);
                return done(null, false, req.flash('loginMessage', 'Something went wrong with your Signin !'));
            });
    }));

    /**
     * Serialize User into session
     */
    passport.serializeUser(function(user, done) {

        done(null, user.id);
    });

    /**
     * Deserialize user
     */
    passport.deserializeUser(function(id, done) {

        User.findById(id).then(function(user) {

            updateLastLogin(id, user);

            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    /**
     * Set Up Last_Login for the User
     *
     * @param _id   user id
     * @param user  user row
     */
    function updateLastLogin(_id, user) {
        user.update({last_login: Date.now()},
            {where: {id: _id}}).then().catch(err => console.log("Faild to Update Last login: " + err))
    }
};