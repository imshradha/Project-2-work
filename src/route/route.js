const express = require('express')//import express
const router = express.Router();//used express to create route handlers
//import controllers and middlewares
const collegeContoller = require('../controllers/collegeController');
const internContoller = require('../controllers/internController');
// const auth = require('../middleware/auth')

const app = express()//used express to create global middleware

//api's
router.post('/functionup/colleges', collegeContoller.createCollege);

router.post('/functionup/interns', internContoller.createIntern);

router.get('/functionup/collegeDetails', internContoller.getCollegeDetails)

//export router
module.exports = router;