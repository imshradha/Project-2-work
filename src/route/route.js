const express = require('express')//import express
const router = express.Router();//used express to create route handlers
//import controllers 
const collegeContoller = require('../controllers/collegeController');
const internContoller = require('../controllers/internController');

const app = express()//used express to create global middleware

//api's
//create college api
router.post('/functionup/colleges', collegeContoller.createCollege);
//create intern api
router.post('/functionup/interns', internContoller.createIntern);
//get college api
router.get('/functionup/collegeDetails', internContoller.getCollegeDetails)

//export router
module.exports = router;