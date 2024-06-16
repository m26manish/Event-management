const event = require("../models/events");
const users = require("../models/users");
const search = require("../models/search");
const images = require("../models/images");


exports.showEvent = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        let events_id = await users.find({ _id: user_id })
        const data = events_id.events
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.addEvent = async (req, res) => {
    try {
        const { endTime,
            name,
            date,
            startTime,
            fullAddress,
            event_type,
            price,
            available_seat,
            seats,
            user_id,
            img,
            content,
            city
        } = req.body
        const obj = {
            endTime,
            name,
            date,
            startTime,
            fullAddress,
            event_type,
            price,
            available_seat,
            seats,
            user_id,
            img,
            content,
            city
        }
        const new_event = new event(obj);
        const saved = await new_event.save();  
        const new_search = new search({name,city,eventId:new_event._id});
        await new_search.save();
        img.forEach(async element => {
            await images.updateOne({_id:element},{name:name,event_id:new_event._id,user_id})
        });
       await users.findByIdAndUpdate(user_id,{
            $push:{events:saved._id}
        })   
        res.status(200).send({ msg: "saved", event: saved });
    }   catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
exports.updateEvent = async (req, res) => {
    try {
        const { title,
            name,
            date,
            time,
            price,
            available_seat,
            seats,
            user_id,
            event_type,
            img,
            content,
            venue
        } = req.body
        console.log(req.body)
        // const data = await place.findOne({name:city})
        const obj = {
            title,
            name,
            date,
            time,
            price,
            available_seat,
            seats,
            event_type,
            user_id,
            img,
            content,
            venue
        }
        console.log(obj)
        const new_event = new event(obj);
        const saved = await new_event.save();
        console.log(saved)
        // const new_search = new event({name,venue,eventId:new_event._id});
        //               await new_search.save();
        // users.findByIdAndUpdate(user_id,{
        //     $push:{events:new_event._id}
        // })
        // let events_id = await users.findOne({ _id: user_id })
        // events_id = events_id.events
        // events_id.push(new_event._id)
        // await users.updateOne({ _id: user_id }, { events: events_id })
        res.status(200).send({ msg: "saved", event: saved });
    }   catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}
exports.deleteEvent = async (req, res) => {

    try {
        const { _id, user_id } = req.body;
        await event.deleteOne({ _id });
        let events_id = await users.findOne({ _id: user_id })
        events_id = events_id.events
        let index = events_id.findIndex(_id)
        let first = events_id.slice(0, index)
        let sec = events_id.slice(index + 1, events_id.length)
        events_id = first.concat(sec)
        await users.updateOne({ _id: user_id }, { events: events_id })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.eventList = async (req, res) => {

    try {
            const recentOnGoing = await event.find({event_type:"movie"}).limit(7)
            const trendingMovie = await event.find({event_type:"movie"})
            const laughterTherepy = await event.find({ $or: [
                { event_type: "standup" },
                { event_type: "other" }
              ]})
            const dataToSend={
                recentOnGoing,
                trendingMovie,
                laughterTherepy
            }
            res.status(200).send(dataToSend)
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
exports.particular_event = async (req, res) => {

    try {
        const _id = req.params._id;
        console.log(_id)
            const eventlist = await event.findOne({_id})
            res.status(200).send(eventlist)
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


