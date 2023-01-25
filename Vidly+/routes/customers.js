const mongoose = require('mongoose')
const express = require('express')
const app = express();
const router = express.Router();
const { schema , validate } = require('../model/customers')

mongoose.set('strictQuery', false);
app.use(express.json())


//MODEL
const Customer = mongoose.model('customer' , schema);

//GET => All customer
router.get('/',async(req,res)=>{
    const customer = await Customer.find().sort('name');
    res.send(customer)
})

//GET => Single customer by params argument
router.get('/:id', async(req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send(`customer not found at id : ${req.params.id}`)
    res.send(customer)
})

//POST => create a customer
router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name : req.body.name,
        isGold : req.body.isGold,
        phoneNumber : req.body.phoneNumber
    });


    customer =  await customer.save();
    res.send(customer);
})

//PUT => update a customer
router.put('/:id',async(req,res)=>{

    //look up for the customer
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set : {
            name : req.body.name,
            isGold : req.body.isGold,
            phoneNumber : req.body.phoneNumber
        }
    },{new : true});
    if(!customer) return res.status(404).send(`customer not found at id : ${req.params.id}`)  
    
    //validate the new customer
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    
    res.send(customer);

})

//DELETE => delete a customer
router.delete('/:id',async(req,res)=>{

    //look up for the customer
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send(`customer not found at id : ${req.params.id}`)  

    //Delete the genre
    res.send(customer)
})



module.exports = router;