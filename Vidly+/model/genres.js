const Joi = require('joi')
const mongoose = require('mongoose')


//SCHEMA
const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 55
    }
})


//validation
function validateGenre(genre){
    const schema = {
        name : Joi.string().min(5).required()
    }
    return Joi.validate(genre , schema);
}

exports.schema = schema;
exports.validate = validateGenre;