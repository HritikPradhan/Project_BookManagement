const mongoose = require('mongoose')

const intersModal = require("../modal/intersModal.js")
const collegeModal = require("../modal/collegeModal")
//const { findOne } = require('../modal/intersModal.js')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = function (inters) {
    return Object.keys(inters).length > 0
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
const creatInters = async function (req, res) {
try{
    
    const interns = req.body;
    const { name, email, mobile,collegeName} = interns

    const collegeDetail = await collegeModal.findOne({collegeName})
    const collegeId = collegeDetail._id

    if (!isValidRequestBody(interns)) {
        res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide college details' })
        return
    }
    
    if (!isValid(name)) {
        res.status(400).send({ status: false, message: ' name is required' })
        return
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        res.status(400).send({ status: false, message: `Email should be a valid email address` })
        return
    }
    if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))) {
        res.status(400).send({ status: false, message: 'Mobile number should be a valide number' })
        return
    }
    if (!collegeId) {
        res.status(400).send({ status: false, message: 'Author id is required' })
        return
    }
    if (!isValidObjectId(collegeId)) {
        res.status(400).send({ status: false, message: `${collegeId} is not a valid college id` })
        return
    }
    const intersData = {
        name,
        email,
        collegeId,
        mobile
    }

    let inters = await intersModal.create(intersData)
    res.status(201).send({ status: true, message: 'inters created successfully', data: inters })

 } catch (err) {
      return res.status(500).send({status: false, msg: "server failure", msg:err.message })
     }
}
module.exports.creatInters = creatInters
