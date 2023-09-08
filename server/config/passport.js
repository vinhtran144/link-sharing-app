const passport = require('passport');
const LocalStrategy = require('passport-local');
const {validPassword} = require('../utils/cryptoUtils');
const { User } = require('../model');


// ------------------------- Passport strategy config -------------------------
const customFields = {
    // custom fields for the POST request
    usernameField: 'email',
    passwordField: 'password'
}
passport.use(new LocalStrategy(customFields,(username, password, done) => {
    // We're using email as username field, as passport local strategy needs
    // username and password fields to authenticate
    User.findOne({ email: username })
        .then((user) => {
            //If no email is found
            if (!user) { return done(null, false) }

            // validate the password with the hash and salt stored
            const isValid = validPassword(password, user.hash, user.salt);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            // return any error while exucuting
            done(err);
        });

}));

// ------------------------- Session management config -------------------------

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId).select('-__v -hash -salt -links -profilePic')
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});