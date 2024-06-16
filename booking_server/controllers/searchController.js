const search = require("../models/search");

exports.serverStatus = (req, res, next) => {
    res.status(200).send("Server is up and running.")
}

exports.showSearch = async(req, res, next) =>{
    try {
        const query = req.query.q
        if(query.length<3){
            res.status(401).send(
                "enter minimum 3 letters"
            )
        }
        else{
        const findData = await search.find({
            $or: [

                { name: { $regex: query, $options: 'i' } },
                {city:{$regex:query,$options:'i'}}
              ]
        }).limit(20)
        res.status(200).send(findData);
    }
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
} 


exports.addReview = async(req, res) => {
    try {
        const {name,
            reviewername,
            tripMember,
            comment,
            rate,
            expendature,
            email} = req.body
        const data = await search.findOne({name:name})
        const obj = {
            reviewername,
            tripMember,
            comment,
            rate,
            expendature,
            email
        }
        data.reviews.push(obj)
        
        await search.updateOne({name:name},{reviews:data})
        res.status(200).send({msg:"setted"});
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
