const users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendmail = require('../utils/mail_sender')
const sendmail2 = require('../utils/mail_linksender')
const Events = require("../models/events")

// --------------authMiddleware-----------------

// attach team_id (mongodb) with req
exports.authMiddleware = async (req, res, next) => {
    try {

        const authorization_header_token = req.headers.authorization;
        if (!authorization_header_token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const token = authorization_header_token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // todo : populate team with assigned questions
        const user = await users.findOne({email:decoded.email}).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        req.email = decoded.email;
        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Token expired"
            });
        }

        console.log(typeof(error));
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

// -------------- authControllers --------------

exports.register = async (req, res) => {
    try {
        // to-do add captcha
        const {
            username,
            email,
            password,
           
        } = req.body;
        console.log(req.body)

        const preEmail = await users.findOne({ email });
        bcrypt.hash(password, 12, async function (err, hash) {
            if (!preEmail) {
              const otp = sendmail(email);
              const detail = { email: email, password: hash, username: req.body.username, emailStatus: false ,otp: otp }
              const usr = new users(detail)
              const keetp = await usr.save();
              res.send({ msg: "otp has sent" })
            }
            else if (preEmail.emailStatus === false) {
              const otp = sendmail(email);
              await users.updateOne({ email: email},{ password: hash, name: req.body.username, email_status: false, otp: otp })
              res.send({ msg: "otp has sent" })
            }
            else {
              res.send({ msg: `user with ${email} has already register login with diffrent one` })
            }
          })

        //check if team already exists

        // else save team
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

    exports.sendOtp = async ( req,res)=>{
        try{
            const {email}=req.body;
            const user = await users.findOne({email})
            if(!user){
                res.status(500).json({
                    message: "Something went wrong or your are not register yet"
                });
            }
              const otp = sendmail(email);
              await users.updateOne({ email: email},{ otp: otp })
              res.send({ msg: "otp has been sent" })
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                message: "Something went wrong"
            });
        }
    }


    exports.emailVerify = async (req,res)=>{
        try{
            const {email,otp}=req.body;
            console.log(req.body)
            const findOtp = await users.findOne({email})
            console.log(findOtp)
            if(findOtp.otp==otp)
            {
                await users.updateOne({email:email},{emailStatus:true})
                res.send({msg:'otp verified',Status:true})
            }
            else{
                res.send({msg:"not verifined",Status:false}).status(400)
            }
        }
        catch(e){
                res.status(400).send(e)
        }
    }

// put Team mongodb id in jwt
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        // check if team exists
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "user email does not exist"
            });
        }

        // check if password is correct
        const isPasswordCorrect = bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }
    
        // generate jwt
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        // update login_count
        res.status(200).send({
            msg: `user logged in`, user: {
            user_id:user._id,
            email: email,
            username: user.username,
            token: token,
            expires_in: new Date(Date.now() + 60*60*1000),
            }
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

exports.signup= async (req,res)=>{
    try{
            const {username,
                email,
                password}= req.body
                const preEmail = await users.findOne({ email });
                if(preEmail){
                    res.send({message:"email allready exist"})}
                    else
                    {
                const token = jwt.sign({ password: password }, process.env.JWT_SECRET, {
                    expiresIn: `${1000*60*5}`
                });
                sendmail2(username,email,token)
                res.status(200).send({message:`mail has been send to the email Id ${email}`})
            }
            }           
        catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Something went wrong"
            });
    }
}


exports.verifySave = async(req,res)=>{

            try {

                const token= req.query.token
                const username= req.query.username
                const email= req.query.email
                const password = jwt.verify(token, process.env.JWT_SECRET);
                if(password){
                    bcrypt.hash(password.password, 12, async function (err, hash){ 
                        
                        const detail = { email: email, password: hash, username:username }
                        const usr = new users(detail)
                        const keetp = await usr.save();
                        console.log(keetp)
                        res.send({ msg: "email has been verified Go to the website and login through email & password" })
                    })
                }
                
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    message: "Something went wrong"
                });
            }

}


exports.resetPassword = async (req, res) => {
    
    try {
        const {email,otp,password } = req.body;
        const user = await users.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "user email does not exist"
            });
        }
        if(user.otp==otp){
            bcrypt.hash(password, 12, async function (err, hash) {
            await users.updateOne({email},{password:hash})
            })
            res.status(200).json({
                message: "password changed successfully",
    
            });
        }
        else{
            res.send(
                {
                    massege:'enter otp is not correct'
                }
            ).status(400)
        }   
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

exports.getEvents= async(req,res)=>{

    try{
        const _id = req.body.user_id;
        const {events} = await users.findOne({_id})
        res.send(events);
    }
    catch(err){
        console.log(err);
        res.status(500).send({error:err})
    }
}

exports.getEventsDetails= async(req,res)=>{

    try{
        const events = req.body.events;
        const details = await Events.find({_id:{$in:events}})
        res.send(details);
    }
    catch(err){
        console.log(err);
        res.status(500).send({error:err})
    }
}