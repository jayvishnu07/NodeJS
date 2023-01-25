const Joi = require('joi')
const mongoose = require('mongoose')


//SCHEMA
const genreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 55
    }
})

const Genre = mongoose.model('Genre', genreSchema);

//validation
function validateGenre(genre){
    const schema = {
        name : Joi.string().min(5).required()
    }
    return Joi.validate(genre , schema);
}

exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;
exports.Genre = Genre; 
