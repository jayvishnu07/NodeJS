const mongoose = require('mongoose')
const express = require('express')
const app = express();
const router = express.Router()
const Fawn = require('fawn')
const { validateRental, Rental } = require('../model/rentals');
const { Movie } = require('../model/movies');
const { Customer } = require('../model/customers');


mongoose.set('strictQuery', false);
app.use(express.json())

Fawn.init(mongoose);

//GET => All Rental
router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental)
})

//GET => Single rental by params argument
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send(`Rental not found at id : ${req.params.id}`)
    res.send(rental)
})

//POST => create a movie
router.post('/', async (req, res) => {
    //validate the new name
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //look up for the customer
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send(`Customer not found at id : ${req.body.customerId}`)

    //look up for the movies
    let movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send(`Movie not found at id : ${req.body.movieId}`)

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
        let rental = new Rental({
            customer: {
                name: customer.name,
                phoneNumber: customer.phoneNumber
            },
            movie: {
                name: movie.name,
                dailyRentalRate: movie.dailyRentalRate
            }
        });

try {
    new Fawn.Task()
    .save('rentals',rental)
    .update('movies',{_id : movie._id},{
       $inc : { numberInStock : -1 }
    })
    .run();
   res.send(result);
} catch (error) {
    res.status(500).send("Something went wrong...");
}

})

module.exports = router;