const events = require("../models/events");
const tickets = require("../models/tickets");
const payments = require("../models/paymentdetails")
const bcrypt = require('bcryptjs');



exports.bookEvent = async (req, res) => {
    try {
        const {
            event_id,
            event_name,
            payment_id,
            date,
            startTime,
            endTime,
            fullAddress,    
            seat,
            price,
            email,
        } = req.body
        console.log(req.body)
        const payment_verification = await payments.findOne({ payment_id })
        if (payment_verification && payment_verification?.verification) {
            bcrypt.hash(payment_id, 12, async function (err, hash) {
                if (err) {
                    console.error('Error generating hash code:', err);
                }
                else {
                    const details = {
                        event_id,
                        ticket_hash: hash,
                        event_name,
                        payment_id,
                        date,
                        startTime,
                        endTime,
                        fullAddress,
                        seat,
                        price,
                        email,
                        status: false,
                    }
                    const ticket = new tickets(details);
                    const data = await ticket.save()
                    console.log(data);
                    res.status(200).send(data);
                }
            })
        }

        else {
            res.status(400).json("unauterized access");
        }
    }
    catch (e) {
        res.send(e).status(400)
    }
}




exports.ticketVerification = async (req,res)=>{

    try{
        const ticket_hash = req.params.ticket_hash;
        const verified = await tickets.findOne({ticket_hash});
        if(verified){
            await tickets.updateOne({_id:verified._id},{status:true})
            res.status(200).send("verfied")
        }
        else{
            res.status(400).send("not verified")
        }

    }
    catch(e){
        console.log(e)
        res.status(500)
    }





}




exports.cancelticket = async (req, res) => {
    try {

        // cancel ticket.....

    }
    catch (e) {
        res.send(e).status(400)
    }
}