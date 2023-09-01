const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../model');

const verifyCallback = (username, password, done) => {

    User.findOne({ username: username })
        .then((user) => {
            //If no username is found
            if (!user) { return done(null, false) }

            // Verify the password with data in the database, will implement later
            return done(null, false) 
        })
        .catch((err) => {   
            // return any error while exucuting
            done(err);
        });

}

passport.use(new LocalStrategy(verifyCallback));

// functions for providing data to the sessions

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});