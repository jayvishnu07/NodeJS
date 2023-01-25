const mongoose = require('mongoose')
const Joi = require('joi')
const genreSchema = require('./genres')
mongoose.set('strictQuery', false);


//SCHEMA
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 55
    },
    genre: {
        type: genreSchema,
        default: false,
        minlength: 5,
        maxlength: 55
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

//MODEL
const Movie = mongoose.model('Movie' , movieSchema);

//validation
function validateMovie(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    return Joi.validate(genre, schema);
}

exports.movieSchema = movieSchema;
exports.validateMovie = validateMovie;
exports.Movie=Movie;

