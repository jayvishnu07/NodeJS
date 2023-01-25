const mongoose = require('mongoose')
const express = require('express')
const app = express();
const router = express.Router();
const { Movie , validateMovie } = require('../model/movies');
const { Genre } = require('../model/genres');


mongoose.set('strictQuery', false);
app.use(express.json())




//GET => All movies
router.get('/',async(req,res)=>{
    const movie = await Movie.find().sort('name');
    res.send(movie)
})

//GET => Single movie by params argument
router.get('/:id', async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send(`Movie not found at id : ${req.params.id}`)
    res.send(movie)
})

//POST => create a movie
router.post('/',async(req,res)=>{
    //validate the new name
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //look up for the movie
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send(`Genre not found at id : ${req.body.genreId}`)  

    let movie = new Movie({ 
          name: req.body.name,
          genre: {
            _id: genre._id,
            name: genre.name
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate
        });  
   movie = await movie.save();
    
    res.send(movie);

})

//PUT => update a movie
router.put('/:id',async(req,res)=>{
    //validate the new name
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //look up for the movie
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send(`Genre not found at id : ${req.params.id}`)  

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        { 
          name: req.body.name,
          genre: {
            _id: genre._id,
            name: genre.name
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });  
        if (!movie) return res.status(404).send('The movie with the given ID was not found.');
        res.send(movie);

})

//DELETE => delete a movie
router.delete('/:id',async(req,res)=>{

    //look up for the movie
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send(`Movie not found at id : ${req.params.id}`)  

    //Delete the movie
    res.send(movie)
})

module.exports = router;