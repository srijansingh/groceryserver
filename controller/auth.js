const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../model/auth');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed.');
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password,12)
    .then(hashPw => {
        const user = new Admin({
            email:email,
            password:hashPw,
            name:name
        });
        return user.save();
    })
    .then(result => {
        res.status(201).json({
            message : 'User created',
            userId : result._id
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Admin.findOne({email:email})
    .then(user => {
        if(!user){
            const error = new Error('Email not found');
            error.statusCode = 401;
            throw error;
        }
        loadeduser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email:loadeduser.email,
            userId:loadeduser._id.toString()
        }, 
        'dholpurkasecret', 
        {expiresIn: '1h'}
        );
        res.status(200).json({token:token, userId:loadeduser._id.toString(), email:loadeduser.email})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}