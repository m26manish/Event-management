const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    date: {
        type:String,
        required: true
    },
    startTime: {
        type:String,
        required: true
    },
    endTime: {
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    fullAddress:{
        type:String,
        required: true
    },
    event_type:{
       type:String,
    },
    seats:{
        front:Number,
        middel:Number,
        back:Number,
        normal:Number,
        primium:Number,
    },
    available_seats: {
        front:Number,
        middel:Number,
        back:Number,
        normal:Number,
        primium:Number,
    },
    price:{
        fronts:Number,
        middel:Number,
        back:Number,
        normal:Number,
        primium:Number
    },
    user_id:String,
    img:Array, 
    content:String,
    visits:{
        type:Number,
        default:0,
    }
},
{
    timestamps: true
});

const events = mongoose.model("posted_events", Schema);
module.exports = events