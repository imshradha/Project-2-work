const collegeModel = require("../models/collegeModel");//Import collegeModel

// create college
const createCollege = async function(req, res) {
        //using try catch block function
    try{
        //Reading inputs from the body
        const collegeData = req.body;

        //validate college
        const errors = await validateCollege(collegeData);
        if(errors.length > 0) {
            return res.status(400).send({status: false, msg:"Mandatory fields are missing", errors:errors});
        }
        //create college
        const college = await collegeModel.create(collegeData);

        //send created college in response
        res.status(201).send({status: true, data: college})

    }catch(error){
        // return a error if any case fail on try block 
        res.status(500).send({status: false, msg: error.message})
    }
}

const validateCollege = async function(collegeData){
    const errors = [];
    //Mandotory fields
    if (!collegeData.name) {
        errors.push("name required")
    }
    if (!collegeData.fullName) {
        errors.push("fullName required")
    }
    if (!collegeData.logoLink) {
        errors.push("link required")
    }
    return errors;
}

//Export function
module.exports.createCollege = createCollege;
