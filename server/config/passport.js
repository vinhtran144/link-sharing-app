const passport = require('passport');
const LocalStrategy = require('passport-local');
const {validPassword} = require('../utils/cryptoUtils');
const { User } = require('../model');


// ------------------------- Passport strategy config -------------------------
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
        .then((user) => {
            //If no username is found
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
    User.findById(userId).select('-__v -hash -salt')
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});