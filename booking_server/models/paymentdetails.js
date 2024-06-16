const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    signature: {
        type:String,
    },
    amount:{
        type:Number,
        required: true
    },
    order_id:{
        type: String,
        required: true
    },
    payment_id:{
       type: String,
    },
    verification: {
        type: Boolean,
        required:true
    },
    email:{
        type:String,
        required: true
    }
},
{
    timestamps: true
});

const details = mongoose.model("pay_details", Schema);

module.exports = details