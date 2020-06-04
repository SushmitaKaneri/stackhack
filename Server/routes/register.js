const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const {User} = require('../models/user');
const {validation} = require('../models/user');
const bycrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

router.post('/register', async (req, res) => {
    const request = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact: req.body.contact,
    }
    const { error } = validation(request);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered...');
    user = new User({
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact: req.body.contact,
    });

    const salt = await bycrypt.genSalt(10);
    user.password = await bycrypt.hash(req.body.password,salt);

    await user.save();

    res.status(200).send(user);
});

router.post('/authenticate', (req,res,next)=>{

    passport.authenticate('local-login', (err,user,d)=>{
        if(err) return next(err);
        if(!user) return res.status(401).send({ success : false, message : 'authentication failed' });
        req.login( user , loginerr => {
            if(loginerr) return next(loginerr);
            return res.status(200).send(user);
        });
    })(req,res,next);
    });


    router.get('/authenticate',async(req,res) => {
        if ( ! req.isAuthenticated() ){
            res.status(403).send(false);
        }
        else{
            res.send(req.user.email);
        }
    });

    router.post('/forgot', async (req, res) => {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('User does not exist');
        else{
            const salt = await bycrypt.genSalt(10);
            let UpdatedPassword = await bycrypt.hash(req.body.password, salt);
        
            await User.updateOne({email: req.body.email},{$set: {password:UpdatedPassword}}, async function(err, res) {
                if (err) throw err;
            });
    
        }
        
        res.send("Updated");
    });
    
    router.get('/logout',async(req,res)=>{
    
        req.logout();
        res.send("loged out");
    })

module.exports = router;
