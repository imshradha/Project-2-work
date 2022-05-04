const internModel = require("../models/internModel");    // import internModel
const collegeModel = require("../models/collegeModel");  //Import collegeModel
const { findOne } = require("../models/collegeModel");

const createIntern = async function (req, res) {
    try {
        const requestBody = req.body;

        const errors = await validateIntern(requestBody);
        if (errors.length > 0) {
            return res.status(400).send({ status: false, msg: "Mandatory fields are missing", errors: errors });
        }

        const { name, email, mobile, collegeName } = requestBody;

        //check mobile number is valid or not
        const isValidNumber = /^\d{10}$/.test(mobile)
        if (!isValidNumber) {
            return res.status(400).send({ status: false, msg: "Invalid mobile number" })
        }

        // check email is valid or not
        const isValidEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
        if (!isValidEmail) {
            return res.status(400).send({ status: false, msg: "Invalid email address" })
        }

        // check email is already used
        const isEmailUsed = await internModel.findOne({ email });
        if (isEmailUsed) {
            return res.status(400).send({ status: false, msg: `${email} email address is already registered` })
        }
        // check mobile number is already used
        const isMobileUsed = await internModel.findOne({ mobile });
        if (isMobileUsed) {
            return res.status(400).send({ status: false, msg: `${mobile} mobile number is already registered` })
        }

        //find college with given college name
        const college = await collegeModel.findOne({ name: collegeName });
        if (!college) {
            return res.status(404).send({ status: false, msg: "college not found" })
        }
        const collegeId = college._id

        //check collegeid is valid objectid
        const isValidCollegeId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/.test(collegeId);
        if (!isValidCollegeId) {
            return res.status(400).send({ status: false, msg: "Invalid college id" })
        }

        const intern = { name, email, mobile, collegeId }

        //create intern
        const internData = await internModel.create(intern);
        return res.status(201).send({ status: true, data: internData });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}

const validateIntern = async function (internData) {
    const errors = [];
    const { name, email, mobile, collegeName } = internData   //destructuring internData object
    //Mandotory fields
    if (!name || name.trim().length === 0) {
        errors.push("name required")
    }
    if (!email || email.trim().length === 0) {
        errors.push("email required")
    }
    if (!mobile) {
        errors.push("mobile number required")
    }
    if (!collegeName || collegeName.trim().length === 0) {
        errors.push("college name required")
    }
    return errors;
}


const getCollegeDetails = async function (req, res) {
    try{
        const data = req.query;
        const collegeName = data.collegeName;

        if (!collegeName || collegeName.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "collegename required" })
        }

        // find college with given collegeName
        const collegeDetails = await collegeModel.findOne({ name: collegeName });
        // console.log(collegeDetails)
        if (!collegeDetails) {
            return res.status(404).send({ status: false, message: `${collegeName} college not found`})
        }
        const { name, fullName, logoLink, _id } = collegeDetails; // destructuring

        //find documents for interests in given college using _id
        const interests = await internModel.find({ collegeId: _id });

        const internDetails = { name, fullName, logoLink, interests }

        return res.status(200).send({ status: true, data: internDetails })
    }
    catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.createIntern = createIntern;
module.exports.getCollegeDetails = getCollegeDetails;
