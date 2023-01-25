const mongoose = require('mongoose')
const genres =  require('./routes/genres')
const customers =  require('./routes/customers')
const home =  require('./routes/home')
const express = require('express');
const app = express();

app.use(express.json())


//CONNECTING WITH SERVER
mongoose.connect('mongodb://localhost/vidly')
 .then(()=>{console.log("connected with server...");})
 .catch((err)=>{console.log("couldn't connect..." , err);})


app.use('/api/movies/genres',genres);
app.use('/api/movies/customers',customers);
app.use('/',home);

//PORT number
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server running on port ${port}`))