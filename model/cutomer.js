const mongoose= require("mongoose")

const customerSchema= new mongoose.Schema({
    date:Date,
    time:String,
    name:{type:String, trim:true},
    mobile:{type:String, trim:true},
    seqNumber:Number,
    comment:String
})

module.exports= mongoose.model("Customer",customerSchema)
