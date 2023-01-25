const mongoose = require('mongoose')
const express = require('express')
const app = express();
const router = express.Router();
const { schema , validate } = require('../model/customers')


mongoose.set('strictQuery', false);
app.use(express.json())


//MODEL
const Genre = mongoose.model('genre' , schema);

//GET => All genres
router.get('/',async(req,res)=>{
    const genre = await Genre.find().sort('name');
    res.send(genre)
})

//GET => Single genre by params argument
router.get('/:id', async(req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send(`Genre not found at id : ${req.params.id}`)
    res.send(genre)
})

//POST => create a genre
router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name : req.body.name
    });


    genre =  await genre.save();
    res.send(genre);
})

//PUT => update a genre
router.put('/:id',async(req,res)=>{

    //look up for the genre
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        $set : {
            name : req.body.name
        }
    },{new : true});
    if(!genre) return res.status(404).send(`Genre not found at id : ${req.params.id}`)  
    
    //validate the new name
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    
    res.send(genre);

})

//DELETE => delete a genre
router.delete('/:id',async(req,res)=>{

    //look up for the genre
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send(`Genre not found at id : ${req.params.id}`)  

    //Delete the genre
    res.send(genre)
})

module.exports = router;