const express = require('express')//import express
const router = express.Router();//used express to create route handlers
//import controllers and middlewares
const collegeContoller = require('../controllers/collegeController');

// const auth = require('../middleware/auth')

const app = express()//used express to create global middleware

//api's
router.post('/functionup/colleges', collegeContoller.createCollege)

//export router
module.exports = router;