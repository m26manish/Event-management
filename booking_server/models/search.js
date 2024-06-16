const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    title:String,
    eventId:{
        type:String,
        require:true
    } 
},
{
    timestamps: true
});

const events = mongoose.model("search", Schema);

module.exports = events