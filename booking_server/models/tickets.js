const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    event_id : {
        type: String,
        required: true
    },
    payment_id:{
        type: String,
        required: true
     },
    ticket_hash:{ 
        type: String,
        required: true
    },
    event_name:{
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    date: {
        type:String,
        required: true
    },
    startTime:{
        type:String,
        required: true
    },
    endTime:{
        type:String,
        required: true
    },

    fullAddress:{
        type:String,
        required: true
    },
    seat:{
       type: Array,
       required: true
    },
    price:{
        type:Number,
    },
    status:{
        type:Boolean,
        required:true
    } 
},
{
    timestamps: true
});

const tickets = mongoose.model("tickets", Schema);

module.exports = tickets