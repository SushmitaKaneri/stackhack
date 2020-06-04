const mongoose = require('mongoose');
const Joi = require('joi');

const Section = mongoose.model('Section',new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxlength : 256
    },
    image : {
        type : mongoose.Schema.Types.ObjectId
    },
    description : {
        type : String,
        maxlength : 256
    },
    reminder : {
        type : Date
    },
    email : {
        type:String,
        required : true
    },
    pin_color : {
        type:String
    },
    note_color : {
        type:String
    },
    label : {
        type:String
    },
    status : {
        type:String,
        required : true
    }

}));

exports.Section = Section;

