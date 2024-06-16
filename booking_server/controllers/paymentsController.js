const paymentdetails = require("../models/paymentdetails");
const tickets = require("../models/tickets");
const Razorpay = require('razorpay')
const crypto = require("crypto");
var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
  

exports.create_order_id = async(req, res, next) =>{
    try {
        const {
            amount,
            email,
        } = req.body

        console.log(req.body)
        const options = {
            amount: amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };
          console.log(options)
          instance.orders.create(options, async function(err, order) {
            const  obj = {
                amount,
                email,
                order_id:order.id,
                verification:false,
            }
           
            const data = new paymentdetails(obj)
            await data.save();
            res.status(200).send(order.id);
          }) 
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
} 

exports.payment_verify = async(req, res) => {
    try {
        const {
            order_id,
            payment_id,
            signature,
            } = req.body
            console.log(req.body)
        let body = order_id + "|" + payment_id;
        var expectedSignature = crypto.createHmac('sha256',process.env.KEY_SECRET)
        .update(body.toString())
        .digest('hex');
        var response = {"signatureIsValid":"false"}
        if(expectedSignature === signature){
            await paymentdetails.updateOne({order_id},{payment_id,signature,verification:true})
            res.status(200).send(true);
        }
        else{
            res.status(400).send(false);
        }  
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}
