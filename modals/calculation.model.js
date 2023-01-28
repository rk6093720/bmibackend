const mongoose = require("mongoose")


const calculatorSchema = new mongoose.Schema({
    user_id : {type : Number},
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bmi: { type: Number, required: true },
  
})

const Calculation = mongoose.model("user", calculatorSchema)


module.exports = {
    Calculation 
}