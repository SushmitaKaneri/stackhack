const mongoose = require('mongoose');
const Joi = require('joi');


const User = mongoose.model('User', new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    middle_name:{
        type: String
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }    
}));


function validation(Register) {
    const valid = {
        first_name: Joi.string().min(1),
        middle_name: Joi.string(),
        last_name:Joi.string().min(1),
        email: Joi.string().email(),
        contact:Joi.string().min(8).max(10),
        password: Joi.string()
    };
    return Joi.validate(Register, valid);
}

exports.User = User;
module.exports.validation = validation;