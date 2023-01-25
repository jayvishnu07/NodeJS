const mongoose = require('mongoose')
const Joi = require('joi')

mongoose.set('strictQuery', false);


//SCHEMA
const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 55
    },
    isGold : {
        type : Boolean,
        default : false
    },
    phoneNumber : {
        type : Number,
        minlength : 5,
        maxlength : 10
    }
})

//MODEL
const Customer = mongoose.model('Customer' , schema);

//validation
function validateCustomer(genre){
    const schema = {
        name : Joi.string().min(5).required(),
        isGold : Joi.boolean(),
        phoneNumber : Joi.number().required()
    }
    return Joi.validate(genre , schema);
}

exports.schema = schema;
exports.validate = validateCustomer;
exports.Customer=Customer;

