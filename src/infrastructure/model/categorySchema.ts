const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    description : {
      type : String,
      required : true,
    },
})

module.exports = mongoose.model('category',categorySchema)