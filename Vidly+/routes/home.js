const express = require('express')
const router = express.Router();


//GET => localhost:3000
router.get('/',(req,res)=>{
    res.render('index',{title:'My express', message:'Hello World'})
})

module.exports = router;