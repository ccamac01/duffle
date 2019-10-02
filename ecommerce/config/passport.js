var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var { check, body, validationResults } = require('express-validator');

passport.serializeUser((user, done) => {
    done(null, user.id); //use userID to serialize session
});

passport.deserializeUser((id, done) => {
    // query mongoDB to find user by ID
    User.findById(id, (err, user) => {
        done(err, user);
    })
});


// VALIDATE EMAIL & PASSWORD within SignUp and SignIn, prior to DB query
// [check('email', 'Invalid email').notEmpty.isEmail(), check('password', 'Invalid password').notEmpty.isLength({min: 4})]
// var errors = validationResults(req);
// if (errors) {
//     var messages = [];
//     errors.forEach(error => {
//         messages.push(error.msg);
//     })
//     return done(null, false, req.flash('error', messages));
// };


// SIGNUP Page 
passport.use('local.signup', 
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User.findOne({email}, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    // not saying it was successful, but sending a flash message specifying why it wasn't
                    return done(null, false, {message: 'Email is already in use.'})
                }
                var newUser = new User();
                newUser.email = email;
                newUser.password = newUser.encryptPassword(password);
                newUser.save((err, result) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                });
            });

}));

// SIGNIN Page
passport.use('local.signin', 
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, 
            (req, email, password, done) => {
                User.findOne({email}, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        // not saying it was successful, but sending a flash message specifying why it wasn't
                        return done(null, false, {message: 'No user found.'})
                    }
// DEBUG THE CALL TO validPassword()!!!
                    // if (!(user.validPassword(password))){
                    //     return done(null, false, {message: 'Incorrect password.'})
                    // }
                    return done(null, user); 
                });
        }
))