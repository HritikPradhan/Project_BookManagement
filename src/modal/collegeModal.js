const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({


     name: { type:String,required:true},
     fullName: {type:String,required:true}, 
     logoLink: {
          type:String,

          required:true
     },
     isDeleted: {type:Boolean, default: false} 

}, { timestamps: true })

module.exports = mongoose.model('college', authorSchema)