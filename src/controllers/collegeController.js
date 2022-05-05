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
            return res.status(400).send({status: false, message:"Please provide College details", errors:errors});
        }

        // validate Url
        const validUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(collegeData.logoLink);
        if(!validUrl) {
            return res.status(400).send({status: false, message: "Invalid Url"})  
        }

        //check name is already used
        const isNameUsed = await collegeModel.findOne({name:collegeData.name});
        if(isNameUsed)
        {
            return res.status(400).send({status:false,message:`document for ${collegeData.name} college is already exists`})
        }

        //create college
        const college = await collegeModel.create(collegeData);

        //send created college in response
        res.status(201).send({status: true, data: college})

    }catch(error){
        // return a error if any case fail on try block 
        res.status(500).send({status: false, message: error.message})
    }
}

const validateCollege = async function(collegeData){
    const errors = [];

    const { name, fullName, logoLink} = collegeData //Destructuring collegeData objects

    //Mandatory fields
    if (!name || name.trim().length === 0) {
        errors.push("name is required")
    }
    if (!fullName || fullName.trim().length === 0) {
        errors.push("fullName is required")
    }
    if (!logoLink) {
        errors.push("logolink is required")
    }
    return errors;
}

//Export function
module.exports.createCollege = createCollege;
