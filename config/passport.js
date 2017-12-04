const mongoose = require('mongoose'),
passport = require('passport');

const Employee = require('../models/employee');
const Candidate = require('../models/candidate');

var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'devilwiththefruit';

module.exports = function(){
    var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    Employee.findOne({_id: jwt_payload.id},).exec((err, employee) => {
        if (employee) {
        next(null, employee);
        } else {
            Candidate.findOne({_id: jwt_payload.id},).exec((err, candidate) => {
                if (candidate) {
                next(null, candidate);
                } else {
                next(null, false);
                }
            });
        }
    });
    });
    passport.use(strategy);
}