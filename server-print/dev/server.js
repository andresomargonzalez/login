/**
 * Created by Omar on 4/5/16.
 */
"use strict";
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/mongoose/mongoose.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
/// <reference path="typings/morgan/morgan.d.ts" />
/// <reference path="typings/passport/passport.d.ts" />
/// <reference path="typings/jsonwebtoken/jsonwebtoken.d.ts" />
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('../config/main');
var User = require('../app/models/user');
var jwt = require('jsonwebtoken');
var app = express();
var port = config.port;
// enable cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// use body-parser to get POST requests for API Use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Log requests to console
app.use(morgan(config.env));
// Initialize passport for use
app.use(passport.initialize());
//connect to db
mongoose.connect(config.database);
//bring in passport strategy we just defined
require('../config/passport')(passport);
//Create API group routes
var apiRoutes = express.Router();
apiRoutes.post('/register', function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter an email and password to register.' });
    }
    else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });
        //Attempt to save the new users
        newUser.save(function (err) {
            if (err) {
                return res.json({ success: false, message: 'That email address already exists.' });
            }
            res.json({ success: true, message: 'Successfully created new user.', user: newUser });
        });
    }
});
// Authenticate the user and get a JWT
apiRoutes.post('/authenticate', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err)
            throw err;
        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        }
        else {
            // Check if the password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // Create the jwt token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 10080
                    });
                    res.json({ success: true, token: 'JWT ' + token, user: user });
                }
                else {
                    res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
});
// Protect dashboard route with JWT
apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});
// Set url for API group routes
app.use('/api', apiRoutes);
// Home route
app.get('/', function (req, res) {
    res.send("server up!");
});
app.listen(port);
console.log("Your server is running on port" + port + '.');
//# sourceMappingURL=server.js.map